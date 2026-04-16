export type FormType = "contact" | "project" | "affiliate";

type EmailTemplateParams = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ValidationSuccess = {
  ok: true;
  formType: FormType;
  templateParams: EmailTemplateParams;
};

type ValidationFailure = {
  ok: false;
  status: number;
  error: string;
  silentlyDrop?: boolean;
};

export type ValidationResult = ValidationSuccess | ValidationFailure;

const MIN_HUMAN_SUBMIT_MS = 1200;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r\n?/g, "\n");
}

function stripControlChars(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

function safeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  const normalized = stripTags(stripControlChars(normalizeLineBreaks(value))).trim();
  return normalized.slice(0, maxLength);
}

function safeMessage(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  const normalized = stripControlChars(normalizeLineBreaks(value)).trim();
  return normalized.slice(0, maxLength);
}

function isValidEmail(value: string) {
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  if (!value) return true;

  const normalized = value.replace(/[^\d+]/g, "");
  if (normalized.length < 7 || normalized.length > 20) return false;
  return /^\+?[0-9]{7,20}$/.test(normalized);
}

function requireField(
  value: string,
  label: string,
  min: number,
  max: number,
  status = 400
): ValidationFailure | null {
  if (!value) {
    return { ok: false, status, error: `${label} is required.` };
  }

  if (value.length < min) {
    return { ok: false, status, error: `${label} is too short.` };
  }

  if (value.length > max) {
    return { ok: false, status, error: `${label} is too long.` };
  }

  return null;
}

function validateContact(payload: Record<string, unknown>): ValidationResult {
  const name = safeText(payload.name, 80);
  const email = safeText(payload.email, 254).toLowerCase();
  const phone = safeText(payload.phone, 32);
  const topic = safeText(payload.topic, 80);
  const message = safeMessage(payload.message, 5000);

  const nameError = requireField(name, "Name", 2, 80);
  if (nameError) return nameError;

  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }

  if (!isValidPhone(phone)) {
    return { ok: false, status: 400, error: "Please enter a valid phone number." };
  }

  const messageError = requireField(message, "Message", 10, 5000);
  if (messageError) return messageError;

  return {
    ok: true,
    formType: "contact",
    templateParams: {
      name,
      email,
      phone: phone || "—",
      service: topic || "General contact",
      message,
    },
  };
}

function validateProject(payload: Record<string, unknown>): ValidationResult {
  const name = safeText(payload.name, 80);
  const email = safeText(payload.email, 254).toLowerCase();
  const phone = safeText(payload.phone, 32);
  const company = safeText(payload.company, 120);
  const service = safeText(payload.service, 120);
  const budget = safeText(payload.budget, 80);
  const timeline = safeText(payload.timeline, 80);
  const message = safeMessage(payload.message, 8000);

  const nameError = requireField(name, "Name", 2, 80);
  if (nameError) return nameError;

  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }

  if (!isValidPhone(phone)) {
    return { ok: false, status: 400, error: "Please enter a valid phone number." };
  }

  const serviceError = requireField(service, "Service", 2, 120);
  if (serviceError) return serviceError;

  const messageError = requireField(message, "Project details", 20, 8000);
  if (messageError) return messageError;

  const detail = [
    company && `Company: ${company}`,
    budget && `Budget: ${budget}`,
    timeline && `Timeline: ${timeline}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    ok: true,
    formType: "project",
    templateParams: {
      name,
      email,
      phone: phone || "—",
      service,
      message: detail,
    },
  };
}

function validateAffiliate(payload: Record<string, unknown>): ValidationResult {
  const fullName = safeText(payload.fullName, 80);
  const email = safeText(payload.email, 254).toLowerCase();
  const phone = safeText(payload.phone, 32);
  const city = safeText(payload.city, 80);
  const experience = safeText(payload.experience, 80);
  const linkedin = safeText(payload.linkedin, 160);
  const message = safeMessage(payload.message, 5000);

  const nameError = requireField(fullName, "Full name", 2, 80);
  if (nameError) return nameError;

  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }

  if (!isValidPhone(phone)) {
    return { ok: false, status: 400, error: "Please enter a valid phone number." };
  }

  const cityError = requireField(city, "City", 2, 80);
  if (cityError) return cityError;

  const messageError = requireField(message, "Notes", 10, 5000);
  if (messageError) return messageError;

  const detail = [
    "Affiliate Interest Form",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `City: ${city}`,
    `Experience: ${experience || "-"}`,
    `LinkedIn/Portfolio: ${linkedin || "-"}`,
    "",
    "Notes:",
    message,
  ].join("\n");

  return {
    ok: true,
    formType: "affiliate",
    templateParams: {
      name: fullName,
      email,
      phone,
      service: "Be a CodeAster Form",
      message: detail,
    },
  };
}

export function validateFormSubmission(payload: unknown): ValidationResult {
  const data = asRecord(payload);

  if (!data) {
    return { ok: false, status: 400, error: "Invalid request body." };
  }

  const formType = safeText(data.formType, 20).toLowerCase() as FormType;

  if (!["contact", "project", "affiliate"].includes(formType)) {
    return { ok: false, status: 400, error: "Invalid form type." };
  }

  const website = safeText(data.website, 120);
  if (website) {
    return {
      ok: false,
      status: 202,
      error: "Accepted.",
      silentlyDrop: true,
    };
  }

  const submittedAtRaw = data.submittedAt;
  if (typeof submittedAtRaw !== "number" || !Number.isFinite(submittedAtRaw)) {
    return { ok: false, status: 400, error: "Invalid submission timestamp." };
  }

  const elapsed = Date.now() - submittedAtRaw;
  if (elapsed < MIN_HUMAN_SUBMIT_MS) {
    return { ok: false, status: 400, error: "Please wait a moment and try again." };
  }

  if (formType === "contact") {
    return validateContact(data);
  }

  if (formType === "project") {
    return validateProject(data);
  }

  return validateAffiliate(data);
}
