"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, Rows3, Camera, Video, Mic, LayoutTemplate, 
  Music, Speaker, Printer, GraduationCap, Plus, Check, ShoppingBag, Send, ExternalLink, Trash2, CheckCircle2,
  ChevronDown, Info 
} from "lucide-react";
import WhatsAppModal from "./WhatsAppModal"; 

const boothDetails: Record<string, any> = {
  "Glam Bot Video Booth": {
    desc: "Our Bot Video Booth captures studio-quality photos and trendy slow-motion videos with professional lighting, luxury filters, and instant sharing options — giving every guest a red-carpet experience.",
    features: ["HD photo & video capture", "Luxury black & white glam effect", "Instant digital sharing", "Custom event branding", "Professional lighting setup", "Fun props & guest interaction", "Unlimited sessions during booking time"]
  },
  "AI Photo Booth": {
    desc: "Our AI-powered booth transforms guests into creative, cinematic, and themed digital portraits instantly using advanced artificial intelligence effects. From luxury magazine covers to fantasy, superhero, graduation, royal, or movie-style transformations the possibilities are endless.",
    features: ["Instant AI-generated portraits", "Multiple creative themes & styles", "Custom event branding", "High-quality digital outputs", "Instant sharing via QR or email", "Interactive guest experience", "Fast processing with live preview"]
  },
  "360 Video Booth": {
    desc: "Our 360 booth captures stunning slow-motion videos from every angle using a rotating camera platform, creating cinematic, social-media-ready content instantly. Guests can pose, dance, and celebrate while the camera spins around them to create high-impact videos with music, effects, and custom branding.",
    features: ["360° slow-motion video capture", "Instant social media sharing", "Custom overlays & branding", "Professional lighting setup", "Fun props & interactive experience", "HD cinematic quality", "Music & visual effects integration"]
  },
  "Instant iPad Photo Booth": {
    desc: "Create fun, instant memories with the Instant iPad Photo Booth. Our modern iPad Photo Booth offers a sleek and interactive experience where guests can capture photos, boomerangs, GIFs, and short videos instantly with professional lighting and live preview features. (Rs. 55,000/-)",
    features: ["Instant photo capture", "GIF & boomerang support", "Touchscreen iPad interface", "Instant sharing via QR, email, or AirDrop", "Custom photo templates & branding", "Professional LED lighting", "Compact and stylish setup"]
  },
  "Instant Sharing DSLR Photo Booth": {
    desc: "Capture professional-quality memories instantly with the Instant Sharing DSLR Photo Booth. Powered by a high-resolution DSLR camera and professional studio lighting, our photo booth delivers sharp, vibrant, and premium-quality photos with instant digital sharing for every guest. (Rs. 55,000/-)",
    features: ["Professional DSLR camera quality", "Instant photo sharing via QR, email, or AirDrop", "Studio lighting for premium results", "Custom photo templates & event branding", "Live preview display", "Unlimited photo sessions", "Fast and interactive guest experience"]
  },
  "Mirror Photo Booth": {
    desc: "Add elegance and excitement to your event with the Mirror Photo Booth. Our interactive full-length mirror booth combines a stylish mirror display with a professional photo experience, allowing guests to take stunning photos through a fun touchscreen interface with animations, voice guidance, and instant sharing.",
    features: ["Interactive touchscreen mirror display", "DSLR-quality photo capture", "Instant photo sharing", "Animated effects & voice guidance", "Custom photo templates & branding", "Signature & emoji feature", "Professional lighting setup", "Elegant premium design"]
  },
  "SLO-MO Video Booth": {
    desc: "Capture cinematic slow-motion moments with fun poses, props, music, and instant sharing — perfect for weddings, parties, and corporate events. A SLO-MO Video Booth is an interactive event booth that records short high-frame-rate videos and plays them back in dramatic slow motion.",
    features: ["Slow-motion HD/4K recording", "Instant replay", "Music & visual effects", "Props and themed setup", "Instant sharing via QR / WhatsApp / Email", "Branding options for events and companies"]
  },
  "Dronegraphy Video": {
    desc: "Professional aerial video coverage using high-quality drones to capture cinematic views of your event, venue, crowd, and special moments from the sky. Ideal for convocations, weddings, concerts, exhibitions, and corporate events.",
    features: [
      "HD / 4K aerial video coverage", 
      "Dynamic cinematic shots", 
      "Venue overview and crowd coverage", 
      "Highlight reel footage", 
      "Safe and licensed drone operation", 
      "Suitable for day and evening events"
    ]
  },
  "FLOWER DROPPING DRONES": {
    desc: "Create a grand and unforgettable celebration moment with aerial flower showers from professional drones. We provide 30KG (Medium-scale) and heavy-capacity 100KG drones, along with specialized 20KG and 30KG fresh flower bags for a premium visual experience.",
    features: [
      "Carries 30KG or 100KG flower loads", 
      "Smooth aerial flower dropping effects", 
      "Perfect for VIP welcomes, graduations, and stage entrances", 
      "Premium visual experience for stadiums and large gatherings", 
      "Safe flight operation by trained pilots and professional crew", 
      "Suitable for indoor/outdoor large venues",
      "Fresh flower petals prepared for large-scale displays"
    ]
  },
  "LED SCREEN DRONE DISPLAYS": {
    desc: "Advanced aerial LED display system that carries giant LED screens in the sky for branding, live display, and audience engagement. Available in 18FT and massive 30FT Large Sri Lankan LED Screen options (1 Time Fly).",
    features: [
      "18FT or massive 30FT aerial LED screen displays", 
      "High-visibility aerial advertising & live branding", 
      "Ideal for national events, mega functions, and sponsor branding", 
      "Unique attraction for night events", 
      "High brightness for long-distance visibility", 
      "One-time fly display operation included", 
      "Professional technical and flight crew included"
    ]
  },
  "Mace bearer / Sergeant-at-Arms": {
    desc: "Leads the official academic procession carrying the ceremonial mace representing the institutional authority and dignity as a symbol of academic tradition.",
    features: [
      "Professional Sergeant-at-Arms Costume", 
      "Carrying of the Ceremonial Mace", 
      "Dignified procession leadership", 
      "Enhances traditional academic protocols"
    ]
  },
  "Student’s Photo Package": {
    name: "Student Photography Packages", 
    desc: "Capture your graduation memories with our professionally curated photography packages. From individual stage moments to family and group portraits, each package is designed to preserve your special achievement with high-quality prints and digital memories tailored to your preference.",
    features: [
      "Individual stage moments photography",
      "Family and group portraits",
      "High-quality print outputs",
      "Digital copies of your memories"
    ]
  },
  "Stage Management & Ceremony Flow": {
    desc: "This covers the coordination of award presentation, graduand movement, announcements, and timing. It includes cue control, procession order, and ensuring the Chancellor/VIP sequence runs exactly as per script.",
    features: ["Award presentation coordination", "Graduand movement control", "VIP sequence scripting", "Cue control & timing"]
  },
  "Seating Management": {
    desc: "Proper allocation of seating blocks for graduates, faculty, parents, and dignitaries. This also includes reserved seating, row control, and late-entry handling.",
    features: ["VIP & parent seating allocation", "Reserved seating management", "Row control", "Late-entry handling"]
  },
  "Procession & Line-Up Control": {
    desc: "Managing the graduation procession from holding areas to the stage. This ensures students are lined up in correct order, properly briefed, and moved at the right cue.",
    features: ["Holding area coordination", "Correct order line-up", "Student briefing", "Cue-based movement"]
  },
  "Ushering & Guidance Team": {
    desc: "Ushers guide guests to seats, assist graduates, and maintain order. They also handle directional flow (entry/exit routes, stage access, restrooms).",
    features: ["Guest seating assistance", "Directional flow control", "Stage access management", "Order maintenance"]
  },
  "Registration & Entry Control": {
    desc: "Verification of graduates and guests at entry points, ticket checking, QR scanning (if used), and distribution of seat numbers or badges.",
    features: ["Graduate & guest verification", "Ticket & QR scanning", "Badge distribution", "Entry point control"]
  },
  "Queue & Holding Area Management": {
    desc: "Controlling waiting areas for graduates before stage entry. This prevents congestion and ensures smooth batching of students.",
    features: ["Waiting area management", "Congestion prevention", "Smooth student batching", "Pre-stage grouping"]
  },
  "Security & Access Control": {
    desc: "Ensuring only authorized persons enter restricted zones like stage backstage, VIP lounge, and procession corridors.",
    features: ["Restricted zone monitoring", "Backstage & VIP security", "Procession corridor control", "Unauthorized entry prevention"]
  },
  "Backstage Coordination": {
    desc: "Managing gowns, caps, certificate arrangement, name verification, and ensuring each graduate is ready before stepping onto stage.",
    features: ["Gown & cap management", "Certificate arrangement", "Name verification", "Stage-readiness checks"]
  },
  "Communication System (Floor Control)": {
    desc: "Use of walkie-talkies, cue sheets, and floor managers to coordinate timing between stage, ushers, and registration teams.",
    features: ["Walkie-talkie coordination", "Cue sheet execution", "Cross-team synchronization", "Real-time floor management"]
  },
  "Emergency & Crowd Control": {
    desc: "Preparedness for medical situations, crowd surges, or disruptions with clear exit routes and response roles.",
    features: ["Medical situation readiness", "Crowd surge control", "Clear exit route management", "Rapid response protocols"]
  },
  "Main Gate Security": {
    desc: "Zone A: Responsible for controlling venue entry points and ensuring only authorized individuals access the premises.",
    features: [
      "Controls entry points of the venue",
      "Ticket / ID / QR verification support",
      "Prevents unauthorized entry",
      "Handles basic screening (bags, passes)"
    ]
  },
  "Crowd Control Bouncers": {
    desc: "Zone B: Focused on managing audience movement inside the hall and preventing any overcrowding or congestion.",
    features: [
      "Manage audience movement inside hall",
      "Prevent overcrowding and pushing",
      "Maintain aisle and emergency lane clearance",
      "Support ushers during peak entry/exit times"
    ]
  },
  "VIP & Protocol Security": {
    desc: "Zone C: Dedicated to protecting dignitaries and managing VIP movement routes strictly according to protocol.",
    features: [
      "Protects Chancellor, Vice Chancellor, dignitaries",
      "Manages VIP movement routes",
      "Ensures protocol discipline around VIP seating area",
      "Prevents unauthorized access to VIP zones"
    ]
  },
  "Stage Security / Front-of-Stage Guards": {
    desc: "Zone D: Controls access to the stage and maintains strict order during the award presentation sequence.",
    features: [
      "Controls access to stage stairs and wings",
      "Keeps order during award presentation",
      "Ensures graduates enter and exit in sequence",
      "Stops unauthorized stage climbing or interruptions"
    ]
  },
  "Backstage Security": {
    desc: "Zone E: Secures the green room and holding areas, ensuring only authorized personnel and graduates are present.",
    features: [
      "Controls green room and waiting area access",
      "Allows only authorized staff, graduates, and officials",
      "Protects certificates, robes, and valuables",
      "Maintains discipline in holding areas"
    ]
  },
  "Perimeter / External Security": {
    desc: "Zone F: Guards the venue boundaries and assists with parking area safety and external traffic flow.",
    features: [
      "Guards outside venue boundary",
      "Manages parking area safety and traffic flow support",
      "Prevents gate-crashing or external disturbances",
      "Monitors surrounding environment"
    ]
  },
  "Escort & Movement Security": {
    desc: "Zone G: Provides safe escort for VIPs and awardees, guiding them flawlessly between assigned zones.",
    features: [
      "Escorts VIPs, awardees, or important documents",
      "Guides safe movement between zones",
      "Supports procession control with floor managers",
      "Ensures no deviation from assigned routes"
    ]
  },
  "Emergency Response Security": {
    desc: "Zone H: Specially trained personnel ready to handle medical situations, disruptions, and coordinate evacuations.",
    features: [
      "Handles medical emergencies, fire alerts, or disturbances",
      "Coordinates evacuation routes",
      "Supports first-aid team and police if required",
      "Maintains calm during unexpected incidents"
    ]
  }
};

const structuredServices = [
  {
    id: "C1", category: "Registration", icon: ClipboardCheck,
    desc: "Efficient check-in system ensuring smooth graduate and guest processing.",
    hideSelectAll: true,
    items: [
      "Student Seat Number Allocation and Registration", 
      "Distribution of Guest & Parent Entrance Passes", 
      "Distribution of Refreshment Tokens", 
      "Distribution of Student Cloaks & Garlands"
    ]
  },
  {
    id: "C2", category: "Seating Arrangements", icon: Rows3,
    desc: "Precision seating plans for a dignified, organized ceremony flow.",
    hideSelectAll: true,
    items: [
      "Student Procession (Perahara) Arrangement", 
      "Award Receiving Arrangements & Time Management"
    ],
    subCategories: [
      { 
        name: "Auditorium", 
        items: [
          "Student Seating Arrangement", 
          "Guest & Parent Seating Arrangement"
        ] 
      },
      {
        name: "Mace bearer | Sergeant-at-Arms",
        items: ["Mace bearer | Sergeant-at-Arms (With Costume)"]
      }
    ]
  },
  {
    id: "C3", category: "Event Photography", icon: Camera,
    desc: "Expert photography capturing key moments with professional quality and emotion.",
    hideSelectAll: true,
    subCategories: [
      { name: "Event Photography Coverage", items: ["Fully Edited Highlight Photos", "Group Photo - 16”x24”"] },
      { 
        name: "Student’s Photo Package", 
        packages: [
          {
            id: "P1", name: "Package 1",
            features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”"]
          },
          {
            id: "P2", name: "Package 2",
            features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x15”"]
          },
          {
            id: "P3", name: "Package 3",
            features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x15”", "Group Photo - Soft Copy - 12”x18”"]
          },
          {
            id: "P4", name: "Package 4",
            features: ["Customized Selection (Build your own)"],
            isCustom: true
          }
        ],
       nestedGroups: [
         {
           title: "Select Photo Options",
           desc: "You got Package 4. Please select your preferred options below.",
           dependsOn: "Package 4",
           hideTitleInPill: true,
           options: [
             "Stage Photo - 12”x15”",
             "Full Photo - 12”x18” | Bust Photo 12”x15”",
             "Family Photo - 12”x15”",
             "Couple Photo - 12”x15”",
             "Group Photo - Soft Copy - 12”x18”"
           ]
         }
       ]
      },
      { 
        name: "Photo Backdrops", 
        desc: "8'x12' Flex matte print with red Carpet",
        nestedGroups: [
          {
            title: "Quantity",
            hideTitleInPill: true,
            hasCounters: true,
            counterLimits: { "Custom Themed Photo Backdrop | Selfie Background": 10 },
            options: ["Custom Themed Photo Backdrop | Selfie Background"]
          }
        ]
      },
      { isSectionHeader: true, title: "Photo Booths", iconName: "Camera" },
      {
        name: "Photo Booth Duration",
        nestedGroups: [
          {
            title: "Booth Duration",
            singleSelect: true,
            hideTitleInPill: true,
            options: ["04-Hour Package", "Full-Day Package"]
          }
        ]
      },
      { 
        name: "Mirror Photo Booth", 
        isBoothItem: true, // මේකෙන් තමයි පහළ disable logic එක අල්ලන්නේ
        nestedGroups: [
          {
            title: "Print Option",
            singleSelect: true,
            hideTitleInPill: true,
            options: ["Without Print", "With Print"]
          },
          {
            title: "Print Size",
            options: ["Passport - ( 2\" x 3\" )", "4R - ( 4\" x 6\" )", "5R - ( 5\" x 7\" )", "6R - ( 6\" x 8\" )"],
            dependsOn: "With Print" 
          }
        ]
      },
      { 
        name: "Instant Sharing DSLR Photo Booth", 
        isBoothItem: true,
        nestedGroups: [
          {
            title: "Print Option",
            singleSelect: true,
            hideTitleInPill: true,
            options: ["Without Print", "With Print"]
          },
          {
            title: "Print Size",
            options: ["4R - ( 4\" x 6\" )", "6R - ( 6\" x 8\" )"],
            dependsOn: "With Print" 
          }
        ]
      },
      { name: "Instant iPad Photo Booth", isBoothItem: true, items: ["Include iPad Photo Booth"] },
      { name: "AI Photo Booth", isBoothItem: true, items: ["Include AI Photo Booth"] }
    ]
  },
  {
    id: "C4", category: "Event Videography", icon: Video,
    desc: "Full ceremony videography delivered in sharp, cinematic high-definition quality.",
    hideSelectAll: true, // <--- Select All Button එක අයින් කළා
    subCategories: [
      // --- අලුතින් කැඩූ කොටස් දෙක ---
      { 
        name: "Event Videography Coverage", 
        items: ["Fully Edited Event Coverage Video", "Fully Edited Highlight Video"] 
      },
      { 
        name: "Select Add-Ons", 
        items: ["Fully Edited Guest Speeches", "Live Streaming on Facebook & YouTube", "Review & Testimonial Video Clips"] 
      },
      // ==========================================
      // VIDEO BOOTHS SECTION
      // ==========================================
      { isSectionHeader: true, title: "Video Booths", iconName: "Video" },

      {
        name: "Video Booth Duration",
        nestedGroups: [
          {
            title: "Booth Duration",
            singleSelect: true,
            hideTitleInPill: true,
            options: ["04-Hour Package", "Full-Day Package"]
          }
        ]
      },
      { 
        name: "360 Video Booth", 
        isBoothItem: true,
        items: ["Standard Video Booth", "Advanced Video Booth", "7'x3' Matte Flex Print University & Campus Branding Boards"] 
      },
      { name: "Glam Bot Video Booth", isBoothItem: true, items: ["Include Glam Bot Video Booth"] },
      { 
        name: "SLO-MO Video Booth", 
        isBoothItem: true,
        nestedGroups: [
          {
            title: "Lighting Backdrop",
            hideTitleInPill: true, 
            options: ["Include SLO-MO Video Booth", "With Lighting Backdrop"]
          }
        ]
      },
      // (Photo Booths ටික C3 එකට ගෙනිච්ච නිසා මෙතනින් අයින් කළා)
      
      { isSectionHeader: true, title: "DRONEGRAPHY VIDEO PACKAGE", iconName: "Video" },
      { 
        name: "Dronegraphy Video", 
        items: ["DRONEGRAPHY VIDEO"],
        isDrone: true 
      },
      { 
        name: "FLOWER DROPPING DRONES", 
        desc: "Choose your preferred drone package",
        items: ["30KG Flower Dropping Drone", "100KG Flower Dropping Drone"],
        nestedGroups: [
          {
            title: "Bags for 30KG Drone",
            desc: "Select either 30KG or 20KG bag (Max 1)",
            dependsOn: "30KG Flower Dropping Drone",
            singleSelect: true,
            hideTitleInPill: true,
            options: ["30KG Flower Bag", "20KG Flower Bag"]
          },
          {
            title: "Bags for 100KG Drone",
            desc: "Select up to 3x 30KG bags OR 5x 20KG bags",
            dependsOn: "100KG Flower Dropping Drone",
            hideTitleInPill: true,
            hasCounters: true,
            counterLimits: { "30KG Flower Bag": 3, "20KG Flower Bag": 5 },
            options: ["30KG Flower Bag", "20KG Flower Bag"]
          }
        ],
        isDrone: true
      },
      { 
        name: "LED SCREEN DRONE DISPLAYS", 
        items: ["18FT LED Screen – 1 Time Fly", "30FT Large Sri Lankan LED Screen – 1 Time Fly"],
        isDrone: true
      }
    ]
  },
  {
    id: "C5", category: "Master of Ceremony & Compere | Emcee", icon: Mic,
    desc: "Confident, engaging hosting to maintain flawless event timing.",
    hideSelectAll: true,
    items: ["Sinhala Language", "English Language", "Tamil Language"],
    nestedGroups: [
      {
        title: "Compere",
        options: ["Male", "Female"]
      },
      {
        title: "Review & Testimonial video Host ",
        singleSelect: true,
        options: ["Male", "Female"]
      }
    ]
  },
  {
    id: "C6", category: "Stage Arrangements", icon: LayoutTemplate,
    desc: "Sophisticated stage designs that elevate academic ceremony prestige.",
    hideSelectAll: true,
    subCategories: [
      { 
        name: "Stage Flower Decorations", 
        packages: [
          {
            id: "SF1", name: "Package 1 - Fresh Flowers",
            features: ["Stage Edge Deco", "Podium Deco", "Oil Lamp Deco", "Head Table Deco"]
          },
          {
            id: "SF2", name: "Package 2 - Artificial Flowers",
            features: ["Stage Edge Deco", "Podium Deco", "Head Table Deco", "Oil Lamp Deco"]
          },
          {
            id: "SF3", name: "Package 3 - Mix Flowers",
            features: ["Stage Edge Deco", "Podium Deco", "Head Table Deco", "Oil Lamp Deco"]
          }
        ],
        nestedGroups: [
          {
            title: "Add-Ons",
            hideTitleInPill: true,
            hasCounters: true,
            options: ["Flower Garland (Orchid)", "Flower Boutique", "Flower Basket"]
          }
        ]
      },
      { 
        name: "LED Video Wall", 
        items: ['55" LED TV on Stage', "Digital Podium", "Welcome Pandal - Digital"],
        nestedGroups: [
          {
            title: "LED Video Wall",
            desc: "P3 LED Video Wall on 3' Hight platform | Live on Wall | Arena Play Back",
            options: ["50’x12’", "40’x10’", "30’x10’", "20’x10’"],
            moreOptions: ["8'x6'", "12'x7'", "15'x7'", "16'x10'", "12'x10'"], // New sizes added
            hasCustom: true 
          }
        ]
      }
    ]
  },
 {
    id: "C7", category: "Entertainment", icon: Music,
    desc: "Curated live performances adding elegance and cultural vibrancy to events.",
    hideSelectAll: true,
    subCategories: [
      {
        name: "Kandyan (Wes) Dance",
        packages: [
          { id: "K1", name: "Package 1", features: ["Dancers - 04", "Bera - 02", "Conch Blower - 01"] },
          { id: "K2", name: "Package 2", features: ["Dancers - 06", "Bera - 02", "Conch Blower - 01"] },
          { id: "K3", name: "Package 3", features: ["Dancers - 08", "Bera - 04", "Conch Blower - 01"] }
        ],
        nestedGroups: [
          { 
            title: "Bearers", 
            hideTitleInPill: true,
            hasCounters: true,
            options: ["Sesath Bearers", "Muthukuda Bearers"] 
          }
        ]
      },
      {
        name: "5 | 6 Girls Dancing Package",
        packages: [
          { id: "GD1", name: "Package 1", features: ["Puja Dance"] },
          { id: "GD2", name: "Package 2", features: ["Puja Dance", "01 Additional Dance Act"] },
          { id: "GD3", name: "Package 3", features: ["Puja Dance", "02 Additional Dance Acts"] },
          { id: "GD4", name: "Package 4", features: ["Custom Selection (Build your own)"], isCustom: true }
        ],
        nestedGroups: [
          {
            title: "Select 01 Dance Act",
            desc: "You got Package 2. Please select exactly 1 additional dance act from below.",
            dependsOn: "Package 2",
            hideTitleInPill: true,
            maxSelect: 1, 
            options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"]
          },
          {
            title: "Select 02 Dance Acts",
            desc: "You got Package 3. Please select exactly 2 additional dance acts from below.",
            dependsOn: "Package 3",
            hideTitleInPill: true,
            maxSelect: 2, 
            options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"]
          },
          {
            title: "Custom Dance Acts",
            dependsOn: "Package 4",
            hideTitleInPill: true,
            options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"]
          }
        ]
      },
      {
        name: "Comedian Act",
        items: ["Comedian Act"]
      },
      { 
        name: "Instrumental Items", 
        items: ["Drum Orchestra", "Drum Orchestra with Violin & Flute"] 
      }
    ]
  },
  {
    id: "C8", category: "Manufacturing & Printing", icon: Printer,
    desc: "Premium custom printing for certificates, banners, and branded materials.",
    hideSelectAll: true,
    subCategories: [
      {
        name: "Graduation Teddy",
        items: [
          "Mini Graduation Teddy – 20 cm",
          "Premium Graduation Teddy Bear – 40 cm",
          "Jumbo Convocation Teddy – 90 cm"
        ],
        nestedGroups: [
          {
            title: "Colors",
            hideTitleInPill: true,
            options: ["Pink", "Blue", "Brown", "Ash", "Cream", "Red", "Yellow"]
          }
        ]
      },
      {
        name: "Flag Printing (University | Department)",
        items: [
          "Stage Flags - 6’x4’",
          "Promo Flags - 10’x2.5’",
          "Promo Flag Poles"
        ]
      },
      {
        name: "Certificate Pouch",
        items: [
          "Standard pouch - A4 size (23 × 31 cm)",
          "Premium PU leather",
          "Hard cover padded - 24 × 32 cm"
        ],
        nestedGroups: [
          {
            title: "Material",
            hideTitleInPill: true,
            options: ["Velvet finish", "Rexine", "PU leather", "Hardboard laminated", "Magnetic flap folders"]
          }
        ]
      },
      {
        name: "Token of Appreciation & Souvenirs",
        items: [
          "Metal Plaque in Red Velvet Box",
          "Glass Plaque"
        ]
      }
    ]
  },
  {
    id: "C9", category: "Graduation Items", icon: GraduationCap,
    desc: "High quality graduation gowns, caps, hoods, garlands & scrolls for every graduate.",
    hideSelectAll: true,
    subCategories: [
      { name: "Graduation Cloak", items: ["Black", "Ash", "Blue", "Maroon", "Red"] },
      { name: "Ceremonial Cloak", items: ["Red", "Blue", "Maroon"] },
      { name: "Garlands", items: ["Purple", "Red", "Yellow", "Pink"] },
      { name: "Scrolls", items: ["Red", "Blue", "Maroon", "Black", "Green", "Gold", "Silver"] },
     ]
  },
  {
    id: "C10", category: "Sound & Lighting Systems", icon: Speaker,
    desc: "Professional audio and lighting for clear, impactful presentations.",
    items: ["Professional Sound System Setup", "Dynamic Stage Lighting Setup"]
  },
  {
    id: "C11", category: "Floor Management Packages", icon: ClipboardCheck,
    desc: "Seamless ceremony coordination ensuring smooth, delay-free movement for students, guests, and crew.",
    subCategories: [
      { name: "Stage Management & Ceremony Flow", items: ["Include Stage Management & Ceremony Flow"] },
      { name: "Seating Management", items: ["Include Seating Management"] },
      { name: "Procession & Line-Up Control", items: ["Include Procession & Line-Up Control"] },
      { name: "Ushering & Guidance Team", items: ["Include Ushering & Guidance Team"] },
      { name: "Registration & Entry Control", items: ["Include Registration & Entry Control"] },
      { name: "Queue & Holding Area Management", items: ["Include Queue & Holding Area Management"] },
      { name: "Security & Access Control", items: ["Include Security & Access Control"] },
      { name: "Backstage Coordination", items: ["Include Backstage Coordination"] },
      { name: "Communication System (Floor Control)", items: ["Include Communication System"] },
      { name: "Emergency & Crowd Control", items: ["Include Emergency & Crowd Control"] }
    ]
  },
{
    id: "C12", category: "Security & Access Control", icon: ClipboardCheck,
    desc: "Professional security personnel strategically divided into operational zones to ensure a safe, orderly, and controlled ceremony environment.",
    subCategories: [
      { name: "Main Gate Security", items: ["Include Main Gate Security"] },
      { name: "Crowd Control Bouncers", items: ["Include Crowd Control Bouncers"] },
      { name: "VIP & Protocol Security", items: ["Include VIP & Protocol Security"] },
      { name: "Stage Security / Front-of-Stage Guards", items: ["Include Stage Security"] },
      { name: "Backstage Security", items: ["Include Backstage Security"] },
      { name: "Perimeter / External Security", items: ["Include Perimeter Security"] },
      { name: "Escort & Movement Security", items: ["Include Escort & Movement Security"] },
      { name: "Emergency Response Security", items: ["Include Emergency Response Security"] }
    ]
  }
];

export default function ServicesContent() {
  const [cart, setCart] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const toggleGroupExpand = (title: string) => {
    setExpandedGroups(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };
  const [infoModalData, setInfoModalData] = useState<any>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    const savedQty = localStorage.getItem("skd_services_qty"); // <--- Meka add karanna
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
    if (savedQty) {
      try { setQuantities(JSON.parse(savedQty)); } catch (e) { console.error("Error parsing qty"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
    localStorage.setItem("skd_services_qty", JSON.stringify(quantities)); // <--- Meka add karanna
  }, [cart, quantities]);
  
  const toggleCart = (itemFullString: string, isSingleSelect: boolean = false, categoryPrefix: string = "") => {
    setCart(prev => {
      let newCart = [...prev];

      // 1. Registration Package Auto-Select
      if (itemFullString.startsWith("Registration: ")) {
        const regItems = [
          "Registration: Student Seat Number Allocation", 
          "Registration: Distribution of Student Cloaks & Garlands", 
          "Registration: Distribution of Guest & Parent Entrance Passes", 
          "Registration: Distribution of Refreshment Tokens"
        ];
        const isSelected = regItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !regItems.includes(i)); // Deselect all
        regItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); }); // Select all
        return newCart;
      }

      // --- අලුතින් එකතු කරන Seating Arrangements Auto-Select කොටස ---
      if (itemFullString.startsWith("Seating Arrangements: ") || itemFullString.startsWith("Seating Arrangements - Auditorium: ")) {
        const seatingItems = [
          "Seating Arrangements: Student Procession (Perahara) Arrangement", 
          "Seating Arrangements: Award Receiving Arrangements & Time Management",
          "Seating Arrangements - Auditorium: Student Seating Arrangement",
          "Seating Arrangements - Auditorium: Guest & Parent Seating Arrangement"
        ];
        const isSelected = seatingItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !seatingItems.includes(i)); // Deselect all
        seatingItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); }); // Select all
        return newCart;
      }

      // 4. Event Photography - Event Coverage Auto-Select
      if (itemFullString.startsWith("Event Photography - Event Coverage: ")) {
        const coverageItems = [
          "Event Photography - Event Coverage: Fully Edited Highlight Photos",
          "Event Photography - Event Coverage: Group Photo - 16”x24”"
        ];
        const isSelected = coverageItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !coverageItems.includes(i)); // Deselect all
        coverageItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); }); // Select all
        return newCart;
      }

      // 3. Event Videography (Coverage + Highlight) Auto-Select
      if (itemFullString === "Event Videography - Event Videography Coverage: Fully Edited Event Coverage Video" || itemFullString === "Event Videography - Event Videography Coverage: Fully Edited Highlight Video") {
        const videoItems = [
          "Event Videography - Event Videography Coverage: Fully Edited Event Coverage Video",
          "Event Videography - Event Videography Coverage: Fully Edited Highlight Video"
        ];
        const isSelected = videoItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !videoItems.includes(i));
        videoItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 5. Booth Duration Single Select Logic
      if (itemFullString === "Event Videography - Video Booth Duration: Booth Duration - 04-Hour Package" || itemFullString === "Event Videography - Video Booth Duration: Booth Duration - Full-Day Package") {
        let cleaned = prev.filter(i => i !== "Event Videography - Video Booth Duration: Booth Duration - 04-Hour Package" && i !== "Event Videography - Video Booth Duration: Booth Duration - Full-Day Package");
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }

      if (itemFullString === "Event Photography - Photo Booth Duration: Booth Duration - 04-Hour Package" || itemFullString === "Event Photography - Photo Booth Duration: Booth Duration - Full-Day Package") {
        let cleaned = prev.filter(i => i !== "Event Photography - Photo Booth Duration: Booth Duration - 04-Hour Package" && i !== "Event Photography - Photo Booth Duration: Booth Duration - Full-Day Package");
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }

      // 6. Mirror Photo Booth Print Options Logic
      if (itemFullString.includes("Mirror Photo Booth: Print Option - Without Print") || itemFullString.includes("Mirror Photo Booth: Print Option - With Print")) {
        let cleaned = prev.filter(i => 
          !i.includes("Mirror Photo Booth: Print Option - Without Print") && 
          !i.includes("Mirror Photo Booth: Print Option - With Print")
        );
        // Without Print තේරුවොත් යටින් තෝරලා තියෙන Sizes Auto Clear වෙනවා
        if (itemFullString.includes("Mirror Photo Booth: Print Option - Without Print")) {
          cleaned = cleaned.filter(i => !i.includes("Mirror Photo Booth: Print Size"));
        }
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }

      // 7. DSLR Photo Booth Print Options Logic
      if (itemFullString.includes("Instant Sharing DSLR Photo Booth: Print Option - Without Print") || itemFullString.includes("Instant Sharing DSLR Photo Booth: Print Option - With Print")) {
        let cleaned = prev.filter(i => 
          !i.includes("Instant Sharing DSLR Photo Booth: Print Option - Without Print") && 
          !i.includes("Instant Sharing DSLR Photo Booth: Print Option - With Print")
        );
        // Without Print තේරුවොත් යටින් තෝරලා තියෙන Sizes Auto Clear වෙනවා
        if (itemFullString.includes("Instant Sharing DSLR Photo Booth: Print Option - Without Print")) {
          cleaned = cleaned.filter(i => !i.includes("Instant Sharing DSLR Photo Booth: Print Size"));
        }
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }


      // --- Standard Selection Logic ---
      if (prev.includes(itemFullString)) {
        return prev.filter(i => i !== itemFullString);
      }
      
      if (isSingleSelect && categoryPrefix) {
         newCart = newCart.filter(item => !item.startsWith(categoryPrefix));
      }

      newCart.push(itemFullString);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("skd_services_cart");
  };

  // Helper function to get ALL selectable strings for a given category
  const getAllItemsInCategory = (cat: any) => {
    let allItems: string[] = [];
    
    // Direct items
    if (cat.items) {
      cat.items.forEach((item: string) => {
        allItems.push(`${cat.category}: ${item}`);
      });
    }
    
    if (cat.id === "C4") {
      return allItems; 
    }

    // Direct nested groups (Skip singleSelect items)
    if (cat.nestedGroups) {
      cat.nestedGroups.forEach((nested: any) => {
        if (!nested.singleSelect) {
          nested.options.forEach((opt: string) => {
            allItems.push(`${cat.category}: ${nested.title} - ${opt}`);
          });
        }
      });
    }

    // Sub-categories
    if (cat.subCategories) {
      cat.subCategories.forEach((sub: any) => {
        if (sub.items) {
          sub.items.forEach((item: string) => {
            allItems.push(`${cat.category} - ${sub.name}: ${item}`);
          });
        }
        // Nested groups inside sub-categories (Skip singleSelect items)
        if (sub.nestedGroups) {
          sub.nestedGroups.forEach((nested: any) => {
            if (!nested.singleSelect) {
              nested.options.forEach((opt: string) => {
                allItems.push(`${cat.category} - ${sub.name}: ${nested.title} - ${opt}`);
              });
            }
          });
        }
      });
    }
    return allItems;
  };

  // Select/Deselect All Handler
  const handleSelectAllCategory = (cat: any) => {
    // Get all items EXCEPT singleSelect ones
    const allItems = getAllItemsInCategory(cat);
    
    // Check if ALL allowable items in this category are currently in the cart
    const areAllSelected = allItems.length > 0 && allItems.every((item) => cart.includes(item));

    if (areAllSelected) {
      // If all are selected, DESELECT EVERYTHING in this category (including manually selected single options)
      setCart((prev) => prev.filter((cartItem) => 
        !cartItem.startsWith(`${cat.category}:`) && 
        !cartItem.startsWith(`${cat.category} - `)
      ));
    } else {
      // If not all are selected, SELECT all allowable items (avoiding duplicates)
      setCart((prev) => {
        const newCart = [...prev];
        allItems.forEach((item) => {
          if (!newCart.includes(item)) {
            newCart.push(item);
          }
        });
        return newCart;
      });
    }
  };

  const SelectablePill = ({ label, displayLabel, categoryName, isSingleSelect = false, groupPrefix = "", disabled = false }: { label: string, displayLabel?: string, categoryName: string, isSingleSelect?: boolean, groupPrefix?: string, disabled?: boolean }) => {
    const fullString = `${categoryName}: ${label}`;
    const isSelected = cart.includes(fullString);
    const prefixToClear = groupPrefix ? `${categoryName}: ${groupPrefix}` : `${categoryName}:`;
    const showText = displayLabel || label; // Display වෙන නම වෙනස් කරනවා 

    return (
      <motion.button
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={() => !disabled && toggleCart(fullString, isSingleSelect, prefixToClear)}
        disabled={disabled}
        className={`flex items-start sm:items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border transform-gpu text-left w-full sm:w-auto h-auto ${
          isSelected 
            ? "bg-[#a40049] text-white border-[#a40049] shadow-md" 
            : disabled 
              ? "bg-gray-100 text-gray-400 border-gray-200 opacity-60 cursor-not-allowed" 
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
        }`}
      >
        <div className="shrink-0 mt-0.5 sm:mt-0">
          {isSelected ? <Check className="w-4 h-4 text-white" /> : <Plus className={`w-4 h-4 ${disabled ? "text-gray-300" : "text-gray-400"}`} />}
        </div>
        <span className="leading-snug break-words">{showText}</span>
      </motion.button>
    );
  };

  const CounterPill = ({ label, displayLabel, categoryName, maxLimit }: { label: string, displayLabel?: string, categoryName: string, maxLimit?: number }) => {
    const fullString = `${categoryName}: ${label}`;
    const qty = quantities[fullString] || 0;
    const showText = displayLabel || label;

    // --- 100KG Drone Weight Limit Logic Eka (Supiri wadak meka) ---
    const is100KGDosage = categoryName.includes("FLOWER DROPPING DRONES") && fullString.includes("Bags for 100KG Drone");
    let isMaxed = false;
    
    if (maxLimit && qty >= maxLimit) isMaxed = true;
    
    // 100KG eke bara ganan hadala limit karanawa (30KG da 20KG da kiyala balala)
    if (is100KGDosage) {
        const current30 = quantities[`${categoryName}: Bags for 100KG Drone - 30KG Flower Bag`] || 0;
        const current20 = quantities[`${categoryName}: Bags for 100KG Drone - 20KG Flower Bag`] || 0;
        const currentWeight = (current30 * 30) + (current20 * 20);
        const thisWeight = fullString.includes("30KG") ? 30 : 20;
        if (currentWeight + thisWeight > 100) isMaxed = true; // 100 Paninna ba
    }

    const handleCount = (delta: number) => {
      if (delta > 0 && isMaxed) return; // Limit panna nam + button wada na
      
      setQuantities(prev => {
        const current = prev[fullString] || 0;
        const next = Math.max(0, current + delta);
        
        setCart(c => {
          if (next > 0 && !c.includes(fullString)) return [...c, fullString];
          if (next === 0 && c.includes(fullString)) return c.filter(i => i !== fullString);
          return c;
        });
        
        return { ...prev, [fullString]: next };
      });
    };

    return (
      <div className={`inline-flex w-full sm:w-auto items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full border transition-all duration-300 ${qty > 0 ? 'bg-[#a40049]/5 border-[#a40049] shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}>
         <div className="flex flex-col">
           <span className={`text-xs sm:text-sm font-bold leading-snug ${qty > 0 ? 'text-[#a40049]' : 'text-gray-700'}`}>
             {showText}
           </span>
         </div>
         
         <div className="flex items-center gap-3 sm:gap-4 bg-white border border-gray-200 rounded-full p-1.5 px-2 sm:px-3 shadow-sm shrink-0">
            <button 
              onClick={() => handleCount(-1)} 
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-extrabold transition-colors text-sm sm:text-base active:scale-90"
            >
              -
            </button>
            <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-extrabold text-gray-900">
              {qty}
            </span>
            <button 
              onClick={() => handleCount(1)} 
              className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full font-extrabold transition-colors text-sm sm:text-base active:scale-90 shadow-md ${
                isMaxed 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#a40049] text-white hover:bg-[#8a003d]'
              }`}
            >
              +
            </button>
         </div>
      </div>
    )
  };

  return (
    <>
      {/* FIXED: Reduced pb-24 md:pb-40 to pb-12 md:pb-20 to reduce bottom spacing */}
      <section className="pb-12 md:pb-20 pt-8 md:pt-10 bg-white relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

         <div className="columns-1 lg:columns-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
            {structuredServices.map((cat, index) => {
              const Icon = cat.icon;
              
              // Determine if "Select All" or "Deselect All" should be shown
              const allCategoryItems = getAllItemsInCategory(cat);
              const areAllSelected = allCategoryItems.length > 0 && allCategoryItems.every((item) => cart.includes(item));

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={cat.id} 
                  className="relative group rounded-[2rem] sm:rounded-[2.5rem] p-[2px] transition-all duration-500 hover:-translate-y-2 transform-gpu shadow-md hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.3)] break-inside-avoid inline-block w-full"
                >
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-gray-200 to-gray-100 group-hover:from-[#ff4d94] group-hover:to-[#a40049] transition-colors duration-500" />
                  
                  <div className="relative bg-white rounded-[1.9rem] sm:rounded-[2.4rem] px-5 py-6 sm:px-7 sm:py-7 md:p-8 flex flex-col h-full">  
                    
                    {/* Header Section */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#a40049]/10 to-[#ff4d94]/5 border border-[#a40049]/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#a40049]" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">{cat.category}</h3>
                        </div>
                        
                        {/* Show Select All button only if hideSelectAll is NOT true */}
                        {!cat.hideSelectAll && (
                          <button 
                            onClick={() => handleSelectAllCategory(cat)}
                            className={`flex items-center self-start sm:self-auto gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 border ${
                              areAllSelected 
                                ? "bg-red-50 text-red-600 border-red-100 hover:bg-red-100" 
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {areAllSelected ? (
                              <>
                                <span>Deselect All</span>
                                <Trash2 className="w-3.5 h-3.5" />
                              </>
                            ) : (
                              <>
                                <span>Select All</span>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                    {cat.desc && (
  <div className="mt-2 sm:mt-4 p-3 sm:p-4 bg-gradient-to-br from-[#a40049]/[0.03] to-transparent border border-[#a40049]/[0.06] rounded-2xl shadow-[inset_0_1px_4px_rgba(164,0,73,0.03)] relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#a40049] to-[#ff4d94] rounded-l-2xl" />
    <p className="text-[11.5px] sm:text-[13px] text-gray-500 font-semibold leading-relaxed pl-2 sm:pl-3">
      {cat.desc}
    </p>
  </div>
)}
                    </div>

                    <div className="flex-grow space-y-4">
                      
                      {/* Direct Items */}
                      {cat.items && cat.items.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                          {cat.items.map(item => (
                            <SelectablePill 
                              key={item} 
                              label={item} 
                              categoryName={cat.category} 
                              isSingleSelect={(cat as any).singleSelect} /* <-- FIXED TS ERROR */
                            />
                          ))}
                        </div>
                      )}

                      {/* NEW: Direct Nested Groups (e.g. for Master of Ceremony) */}
                      {cat.nestedGroups && cat.nestedGroups.length > 0 && (
                        <div className="space-y-4">
                          {cat.nestedGroups.map((nested: any) => (
                            <div key={nested.title} className="bg-[#FAFAFA] border border-gray-200/60 p-3.5 sm:p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                <h5 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                                  Select {nested.title}
                                </h5>
                              </div>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {nested.options.map((opt: string) => {
                                  const pillLabel = nested.hideTitleInPill ? opt : `${nested.title} - ${opt}`;
                                  const clearPrefix = nested.hideTitleInPill ? "" : `${nested.title} -`;
                                  return (
                                    <SelectablePill 
                                      key={opt} 
                                      label={pillLabel} 
                                      categoryName={cat.category} 
                                      isSingleSelect={nested.singleSelect} 
                                      groupPrefix={clearPrefix} 
                                    />
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Sub Categories */}
                      {cat.subCategories && (
                        <div className="space-y-4">
                          {cat.subCategories.map((sub: any, subIdx: number) => {
                            
                            // --- NEW: Section Header Rendering ---
                            if (sub.isSectionHeader) {
                              return (
                                <div key={`header-${subIdx}`} className="flex items-center gap-3 pt-3 pb-1">
                                  <div className="w-8 h-8 rounded-[10px] bg-[#a40049]/10 flex items-center justify-center shrink-0">
                                    {sub.iconName === "Video" ? <Video className="w-4 h-4 text-[#a40049]" /> : <Camera className="w-4 h-4 text-[#a40049]" />}
                                  </div>
                                  <h4 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">{sub.title}</h4>
                                  <div className="flex-grow h-[1px] bg-gray-200 ml-2" />
                                </div>
                              );
                            }

                            // --- Booth Disable Logic (Photography & Videography සඳහා වෙන වෙනම) ---
                            let disableBooths = false;
                            
                            // Event Photography (C3) - Photo Booths Disable Logic
                            if (cat.id === "C3" && sub.isBoothItem) {
                              const isPhotoDurationSelected = cart.some(i => i.startsWith("Event Photography - Photo Booth Duration:"));
                              disableBooths = !isPhotoDurationSelected;
                            }
                            
                            // Event Videography (C4) - Video Booths Disable Logic
                            if (cat.id === "C4" && sub.isBoothItem) {
                              const isVideoDurationSelected = cart.some(i => i.startsWith("Event Videography - Video Booth Duration:"));
                              disableBooths = !isVideoDurationSelected;
                            }

                            return (
                            <div key={sub.name} className={`bg-[#FAFAFA] border border-gray-200/60 p-3.5 sm:p-4 rounded-2xl relative transition-all duration-300 ${disableBooths ? 'opacity-50 grayscale-[30%] pointer-events-none' : ''}`}>
                              
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                                    {sub.name}
                                  </h4>
                                </div>
                                
                                {/* Info Button */}
                                {boothDetails && boothDetails[sub.name] && (
                                  <button 
                                    onClick={() => setInfoModalData({ name: sub.name, ...boothDetails[sub.name] })}
                                    className={`w-7 h-7 rounded-full bg-[#a40049]/10 text-[#a40049] flex items-center justify-center hover:bg-[#a40049] hover:text-white transition-colors ml-auto shadow-sm ${disableBooths ? 'hidden' : ''}`}
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>
                                )}
                              </div>

                              {/* Warning Message if Disabled */}
                              {disableBooths && (
                                <p className="text-[10px] sm:text-xs text-red-500 font-bold mb-3 -mt-2">
                                  Please Select Booth Duration First!
                                </p>
                              )}

                              {sub.desc && <p className="text-[10px] sm:text-xs text-gray-500 mb-3 -mt-2 font-medium leading-snug">{sub.desc}</p>}{/* Standard Sub-category Items */}
                              {sub.packages && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                  {sub.packages.map((pkg: any) => {
                                    const fullString = `${cat.category} - ${sub.name}: ${pkg.name}`;
                                    const isSelected = cart.includes(fullString);
                                    
                                    return (
                                      <motion.div 
                                        key={pkg.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleCart(fullString)}
                                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-[#a40049]/5 border-[#a40049] shadow-md scale-[1.02]' : 'bg-white border-gray-200 hover:border-[#a40049]/30 hover:shadow-sm'}`}
                                      >
                                        <div className="flex items-center justify-between mb-2.5">
                                          <h6 className={`font-extrabold text-xs sm:text-sm ${isSelected ? 'text-[#a40049]' : 'text-gray-800'}`}>{pkg.name}</h6>
                                          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-[#a40049] border-[#a40049]' : 'bg-white border-[#a40049]'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                          </div>
                                        </div>
                                        <ul className="space-y-1.5">
                                          {pkg.features.map((f: string, i: number) => (
                                            <li key={i} className="text-[10px] sm:text-[11px] text-gray-600 font-medium flex items-start gap-1.5 leading-snug">
                                              <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 transition-colors ${isSelected ? 'bg-[#a40049]' : 'bg-gray-300'}`} />
                                              <span>{f}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Standard Sub-category Items (Package 4 තේරුවොත් විතරක් මේක පේනවා) */}
                              {sub.items && sub.items.length > 0 && !sub.packages && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 pt-1"
                                >
                                  {sub.items.map((item: string) => (
                                    <SelectablePill key={item} label={item} categoryName={`${cat.category} - ${sub.name}`} />
                                  ))}
                                </motion.div>
                              )}

                              {/* Nested Deep Sub-Categories */}
{sub.nestedGroups && sub.nestedGroups.length > 0 && (
  <div className="mt-4 space-y-3">
    {sub.nestedGroups.map((nested: any) => {
      
      // --- BUG FIX: Dependency Check එක Update කළා ---
      if (nested.dependsOn) {
        const hasDependency = cart.some(cartItem => 
          cartItem.startsWith(`${cat.category} - ${sub.name}`) && cartItem.includes(nested.dependsOn)
        );
        if (!hasDependency) return null; 
      }

      const isExpanded = expandedGroups.includes(nested.title);

      let selectedCount = 0;
      if (nested.maxSelect) {
        selectedCount = nested.options.filter((opt: string) => {
          const pillLabel = `${nested.title} - ${opt}`; 
          return cart.includes(`${cat.category} - ${sub.name}: ${pillLabel}`);
        }).length;
      }

      // --- CUSTOMER REQUEST: Button එකක් එබුවම යටින් එන Box වලට ලා Pink Background එකක් දීම ---
      const isDynamic = !!nested.dependsOn;

      const displayTitle = nested.title.startsWith("Select") ? nested.title : `Select ${nested.title}`;

      return (
      <div key={nested.title} className={`${isDynamic ? 'bg-[#a40049]/[0.04] border-[#a40049]/20' : 'bg-white border-gray-100'} border p-3 sm:p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-colors duration-300`}>
        
        <div className="flex items-center gap-2.5 mb-2.5">
          {isDynamic && <div className="w-1.5 h-3.5 bg-[#a40049] rounded-full shrink-0" />}
          
          <h5 className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">
            {displayTitle} {nested.maxSelect && <span className="text-[#a40049] font-extrabold ml-1">(Max: {nested.maxSelect})</span>}
          </h5>
        </div>
        
        {/* LED Video Wall Description or Dynamic Package Message */}
        {nested.desc && (
          <div className="w-full mb-3">
            {nested.desc.includes('|') ? (
              <div className="flex items-center justify-between w-full text-[7.5px] min-[375px]:text-[8.5px] md:text-[10px] lg:text-[11px] text-[#a40049] font-semibold">
                {nested.desc.split(' | ').reduce((acc: any[], part: string, i: number, arr: string[]) => {
                  acc.push(<span key={`text-${i}`} className="whitespace-nowrap truncate">{part.trim()}</span>);
                  if (i < arr.length - 1) {
                    acc.push(<span key={`dot-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#a40049]/50 shrink-0 mx-1 sm:mx-2"></span>);
                  }
                  return acc;
                }, [])}
              </div>
            ) : (
              <p className="text-[10px] sm:text-xs text-[#a40049] font-bold bg-[#a40049]/10 px-3 py-1.5 rounded-md inline-block">{nested.desc}</p>
            )}
          </div>
        )}
        
     <div className={`flex mt-2 ${nested.hasCounters ? 'flex-col gap-3 w-full'   : 'flex-wrap gap-1.5 sm:gap-2'}`}>
          {nested.options.map((opt: string) => {
            
            const pillLabel = `${nested.title} - ${opt}`;
            const displayLbl = nested.hideTitleInPill ? opt : pillLabel;
            const clearPrefix = `${nested.title} -`; 
            // --- ALUTH COUNTER LOGIC EKA ---
            if (nested.hasCounters) {
              const limit = nested.counterLimits ? nested.counterLimits[opt] : undefined;
              return <CounterPill key={opt} label={pillLabel} displayLabel={displayLbl} categoryName={`${cat.category} - ${sub.name}`} maxLimit={limit} />
            }

            // Check if this pill should be disabled because max count is reached
            const isSelected = cart.includes(`${cat.category} - ${sub.name}: ${pillLabel}`);
            const isDisabled = nested.maxSelect && selectedCount >= nested.maxSelect && !isSelected;

            return (
              <SelectablePill 
                key={opt} 
                label={pillLabel} 
                displayLabel={displayLbl}
                categoryName={`${cat.category} - ${sub.name}`} 
                isSingleSelect={nested.singleSelect} 
                groupPrefix={clearPrefix} 
                disabled={isDisabled}
              />
            )
          })}

          {/* More Options / Custom Button / "More Sizes" Toggle */}
          {nested.moreOptions && isExpanded && nested.moreOptions.map((opt: string) => {
            const pillLabel = `${nested.title} - ${opt}`;
            const displayLbl = nested.hideTitleInPill ? opt : pillLabel;
            return (
              <SelectablePill 
                key={opt}
                label={pillLabel} 
                displayLabel={displayLbl}
                categoryName={`${cat.category} - ${sub.name}`} 
                isSingleSelect={nested.singleSelect} 
                groupPrefix={`${nested.title} -`} 
              />
            )
          })}

          {nested.hasCustom && isExpanded && (
            <SelectablePill 
              label={`${nested.title} - Custom Size`} 
              displayLabel={nested.hideTitleInPill ? "Custom Size" : `${nested.title} - Custom Size`}
              categoryName={`${cat.category} - ${sub.name}`} 
              isSingleSelect={nested.singleSelect} 
              groupPrefix={`${nested.title} -`} 
            />
          )}

          {(nested.moreOptions || nested.hasCustom) && (
            <button 
              onClick={() => toggleGroupExpand(nested.title)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200"
            >
              {isExpanded ? "Hide Sizes" : "More Sizes"} 
              <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>
    )})}
  </div>
)}

                            </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            DYNAMIC ISLAND / FLOATING GLASS DOCK
            ========================================= */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-40 transform-gpu"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full p-2 md:p-2.5 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 pl-2 sm:pl-4">
                  <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#a40049]/10 rounded-full shrink-0">
                    <ShoppingBag className="w-5 h-5 text-[#a40049]" />
                    <motion.span 
                      key={cart.length}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4d94] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-full shadow-sm"
                    >
                      {cart.length}
                    </motion.span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-extrabold text-gray-900 leading-none">Services Added</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Ready for quotation</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-1">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm transform-gpu whitespace-nowrap"
                  >
                    Review Quote
                    <Send className="w-4 h-4 shrink-0" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
        {infoModalData && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setInfoModalData(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-[#a40049] to-[#ff4d94] p-6 sm:p-8 text-white relative">
                <button 
                  onClick={() => setInfoModalData(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white hover:text-[#a40049] rounded-full flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 hidden" /> {/* Just for spacing, using X below */}
                  <div className="absolute font-bold text-lg leading-none rotate-45">+</div>
                </button>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4 border border-white/30">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">{infoModalData.name}</h2>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <p className="text-sm sm:text-[15px] text-gray-600 font-medium leading-relaxed mb-6">
                  {infoModalData.desc}
                </p>

                <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Included Features
                </h4>
                
                <ul className="space-y-3">
                  {infoModalData.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#a40049]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#a40049]" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bottom Action */}
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button 
                  onClick={() => setInfoModalData(null)}
                  className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold shadow-md hover:bg-gray-800 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cart={cart}
        toggleCart={toggleCart}
        clearCart={clearCart} 
      />
    </>
  );
}