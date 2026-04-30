// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Zoho SMTP Transporter setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL_USER,
        pass: process.env.ZOHO_EMAIL_PASS,
      },
    });

    // Modern, Clean, White Theme HTML Email Template
    const htmlEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
          .wrapper { width: 100%; background-color: #ffffff; padding: 20px 10px; box-sizing: border-box; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0; }
          .header { background: linear-gradient(135deg, #a40049 0%, #4d002c 100%); padding: 35px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1.5px; color: #ffffff; }
          .header p { margin: 8px 0 0 0; font-size: 13px; opacity: 0.9; color: #ffffff; font-weight: 500; }
          .content { padding: 35px 25px; }
          .field { margin-bottom: 22px; }
          .label { font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: bold; letter-spacing: 1px; margin-bottom: 6px; display: block; }
          .value { font-size: 15px; color: #1f2937; background-color: #ffffff; padding: 14px 16px; border-radius: 10px; border: 1px solid #f3f4f6; border-left: 4px solid #a40049; margin: 0; white-space: pre-wrap; word-break: break-word; line-height: 1.5; }
          .value a { color: #a40049; text-decoration: none; font-weight: 600; }
          .footer { background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>NEW INQUIRY RECEIVED</h1>
              <p>SKD Event Management Portal</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Full Name</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <span class="label">Contact Number</span>
                <div class="value">${phone || 'Not Provided'}</div>
              </div>
              <div class="field">
                <span class="label">Subject / Company</span>
                <div class="value">${subject || 'Not Provided'}</div>
              </div>
              <div class="field">
                <span class="label">Message</span>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email generated from the SKD Events Contact Form.</p>
              <p>&copy; ${new Date().getFullYear()} SKD Event Management. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"SKD Web Portal" <${process.env.ZOHO_EMAIL_USER}>`,
      to: 'info@skdevents.lk', // Receiving email address
      replyTo: email, // Direct reply to the user who filled the form
      subject: `New Contact Inquiry: ${subject ? subject : 'General Inquiry'} - from ${name}`,
      html: htmlEmailTemplate,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}