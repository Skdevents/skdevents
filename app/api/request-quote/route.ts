import { NextResponse } from 'next/server';
import { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  WidthType, AlignmentType, BorderStyle, PageBreak, VerticalAlign 
} from 'docx';
import nodemailer from 'nodemailer';

// --- ALL EXACT PRICES MAPPED FROM FRONTEND STRUCTURE ---
const PRICE_LIST: Record<string, number> = {
  // C1: Registration
  "Student Seat Number Allocation": 60000,
  "Distribution of Student Cloaks & Garlands": 60000,
  "Distribution of Guest & Parent Entrance Passes": 60000,
  "Distribution of Refreshment Tokens": 60000,
  
  // C2: Seating Arrangements
  "Sesath Holders": 15000, // Optional estimated cost
  "Student Procession (Perahara) Arrangement": 60000,
  "Award Receiving Arrangements & Time Management": 150000,
  "Student Seating Arrangement": 60000,
  "Guest & Parent Seating Arrangement": 60000,

  // C3: Event Photography
  "Fully Edited Highlight Photos": 80000,
  "Stage Photos": 80000,
  "Full & Bust Photos": 3500, 
  "Family Photos": 3500,
  "Couple Photos": 3500,
  "Group Photos": 3500,
  "Custom Themed Photo Backdrop": 35000, // 8'x12' size

  // C4: Event Videography
  "Fully Edited Event Coverage Video": 80000,
  "Fully Edited Highlight Video": 80000,
  "Fully Edited Guest Speeches": 80000,
  "Live Streaming on Facebook & YouTube": 80000,
  "Review & Testimonial Video Clips": 5500,
  "04-Hour Package": 25000, // 360 Booth
  "Full-Day Package": 45000, 
  "7'x3' Matte Flex Print University & Campus Branding Boards": 35000, // Unique Ad

  // C5: Master of Ceremony & Compere
  "Sinhala Compere": 35000, 
  "English Compere": 35000,
  "Tamil Compere": 35000,
  "Male": 0, "Female": 0, // Just selections

  // C6: Stage Arrangements
  "Oil Lamp Decoration": 90000, // Combined Stage Package
  "Podium Decoration": 90000,
  "Head Table Decoration": 90000,
  "Flower Garlands & Baskets": 90000,
  "Fresh Flowers": 0, "Artificial Flowers": 0, 
  "55' LED TV on Stage": 15000,
  "Digital Podium": 15000,
  "Welcome Panadol - Digital": 45000,
  "50’x12’": 220000, "50'X10'": 220000,
  "40’x10’": 185000, "40'X10'": 185000,
  "30’x10’": 125000, "30'X10'": 125000,
  "20’x10’": 110000, "20'X10'": 110000,

  // C7: Entertainment
  "Traditional Welcome Dance (Wes Dance)": 35000,
  "Puja Dance (Girls)": 45000,
  "Light Performance Dance": 45000,
  "Latin Dance": 45000,
  "Indian Dance Act": 45000,
  "Comedian Act": 45000,
  "Solo Dance": 45000,
  "Belly Dance": 45000,
  "Mask Dance Act": 45000,
  "Drum Orchestra": 55000,
  "Indian Doll Act with Dancers": 55000,

  // C8: Printing & Certificates
  "Promo Flag Printing": 5500,
  "Promo Flag Poles": 900,
  "University Flag": 5800,
  "Campus Flag": 5800,
  "Department Flag": 5800,

  // C9: Graduation Items
  "Black": 0, "Ash": 0, "Blue": 0, "Maroon": 0, "Red": 0,
  "Purple": 0, "Yellow": 0, "Pink": 0, "Green": 0, "Gold": 0, "Silver": 0,

  // C10: Sound & Lighting
  "Professional Sound System Setup": 150000, 
  "Dynamic Stage Lighting Setup": 150000,

  // Direct String Matches
  "Coordination | Responsibility | Arrangements | Facilitation | Administration Cost": 150000,
  "Video Shoot and Fully Edited with Tagline": 5500,
  "Review Interview Host (Female)": 35000,
  "Transport (Up & Down)": 20000,
  "Labor (Fix and Remove)": 15000,
};

const emptyLine = () => new Paragraph({ text: "" });

// Helper to create table cell easily
const createCell = (text1: string, text2: string = "", colSpan: number = 1) => {
  return new TableCell({
    columnSpan: colSpan,
    margins: { top: 200, bottom: 200, left: 200, right: 200 }, // Better spacing
    verticalAlign: VerticalAlign.CENTER,
    shading: { fill: "FAFAFA" }, // Very light gray background for a premium look
    children: [
      new Paragraph({ children: [new TextRun({ text: text1, bold: true, size: 20, color: "A40049" })] }), // SKD Primary Color
      ...(text2 ? [new Paragraph({ children: [new TextRun({ text: text2, size: 24, bold: true, color: "111827" })], spacing: { before: 80 } })] : [])
    ],
  });
};

const createTerm = (title: string, description: string) => {
  return new Paragraph({
    children: [
      new TextRun({ text: `• ${title}: `, bold: true, size: 22, color: "333333" }),
      new TextRun({ text: description, size: 22, color: "555555" })
    ],
    spacing: { after: 150, line: 300 } // Clean line height and spacing
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationDetails, generatedId, rawCart } = body;

    let subTotal = 0;

    // --- Calculate Duration ---
    let eventDuration = "N/A";
    if (organizationDetails.eventStartTime && organizationDetails.eventEndTime) {
      const start = new Date(`2000-01-01T${organizationDetails.eventStartTime}`);
      let end = new Date(`2000-01-01T${organizationDetails.eventEndTime}`);
      if (end < start) end = new Date(`2000-01-02T${organizationDetails.eventEndTime}`);
      
      const diffInMs = end.getTime() - start.getTime();
      const diffInMinutes = Math.floor(diffInMs / 60000);
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      
      eventDuration = "";
      if (hours > 0) eventDuration += `${hours} hr${hours > 1 ? 's' : ''} `;
      if (minutes > 0) eventDuration += `${minutes} min${minutes > 1 ? 's' : ''}`;
      eventDuration = eventDuration.trim();
    }

    const todayDate = new Date().toISOString().split('T')[0];

    // --- BUILD THE PRICE TABLE ---
    const tableRows = [];
    
    // Table Header (Updated to 4 Columns)
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "F3F4F6" }, width: { size: 45, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Unit Price (LKR)", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "F3F4F6" }, width: { size: 20, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Qty", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "F3F4F6" }, width: { size: 10, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Estimated Cost (LKR)", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "F3F4F6" }, width: { size: 25, type: WidthType.PERCENTAGE } }),
        ],
      })
    );

    const extraCosts = [
      { name: "Transport (Up & Down)", price: 20000 },
      { name: "Labor (Fix and Remove)", price: 15000 },
      { name: "Coordination | Administration Cost", price: 150000 }
    ];

    extraCosts.forEach(item => {
      subTotal += item.price;
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: item.name })], margins: { top: 100, bottom: 100, left: 100 } }),
            new TableCell({ children: [new Paragraph({ text: item.price.toLocaleString() + ".00", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
            new TableCell({ children: [new Paragraph({ text: "01", alignment: AlignmentType.CENTER })], margins: { top: 100, bottom: 100 } }),
            new TableCell({ children: [new Paragraph({ text: item.price.toLocaleString() + ".00", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
          ],
        })
      );
    });

    // Populate Selected Cart Items
    rawCart.forEach((cartString: string) => {
      const parts = cartString.split(": ");
      const itemName = parts.length > 1 ? parts[1].trim() : cartString.trim();
      
      let price = 0;
      
      if (PRICE_LIST[itemName] !== undefined) {
        price = PRICE_LIST[itemName];
      } else {
        const matchedKey = Object.keys(PRICE_LIST).find(key => itemName.toLowerCase().includes(key.toLowerCase()));
        if (matchedKey) price = PRICE_LIST[matchedKey];
      }
      
      subTotal += price;

      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: itemName })], margins: { top: 100, bottom: 100, left: 100 } }),
            new TableCell({ children: [new Paragraph({ text: price > 0 ? price.toLocaleString() + ".00" : "TBD", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
            new TableCell({ children: [new Paragraph({ text: "01", alignment: AlignmentType.CENTER })], margins: { top: 100, bottom: 100 } }),
            new TableCell({ children: [new Paragraph({ text: price > 0 ? price.toLocaleString() + ".00" : "TBD", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
          ],
        })
      );
    });

    const graduatesCount = parseInt(organizationDetails.graduates) || 0;
    if (graduatesCount > 0) {
      const photoCost = graduatesCount * 3500;
      subTotal += photoCost;
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Student Photo Package (Per Student)" })], margins: { top: 100, bottom: 100, left: 100 } }),
            new TableCell({ children: [new Paragraph({ text: "3,500.00", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
            new TableCell({ children: [new Paragraph({ text: graduatesCount.toString(), alignment: AlignmentType.CENTER })], margins: { top: 100, bottom: 100 } }),
            new TableCell({ children: [new Paragraph({ text: photoCost.toLocaleString() + ".00", alignment: AlignmentType.RIGHT })], margins: { top: 100, bottom: 100, right: 100 } }),
          ],
        })
      );
    }

    // --- EVENT DETAILS TABLE BUILDER ---
    const eventDetailsTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
        left: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
        right: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
        insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
      },
      rows: [
        new TableRow({
          children: [
            createCell("Event Name", organizationDetails.eventName),
            createCell(" ", " ") // Empty space
          ]
        }),
        new TableRow({
          children: [
            createCell("Event Date", organizationDetails.eventDate),
            createCell("No of Sessions", organizationDetails.sessions)
          ]
        }),
        new TableRow({
          children: [
            createCell("Event Start Time", organizationDetails.eventStartTime),
            createCell("Event End Time", organizationDetails.eventEndTime)
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              margins: { top: 150, bottom: 150, left: 200, right: 200 },
              shading: { fill: "FDF2F8" }, // Light Pink background for highlight
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Total Duration: ", size: 20, color: "A40049", bold: true }),
                    new TextRun({ text: eventDuration, size: 22, bold: true, color: "111827" })
                  ]
                })
              ]
            })
          ]
        }),
        new TableRow({
          children: [
            createCell("Event Location", organizationDetails.finalLocation, 2) // Full width
          ]
        }),
        new TableRow({
          children: [
            createCell("No of Graduates", organizationDetails.graduates),
            createCell("Total Visitors", organizationDetails.visitors)
          ]
        })
      ]
    });

    const doc = new Document({
      styles: {
        default: { document: { run: { font: "Calibri", size: 22 } } },
      },
      sections: [{
        properties: {
          page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
        },
        children: [
          // Header right aligned
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Quotation No: ${generatedId}`, bold: true }),
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `Issue Date: ${todayDate}` }),
            ]
          }),
          emptyLine(),
          
          // Recipient Details
          new Paragraph({ children: [new TextRun({ text: organizationDetails.contactPerson, bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: organizationDetails.contactDesignation })] }),
          new Paragraph({ children: [new TextRun({ text: organizationDetails.organizationName })] }),
          emptyLine(),

          // Letter Body
          new Paragraph({ text: "Dear Sir / Madam," }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "Warm greetings from SKD Event Management.", bold: true })] }),
          emptyLine(),
          new Paragraph({ text: "Thank you for the opportunity to submit our quotation for your upcoming event. We are pleased to present our proposal, tailored to meet your specific requirements and expectations." }),
          emptyLine(),
          new Paragraph({ text: "At SKD Event Management, we specialize in delivering creative, well-organized, and memorable events with attention to detail and professional execution. Our team is committed to ensuring that every aspect of your event is handled seamlessly, from planning to completion." }),
          emptyLine(),
          new Paragraph({ text: "Please find attached our detailed quotation outlining the services, packages, and pricing. We are flexible and open to customizing the proposal further to suit your preferences and budget." }),
          emptyLine(),
          new Paragraph({ text: "Should you require any clarifications or wish to discuss the proposal in detail, please feel free to contact us at your convenience. We would be delighted to assist you in making your event a success." }),
          emptyLine(),
          new Paragraph({ text: "Thank you once again for considering SKD Event Management. We look forward to working with you." }),
          emptyLine(),
          
          // Sign off 1
          new Paragraph({ text: "Thank you & Best Regards," }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "SKD Event Management (Pvt) Ltd.", bold: true })] }),
          new Paragraph({ text: "077 005 6674" }),
          new Paragraph({ text: "info@skdevents.lk" }),
          emptyLine(),
          new Paragraph({ text: "____________________________________" }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "This is a system-generated document and does not require a physical signature.", italics: true, size: 18 })] }),

          
          new Paragraph({ children: [new PageBreak()] }), // BREAK TO PAGE 2

          // ================= PAGE 2: EVENT DETAILS & QUOTATION =================
          
          new Paragraph({ children: [new TextRun({ text: "Event Details", bold: true, size: 28 })] }),
          emptyLine(),
          eventDetailsTable,
          emptyLine(),
          emptyLine(),

          new Paragraph({ children: [new TextRun({ text: "Quotation for Event Management Services", bold: true, size: 26, color: "A40049" })], alignment: AlignmentType.CENTER }),
          emptyLine(),
          new Paragraph({ text: "Thank you for the opportunity to submit our quotation for your upcoming event. Please find below our proposal tailored to your requirements.", alignment: AlignmentType.CENTER }),
          emptyLine(),

          new Paragraph({ children: [new TextRun({ text: "Price Quotation", bold: true, size: 24 })] }),
          emptyLine(),
          
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tableRows }),
          emptyLine(),

          new Paragraph({ children: [new TextRun({ text: `Sub Total: LKR ${subTotal.toLocaleString()}.00`, bold: true })], alignment: AlignmentType.RIGHT }),
          new Paragraph({ children: [new TextRun({ text: `Discount: LKR 0.00`, bold: true })], alignment: AlignmentType.RIGHT }),
          new Paragraph({ children: [new TextRun({ text: `Total: LKR ${subTotal.toLocaleString()}.00`, bold: true, size: 24, color: "A40049" })], alignment: AlignmentType.RIGHT }),
          
          new Paragraph({ children: [new PageBreak()] }), // BREAK TO PAGE 3

          // ================= PAGE 3: TERMS & PAYMENT =================
          new Paragraph({ children: [new TextRun({ text: "Summary of Key Terms & Conditions", bold: true, color: "A40049", size: 28 })] }),
          emptyLine(),
          
          createTerm("Quotation Validity", "This quotation remains valid for 14 days from the date of issue. Prices may be subject to revision beyond this period."),
          createTerm("Payment Terms", "A non-refundable advance payment of 50% is required to secure your booking. The remaining balance must be settled in full prior to the event date, unless an alternative written agreement is established."),
          createTerm("Confirmation of Services", "Please note that services, dates, and vendor availability will only be confirmed and reserved upon receipt of the advance payment."),
          createTerm("Taxes & Levies", "All applicable government taxes, including VAT where applicable, are structured in accordance with the current regulations set forth by the Inland Revenue Department of Sri Lanka."),
          createTerm("Cancellation Policy", "In the unfortunate event of a cancellation, the advance payment is non-refundable. Additional cancellation charges may apply depending on the preparation stage and financial commitments already made to third-party vendors."),
          createTerm("Changes & Variations", "We are happy to accommodate adjustments. However, any post-confirmation amendments, additions, or reductions to the initial requirements may result in necessary price revisions."),
          createTerm("Client Responsibilities", "The client is responsible for securing all necessary venue approvals, access permissions, and required government or local authority licenses (if applicable) prior to the event."),
          createTerm("Liability & Damages", "SKD Event Management exercises the highest standard of professional care. However, we shall not be held liable for indirect losses, unavoidable delays, or damages directly resulting from external third-party service providers or venue constraints."),
          createTerm("Force Majeure", "SKD Event Management shall not be held liable for service delays or non-performance caused by circumstances beyond our reasonable control. This includes, but is not limited to, natural disasters, national curfews, strikes, government restrictions, or pandemics."),
          createTerm("Governing Law", "This quotation and any subsequent agreements shall be governed by and interpreted under the laws of the Democratic Socialist Republic of Sri Lanka."),
          
          emptyLine(),
          
          // SIGN OFF
          new Paragraph({ text: "Warm regards," }),
          new Paragraph({ children: [new TextRun({ text: "Thilina Madurawala", bold: true })] }),
          new Paragraph({ text: "Event Director" }),
          new Paragraph({ children: [new TextRun({ text: "SKD Event Management (Pvt) Ltd.", bold: true })] }),
          new Paragraph({ text: "Hotline - +94 11 224 1818" }),
          new Paragraph({ text: "📞 +94 77 005 6674" }),
          new Paragraph({ text: "✉️ thilina@skdevents.lk" }),
          
          emptyLine(),
          new Paragraph({ text: "____________________________________" }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "This is a system-generated document and does not require a physical signature.", italics: true, size: 18 })] }),
          new Paragraph({ text: "____________________________________" }),
          emptyLine(),

          // PAYMENT DETAILS
          new Paragraph({ children: [new TextRun({ text: "Payment Details", bold: true, color: "A40049", size: 24 })] }),
          emptyLine(),
          new Paragraph({ text: "• Bank Name: [Insert Bank Name]" }),
          new Paragraph({ text: "• Account Name: SKD Event Management" }),
          new Paragraph({ text: "• Account Number: [Insert Account Number]" }),
          new Paragraph({ text: "• Branch: [Insert Branch]" }),

        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    // --- SEND EMAIL VIA ZOHO ---
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com', 
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL_USER,
        pass: process.env.ZOHO_EMAIL_PASS,
      },
    });

    // --- ENHANCED EMAIL BODY CONTENT ---
    const emailBodyText = `You have received a new quotation request from ${organizationDetails.organizationName}.

Event Details & Contact Information:
-----------------------------------------
Organization Name : ${organizationDetails.organizationName}
Contact Person    : ${organizationDetails.contactPerson}
Email Address     : ${organizationDetails.email}
WhatsApp Number   : ${organizationDetails.whatsappNumber}
Event Name        : ${organizationDetails.eventName}
-----------------------------------------

Attached is the fully structured Word Document. You can edit prices, add your bank details, and save it as a PDF before sending to the client.`;

    await transporter.sendMail({
      from: `"SKD Web Portal" <${process.env.ZOHO_EMAIL_USER}>`,
      to: 'info@skdevents.lk',
      subject: `New Quotation Request - ${generatedId} (${organizationDetails.organizationName})`,
      text: emailBodyText,
      attachments: [
        {
          filename: `SKD_Quotation_${generatedId}.docx`,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Quotation created and emailed successfully!' });

  } catch (error) {
    console.error("Error generating quotation:", error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}