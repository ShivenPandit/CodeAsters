import type { FormType } from "@/lib/server/form-submission";

type EmailTemplateParams = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

type EmailJsEnv = {
  serviceId: string;
  publicKey: string;
  privateKey?: string;
  templateIds: string[];
};

type EmailJsRequestResult = {
  ok: boolean;
  status: number;
  message?: string;
};

function readFirstDefinedEnv(keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }

  return "";
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function getTemplateCandidates(formType: FormType) {
  const genericCandidates = [
    process.env.EMAILJS_TEMPLATE_ID,
    process.env.EMAILJS_TEMPLATE,
    process.env.EMAILJS_TEMPLATE_CONTACT,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
  ];

  const formSpecificCandidatesByType: Record<FormType, Array<string | undefined>> = {
    contact: [process.env.EMAILJS_TEMPLATE_CONTACT],
    project: [process.env.EMAILJS_TEMPLATE_PROJECT, process.env.EMAILJS_TEMPLATE_CONTACT],
    affiliate: [process.env.EMAILJS_TEMPLATE_AFFILIATE, process.env.EMAILJS_TEMPLATE_CONTACT],
  };

  return unique([
    ...formSpecificCandidatesByType[formType].map((value) => value?.trim() ?? ""),
    ...genericCandidates.map((value) => value?.trim() ?? ""),
  ]);
}

function resolveEmailJsEnv(formType: FormType): EmailJsEnv {
  const serviceId = readFirstDefinedEnv([
    "EMAILJS_SERVICE_ID",
    "EMAILJS_SERVICE",
    "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
    "NEXT_PUBLIC_EMAILJS_SERVICE",
  ]);
  const publicKey = readFirstDefinedEnv([
    "EMAILJS_PUBLIC_KEY",
    "EMAILJS_PUBLICKEY",
    "EMAILJS_USER_ID",
    "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
    "NEXT_PUBLIC_EMAILJS_PUBLICKEY",
    "NEXT_PUBLIC_EMAILJS_USER_ID",
  ]);
  const privateKey = readFirstDefinedEnv([
    "EMAILJS_PRIVATE_KEY",
    "EMAILJS_PRIVATEKEY",
    "EMAILJS_ACCESS_TOKEN",
    "NEXT_PUBLIC_EMAILJS_PRIVATE_KEY",
    "NEXT_PUBLIC_EMAILJS_PRIVATEKEY",
    "NEXT_PUBLIC_EMAILJS_ACCESS_TOKEN",
  ]);
  const templateIds = getTemplateCandidates(formType);

  if (!serviceId || !publicKey || templateIds.length === 0) {
    throw new Error("Email service configuration is missing.");
  }

  return {
    serviceId,
    publicKey,
    privateKey: privateKey || undefined,
    templateIds,
  };
}

async function sendWithTemplate(
  env: EmailJsEnv,
  templateId: string,
  params: EmailTemplateParams,
  includePrivateKey: boolean
): Promise<EmailJsRequestResult> {
  const payload: Record<string, unknown> = {
    service_id: env.serviceId,
    template_id: templateId,
    user_id: env.publicKey,
    template_params: params,
  };

  if (includePrivateKey && env.privateKey) {
    payload.accessToken = env.privateKey;
  }

  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    return {
      ok: false,
      status: response.status,
      message,
    };
  }

  return {
    ok: true,
    status: response.status,
  };
}

export async function sendEmail(formType: FormType, params: EmailTemplateParams) {
  const env = resolveEmailJsEnv(formType);
  let lastError: unknown;

  for (const templateId of env.templateIds) {
    try {
      const tokenAttempt = await sendWithTemplate(env, templateId, params, true);
      if (tokenAttempt.ok) return;

      const tokenFailureHint = (tokenAttempt.message ?? "").toLowerCase();
      const looksLikeTokenIssue =
        tokenFailureHint.includes("token") ||
        tokenFailureHint.includes("access") ||
        tokenFailureHint.includes("private key") ||
        tokenFailureHint.includes("unauthorized") ||
        tokenFailureHint.includes("forbidden");

      const shouldRetryWithoutToken =
        Boolean(env.privateKey) &&
        (tokenAttempt.status === 401 ||
          tokenAttempt.status === 403 ||
          (tokenAttempt.status >= 400 && tokenAttempt.status < 500 && looksLikeTokenIssue));

      if (!shouldRetryWithoutToken) {
        throw new Error(
          `Email provider rejected request (${tokenAttempt.status}): ${tokenAttempt.message ?? "Unknown error"}`
        );
      }

      const fallbackAttempt = await sendWithTemplate(env, templateId, params, false);
      if (fallbackAttempt.ok) return;

      throw new Error(
        `Email provider rejected request (${fallbackAttempt.status}): ${fallbackAttempt.message ?? "Unknown error"}`
      );
    } catch (error) {
      lastError = error;
    }
  }

  throw normalizeEmailProviderError(
    lastError instanceof Error
      ? lastError
      : new Error("Email provider rejected all configured templates.")
  );
}

function normalizeEmailProviderError(error: Error) {
  const message = error.message.toLowerCase();

  if (message.includes("api access from non-browser environments is currently disabled")) {
    return new Error(
      "EmailJS blocked server-side requests. Enable non-browser API access in EmailJS Dashboard > Account > Security."
    );
  }

  return error;
}
