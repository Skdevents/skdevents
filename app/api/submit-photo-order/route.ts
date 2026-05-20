import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOx5giZdp1ptIkgBU-oUoD7R-XNX8JhGgOyWMndJmSOusm8KqUo8vHqxHCeBdDHC5g5g/exec';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('paymentSlip') as File;
    let fileBase64 = '';
    let fileName = '';
    let fileType = '';

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fileBase64 = buffer.toString('base64');
      fileName = file.name;
      fileType = file.type;
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
      fileBase64: fileBase64,  
      fileName: fileName,
      fileType: fileType
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    
    try {
      const result = JSON.parse(textResponse);
      if (result.status === 'success') {
        return NextResponse.json({ success: true });
      } else {
        console.error('Apps Script Error:', result.error);
        return NextResponse.json({ success: false, error: result.error }, { status: 500 });
      }
    } catch (e) {
      console.error('Google Server Error (Not JSON):', textResponse);
      return NextResponse.json({ success: false, error: 'Google Server Error' }, { status: 500 });
    }

  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}