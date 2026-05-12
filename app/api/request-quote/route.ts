import { NextResponse } from 'next/server';
import { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  WidthType, AlignmentType, BorderStyle, PageBreak, VerticalAlign,
  Footer
} from 'docx';
import nodemailer from 'nodemailer';

// Helper to create top table cell easily (Event Details)
const createCell = (text1: string, text2: string = "", colSpan: number = 1) => {
  return new TableCell({
    columnSpan: colSpan,
    margins: { top: 100, bottom: 100, left: 150, right: 150 }, 
    verticalAlign: VerticalAlign.CENTER,
    shading: { fill: "FAFAFA" }, 
    children: [
      new Paragraph({ children: [new TextRun({ text: text1, bold: true, size: 18, color: "A40049" })] }), // <-- size 20 ඉඳන් 18ට අඩු කළා
      ...(text2 ? [new Paragraph({ children: [new TextRun({ text: text2, size: 22, bold: true, color: "111827" })], spacing: { before: 40 } })] : []) // <-- before 80 ඉඳන් 40ට අඩු කළා, size 22 කළා
    ],
  });
};

const createHeaderCell = (text: string, widthPercent: number) => {
  return new TableCell({
    shading: { fill: "A40049" },
    margins: { top: 250, bottom: 250 }, // <-- Header එකේ උඩ/යට ඉඩ වැඩිකළා
    verticalAlign: VerticalAlign.CENTER,
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun({ text: text, bold: true, color: "FFFFFF", size: 22 })], alignment: AlignmentType.CENTER })],
  });
};

const createBodyCell = (text: string, center = false, bold = false, color = "111827", isSubItem = false) => {
  return new TableCell({
    margins: { top: isSubItem ? 80 : 220, bottom: isSubItem ? 80 : 220, left: 150, right: 150 }, 
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [new TextRun({ text: text, bold: bold, color: color, size: 20 })],
        alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT
      })
    ],
  });
};
const createTerm = (title: string, description: string) => {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `• ${title}: `, bold: true, size: 22, color: "333333" }),
      new TextRun({ text: description, size: 22, color: "555555" })
    ],
    spacing: { after: 150, line: 300 }
  });
};

const emptyLine = () => new Paragraph({ text: "" });

// --- SMART PRICING FUNCTION FOR INDIVIDUAL ITEMS ---
const getPrice = (name: string): number | "TBD" | "Included" => {
  if (name.includes("55\" LED TV")) return 15000;
  if (name.includes("Digital Podium")) return 20000;
  if (name.includes("Welcome Panadol")) return 45000;

  if (name.includes("50’x12’") || name.includes("50'X10'")) return 220000;
  if (name.includes("40’x10’") || name.includes("40'X10'")) return 185000;
  if (name.includes("30’x10’") || name.includes("30'X10'")) return 155000;
  if (name.includes("20’x10’") || name.includes("20'X10'")) return 110000;
  if (name.includes("8'x6'")) return 50000;
  if (name.includes("12'x7'")) return 65000;
  if (name.includes("15'x7'")) return 75000;
  if (name.includes("16'x10'")) return 90000;
  if (name.includes("12'x10'")) return 70000;

  if (name.includes("Guest Speeches")) return 10000;
  if (name.includes("Live Streaming")) return 20000;
  if (name.includes("Review & Testimonial Video Clips")) return 5500;
  if (name.includes("04-Hour Package")) return 25000;
  if (name.includes("Full-Day")) return 45000;
  if (name.includes("Branding Boards")) return 35000;

  if (name.includes("Compere - Male") || name.includes("Compere - Female")) return 80000;
  if (name.includes("Review & Testimonial video Host")) {
      if (name.includes("Male") || name.includes("Female")) return 45000;
  }
  if (name.includes("Compere")) return "Included"; 

  if (name.includes("Custom Themed Photo Backdrop")) return 35000;

  if (name.includes("Wes Dance")) return 35000;
  if (name.includes("Sesath")) return 15000;
  if (name.includes("Puja Dance") || name.includes("Light Performance") || name.includes("Latin Dance") || name.includes("Indian Dance") || name.includes("Comedian") || name.includes("Solo Dance") || name.includes("Belly Dance") || name.includes("Mask Dance")) return 45000;
  if (name.includes("Drum Orchestra") || name.includes("Indian Doll")) return 55000;

  if (name.includes("Promo Flag Printing")) return 5500;
  if (name.includes("University Flag") || name.includes("Campus Flag") || name.includes("Department Flag")) return 5800;
  if (name.includes("Promo Flag Poles")) return 900;

  return "TBD";
};

const CATEGORIES = [
  "Registration", "Seating Arrangements", "Event Photography", "Event Videography",
  "Master of Ceremony & Compere", "Stage Arrangements", "Entertainment",
  "Manufacturing & Printing", "Graduation Items", "Sound & Lighting Systems"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationDetails, generatedId, rawCart } = body;

    let subTotal = 0;
    let itemCounter = 1;

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

    // --- PROCESS CART INTO PACKAGES & CATEGORIES ---
    let finalItems: { category: string, desc: string, subItems: string[], price: number | "TBD" | "Included" }[] = [];

    // C1: Registration
    const regItems = rawCart.filter((i: string) => i.startsWith("Registration:"));
    if (regItems.length > 0) {
      finalItems.push({ category: "Registration", desc: "Registration Full Package", subItems: regItems.map((i: string) => i.replace("Registration: ", "")), price: 60000 });
    }

    // C2: Seating
    const seatingItems = rawCart.filter((i: string) => i.startsWith("Seating Arrangements"));
    if (seatingItems.length > 0) {
      finalItems.push({ category: "Seating Arrangements", desc: "Seating Arrangements Full Package", subItems: seatingItems.map((i: string) => i.replace("Seating Arrangements: ", "").replace("Seating Arrangements - Auditorium: ", "")), price: 60000 });
    }

    // C3: Photo
    const photoCovItems = rawCart.filter((i: string) => i.startsWith("Event Photography - Event Coverage:"));
    if (photoCovItems.length > 0) {
      finalItems.push({ category: "Event Photography", desc: "Event Coverage Package", subItems: photoCovItems.map((i: string) => i.split(": ")[1]), price: 75000 });
    }

    const photoBoothItems = rawCart.filter((i: string) => i.startsWith("Event Photography - Photobooth Coverage"));
    ["Package 1", "Package 2", "Package 3", "Package 4"].forEach(pkg => {
      if (photoBoothItems.some((i: string) => i.includes(pkg))) {
        let price = pkg === "Package 1" ? 3000 : pkg === "Package 2" ? 4000 : pkg === "Package 3" ? 4500 : 2000;
        finalItems.push({ category: "Event Photography", desc: `Photobooth Coverage - ${pkg}`, subItems: [], price });
      }
    });

    const backdrop = rawCart.find((i: string) => i.startsWith("Event Photography - Photo Backdrops:"));
    if (backdrop) finalItems.push({ category: "Event Photography", desc: "Custom Themed Photo Backdrop (8'x12')", subItems: [], price: 35000 });

    // C4: Video
    const vidCov = rawCart.filter((i: string) => i === "Event Videography: Fully Edited Event Coverage Video" || i === "Event Videography: Fully Edited Highlight Video");
    if (vidCov.length > 0) {
      finalItems.push({ category: "Event Videography", desc: "Event Videography Full Package", subItems: vidCov.map((i: string) => i.split(": ")[1]), price: 90000 });
    }

    // Duration Checks
    const isFullDay = rawCart.includes("Event Videography: Full-Day Package");
    const is4Hour = rawCart.includes("Event Videography: 04-Hour Package");

    // Separate Mirror Booth from other Video items
    const mirrorBoothItems = rawCart.filter((i: string) => i.startsWith("Event Videography - Mirror Photo Booth:"));
    const otherVid = rawCart.filter((i: string) => 
      i.startsWith("Event Videography") && 
      !vidCov.includes(i) && 
      !i.includes("Mirror Photo Booth:") && 
      !i.includes("04-Hour Package") && 
      !i.includes("Full-Day Package")
    );

    // Standard Video & Other Booths Logic
    otherVid.forEach((v: string) => {
      let name = v.split(": ")[1];
      if (v.includes(" - ")) {
          name = v.split(": ")[1]; // extract inner name if sub-category exists
      }
      
      let price: number | "TBD" | "Included" = getPrice(name); // fallback to standard prices
      
      // Booth Pricing Logic for 4 Hours
      const boothPrices4h: Record<string, number> = {
          "Standard Video Booth": 25000,
          "Advanced Video Booth": 55000,
          "7'x3' Matte Flex Print University & Campus Branding Boards": 35000,
          "Include Glam Booth": 90000,
          "Include AI Photo Booth": 75000,
          "Include iPad Photo Booth": 55000,
          "Include DSLR Photo Booth": 55000,
      };

      if (boothPrices4h[name]) {
          if (isFullDay) price = "TBD";
          else if (is4Hour) price = boothPrices4h[name];
          else price = "TBD"; // If no duration selected
      }
      if (name === "Include SLO-MO Video Booth") {
          price = "TBD";
      }

      finalItems.push({ category: "Event Videography", desc: name, subItems: [], price });
    });

    // Mirror Booth Dynamic Calculation Logic
    if (mirrorBoothItems.length > 0) {
       const hasWithoutPrint = mirrorBoothItems.some((i: string) => i.includes("Without Print"));
       const hasWithPrint = mirrorBoothItems.some((i: string) => i.includes("With Print"));
       
       if (hasWithoutPrint) {
           finalItems.push({ 
               category: "Event Videography", 
               desc: "Mirror Photo Booth - Without Print", 
               subItems: [], 
               price: isFullDay ? "TBD" : (is4Hour ? 65000 : "TBD") 
           });
       } else if (hasWithPrint) {
           // QTY එක හොයාගන්නවා
           const qtyItem = mirrorBoothItems.find((i: string) => i.includes("Print QTY"));
           let qty = 100; // Default QTY
           if (qtyItem) {
               qty = parseInt(qtyItem.split("Print QTY - ")[1]) || 100;
           }

           // FIX: තෝරපු SIZES ඔක්කොම හොයාගන්නවා (.find වෙනුවට .filter දැම්මා)
           const sizeItems = mirrorBoothItems.filter((i: string) => i.includes("Print Size"));
           
           // මොකුත්ම size එකක් තෝරලා නැත්තන් Default එක Passport විදිහට ගන්නවා
           const sizesToProcess: string[] = sizeItems.length > 0 ? sizeItems : ["Print Size - Passport - ( 2\" x 3\" )"];

           // තෝරපු හැම Size එකකටම වෙන වෙනම Line Item එකක් සහ Price එකක් හදනවා
           sizesToProcess.forEach((sizeItem: string) => { // <-- මෙතන (sizeItem: string) කියලා type එක දුන්නා
               const sizeStr = sizeItem.split("Print Size - ")[1];
               let displaySize = sizeStr;
               let sizeType = "Passport";
               
               if (sizeStr.includes("4R")) sizeType = "4R";
               else if (sizeStr.includes("6R")) sizeType = "6R";
               
               let finalPrice: number | "TBD" = "TBD";
               
               if (is4Hour && !isFullDay) {
                   if (qty === 100) {
                       if (sizeType === "Passport") finalPrice = 15000;
                       if (sizeType === "4R") finalPrice = 20000;
                       if (sizeType === "6R") finalPrice = 30000;
                   } else if (qty === 200) {
                       if (sizeType === "Passport") finalPrice = 30000;
                       if (sizeType === "4R") finalPrice = 40000;
                       if (sizeType === "6R") finalPrice = 60000;
                   } else if (qty === 500) {
                       if (sizeType === "Passport") finalPrice = 75000;
                       if (sizeType === "4R") finalPrice = 100000;
                       if (sizeType === "6R") finalPrice = 150000;
                   } else if (qty === 1000) {
                       if (sizeType === "Passport") finalPrice = 150000;
                       if (sizeType === "4R") finalPrice = 200000;
                       if (sizeType === "6R") finalPrice = 300000;
                   } else if (qty === 1500) {
                       if (sizeType === "Passport") finalPrice = 225000;
                       if (sizeType === "4R") finalPrice = 300000;
                       if (sizeType === "6R") finalPrice = 450000;
                   }
               }

               // මෙතනදී desc එකට size එකත් දානවා පැහැදිලි වෙන්න
               finalItems.push({ 
                   category: "Event Videography", 
                   desc: `Mirror Photo Booth - With Print (${sizeType})`, 
                   subItems: [`Print Quantity: ${qty}`, `Print Size: ${displaySize}`], 
                   price: finalPrice 
               });
           });
       }
    }
    // C5: MC
    const mcItems = rawCart.filter((i: string) => i.startsWith("Master of Ceremony & Compere"));
    mcItems.forEach((mc: string) => {
      const name = mc.split(": ")[1];
      finalItems.push({ category: "Master of Ceremony & Compere", desc: name, subItems: [], price: getPrice(name) });
    });

    // C6: Stage
    const stageFlowers = rawCart.filter((i: string) => i.startsWith("Stage Arrangements - Stage Flower Decorations:"));
    if (stageFlowers.length > 0) {
      const decoType = stageFlowers.find((i: string) => i.includes("Stage Decoration -"));
      const regularFlowers = stageFlowers.filter((i: string) => !i.includes("Stage Decoration -"));
      let subs = regularFlowers.map((i: string) => i.split(": ")[1]);
      if (decoType) subs.push(`Preference: ${decoType.split("- ")[1]}`);
      finalItems.push({ category: "Stage Arrangements", desc: "Stage Flower Decorations Full Package", subItems: subs, price: 99000 });
    }

    const stageLED = rawCart.filter((i: string) => i.startsWith("Stage Arrangements - LED Video Wall:"));
    stageLED.forEach((led: string) => {
      const name = led.split(": ")[1];
      if (name.includes("Custom Size")) {
        finalItems.push({ category: "Stage Arrangements", desc: name, subItems: [], price: "TBD" });
      } else {
        finalItems.push({ category: "Stage Arrangements", desc: name, subItems: [], price: getPrice(name) });
      }
    });

    // C7: Ent
    const ent = rawCart.filter((i: string) => i.startsWith("Entertainment"));
    ent.forEach((e: string) => {
      const name = e.split(": ")[1];
      finalItems.push({ category: "Entertainment", desc: name, subItems: [], price: getPrice(name) });
    });

    // C8: Print
    const printItems = rawCart.filter((i: string) => i.startsWith("Manufacturing & Printing"));
    const printGroups: Record<string, string[]> = {};
    
    // Grouping properties under main items
    printItems.forEach((p: string) => {
      if (p.includes(" - ")) {
          const subCatPart = p.split(" - ")[1]; 
          const [subCat, item] = subCatPart.split(": ");
          if (!printGroups[subCat]) printGroups[subCat] = [];
          printGroups[subCat].push(item);
      } else {
          const name = p.split(": ")[1];
          if (!printGroups["General"]) printGroups["General"] = [];
          printGroups["General"].push(name);
      }
    });

    Object.keys(printGroups).forEach(subCat => {
      printGroups[subCat].sort((a, b) => {
          if (a.includes("Promo Flag Poles")) return 1;
          if (b.includes("Promo Flag Poles")) return -1;
          return 0;
      });

      if (subCat === "General") {
          printGroups[subCat].forEach(item => {
              finalItems.push({ category: "Manufacturing & Printing", desc: item, subItems: [], price: "TBD" });
              
              if (item.includes("Promo Flag Poles")) {
                  finalItems.push({ category: "Manufacturing & Printing", desc: "Transport (Up & Down)", subItems: [], price: "TBD" });
                  finalItems.push({ category: "Manufacturing & Printing", desc: "Labor (Fix and Remove)", subItems: [], price: "TBD" });
              }
          });
      } else {
          const mainItems = printGroups[subCat].filter(i => !i.includes("Colors -") && !i.includes("Material -"));
          const props = printGroups[subCat].filter(i => i.includes("Colors -") || i.includes("Material -"));
          
          if (mainItems.length > 0) {
              mainItems.forEach(mainItem => {
                  finalItems.push({ 
                      category: "Manufacturing & Printing", 
                      desc: `${subCat} - ${mainItem}`, 
                      subItems: props, 
                      price: "TBD" 
                  });
                  
                  if (mainItem.includes("Promo Flag Poles")) {
                      finalItems.push({ category: "Manufacturing & Printing", desc: "Transport (Up & Down)", subItems: [], price: "TBD" });
                      finalItems.push({ category: "Manufacturing & Printing", desc: "Labor (Fix and Remove)", subItems: [], price: "TBD" });
                  }
              });
          } else {
             props.forEach(prop => {
                 finalItems.push({ category: "Manufacturing & Printing", desc: `${subCat}: ${prop}`, subItems: [], price: "TBD" });
             });
          }
      }
    });

    // C9: Grad
    const grad = rawCart.filter((i: string) => i.startsWith("Graduation Items"));
    if (grad.length > 0) {
      finalItems.push({ category: "Graduation Items", desc: "Graduation Cloaks & Items", subItems: grad.map((i: string) => i.split(": ")[1]), price: "TBD" });
    }

    // C10: Sound
    const sound = rawCart.filter((i: string) => i.startsWith("Sound & Lighting Systems"));
    sound.forEach((s: string) => {
      const name = s.split(": ")[1];
      finalItems.push({ category: "Sound & Lighting Systems", desc: name, subItems: [], price: "TBD" });
    });

    // --- BUILD THE QUOTATION TABLE ROWS ---
    const tableRows = [];
    
    // Main Header Row
    tableRows.push(
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("No", 5),
          createHeaderCell("Description", 45),
          createHeaderCell("Qty", 10),
          createHeaderCell("Unit Price (LKR)", 20),
          createHeaderCell("Total (LKR)", 20),
        ],
      })
    );

    CATEGORIES.forEach(cat => {
      const itemsInCat = finalItems.filter(i => i.category === cat);
      if (itemsInCat.length > 0) {
        
        // Category Highlight Header Row
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 5,
                shading: { fill: "FCE7F3" }, // Soft Pink Brand Background
                margins: { top: 350, bottom: 350, left: 200 }, // <-- Category එක ලොකුවට පෙන්නන්න margin වැඩිකළා
                children: [new Paragraph({ children: [new TextRun({ text: cat, bold: true, color: "A40049", size: 24 })] })]
              })
            ]
          })
        );

        itemsInCat.forEach(item => {
          let priceDisplay = "TBD";
          if (typeof item.price === "number") {
             priceDisplay = item.price.toLocaleString() + ".00";
             subTotal += item.price;
          } else if (item.price === "Included") {
             priceDisplay = "Included";
          }

          tableRows.push(
            new TableRow({
              children: [
                createBodyCell(itemCounter.toString().padStart(2, '0'), true, true),
                createBodyCell(item.desc, false, true),
                createBodyCell("01", true, false),
                createBodyCell(priceDisplay, true, false),
                createBodyCell(priceDisplay, true, true),
              ]
            })
          );
          itemCounter++;

          if (item.subItems && item.subItems.length > 0) {
            item.subItems.forEach(sub => {
              tableRows.push(
                new TableRow({
                  children: [
                    createBodyCell("", false, false, "111827", true), // <-- isSubItem = true කරා
                    createBodyCell(`•  ${sub}`, false, false, "555555", true), // <-- isSubItem = true කරා
                    createBodyCell("", false, false, "111827", true),
                    createBodyCell("", false, false, "111827", true),
                    createBodyCell("", false, false, "111827", true),
                 ]
                })
              );
            });
          }
        });
      } 
    }); 

    // Add Additional Costs at the End
    const extraCosts = [
      { name: "SKD EVENT MANAGEMENT FEE [ Coordination | Responsibility | Arrangements | Facilitation | Administration Cost ]", price: 150000 }
    ];

    if (extraCosts.length > 0 && finalItems.length > 0) {
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 5,
                shading: { fill: "F3F4F6" },
                margins: { top: 350, bottom: 350, left: 200 }, 
                children: [new Paragraph({ children: [new TextRun({ text: "Additional Requirements", bold: true, size: 22, color: "111827" })] })]
              })
            ]
          })
        );
        extraCosts.forEach(ext => {
             subTotal += ext.price;
             tableRows.push(
                 new TableRow({
                   children: [
                     createBodyCell(itemCounter.toString().padStart(2, '0'), true, true),
                     createBodyCell(ext.name, false, true),
                     createBodyCell("01", true, false),
                     createBodyCell(ext.price.toLocaleString() + ".00", true, false),
                     createBodyCell(ext.price.toLocaleString() + ".00", true, true),
                   ]
                 })
               );
             itemCounter++;
        });
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
            createCell("Event Location", organizationDetails.finalLocation) // <-- හිස්ව තිබ්බ තැනට Event Location එක ගෙනාවා
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
              margins: { top: 125, bottom: 125, left: 175, right: 175 }, // <-- meke margins th ganata haduwa
              shading: { fill: "FDF2F8" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Total Duration: ", size: 19, color: "A40049", bold: true }),
                    new TextRun({ text: eventDuration, size: 23, bold: true, color: "111827" })
                  ]
                })
              ]
            })
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

    const createBottomFooter = () => {
      return new Footer({
        children: [
          new Paragraph({ 
            children: [new TextRun({ text: "This is a system-generated document and does not require a physical signature.", italics: true, size: 18 })],
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: "A0A0A0", space: 10 } }, // Page eke yatama A4 Line border eka demma
            alignment: AlignmentType.CENTER
          })
        ]
      });
    };

    const doc = new Document({
      styles: {
        default: { document: { run: { font: "Calibri", size: 22 } } },
      },
      sections: [{
        properties: {
          page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
          titlePage: true, // Title page kiyala demma meken footer first page ekata witharak set wenawa
        },
        footers: {
            default: new Footer({ children: [] }), // Page 2 ekata footer na empty demma
            first: createBottomFooter(), // Page 1 ekata special footer eka dammama
        },
        children: [
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
          
          new Paragraph({ children: [new TextRun({ text: organizationDetails.contactPerson, bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: organizationDetails.contactDesignation })] }),
          new Paragraph({ children: [new TextRun({ text: organizationDetails.organizationName })] }),
          emptyLine(),
          // Letter Body
          new Paragraph({ text: "Dear Sir / Madam," }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "Warm greetings from SKD Event Management.", bold: true })] }),
          emptyLine(),
          new Paragraph({ 
            text: "Thank you for the opportunity to submit our quotation for your upcoming event. We are pleased to present our proposal, carefully tailored to meet your specific requirements and expectations.", 
            alignment: AlignmentType.JUSTIFIED 
          }),
          emptyLine(),
          new Paragraph({ 
            text: "At SKD Event Management, we specialize in delivering creative, well-organized, and memorable events with meticulous attention to detail and professional execution. Our team is fully committed to ensuring that every aspect of your event is handled seamlessly, from initial planning to final completion.", 
            alignment: AlignmentType.JUSTIFIED 
          }),
          emptyLine(),
          new Paragraph({ 
            text: "Please find our detailed quotation outlining the services, packages, and pricing below. We remain flexible and open to customizing this proposal further to perfectly suit your preferences and budget.", 
            alignment: AlignmentType.JUSTIFIED 
          }),
          emptyLine(),
          new Paragraph({ 
            text: "Should you require any further clarifications or wish to discuss this proposal in more detail, please feel free to contact us at your convenience. We would be absolutely delighted to assist you in making your event a resounding success.", 
            alignment: AlignmentType.JUSTIFIED 
          }),
          emptyLine(),
          new Paragraph({ 
            text: "Thank you once again for considering SKD Event Management. We sincerely look forward to the prospect of working with you.", 
            alignment: AlignmentType.JUSTIFIED 
          }),
          emptyLine(),
          
          new Paragraph({ text: "Thank You & Best Regards," }), 
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "Thilina Madurawala", bold: true })] }),
          new Paragraph({ text: "MBA (UK)" }),
          new Paragraph({ children: [new TextRun({ text: "Director | Events", bold: true })] }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "SKD Event Management (Pvt) Ltd.", bold: true })] }),

          // Dynamic TabStop with perfectly aligned separators '-'
          ...["Hotline", "Office", "Mobile", "Website", "Email"].map(key => {
            let value = key === "Hotline" ? "+94 701 22 33 22" : key === "Office" ? "+94 112 24 18 18" : key === "Mobile" ? "+94 770 05 66 74" : key === "Website" ? "www.skdevents.lk" : "info@skdevents.lk";
            return new Paragraph({
              children: [
                new TextRun({ text: key, size: 20 }),
                new TextRun({ text: "\t-\t", size: 20 }),
                new TextRun({ text: value, size: 20 }),
              ],
              tabStops: [{ type: "left", position: 1440 * 1.3 }], // Kelin wenna TabStop demma (1.3 inches yatata set kala)
            });
          }),
          emptyLine(),

          new Paragraph({ children: [new PageBreak()] }), // PAGE 2

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
          
          new Table({ 
            width: { size: 100, type: WidthType.PERCENTAGE }, 
            rows: tableRows,
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
              insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
            }
          }),
          emptyLine(),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 60, type: WidthType.PERCENTAGE }, children: [] }),
                  new TableCell({ 
                    width: { size: 20, type: WidthType.PERCENTAGE }, 
                    margins: { top: 150, bottom: 100 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: "Sub Total :", bold: true, color: "555555" })], alignment: AlignmentType.RIGHT })] 
                  }),
                  new TableCell({ 
                    width: { size: 20, type: WidthType.PERCENTAGE }, 
                    margins: { top: 150, bottom: 100, right: 100 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: `LKR ${subTotal.toLocaleString()}.00`, bold: true, color: "111827" })], alignment: AlignmentType.RIGHT })] 
                  }),
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [] }),
                  new TableCell({ 
                    margins: { top: 100, bottom: 150 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: "Discount :", bold: true, color: "555555" })], alignment: AlignmentType.RIGHT })] 
                  }),
                  new TableCell({ 
                    margins: { top: 100, bottom: 150, right: 100 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: "LKR 0.00", bold: true, color: "111827" })], alignment: AlignmentType.RIGHT })] 
                  }),
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [] }),
                  new TableCell({ 
                    shading: { fill: "F3F4F6" }, // ලා අළු පාට Background
                    borders: { left: { style: BorderStyle.SINGLE, size: 36, color: "A40049" } }, // වම් පැත්තේ ලොකු තද රෝස ඉර
                    margins: { top: 200, bottom: 200, left: 100 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: "Net Total :", bold: true, size: 26, color: "111827" })], alignment: AlignmentType.RIGHT })] 
                  }),
                  new TableCell({ 
                    shading: { fill: "F3F4F6" },
                    margins: { top: 200, bottom: 200, right: 100 }, 
                    children: [new Paragraph({ children: [new TextRun({ text: `LKR ${subTotal.toLocaleString()}.00`, bold: true, size: 26, color: "A40049" })], alignment: AlignmentType.RIGHT })] 
                  }),
                ]
              })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }), // PAGE 3

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
          
          new Paragraph({ text: "Warm regards," }),
          new Paragraph({ children: [new TextRun({ text: "Thilina Madurawala", bold: true })] }),
          new Paragraph({ text: "MBA (UK)" }),
          new Paragraph({ children: [new TextRun({ text: "Director | Events", bold: true })] }),
          emptyLine(),
          new Paragraph({ children: [new TextRun({ text: "SKD Event Management (Pvt) Ltd.", bold: true })] }),
          new Paragraph({ text: "Mobile\t-\t+94 770 05 66 74" }),
          new Paragraph({ text: "Email\t-\tthilina@skdevents.lk" }),
          emptyLine(),
          emptyLine(),
          new Paragraph({ 
            children: [new TextRun({ text: "This is a system-generated document and does not require a physical signature.", italics: true, size: 18 })],
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: "A0A0A0", space: 10 } }
          }),
          emptyLine(),

          new Paragraph({ children: [new TextRun({ text: "Payment Details", bold: true, color: "A40049", size: 24 })] }),emptyLine(),
          new Paragraph({ text: "• Bank Name: [Insert Bank Name]" }),
          new Paragraph({ text: "• Account Name: SKD Event Management" }),
          new Paragraph({ text: "• Account Number: [Insert Account Number]" }),
          new Paragraph({ text: "• Branch: [Insert Branch]" }),

        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com', 
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL_USER,
        pass: process.env.ZOHO_EMAIL_PASS,
      },
    });

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