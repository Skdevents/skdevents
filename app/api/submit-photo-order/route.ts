import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get('paymentSlip') as File;
    let fileInfo = 'No File Attached';

    if (file) {
      fileInfo = `File: ${file.name} (Uploaded safely via UI)`;
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
      paymentSlipUrl: fileInfo
    };

    const response = await fetch(GOOGLE_SCRIPT_URL as string, {
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