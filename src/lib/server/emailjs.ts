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
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
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
    "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
  ]);
  const publicKey = readFirstDefinedEnv([
    "EMAILJS_PUBLIC_KEY",
    "EMAILJS_USER_ID",
    "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
    "NEXT_PUBLIC_EMAILJS_USER_ID",
  ]);
  const privateKey = readFirstDefinedEnv(["EMAILJS_PRIVATE_KEY"]);
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
  params: EmailTemplateParams
) {
  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: env.serviceId,
      template_id: templateId,
      user_id: env.publicKey,
      accessToken: env.privateKey,
      template_params: params,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email provider rejected request (${response.status}): ${message}`);
  }
}

export async function sendEmail(formType: FormType, params: EmailTemplateParams) {
  const env = resolveEmailJsEnv(formType);
  let lastError: unknown;

  for (const templateId of env.templateIds) {
    try {
      await sendWithTemplate(env, templateId, params);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Email provider rejected all configured templates.");
}
