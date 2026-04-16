type EmailTemplateParams = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendEmail(params: EmailTemplateParams) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_CONTACT;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Email service configuration is missing.");
  }

  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: params,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email provider rejected request (${response.status}): ${message}`);
  }
}
