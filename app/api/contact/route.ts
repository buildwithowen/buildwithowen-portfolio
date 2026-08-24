import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, company, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Build With Owen <onboarding@resend.dev>",
      to: ["owengenuino26@gmail.com"],
      replyTo: email,
      subject: `New portfolio enquiry from ${name}`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
          <h2>New Build With Owen enquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Budget:</strong> ${budget || "Not provided"}</p>

          <hr />

          <p><strong>Project details:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 }
    );
  }
}