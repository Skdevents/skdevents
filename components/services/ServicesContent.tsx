"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, Rows3, Camera, Video, Mic, LayoutTemplate, 
  Music, Speaker, Printer, GraduationCap, Plus, Check, ShoppingBag, Send, ExternalLink, Trash2, CheckCircle2,
  ChevronDown, Info, Shirt, UserCheck
} from "lucide-react";
import WhatsAppModal from "./WhatsAppModal"; 

const boothDetails: Record<string, any> = {
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
  "Student’s Photo Package": {
    name: "Student Photography Packages", 
    desc: "Capture your graduation memories with professional photography services designed especially for students. Our package includes individual portraits, stage award photographs, candid moments, and high-quality edited images to preserve your achievement for a lifetime. Photos are captured by experienced photographers and delivered in premium print and digital formats, ensuring every special moment of your graduation ceremony is beautifully documented.",
    features: [
      "Individual stage moments photography",
      "Family and group portraits",
      "High-quality print outputs",
      "Digital copies of your memories"
    ]
  },
  "Special Photo Package 1": {
    desc: "Comprehensive photography package tailored for special moments and family portraits.",
    features: ["Stage photo - 16”x19”", "Full | Bust Photo - 16”x19”", "Family Photo - 16”x19”", "Group Photo (Soft Copy)"]
  },
  "Special Photo Package 2": {
    desc: "Premium graduation memory package with varied sizing for stage and family portraits.",
    features: ["Stage photo - 12”x15”", "Full | Bust Photo - 16”x19”", "Family Photo - 12”x15”", "Group Photo (Soft Copy)"]
  },
  "Embossed Photo Mount Print": {
    desc: "Enhance your graduation or event photographs with a premium Embossed Photo Mount Print, available in Black, Silver, White, or Gold finishes. Each print is professionally mounted on a durable embossed board, providing an elegant and sophisticated presentation that is ideal for display, gifting, and long-term preservation.",
    features: ["Premium embossed finish", "Durable photo mounting", "Elegant presentation for framing or display", "Ideal for graduation, award, and special event photographs", "Available in 16”x19” size upon request"]
  },
  "Laser Mapping": {
    name: "Laser Mapping & 3D Projection Solutions",
    desc: "Laser Mapping (Projection Mapping) is an advanced visual technology used at events to project high-quality animations, videos, graphics, and special effects onto buildings, stages, backdrops, screens, or custom structures, creating a stunning 3D visual experience.\n\nTransform ordinary surfaces into extraordinary visual experiences with our state-of-the-art laser mapping and projection technology. From captivating opening sequences and brand launches to immersive stage productions, our customized visual displays deliver unforgettable moments that engage and inspire audiences.",
    features: [
      "3D visual effects and animations",
      "Custom-branded content",
      "Synchronized with sound, lighting, and special effects",
      "Creates a memorable audience experience",
      "Suitable for indoor and outdoor events"
    ]
  },
  "Instant share iPad photo booth": {
    desc: "Create fun, instant memories with the Instant iPad Photo Booth. Our modern iPad Photo Booth offers a sleek and interactive experience where guests can capture photos, boomerangs, GIFs, and short videos instantly with professional lighting and live preview features. (Rs. 55,000/-)",
    features: ["Instant photo capture", "GIF & boomerang support", "Touchscreen iPad interface", "Instant sharing via QR, email, or AirDrop", "Custom photo templates & branding", "Professional LED lighting", "Compact and stylish setup"]
  },
  "Drone Video Coverage": {
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
  "LED Screen Display Drone Coverage": {
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
  },
  "STAGE USHERS (FEMALE)": {
    desc: "Responsible for high visibility, stage support, and movement coordination.",
    dressOptions: [
      {
        name: "OPTION 1 - Formal Black Dress",
        details: [
          "Dress: Black knee-length formal dress (professional fit)",
          "Style: Modest cut, structured design (not tight-fitting)",
          "Length: At or just above knee level (controlled and professional)",
          "Shoes: Black closed formal shoes (low heel recommended)"
        ]
      },
      {
        name: "OPTION 2 – Saree with Jacket",
        details: [
          "Saree: Light colour plain saree (white / beige / pastel tones)",
          "Jacket: Formal matching or black structured jacket",
          "Blouse: Full coverage formal blouse",
          "Shoes: Black formal heels or closed shoes"
        ]
      },
      {
        name: "OPTION 3 – Customized Official Costume",
        details: [
          "Institution-approved branded costume only",
          "Must maintain: Modesty, easy movement, and professional appearance",
          "No casual fashion wear allowed"
        ]
      }
    ],
    appearance: [
      "Hair: Neatly tied (bun / ponytail)",
      "Makeup: Light and formal only",
      "Accessories: Minimal (no flashy jewelry)",
      "ID badge: Visible at all times",
      "Posture: Confident and upright"
    ]
  },
  "VIP USHERS (FEMALE)": {
    desc: "Protocol Handling, VIP Escort, and high discipline zone management.",
    dressOptions: [
      {
        name: "OPTION 1 - Saree Protocol Look",
        details: [
          "Saree: Light colour plain saree (white / cream / pastel)",
          "Jacket: Formal structured jacket (black or matching tone)",
          "Blouse: Full coverage formal blouse",
          "Footwear: Closed black formal shoes or low heels"
        ]
      },
      {
        name: "OPTION 2 – Formal Western Protocol Suit",
        details: [
          "Top: White formal shirt or blouse",
          "Bottom: Black formal trouser",
          "Overcoat: Black formal blazer / coat",
          "Shoes: Black closed formal shoes"
        ]
      },
      {
        name: "OPTION 3 – Customized VIP Costume",
        details: [
          "Official approved design only",
          "Must reflect: Institutional dignity, formal protocol image, and high-level professionalism"
        ]
      }
    ],
    appearance: [
      "Strict grooming (neat, elegant, minimal styling)",
      "Hair tied neatly (no loose styling during duty)",
      "No heavy makeup or bright colors",
      "Minimal accessories only",
      "ID card visible at chest level"
    ]
  },
  "VIP Ushers (MALE)": {
    desc: "Protocol Handling, VIP Escort, and high discipline zone management.",
    dressOptions: [
      {
        name: "OPTION 1 - Protocol Look",
        details: [
          "Shirt: Crisp white formal dress shirt",
          "Trouser: Well-tailored black formal trousers",
          "Belt: Formal black leather belt",
          "Shoes: Polished black formal shoes"
        ]
      },
      {
        name: "OPTION 2 – Formal Western Protocol Suit",
        details: [
          "Suit: Complete formal matching protocol suit",
          "Top: White formal dress shirt",
          "Tie: Official institutional or formal solid color tie",
          "Shoes: Polished closed formal shoes"
        ]
      },
      {
        name: "OPTION 3 – Customized VIP Costume",
        details: [
          "Official approved design only",
          "Must reflect: Institutional dignity, formal protocol image, and high-level professionalism"
        ]
      }
    ],
    appearance: [
      "Strict grooming (neatly styled hair, clean-shaven or trimmed)",
      "Confident, upright, and highly disciplined posture",
      "Professional watch only (no flashy items)",
      "ID card visible at chest level"
    ]
  },
  "ENTRY | SEATING | AISLE | BACKSTAGE & EXIT USHERS": {
    desc: "The core ushering team handling Gate Entry, Hall Seating, Flow Control along aisles, Backstage Support, and Exit flow management for all attendees.",
    dressOptions: [
      {
        name: "Formal Corporate (Office) Attire",
        details: [
          "Top: Crisp White Shirt or Formal Blouse",
          "Bottom: Formal Black Trousers / Pants",
          "Footwear: Closed Black Shoes or Black Formal Heels"
        ]
      }
    ],
    appearance: [
      "Professional grooming and neat styling",
      "Highly approachable and active demeanor",
      "Visible ID badge at all times"
    ]
  }
};

const structuredServices = [
  {
    id: "C1", category: "Event Operations & Guest Management", icon: ClipboardCheck,
    desc: "Ensuring smooth event execution through professional registration, floor management, seating coordination, ushering, and security services.",
    hideSelectAll: true,
    subCategories: [
      { 
        name: "Floor Management", 
        desc: "Ensuring seamless coordination and operational excellence throughout the event.", 
        isFloorItem: true, 
        items: [
          "Stage Management & Ceremony Flow", 
          "Seating Management", 
          "Procession & Line-Up Control", 
          "Ushering & Guidance Team", 
          "Registration & Entry Control", 
          "Queue & Holding Area Management", 
          "Security & Access Control", 
          "Backstage Coordination", 
          "Communication System (Floor Control)", 
          "Emergency & Crowd Control"
        ] 
      },
      { 
        name: "Registration", 
        desc: "Efficient and organized attendee registration for a smooth guest experience.", 
        isStackedList: true, 
        items: ["Student Seat Number Allocation and Registration", "Distribution of Guest & Parent Entrance Passes", "Distribution of Refreshment Tokens", "Distribution of Student Cloaks & Garlands"] 
      },
      { 
        name: "Seat Arrangement", 
        desc: "Strategic seating solutions designed for comfort, order, and protocol compliance.", 
        isStackedList: true, 
        items: [
          "Student Seating Arrangement",
          "Guest & Parent Seating Arrangement",
          "Student Procession (Perahara) Arrangement",
          "Award Receiving Arrangements & Time Management"
        ]
      },
      { 
        name: "Usher Service", 
        desc: "Professional guest guidance and assistance from arrival to departure.", 
        isUsherItem: true,
        nestedGroups: [
          { title: "STAGE USHERS (FEMALE)", hideTitleInPill: true, hasCounters: true, options: ["Formal Black Dress", "Saree with Jacket", "Customized Official Costume"] },
          { title: "VIP USHERS (FEMALE)", hideTitleInPill: true, hasCounters: true, options: ["Saree Protocol Look", "Formal Western Protocol Suit (Female)", "Customized VIP Costume (Female)"] },
          { title: "VIP Ushers (MALE)", hideTitleInPill: true, hasCounters: true, options: ["Protocol Look (White Shirt & Black Trouser)", "Formal Western Protocol Suit (Male)", "Customized VIP Costume (Male)"] },
          { title: "ENTRY | SEATING | AISLE | BACKSTAGE & EXIT USHERS", desc: "(MALE & FEMALE)", hideTitleInPill: true, hasCounters: true, options: ["Formal Corporate (Office) Attire"] }
        ]
      },
      { 
        name: "Security & Bouncer service", 
        desc: "Reliable crowd management and security services for a safe event environment.", 
        isCounterItems: true, 
        isSecurityItem: true, 
        items: ["Main Gate Security", "Crowd Control Bouncers", "VIP & Protocol Security", "Stage Security / Front-of-Stage Guards", "Backstage Security", "Perimeter / External Security", "Escort & Movement Security", "Emergency Response Security"] 
      }
    ]
  },
  {
    id: "C2", category: "Photography, Videography & Digital Experiences", icon: Camera,
    desc: "Capturing every memorable moment with professional photography, videography, drone coverage, and student photography solutions.",
    hideSelectAll: true,
    subCategories: [
      { isSectionHeader: true, title: "Event Photography", iconName: "Camera" },
      { 
        name: "Event Photography Coverage", 
        desc: "Capturing timeless moments with professional photography services", 
        items: ["Full Event Coverage", "Fully Edited Highlight Photos", "Group Photo"] 
      },
      { 
        name: "Student’s Photo Package", 
        desc: "Comprehensive graduation photography solutions tailored for students.", 
        packages: [
          { id: "P1", name: "Photo Package 1", features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”"] },
          { id: "P2", name: "Photo Package 2", features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x15”"] },
          { id: "P4", name: "Custom Photo Package", features: ["Build your own customized selection"], isCustom: true }
        ],
        nestedGroups: [
         { title: "Select Photo Options", desc: "You selected the Custom Package. Please select your preferred options below.", dependsOn: "Custom Photo Package", hideTitleInPill: true, options: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x15”", "Couple Photo - 12”x15”", "Group Photo - Soft Copy - 12”x18”"] }
        ]
      },
      { 
        name: "Embossed Photo Mount Print", 
        desc: "Enhance your graduation or event photographs with a premium Embossed Photo Mount Print."
      },
      {
        name: "Special Photo Packages",
        desc: "Premium graduation memory packages tailored for special moments and family portraits.",
        packages: [
          { id: "SP1", name: "Special Photo Package 1", features: ["Stage photo - 16”x19”", "Full | Bust Photo - 16”x19”", "Family Photo - 16”x19”", "Group Photo (Soft Copy)"] },
          { id: "SP2", name: "Special Photo Package 2", features: ["Stage photo - 12”x15”", "Full | Bust Photo - 16”x19”", "Family Photo - 12”x15”", "Group Photo (Soft Copy)"] }
        ]
      },
      { 
        name: "Photo Backdrops", 
        desc: "Professionally designed backdrops for memorable photographs and branding opportunities.", 
        nestedGroups: [{ title: "Quantity", hideTitleInPill: true, hasCounters: true, counterLimits: { "Custom Themed Photo Backdrop | Selfie Background": 10 }, options: ["Custom Themed Photo Backdrop | Selfie Background"] }] 
      },
      
      { isSectionHeader: true, title: "Event Videography", iconName: "Video" },
      { 
        name: "Event Videography Coverage", 
        desc: "Producing high-quality visual stories that preserve every special moment", 
        items: ["Full Event Coverage", "Fully Edited Highlight video"] 
      },
      { 
        name: "Select Add-Ons", 
        items: ["Live Streaming on FB & YouTube", "Fully Edited Guest Speeches", "Fully Edited Review and Testimonial video clips"] 
      },
    {
        isGrandHeader: true,
        title: "Interactive Event Experiences & Special Attractions",
        desc: "Creating memorable guest engagement through interactive photo booths and video booths."
      },
      { isSectionHeader: true, title: "Photo Booths", iconName: "Camera" },
      { 
        name: "Photo Booth Duration", 
        nestedGroups: [{ title: "Booth Duration", singleSelect: true, hideTitleInPill: true, options: ["04-Hour Package", "Full-Day Package"] }] 
      },

      { name: "Mirror Photo Booth", desc: "An interactive photo experience that combines entertainment with elegance.", isPhotoBoothItem: true, nestedGroups: [{ title: "Print Option", singleSelect: true, hideTitleInPill: true, options: ["Without Print", "With Print"] }, { title: "Print Size", options: ["Passport - ( 2\" x 3\" )", "4R - ( 4\" x 6\" )", "5R - ( 5\" x 7\" )", "6R - ( 6\" x 8\" )"], dependsOn: "With Print" }] },
      { name: "Instant Sharing DSLR Photo Booth", desc: "Professional-quality photos instantly delivered for immediate sharing and engagement.", isPhotoBoothItem: true, nestedGroups: [{ title: "Print Option", singleSelect: true, hideTitleInPill: true, options: ["Without Print", "With Print"] }, { title: "Print Size", options: ["4R - ( 4\" x 6\" )", "6R - ( 6\" x 8\" )"], dependsOn: "With Print" }] },
      { name: "Instant share iPad photo booth", desc: "Fast, fun, and interactive photo experiences with instant digital sharing.", isPhotoBoothItem: true, items: ["Include iPad Photo Booth"] },
      { name: "AI Photo Booth", desc: "Innovative AI-powered photography that transforms guest experiences into unique creations.", isPhotoBoothItem: true, items: ["Include AI Photo Booth"] },

      { isSectionHeader: true, title: "Video Booths", iconName: "Video" },
      { name: "Video Booth Duration", nestedGroups: [{ title: "Booth Duration", singleSelect: true, hideTitleInPill: true, options: ["04-Hour Package", "Full-Day Package"] }] },
      { name: "360 Video Booth", desc: "Immersive 360° video experiences that create unforgettable event memories.", isVideoBoothItem: true, items: ["Standard Video Booth", "Advanced Video Booth", "7'x3' Matte Flex Print Branding Boards"] },
      { name: "SLO-MO Video Booth", desc: "Capturing exciting moments in stunning cinematic slow motion.", isVideoBoothItem: true, nestedGroups: [{ title: "Lighting Backdrop", hideTitleInPill: true, options: ["Include SLO-MO Video Booth", "With Lighting Backdrop"] }] },

      { isSectionHeader: true, title: "Drone Videography", iconName: "Video" },
      { name: "Drone Video Coverage", desc: "Elevate your event coverage with spectacular aerial cinematography.", items: ["Fully Edited Highlight video"], isDrone: true, hasInfoIcon: true },
      { name: "FLOWER DROPPING DRONES", desc: "A spectacular aerial presentation that adds prestige and celebration to special occasions.", items: ["30KG Flower Dropping Drone", "100KG Flower Dropping Drone"], nestedGroups: [{ title: "Bags for 30KG Drone", dependsOn: "30KG Flower Dropping Drone", singleSelect: true, hideTitleInPill: true, options: ["30KG Flower Bag", "20KG Flower Bag"] }, { title: "Bags for 100KG Drone", dependsOn: "100KG Flower Dropping Drone", hideTitleInPill: true, hasCounters: true, counterLimits: { "30KG Flower Bag": 3, "20KG Flower Bag": 5 }, options: ["30KG Flower Bag", "20KG Flower Bag"] }], isDrone: true, hasInfoIcon: true },
      { name: "LED Screen Display Drone Coverage", desc: "Advanced drone technology creating dynamic aerial visual displays and brand messaging.", items: ["18FT LED Screen – 1 Time Fly", "30FT Large Sri Lankan LED Screen – 1 Time Fly"], isDrone: true, hasInfoIcon: true },
      { 
        name: "Color Smoke Effects", 
        desc: "Add vibrant and cinematic color smoke effects to elevate your event atmosphere.", 
        isCounterItems: true, 
        items: ["Color Smoke"] 
      },
      { name: "Drone Show", desc: "A breathtaking synchronized aerial performance that transforms the night sky into a memorable visual spectacle.", items: ["Include Drone Show"], isDrone: true }
    ]
  },
  {
    id: "C3", category: "Audio Visual & Technology Solutions", icon: Speaker,
    desc: "Enhancing audience engagement through cutting-edge LED display systems, laser mapping, and event technology solutions.",
    hideSelectAll: true,
    subCategories: [
      { 
        name: "LED Video Wall", 
        desc: "Dynamic visual displays that enhance audience engagement and event impact.", 
        nestedGroups: [{ title: "LED Video Wall", desc: "P3 LED Video Wall on 3' Hight platform | Live on Wall | Arena Play Back", options: ["50’x12’", "40’x10’", "30’x10’", "20’x10’"], moreOptions: ["8'x6'", "12'x7'", "15'x7'", "16'x10'", "12'x10'"], hasCustom: true }] 
      },
      { 
        name: "Laser Mapping", 
        desc: "Immersive visual technology that transforms venues into spectacular experiences.", 
        items: ["Single laser 3 machines"],
        packages: [
          { id: "LM_SILVER", name: "Silver Package", features: ["Basic projection mapping", "Opening animation", "University or company branding"] },
          { id: "LM_GOLD", name: "Gold Package", features: ["Custom 3D content", "Multiple projection surfaces", "Synchronized audio effects"] },
          { id: "LM_PLATINUM", name: "Platinum Package", features: ["Large-scale immersive experience", "Multiple high-brightness projectors", "Laser effects, lighting integration, and special effects"] }
        ]
      },
      { 
        name: "Sounds & Lighting Service", 
        desc: "Professional audio and lighting solutions that enhance the atmosphere and impact of every event.", 
        items: ["Professional Sound System Setup", "Dynamic Stage Lighting Setup"] 
      }
    ]
  },
  {
    id: "C4", category: "Stage & Venue Décor", icon: LayoutTemplate,
    desc: "Creating visually stunning event environments with elegant stage décor, backdrops, and venue styling.",
    hideSelectAll: true,
    subCategories: [
      { 
        name: "Stage Platform", 
        desc: "Safe, durable, and professionally constructed staging solutions for events of any scale.",
        hasDimensionsInput: true 
      },
      { 
        name: "Stage Decoration", 
        desc: "Creative stage designs that elevate the event atmosphere and brand presence.", 
        packages: [
          { id: "SF1", name: "Package 1 - Fresh Flowers", features: ["Stage Edge Deco", "Podium Deco", "Oil Lamp Deco", "Head Table Deco"] },
          { id: "SF2", name: "Package 2 - Artificial Flowers", features: ["Stage Edge Deco", "Podium Deco", "Head Table Deco", "Oil Lamp Deco"] },
          { id: "SF3", name: "Package 3 - Mix Flowers", features: ["Stage Edge Deco", "Podium Deco", "Head Table Deco", "Oil Lamp Deco"] }
        ],
        nestedGroups: [{ title: "Add-Ons", hideTitleInPill: true, hasCounters: true, options: ["Flower Garland (Orchid)", "Flower Boutique", "Flower Basket"] }] 
      },
      { name: "Digital Welcome Pandol", desc: "Eye-catching digital welcome displays that create a powerful first impression.", items: ["Include Digital Welcome Pandol"] },
      { name: "55” on stage LED TV", desc: "High-definition display solutions for presentations, branding, and live event content.", items: ["Include 55” LED TV"] },
      { name: "Digital Plasma Podium", desc: "Modern digital podiums that combine functionality, technology, and professional presentation.", items: ["Include Digital Plasma Podium"] }
    ]
  },
  {
    id: "C5", category: "Ceremony & Protocol Services", icon: ClipboardCheck,
    desc: "Delivering prestigious ceremonial experiences through traditional protocol elements, bearers, and formal procession management.",
    hideSelectAll: true,
    subCategories: [
      { name: "Mace Bearer", desc: "A prestigious ceremonial element symbolizing authority and tradition.", items: ["Mace bearer | Sergeant-at-Arms (With Costume)"] },
      { name: "Murayudha Bearer", desc: "Traditional ceremonial representation adding grandeur to formal occasions.", nestedGroups: [{ title: "Quantity", hasCounters: true, hideTitleInPill: true, options: ["Murayudha Bearers"]}] },
      { name: "Sesath Bearer", desc: "A distinguished cultural protocol feature enhancing ceremonial prestige.", nestedGroups: [{ title: "Quantity", hasCounters: true, hideTitleInPill: true, options: ["Sesath Bearers"]}] },
      { name: "Muthukuda Bearer", desc: "A symbolic ceremonial tradition reflecting honor and cultural heritage.", nestedGroups: [{ title: "Quantity", hasCounters: true, hideTitleInPill: true, options: ["Muthukuda Bearers"]}] }
    ]
  },
  {
    id: "C6", category: "Entertainment & Cultural Performances", icon: Music,
    desc: "Adding vibrancy and cultural elegance with professional performances, Kandyan dance acts, and entertainment segments.",
    hideSelectAll: true,
    subCategories: [
      {
        name: "Kandyan (WES) Dance",
        desc: "Traditional Sri Lankan cultural performances showcasing heritage and elegance.",
        packages: [
          { id: "K1", name: "Package 1", features: ["Dancers - 04", "Bera - 02", "Conch Blower - 01"] },
          { id: "K2", name: "Package 2", features: ["Dancers - 06", "Bera - 02", "Conch Blower - 01"] },
          { id: "K3", name: "Package 3", features: ["Dancers - 08", "Bera - 04", "Conch Blower - 01"] }
        ]
      },
      {
        name: "Dancing Item",
        desc: "Captivating performances that add energy and entertainment to the event.",
        packages: [
          { id: "GD1", name: "Package 1", features: ["Puja Dance"] },
          { id: "GD2", name: "Package 2", features: ["Puja Dance", "01 Additional Dance Act"] },
          { id: "GD3", name: "Package 3", features: ["Puja Dance", "02 Additional Dance Acts"] },
          { id: "GD4", name: "Package 4", features: ["Custom Selection (Build your own)"], isCustom: true }
        ],
        nestedGroups: [
          { title: "Select 01 Dance Act", desc: "You got Package 2. Please select exactly 1 additional dance act from below.", dependsOn: "Dancing Item: Package 2", hideTitleInPill: true, maxSelect: 1, options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"] },
          { title: "Select 02 Dance Acts", desc: "You got Package 3. Please select exactly 2 additional dance acts from below.", dependsOn: "Dancing Item: Package 3", hideTitleInPill: true, maxSelect: 2, options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"] },
          { title: "Custom Dance Acts", desc: "You got Package 4. Please select custom dance acts.", dependsOn: "Dancing Item: Package 4", hideTitleInPill: true, options: ["Light Performance Dance", "Latin Dance", "Indian Dance", "Solo Dance", "Belly Dance", "Mask Dance"] }
        ]
      },
      { name: "Comedian Act", items: ["Include Comedian Act"] },
      { name: "Instrumental Items", items: ["Drum Orchestra", "Drum Orchestra with Violin & Flute"] }
    ]
  },
  {
    id: "C7", category: "Event Hosting & Presentation", icon: Mic,
    desc: "Engaging audiences and ensuring seamless event flow with experienced comperes and master of ceremonies services.",
    hideSelectAll: true,
    subCategories: [
      { 
        name: "EMCEE/ Compere (Master of Ceremony)", 
        desc: "Dynamic and professional event hosting that ensures seamless program flow, audience engagement, and memorable event experiences.", 
        nestedGroups: [{ title: "Compere", hideTitleInPill: true, options: ["Male", "Female"] }] 
      },
      { 
        name: "Review and Testimonial Interview Host", 
        desc: "Professional interview hosting that captures authentic experiences, success stories, and valuable feedback from participants and guests.", 
        nestedGroups: [{ title: "Host Option", hideTitleInPill: true, singleSelect: true, options: ["Male", "Female"] }] 
      }
    ]
  },
  {
    id: "C8", category: "Ceremony Branding Elements", icon: Printer,
    desc: "Enhancing institutional identity and event prestige through flags, banners, and ceremonial branding displays.",
    hideSelectAll: true,
    subCategories: [
      {
        name: "Graduation Teddy",
        items: ["Mini Graduation Teddy – 20 cm", "Premium Graduation Teddy Bear – 40 cm", "Jumbo Convocation Teddy – 90 cm"],
        nestedGroups: [{ title: "Colors", hideTitleInPill: true, options: ["Pink", "Blue", "Brown", "Ash", "Cream", "Red", "Yellow"] }]
      },
      {
        name: "Flag Printing",
        desc: "High-quality custom flag printing solutions for branding, protocol, and ceremonial requirements.",
        items: ["Stage Flags - 6’x4’", "Promo Flags - 10’x2.5’"]
      },
      {
        name: "Flag Stands",
        desc: "Premium display stands designed to showcase flags with elegance and professionalism.",
        items: ["Promo Flag Poles", "Standard Flag Stands"]
      },
      {
        name: "Pouch and Certificate Printing",
        desc: "Professionally crafted certificates and presentation pouches that celebrate achievement and recognition.",
        items: ["Standard pouch - A4 size (23 × 31 cm)", "Premium PU leather", "Hard cover padded - 24 × 32 cm"],
        nestedGroups: [{ title: "Material", hideTitleInPill: true, options: ["Velvet finish", "Rexine", "PU leather", "Hardboard laminated", "Magnetic flap folders"] }]
      },
      {
        name: "Token of Appreciation & Souvenir Printing",
        desc: "Customized medals and souvenirs designed to create meaningful and lasting commemorative value.",
        items: ["Metal Plaque in Red Velvet Box", "Glass Plaque"]
      }
    ]
  },
  {
    id: "C9", category: "Graduation & Academic Regalia Services", icon: GraduationCap,
    desc: "Providing premium academic cloaks, scrolls, and graduation essentials to uphold the dignity of academic ceremonies.",
    hideSelectAll: true,
    subCategories: [
      { name: "Graduation Cloaks (Academic Gowns)", desc: "Premium academic regalia and ceremonial essentials for graduation events.", items: ["Black", "Ash", "Blue", "Maroon", "Red"] },
      { name: "Graduation Scrolls", desc: "A prestigious symbol of academic excellence and accomplishment.", items: ["Red", "Blue", "Maroon", "Black", "Green", "Gold", "Silver"] },
      { name: "Academic Hoods", desc: "Professionally tailored hoods representing academic distinction and honor.", items: ["Include Academic Hoods"] },
      { name: "Graduation Caps", desc: "Classic ceremonial caps designed for a distinguished graduation experience.", items: ["Include Graduation Caps"] },
      { name: "Academic Regalia Accessories", desc: "Essential regalia components that uphold the tradition and prestige of academic ceremonies.", items: ["Garlands - Purple", "Garlands - Red", "Garlands - Yellow", "Garlands - Pink"] }
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
  const [platformDims, setPlatformDims] = useState({ width: "", length: "", height: "" });
  const [ledDims, setLedDims] = useState({ width: "", height: "" });

  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    const savedQty = localStorage.getItem("skd_services_qty");
    const savedDims = localStorage.getItem("skd_services_dims");
    const savedLedDims = localStorage.getItem("skd_services_led_dims"); 
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
    if (savedQty) {
      try { setQuantities(JSON.parse(savedQty)); } catch (e) { console.error("Error parsing qty"); }
    }
    if (savedDims) { try { setPlatformDims(JSON.parse(savedDims)); } catch (e) { } }
    if (savedLedDims) { try { setLedDims(JSON.parse(savedLedDims)); } catch { } }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
    localStorage.setItem("skd_services_qty", JSON.stringify(quantities)); 
    localStorage.setItem("skd_services_dims", JSON.stringify(platformDims)); 
    localStorage.setItem("skd_services_led_dims", JSON.stringify(ledDims)); 
  }, [cart, quantities, platformDims, ledDims]);
  
  const toggleCart = (itemFullString: string, isSingleSelect: boolean = false, categoryPrefix: string = "") => {
    setCart(prev => {
      let newCart = [...prev];

      const regItems = [
        "Event Operations & Guest Management - Registration: Student Seat Number Allocation and Registration", 
        "Event Operations & Guest Management - Registration: Distribution of Guest & Parent Entrance Passes", 
        "Event Operations & Guest Management - Registration: Distribution of Refreshment Tokens", 
        "Event Operations & Guest Management - Registration: Distribution of Student Cloaks & Garlands"
      ];
      if (regItems.includes(itemFullString)) {
        const isSelected = regItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !regItems.includes(i));
        regItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      const floorItems = [
        "Event Operations & Guest Management - Floor Management: Stage Management & Ceremony Flow", 
        "Event Operations & Guest Management - Floor Management: Seating Management", 
        "Event Operations & Guest Management - Floor Management: Procession & Line-Up Control", 
        "Event Operations & Guest Management - Floor Management: Ushering & Guidance Team", 
        "Event Operations & Guest Management - Floor Management: Registration & Entry Control", 
        "Event Operations & Guest Management - Floor Management: Queue & Holding Area Management", 
        "Event Operations & Guest Management - Floor Management: Security & Access Control", 
        "Event Operations & Guest Management - Floor Management: Backstage Coordination", 
        "Event Operations & Guest Management - Floor Management: Communication System (Floor Control)", 
        "Event Operations & Guest Management - Floor Management: Emergency & Crowd Control"
      ];
      if (floorItems.includes(itemFullString)) {
        const isSelected = floorItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !floorItems.includes(i));
        floorItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 2. Seating Arrangements Auto-Select (C1)
      const seatingItems = [
        "Event Operations & Guest Management - Seat Arrangement: Student Seating Arrangement", 
        "Event Operations & Guest Management - Seat Arrangement: Guest & Parent Seating Arrangement",
        "Event Operations & Guest Management - Seat Arrangement: Student Procession (Perahara) Arrangement", 
        "Event Operations & Guest Management - Seat Arrangement: Award Receiving Arrangements & Time Management"
      ];
      if (seatingItems.includes(itemFullString)) {
        const isSelected = seatingItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !seatingItems.includes(i));
        seatingItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 3. Event Photography Coverage Auto-Select (C2)
      if (itemFullString.startsWith("Photography, Videography & Digital Experiences - Event Photography Coverage: ")) {
        const coverageItems = [
          "Photography, Videography & Digital Experiences - Event Photography Coverage: Full Event Coverage",
          "Photography, Videography & Digital Experiences - Event Photography Coverage: Fully Edited Highlight Photos",
          "Photography, Videography & Digital Experiences - Event Photography Coverage: Group Photo"
        ];
        const isSelected = coverageItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !coverageItems.includes(i));
        coverageItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 4. Event Videography (Coverage + Highlight) Auto-Select (C2)
      if (itemFullString === "Photography, Videography & Digital Experiences - Event Videography Coverage: Full Event Coverage" || itemFullString === "Photography, Videography & Digital Experiences - Event Videography Coverage: Fully Edited Highlight video") {
        const videoItems = [
          "Photography, Videography & Digital Experiences - Event Videography Coverage: Full Event Coverage",
          "Photography, Videography & Digital Experiences - Event Videography Coverage: Fully Edited Highlight video"
        ];
        const isSelected = videoItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !videoItems.includes(i));
        videoItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 5. Booth Duration Single Select Logic (C2)
      if (itemFullString === "Photography, Videography & Digital Experiences - Video Booth Duration: Booth Duration - 04-Hour Package" || itemFullString === "Photography, Videography & Digital Experiences - Video Booth Duration: Booth Duration - Full-Day Package") {
        let cleaned = prev.filter(i => i !== "Photography, Videography & Digital Experiences - Video Booth Duration: Booth Duration - 04-Hour Package" && i !== "Photography, Videography & Digital Experiences - Video Booth Duration: Booth Duration - Full-Day Package");
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }

      // 5. Photo Booth Duration Single Select Logic (C2)
      if (itemFullString === "Photography, Videography & Digital Experiences - Photo Booth Duration: Booth Duration - 04-Hour Package" || itemFullString === "Photography, Videography & Digital Experiences - Photo Booth Duration: Booth Duration - Full-Day Package") {
        let cleaned = prev.filter(i => i !== "Photography, Videography & Digital Experiences - Photo Booth Duration: Booth Duration - 04-Hour Package" && i !== "Photography, Videography & Digital Experiences - Photo Booth Duration: Booth Duration - Full-Day Package");
        if (prev.includes(itemFullString)) return cleaned;
        cleaned.push(itemFullString);
        return cleaned;
      }

      // 6. Mirror & DSLR Booth Logic
      if (itemFullString.includes("Mirror Photo Booth: Print Option") || itemFullString.includes("Instant Sharing DSLR photo booth: Print Option")) {
        const isMirror = itemFullString.includes("Mirror Photo Booth");
        const boothName = isMirror ? "Mirror Photo Booth" : "Instant Sharing DSLR photo booth";
        
        let cleaned = prev.filter(i => 
          !i.includes(`${boothName}: Print Option - Without Print`) && 
          !i.includes(`${boothName}: Print Option - With Print`)
        );
        if (itemFullString.includes("Without Print")) {
          cleaned = cleaned.filter(i => !i.includes(`${boothName}: Print Size`));
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
    setQuantities({});
    setPlatformDims({ width: "", length: "", height: "" }); 
    setLedDims({ width: "", height: "" }); 
    localStorage.removeItem("skd_services_cart");
    localStorage.removeItem("skd_services_qty");
    localStorage.removeItem("skd_services_dims");
    localStorage.removeItem("skd_services_led_dims");
  };

  // Helper function to get ALL selectable strings for a given category
  const getAllItemsInCategory = (cat: any) => {
    const allItems: string[] = [];
    
    // Direct items
    if (cat.items) {
      cat.items.forEach((item: string) => {
        allItems.push(`${cat.category}: ${item}`);
      });
    }
    // --- (පියවර 3 මෙතන තියෙනවා) C2 එකේ තියෙන Items select all වෙන්න මේක ඕනේ ---
    if (cat.id === "C2") {
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
    const allItems = getAllItemsInCategory(cat);
    const areAllSelected = allItems.length > 0 && allItems.every((item) => cart.includes(item));

    if (areAllSelected) {
      setCart((prev) => prev.filter((cartItem) => 
        !cartItem.startsWith(`${cat.category}:`) && 
        !cartItem.startsWith(`${cat.category} - `)
      ));
    } else {
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

  const SelectablePill = ({ label, displayLabel, categoryName, isSingleSelect = false, groupPrefix = "", disabled = false, isStacked = false }: { label: string, displayLabel?: string, categoryName: string, isSingleSelect?: boolean, groupPrefix?: string, disabled?: boolean, isStacked?: boolean }) => {
    const fullString = `${categoryName}: ${label}`;
    const isSelected = cart.includes(fullString);
    const prefixToClear = groupPrefix ? `${categoryName}: ${groupPrefix}` : `${categoryName}:`;
    const showText = displayLabel || label; 

    return (
      <motion.button
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={() => !disabled && toggleCart(fullString, isSingleSelect, prefixToClear)}
        disabled={disabled}
        className={`flex items-start sm:items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border transform-gpu text-left h-auto ${isStacked ? "w-full" : "w-full sm:w-auto"} ${
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

  const CounterPill = ({ label, displayLabel, categoryName, maxLimit, isStacked = false }: { label: string, displayLabel?: string, categoryName: string, maxLimit?: number, isStacked?: boolean }) => {
    const fullString = `${categoryName}: ${label}`;
    const qty = quantities[fullString] || 0;
    const showText = displayLabel || label;

    const is100KGDosage = categoryName.includes("FLOWER DROPPING DRONES") && fullString.includes("Bags for 100KG Drone");
    let isMaxed = false;
    
    if (maxLimit && qty >= maxLimit) isMaxed = true;
    
    if (is100KGDosage) {
        const current30 = quantities[`${categoryName}: Bags for 100KG Drone - 30KG Flower Bag`] || 0;
        const current20 = quantities[`${categoryName}: Bags for 100KG Drone - 20KG Flower Bag`] || 0;
        const currentWeight = (current30 * 30) + (current20 * 20);
        const thisWeight = fullString.includes("30KG") ? 30 : 20;
        if (currentWeight + thisWeight > 100) isMaxed = true; 
    }

    const handleCount = (delta: number) => {
      if (delta > 0 && isMaxed) return; 
      
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
      <div className={`inline-flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-1.5 sm:py-1.5 rounded-xl sm:rounded-full border transition-all duration-300 ${isStacked ? "w-full" : "w-full sm:w-auto"} ${qty > 0 ? 'bg-[#a40049]/5 border-[#a40049] shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}>
         <div className="flex flex-col">
           <span className={`text-xs sm:text-sm font-bold leading-snug ${qty > 0 ? 'text-[#a40049]' : 'text-gray-700'}`}>
             {showText}
           </span>
         </div>
         
         <div className="flex items-center gap-2 sm:gap-3 bg-white border border-gray-200 rounded-full p-0.5 px-1 sm:px-1.5 shadow-sm shrink-0">
            <button 
              onClick={() => handleCount(-1)} 
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-extrabold transition-colors text-sm sm:text-base active:scale-90"
            >
              -
            </button>
            <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-extrabold text-gray-900">
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
      <section className="pb-12 md:pb-20 pt-8 md:pt-10 bg-gray-50/50 relative">
        <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8">

         {/* SINGLE COLUMN LAYOUT FOR A PREMIUM LOOK */}
         <div className="flex flex-col gap-8 md:gap-10">
            {structuredServices.map((cat, index) => {
              const Icon = cat.icon;
              const allCategoryItems = getAllItemsInCategory(cat);
              const areAllSelected = allCategoryItems.length > 0 && allCategoryItems.every((item) => cart.includes(item));

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={cat.id} 
                  className="relative group rounded-[2rem] sm:rounded-[2.5rem] p-[2px] transition-all duration-500 hover:-translate-y-2 transform-gpu shadow-md hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.2)] w-full"
                >
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-gray-200/50 to-gray-100 group-hover:from-[#ff4d94] group-hover:to-[#a40049] transition-colors duration-500" />
                  
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-[1.9rem] sm:rounded-[2.4rem] px-5 py-6 sm:px-8 sm:py-9 flex flex-col h-full border border-white">  
                    
                    {/* Header Section */}
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#a40049]/10 to-[#ff4d94]/5 border border-[#a40049]/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#a40049]" />
                          </div>
                          <h3 className="text-xl sm:text-[1.65rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 leading-tight">
                            {cat.category}
                          </h3>
                        </div>
                        
                        {!cat.hideSelectAll && (
                          <button 
                            onClick={() => handleSelectAllCategory(cat)}
                            className={`flex items-center self-start sm:self-auto gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 border shadow-sm ${
                              areAllSelected 
                                ? "bg-red-50 text-red-600 border-red-100 hover:bg-red-100" 
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {areAllSelected ? (
                              <>
                                <span>Deselect All</span>
                                <Trash2 className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>Select All</span>
                                <CheckCircle2 className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {cat.desc && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-[#a40049]/[0.03] to-transparent border border-[#a40049]/[0.06] rounded-2xl relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#a40049] to-[#ff4d94] rounded-l-2xl" />
                          <p className="text-[13px] sm:text-[14px] text-gray-500 font-semibold leading-relaxed pl-3">
                            {cat.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow space-y-5">
                      
                      {/* Direct Items */}
                      {(cat as any).items && (cat as any).items.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                          {(cat as any).items.map((item: string) => (
                            <SelectablePill 
                              key={item} 
                              label={item} 
                              categoryName={cat.category} 
                              isSingleSelect={(cat as any).singleSelect}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Direct Nested Groups */}
                      {(cat as any).nestedGroups && (cat as any).nestedGroups.length > 0 && (
                        <div className="space-y-4">
                          {(cat as any).nestedGroups.map((nested: any) => (
                            <div key={nested.title} className="bg-[#FAFAFA] border border-gray-200/60 p-4 sm:p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                <h5 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                                  Select {nested.title}
                                </h5>
                              </div>
                              <div className="flex flex-wrap gap-2">
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

                      {cat.subCategories && (
                        <div className="space-y-5">
                          {cat.subCategories.map((sub: any, subIdx: number) => {

                           if (sub.isGrandHeader) {
                              return (
                                <div key={`grand-${subIdx}`} className="pt-4 pb-1 w-full border-l-[3px] border-[#a40049] pl-3.5 my-2">
                                  <h4 className="text-xs sm:text-[14px] font-extrabold text-gray-900 uppercase tracking-wider">
                                    {sub.title}
                                  </h4>
                                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                                    {sub.desc}
                                  </p>
                                </div>
                              );
                            }

                            if (sub.isSectionHeader) {
                              return (
                                <div key={`header-${subIdx}`} className="flex items-center gap-3 pt-5 pb-2 w-full">
                                  <div className="w-9 h-9 rounded-xl bg-[#a40049]/10 flex items-center justify-center shrink-0 shadow-inner">
                                    {sub.iconName === "Video" ? <Video className="w-4 h-4 text-[#a40049]" /> : <Camera className="w-4 h-4 text-[#a40049]" />}
                                  </div>
                                  <h4 className="text-[14px] sm:text-[15px] font-extrabold text-gray-800 uppercase tracking-wider">{sub.title}</h4>
                                  <div className="flex-grow h-[2px] bg-gradient-to-r from-gray-200 to-transparent ml-2" />
                                </div>
                              );
                            }

                            // --- Booth Disable Logic ---
                            let disableBooths = false;
                            if (cat.id === "C2" && sub.isPhotoBoothItem) {
                              const isPhotoDurationSelected = cart.some(i => i.startsWith("Photography, Videography & Digital Experiences - Photo Booth Duration:"));
                              disableBooths = !isPhotoDurationSelected;
                            }
                            if (cat.id === "C2" && sub.isVideoBoothItem) {
                              const isVideoDurationSelected = cart.some(i => i.startsWith("Photography, Videography & Digital Experiences - Video Booth Duration:"));
                              disableBooths = !isVideoDurationSelected;
                            }

                            const isDisabledContainer = disableBooths;

                            return (
                            <div key={sub.name} className={`bg-gray-50/50 border border-gray-200/80 p-4 sm:p-5 rounded-2xl relative transition-all duration-300 hover:bg-white hover:shadow-md ${isDisabledContainer ? 'opacity-50 grayscale-[30%] pointer-events-none' : ''}`}>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-4 sm:h-5 bg-[#a40049] rounded-full shrink-0" />
                                  <h4 className="text-sm sm:text-[15px] font-extrabold text-gray-800 uppercase tracking-wide">
                                    {sub.name}
                                  </h4>
                                </div>
                                
                                {boothDetails && boothDetails[sub.name] && (
                                  <button 
                                    onClick={() => setInfoModalData({ name: sub.name, ...boothDetails[sub.name] })}
                                    className={`w-8 h-8 rounded-full bg-[#a40049]/10 text-[#a40049] flex items-center justify-center hover:bg-[#a40049] hover:text-white transition-all shadow-sm ${disableBooths ? 'hidden' : ''}`}
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>
                                )}
                              </div>

                              {disableBooths && (
                                <p className="text-[11px] sm:text-xs text-red-500 font-bold mb-3 -mt-2 bg-red-50 inline-block px-3 py-1 rounded-md border border-red-100">
                                  Please Select Booth Duration First!
                                </p>
                              )}

                              {sub.desc && <p className="text-[12px] sm:text-[13px] text-gray-500 mb-4 -mt-1 font-medium leading-relaxed">{sub.desc}</p>}
                              
                              {/* Embossed Photo Mount Print - Colors Display */}
                              {sub.name === "Embossed Photo Mount Print" && (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 mt-2">
                                  <span className="text-[11px] sm:text-[13px] font-extrabold text-gray-800 uppercase tracking-wide">
                                    Available Colors:
                                  </span>
                                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                    {["Black", "Silver", "White", "Gold"].map((color) => (
                                      <span key={color} className="px-4 sm:px-5 py-2 bg-white border border-gray-200 text-[#a40049] text-[11px] sm:text-[13px] font-bold rounded-xl shadow-sm text-center">
                                        {color}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {/* Stage Platform Custom Inputs */}
                              {sub.hasDimensionsInput && (
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 mb-2">
                                  {["Width", "Length", "Height"].map((dim) => {
                                    const val = platformDims[dim.toLowerCase() as keyof typeof platformDims] || "";
                                    return (
                                      <div key={dim} className="relative w-full sm:w-40">
                                        <input
                                          type="text"
                                          placeholder={dim}
                                          className="border border-gray-200 rounded-xl pl-4 pr-8 py-2.5 text-sm font-bold text-gray-700 focus:border-[#a40049] outline-none w-full bg-white shadow-sm transition-all"
                                          value={val}
                                          onChange={(e) => {
                                            const rawVal = e.target.value.replace(/[^0-9.]/g, '');
                                            setPlatformDims(prev => ({ ...prev, [dim.toLowerCase()]: rawVal }));

                                            setCart(prevCart => {
                                               const cleanCart = prevCart.filter(item => !item.startsWith(`${cat.category} - Stage Platform Custom ${dim}:`));
                                               if (rawVal.trim() !== "") {
                                                  return [...cleanCart, `${cat.category} - Stage Platform Custom ${dim}: ${rawVal}ft`];
                                               }
                                               return cleanCart;
                                            });
                                          }}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px] font-extrabold pointer-events-none">
                                          ft
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Packages Cards */}
                              {sub.packages && (
                                <>
                                  <div className={`grid grid-cols-1 ${sub.name === "Laser Mapping" ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} gap-4 mb-4`}>
                                    {sub.packages.map((pkg: any) => {
                                      const fullString = `${cat.category} - ${sub.name}: ${pkg.name}`;
                                      const isSelected = cart.includes(fullString);
                                      
                                      return (
                                        <motion.div 
                                          key={pkg.id}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={() => toggleCart(fullString)}
                                          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 h-full ${isSelected ? 'bg-[#a40049]/5 border-[#a40049] shadow-md scale-[1.02]' : 'bg-white border-gray-200 hover:border-[#a40049]/30 hover:shadow-sm'}`}
                                        >
                                          <div className="flex items-center justify-between mb-3">
                                            <h6 className={`font-extrabold text-sm sm:text-[15px] ${isSelected ? 'text-[#a40049]' : 'text-gray-800'}`}>{pkg.name}</h6>
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-[#a40049] border-[#a40049]' : 'bg-white border-[#a40049]'}`}>
                                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                          </div>
                                          <ul className="space-y-2">
                                            {pkg.features.map((f: string, i: number) => (
                                              <li key={i} className="text-[11px] sm:text-[12px] text-gray-600 font-medium flex items-start gap-2 leading-snug">
                                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${isSelected ? 'bg-[#a40049]' : 'bg-gray-300'}`} />
                                                <span>{f}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                  
                                  {sub.packages.some((p: any) => p.id === "SP2" && cart.includes(`${cat.category} - ${sub.name}: ${p.name}`)) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 -mt-2">
                                      <div className="hidden sm:block"></div>
                                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                                        <p className="text-[11px] sm:text-[12px] text-[#a40049] font-bold bg-[#a40049]/10 block px-4 py-3 rounded-xl border border-[#a40049]/20 shadow-sm w-full">
                                          <span className="font-extrabold mr-1">Note:</span> For Special Photo Package 2, only the Full | Bust Photo will be mounted.
                                        </p>
                                      </motion.div>
                                    </div>
                                  )}
                                </>
                              )}

                              {sub.items && sub.items.length > 0 && !sub.packages && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className={`flex ${sub.isCounterItems || sub.isFloorItem || sub.isStackedList ? 'flex-col gap-3 w-full' : 'flex-wrap gap-2'} mb-2 pt-1`}
                                >
                                  {sub.items.map((item: string) => {
                                    
                                    // Security Counter Logic
                                    if (sub.isCounterItems) {
                                      return (
                                        <div key={item} className="flex items-center w-full gap-2">
                                          <div className="flex-grow">
                                            <CounterPill label={item} categoryName={`${cat.category} - ${sub.name}`} isStacked={true} />
                                          </div>
                                          {boothDetails && boothDetails[item] && (
                                            <button 
                                              onClick={(e) => { e.stopPropagation(); setInfoModalData({ name: item, ...boothDetails[item] }); }}
                                              className="w-8 h-8 rounded-full bg-[#a40049]/10 text-[#a40049] flex items-center justify-center hover:bg-[#a40049] hover:text-white transition-all shadow-sm shrink-0"
                                            >
                                              <Info className="w-4 h-4" />
                                            </button>
                                          )}
                                        </div>
                                      );
                                    }

                                    // Floor Management & Stacked Items Long Buttons + Info Icon
                                    if (sub.isFloorItem || sub.isStackedList) {
                                      return (
                                        <div key={item} className="flex items-center w-full gap-2">
                                          <div className="flex-grow">
                                            <SelectablePill label={item} categoryName={`${cat.category} - ${sub.name}`} isStacked={true} />
                                          </div>
                                          {boothDetails && boothDetails[item] && (
                                            <button 
                                              onClick={(e) => { e.stopPropagation(); setInfoModalData({ name: item, ...boothDetails[item] }); }}
                                              className="w-8 h-8 rounded-full bg-[#a40049]/10 text-[#a40049] flex items-center justify-center hover:bg-[#a40049] hover:text-white transition-all shadow-sm shrink-0"
                                            >
                                              <Info className="w-4 h-4" />
                                            </button>
                                          )}
                                        </div>
                                      );
                                    }

                                    return (
                                      <SelectablePill 
                                        key={item} 
                                        label={item} 
                                        categoryName={`${cat.category} - ${sub.name}`} 
                                      />
                                    );
                                  })}
                                </motion.div>
                              )}

                              {/* Nested Sub-Categories */}
                              {sub.nestedGroups && sub.nestedGroups.length > 0 && (
                                <div className="mt-5 space-y-4">
                                  {sub.nestedGroups.map((nested: any) => {
                                    
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

                                    const isDynamic = !!nested.dependsOn;
                                    const displayTitle = nested.title.startsWith("Select") ? nested.title : `Select ${nested.title}`;

                                    return (
                                    <div key={nested.title} className={`${isDynamic ? 'bg-[#a40049]/[0.04] border-[#a40049]/20' : 'bg-white border-gray-100'} border p-4 sm:p-5 rounded-2xl shadow-sm transition-colors duration-300`}>
                                      
                                      <div className="flex items-center justify-between gap-2.5 mb-2">
                                        <div className="flex items-center gap-2.5">
                                          {isDynamic && <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />}
                                          <h5 className="text-[11px] sm:text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                                            {displayTitle} {nested.maxSelect && <span className="text-[#a40049] font-extrabold ml-1">(Max: {nested.maxSelect})</span>}
                                          </h5>
                                        </div>
                                        
                                        {boothDetails && boothDetails[nested.title] && (
                                          <button 
                                            onClick={(e) => { 
                                              e.stopPropagation(); 
                                              setInfoModalData({ name: nested.title, ...boothDetails[nested.title] }); 
                                            }}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#a40049]/10 text-[#a40049] flex items-center justify-center hover:bg-[#a40049] hover:text-white transition-all shadow-sm shrink-0"
                                          >
                                            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                          </button>
                                        )}
                                      </div>
                                      
                                      {nested.desc && (
                                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                                          {nested.desc.includes('|') ? (
                                            nested.desc.split('|').map((part: string, i: number) => (
                                              <span key={i} className="text-[10px] sm:text-[11px] text-[#a40049] font-bold bg-[#a40049]/5 px-2.5 py-0.5 rounded-md border border-[#a40049]/10">
                                                {part.trim()}
                                              </span>
                                            ))
                                          ) : (
                                            <span className="text-[10px] sm:text-[11px] text-[#a40049] font-bold bg-[#a40049]/5 px-2.5 py-0.5 rounded-md border border-[#a40049]/10">{nested.desc}</span>
                                          )}
                                        </div>
                                      )}
                                      
                                     <div className={`flex mt-1 ${nested.hasCounters || nested.isStackedList ? 'flex-col gap-3 w-full' : 'flex-wrap gap-2'}`}>
                                        {nested.options.map((opt: string) => {
                                          
                                          const pillLabel = `${nested.title} - ${opt}`;
                                          const displayLbl = nested.hideTitleInPill ? opt : pillLabel;
                                          const clearPrefix = `${nested.title} -`; 
                                          
                                          if (nested.hasCounters) {
                                            const limit = nested.counterLimits ? nested.counterLimits[opt] : undefined;
                                            return (
                                              <div key={opt} className="flex items-center w-full gap-2">
                                                <div className="flex-grow">
                                                  <CounterPill label={pillLabel} displayLabel={displayLbl} categoryName={`${cat.category} - ${sub.name}`} maxLimit={limit} isStacked={true} />
                                                </div>
                                              </div>
                                            )
                                          }

                                          if (nested.isStackedList) {
                                            const isSelected = cart.includes(`${cat.category} - ${sub.name}: ${pillLabel}`);
                                            const isDisabled = nested.maxSelect && selectedCount >= nested.maxSelect && !isSelected;
                                            return (
                                              <div key={opt} className="flex items-center w-full gap-2">
                                                <div className="flex-grow">
                                                  <SelectablePill 
                                                    label={pillLabel} 
                                                    displayLabel={displayLbl}
                                                    categoryName={`${cat.category} - ${sub.name}`} 
                                                    isSingleSelect={nested.singleSelect} 
                                                    groupPrefix={clearPrefix} 
                                                    disabled={isDisabled}
                                                    isStacked={true}
                                                  />
                                                </div>
                                              </div>
                                            )
                                          }

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

                                        {nested.hasCustom && isExpanded && (() => {
                                          const customPillLabel = `${nested.title} - Custom Size`;
                                          const fullCustomString = `${cat.category} - ${sub.name}: ${customPillLabel}`;
                                          const isCustomSelected = cart.includes(fullCustomString);

                                          return (
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                              {/* Custom Size Button එක */}
                                              <div className="shrink-0 w-full sm:w-auto">
                                                <SelectablePill 
                                                  label={customPillLabel} 
                                                  displayLabel={nested.hideTitleInPill ? "Custom Size" : `${nested.title} - Custom Size`}
                                                  categoryName={`${cat.category} - ${sub.name}`} 
                                                  isSingleSelect={nested.singleSelect} 
                                                  groupPrefix={`${nested.title} -`} 
                                                />
                                              </div>
                                              
                                              {/* Button එක Select කළොත් විතරක් පේන Inputs 2ක */}
                                              <AnimatePresence>
                                                {isCustomSelected && (
                                                  <motion.div 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="flex items-center gap-2 mt-1 sm:mt-0 w-full sm:w-auto"
                                                  >
                                                    {["Width", "Height"].map((dim) => {
                                                      const val = ledDims[dim.toLowerCase() as keyof typeof ledDims] || "";
                                                      return (
                                                        <div key={dim} className="relative w-full sm:w-28">
                                                          <input
                                                            type="text"
                                                            placeholder={dim}
                                                            className="border border-gray-200 rounded-xl pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-gray-700 focus:border-[#a40049] outline-none w-full bg-white shadow-sm transition-all"
                                                            value={val}
                                                            onChange={(e) => {
                                                              // ඉලක්කම් සහ තිත් විතරයි Type කරන්න පුළුවන්
                                                              const rawVal = e.target.value.replace(/[^0-9.]/g, '');
                                                              setLedDims(prev => ({ ...prev, [dim.toLowerCase()]: rawVal }));
                                                              
                                                              // Cart එකට ft එකත් එක්කම යනවා
                                                              setCart(prevCart => {
                                                                const cleanCart = prevCart.filter(item => !item.startsWith(`${cat.category} - ${sub.name} Custom ${dim}:`));
                                                                if (rawVal.trim() !== "") {
                                                                    return [...cleanCart, `${cat.category} - ${sub.name} Custom ${dim}: ${rawVal}ft`];
                                                                }
                                                                return cleanCart;
                                                              });
                                                            }}
                                                          />
                                                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] sm:text-[12px] font-extrabold pointer-events-none">
                                                            ft
                                                          </span>
                                                        </div>
                                                      );
                                                    })}
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          );
                                        })()}

                                        {(nested.moreOptions || nested.hasCustom) && (
                                          <button 
                                            onClick={() => toggleGroupExpand(nested.title)}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
                                          >
                                            {isExpanded ? "Hide Sizes" : "More Sizes"} 
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
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

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-40 transform-gpu"
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full p-2.5 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-4 pl-3 sm:pl-5">
                  <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#a40049]/10 to-[#ff4d94]/10 rounded-full shrink-0 border border-[#a40049]/20 shadow-inner">
                    <ShoppingBag className="w-5 h-5 text-[#a40049]" />
                    <motion.span 
                      key={cart.length}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff4d94] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-full shadow-md"
                    >
                      {cart.length}
                    </motion.span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[15px] font-extrabold text-gray-900 leading-none">Services Added</p>
                    <p className="text-[12px] text-gray-500 font-medium mt-1.5">Ready for quotation</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pr-1.5">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-shrink-0 px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#a40049] to-[#61002c] text-white rounded-full font-bold shadow-[0_8px_20px_rgba(164,0,73,0.3)] hover:shadow-[0_12px_25px_rgba(164,0,73,0.4)] transition-all flex items-center gap-2 text-[13px] sm:text-sm transform-gpu whitespace-nowrap"
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
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
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
              <div className="bg-gradient-to-r from-[#a40049] to-[#ff4d94] p-6 sm:p-8 text-white relative">
                <button 
                  onClick={() => setInfoModalData(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white hover:text-[#a40049] rounded-full flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 hidden" />
                  <div className="absolute font-bold text-lg leading-none rotate-45">+</div>
                </button>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4 border border-white/30 shadow-inner">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">{infoModalData.name}</h2>
              </div>

              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-6">
                <p className="text-sm sm:text-[15px] text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {infoModalData.desc}
                </p>

                {infoModalData.features && infoModalData.features.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Included Features
                    </h4>
                    
                    <ul className="space-y-3">
                      {infoModalData.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#a40049]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#a40049]/20">
                            <Check className="w-3 h-3 text-[#a40049]" />
                          </div>
                          <span className="text-[13px] sm:text-sm text-gray-700 font-medium leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {infoModalData.dressOptions && infoModalData.dressOptions.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Shirt className="w-4 h-4 text-[#a40049]" /> Approved Dress Options
                    </h4>
                    <div className="space-y-4">
                      {infoModalData.dressOptions.map((opt: any, idx: number) => (
                        <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 shadow-sm">
                          <h5 className="text-sm font-bold text-[#a40049] mb-3">{opt.name}</h5>
                          <ul className="space-y-2.5">
                            {opt.details.map((detail: string, dIdx: number) => (
                              <li key={dIdx} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a40049]/50 mt-1.5 shrink-0" />
                                <span className="text-[13px] text-gray-700 font-medium leading-snug">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {infoModalData.appearance && infoModalData.appearance.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#a40049]" /> Appearance Standards
                    </h4>
                    <ul className="bg-[#a40049]/5 border border-[#a40049]/10 rounded-xl p-4 space-y-3">
                      {infoModalData.appearance.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Check className="w-2.5 h-2.5 text-[#a40049]" />
                          </div>
                          <span className="text-[13px] text-gray-700 font-medium leading-snug">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
              
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