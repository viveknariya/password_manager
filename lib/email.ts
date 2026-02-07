export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const ZEPTOMAIL_API_KEY = process.env.ZEPTOMAIL_API_KEY;
  const ZEPTOMAIL_FROM_ADDRESS =
    process.env.ZEPTOMAIL_FROM_ADDRESS || "noreply@zallyy.com";

  if (!ZEPTOMAIL_API_KEY) {
    throw new Error("Email configuration is incomplete.");
  }

  const endpoint = "https://api.zeptomail.in/v1.1/email";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ZEPTOMAIL_API_KEY,
      },
      body: JSON.stringify({
        from: { address: ZEPTOMAIL_FROM_ADDRESS },
        to: [{ email_address: { address: to } }],
        subject: subject,
        htmlbody: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via ZeptoMail API");
    }

    return data;
  } catch (error: unknown) {
    throw error;
  }
}
