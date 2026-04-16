export const CONTACT_EMAIL = "codeasters@gmail.com";
export const CONTACT_WHATSAPP_PHONE = "919888069497";
export const CONTACT_WHATSAPP_DISPLAY = "+91 98880 69497";
export const DEFAULT_WHATSAPP_MESSAGE = "Hi I want to start a project";

export function buildWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  phoneNumber: string = CONTACT_WHATSAPP_PHONE
) {
  const trimmedMessage = message.trim();

  return trimmedMessage
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(trimmedMessage)}`
    : `https://wa.me/${phoneNumber}`;
}
