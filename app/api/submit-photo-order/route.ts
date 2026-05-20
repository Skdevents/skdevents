import { NextResponse } from 'next/server';

// Oya Step 3 eken gaththa Google Apps Script Web App URL eka methana danna
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWtxlvXMjaRXeydVmWYjx3QEytV9dFyfAn4Wz1uNY87KiJFZjU8ouMrj3HZzoU9xjisw/exec'; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // File eka base64 walata convert karanawa
    const file = formData.get('paymentSlip') as File;
    let fileUrl = 'No File';

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString('base64');
      
      // Pro tip: Image hosting ekakata (ImgBB API / Cloudinary API) base64 eka yawala 
      // return eken ena URL eka ganna eka thama hodama wede.
      // Eka karanna simple ImgBB API key ekak free aran danna (Standard for production)
      // Mema code block eken kare temporary ImgBB call ekak. (Oyage API Key eka danna).
      
      /* const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
        method: 'POST',
        body: new URLSearchParams({ image: base64Image }),
      });
      const imgBBData = await imgBBResponse.json();
      fileUrl = imgBBData.data.url;
      */
      
      // Danata api eka base64 widiyatama sheet ekata yawanna hadanne nam:
      // (Note: Base64 string eka loku wadi unoth sheet eka lag wenna puluwan. ImgBB / Vercel Blob pawichi karanna).
      fileUrl = "Image uploaded via backend"; // Replace with Cloudinary/ImgBB URL in production
    }

    const payload = {
      seatNo: formData.get('seatNo'),
      institute: formData.get('instituteDropdown') === 'Other' ? formData.get('otherInstitute') : formData.get('instituteDropdown'),
      eventDate: formData.get('eventDate'),
      session: formData.get('session'),
      package: formData.get('selectedPackage'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      district: formData.get('district'),
      mobile1: formData.get('mobile1'),
      mobile2: formData.get('mobile2'),
      email: formData.get('email'),
      paymentSlipUrl: fileUrl 
    };

    // Google Apps Script ekata POST request eka yawima
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }

  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}