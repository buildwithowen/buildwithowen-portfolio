import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const projectType = clean(body.projectType);
    const platform = clean(body.platform);
    const budget = clean(body.budget);
    const timeline = clean(body.timeline);
    const name = clean(body.name);
    const email = clean(body.email);
    const company = clean(body.company);
    const message = clean(body.message);

    if (!projectType || !name || !email || !message) {
      return NextResponse.json(
        {
          error:
            "Project type, name, email and project brief are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Build With Owen <onboarding@resend.dev>",
      to: ["owengenuino26@gmail.com"],
      replyTo: email,
      subject: `[NEW PROJECT] ${projectType} — ${name}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 680px;
            margin: 0 auto;
            color: #171717;
            line-height: 1.6;
          "
        >
          <h1 style="margin-bottom: 8px;">
            New Build With Owen Project
          </h1>

          <p style="color:#666;margin-top:0;">
            A new project request was submitted through buildwithowen.com
          </p>

          <hr style="margin:28px 0;" />

          <h2>Project Information</h2>

          <p>
            <strong>01 / Project Type:</strong><br />
            ${projectType}
          </p>

          <p>
            <strong>02 / Platform / Stack:</strong><br />
            ${platform || "Not specified"}
          </p>

          <p>
            <strong>03 / Budget:</strong><br />
            ${budget || "Not specified"}
          </p>

          <p>
            <strong>04 / Timeline:</strong><br />
            ${timeline || "Not specified"}
          </p>

          <hr style="margin:28px 0;" />

          <h2>Client Information</h2>

          <p>
            <strong>05 / Name:</strong><br />
            ${name}
          </p>

          <p>
            <strong>06 / Email:</strong><br />
            <a href="mailto:${email}">
              ${email}
            </a>
          </p>

          <p>
            <strong>07 / Company:</strong><br />
            ${company || "Not specified"}
          </p>

          <hr style="margin:28px 0;" />

          <h2>08 / Project Brief</h2>

          <div
            style="
              padding:18px;
              background:#f5f5f5;
              border-left:4px solid #111;
              white-space:pre-wrap;
            "
          >
            ${message}
          </div>

          <hr style="margin:28px 0;" />

          <p style="font-size:13px;color:#777;">
            Reply directly to this email to contact ${name}.
          </p>
        </div>
      `,

      text: `
NEW BUILD WITH OWEN PROJECT

01 / PROJECT TYPE
${projectType}

02 / PLATFORM / STACK
${platform || "Not specified"}

03 / BUDGET
${budget || "Not specified"}

04 / TIMELINE
${timeline || "Not specified"}

05 / NAME
${name}

06 / EMAIL
${email}

07 / COMPANY
${company || "Not specified"}

08 / PROJECT BRIEF
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Unable to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Unable to process project request." },
      { status: 500 }
    );
  }
}