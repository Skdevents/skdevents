import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No payment slip uploaded" }, { status: 400 });
    }

    // Image eka Base64 (text) format ekata convert kireema
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64File = buffer.toString('base64');
    
    // File eke nama hadima (Eg: SLIIT_A45_image.jpg)
    const fileName = `${formData.get("campusName")}_${formData.get("seatNo")}_${file.name}`;

    // Google Apps Script ekata yawanna data object eka hadima
    const payload = {
      fileBase64: base64File,
      mimeType: file.type,
      fileName: fileName,
      seatNo: formData.get("seatNo"),
      campusName: formData.get("campusName"),
      diplomaName: formData.get("diplomaName"),
      eventDate: formData.get("eventDate"),
      session: formData.get("session"),
      package: formData.get("package"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      surname: formData.get("surname"),
      courierAddress: formData.get("courierAddress"),
      nearestCity: formData.get("nearestCity"),
      district: formData.get("district"),
      mobile1: formData.get("mobile1"),
      mobile2: formData.get("mobile2"),
      email: formData.get("email"),
    };

    // Google Apps Script URL ekata data yawima
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL!;
    
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return NextResponse.json({ success: true, message: "Successfully submitted!" });
    
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}