"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Maximize2, Image as ImageIcon, Filter, PlayCircle, ChevronDown, ChevronRight, X, SlidersHorizontal } from "lucide-react";
import { s } from "framer-motion/client";

// --- DYNAMIC CATEGORIES WITH OPTIONAL SUB-CATEGORIES ---
const categoriesConfig = [
  { name: "All" },

  { name: "Registration" },

  { 
    name: "Seating Arrangements", 
    subCategories: ["Auditorium", "Procession (Perahara)", "Award Receiving"] 
  },
  
  { name: "Event Photography",
    subCategories: ["Highlights Photos", "Stage Photos", "Full & Bust Photos", "Family Photos", "Couple Photos", "Group Photos", "Backdrop Photos"]
   },

  { name: "Event Videography" },

  { name: "Master of Ceremony & Compere" },

  { 
    name: "Stage Arrangements",
    subCategories: ["Stage Flower Decorations", "LED Video Wall", "Oil Lamps Decorations", "Podium Decorations", "Digital Podium", "Welcome Wall", "55_ LED TV", "Head Table Decorations", "Flower Garlands & Baskets"] 
  },
  
  { name: "Entertainment", subCategories: ["Light Dance", "Wes Dance", "Latin Dance", "Indian Classical Dance", "Sesath Holders", "Puja Dancers"] },
  { name: "Sound & Lighting Systems" },
  { name: "Printing & Certificates" , subCategories: ["Flags", "TokenOfAppreciation", "Suvourniers"]},
  { name: "Graduation Items" , subCategories: ["Garlands", "Scrolls", "Hoods", "Cloaks", "Stoles", "Certificate Pouches", "Hats"]},
];

const galleryData = [
  { id: "reg-1", src: "/gallery/registration/1.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-2", src: "/gallery/registration/2.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-3", src: "/gallery/registration/3.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-4", src: "/gallery/registration/4.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-5", src: "/gallery/registration/5.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-6", src: "/gallery/registration/6.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-7", src: "/gallery/registration/7.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-8", src: "/gallery/registration/8.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-9", src: "/gallery/registration/9.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-10", src: "/gallery/registration/10.jpg", category: "Registration", title: "VIP Guest Check-in Area" },

  // Seating Arrangements
  { id: "seat-1", src: "/gallery/seating/seating/1.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-2", src: "/gallery/seating/seating/2.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-3", src: "/gallery/seating/seating/3.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-4", src: "/gallery/seating/seating/4.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-5", src: "/gallery/seating/seating/5.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-6", src: "/gallery/seating/seating/6.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-7", src: "/gallery/seating/seating/7.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-8", src: "/gallery/seating/seating/8.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-9", src: "/gallery/seating/seating/9.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-10", src: "/gallery/seating/seating/10.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-11", src: "/gallery/seating/seating/11.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-12", src: "/gallery/seating/seating/12.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },

  // Award Receiving
  { id: "award-1", src: "/gallery/seating/award/1.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-2", src: "/gallery/seating/award/2.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-3", src: "/gallery/seating/award/3.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-4", src: "/gallery/seating/award/4.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-5", src: "/gallery/seating/award/5.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-6", src: "/gallery/seating/award/6.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },

  // Procession 
  { id: "proc-1", src: "/gallery/seating/procession/1.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-2", src: "/gallery/seating/procession/2.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-3", src: "/gallery/seating/procession/3.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-4", src: "/gallery/seating/procession/4.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-6", src: "/gallery/seating/procession/6.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-7", src: "/gallery/seating/procession/7.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-8", src: "/gallery/seating/procession/8.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-9", src: "/gallery/seating/procession/9.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-10", src: "/gallery/seating/procession/10.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-11", src: "/gallery/seating/procession/11.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-12", src: "/gallery/seating/procession/12.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-13", src: "/gallery/seating/procession/13.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },


  //  Highlight Photos
  { id: "photo-high-1", src: "/gallery/photography/highlight/1.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-2", src: "/gallery/photography/highlight/2.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-3", src: "/gallery/photography/highlight/3.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-4", src: "/gallery/photography/highlight/4.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-5", src: "/gallery/photography/highlight/5.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-6", src: "/gallery/photography/highlight/6.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-7", src: "/gallery/photography/highlight/7.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-8", src: "/gallery/photography/highlight/8.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-9", src: "/gallery/photography/highlight/9.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-10", src: "/gallery/photography/highlight/10.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-11", src: "/gallery/photography/highlight/11.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  { id: "photo-high-12", src: "/gallery/photography/highlight/12.jpg", category: "Event Photography", subCategory: "Highlights Photos", title: "Highlight Photos" },
  // Stage 
  { id: "photo-stg-1", src: "/gallery/photography/stage/1.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-2", src: "/gallery/photography/stage/2.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-3", src: "/gallery/photography/stage/3.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-4", src: "/gallery/photography/stage/4.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-5", src: "/gallery/photography/stage/5.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-6", src: "/gallery/photography/stage/6.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-7", src: "/gallery/photography/stage/7.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },
  { id: "photo-stg-8", src: "/gallery/photography/stage/8.jpg", category: "Event Photography", subCategory: "Stage Photos", title: "Stage Photos" },

  // Full and Bust
  { id: "photo-fb-1", src: "/gallery/photography/fullbust/1.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-2", src: "/gallery/photography/fullbust/2.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-3", src: "/gallery/photography/fullbust/3.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-4", src: "/gallery/photography/fullbust/4.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-5", src: "/gallery/photography/fullbust/5.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-6", src: "/gallery/photography/fullbust/6.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-7", src: "/gallery/photography/fullbust/7.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-8", src: "/gallery/photography/fullbust/8.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },
  { id: "photo-fb-9", src: "/gallery/photography/fullbust/9.jpg", category: "Event Photography", subCategory: "Full & Bust Photos", title: "Full & Bust Photos" },

  // Family Photos
  { id: "photo-fam-1", src: "/gallery/photography/family/1.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-2", src: "/gallery/photography/family/2.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-3", src: "/gallery/photography/family/3.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-4", src: "/gallery/photography/family/4.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-5", src: "/gallery/photography/family/5.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-6", src: "/gallery/photography/family/6.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-7", src: "/gallery/photography/family/7.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-8", src: "/gallery/photography/family/8.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },
  { id: "photo-fam-9", src: "/gallery/photography/family/9.jpg", category: "Event Photography", subCategory: "Family Photos", title: "Family Photos" },

  //Couple Photos
  { id: "photo-cpl-1", src: "/gallery/photography/couple/1.jpg", category: "Event Photography", subCategory: "Couple Photos", title: "Couple Photos" },
  { id: "photo-cpl-2", src: "/gallery/photography/couple/2.jpg", category: "Event Photography", subCategory: "Couple Photos", title: "Couple Photos" },
  { id: "photo-cpl-3", src: "/gallery/photography/couple/3.jpg", category: "Event Photography", subCategory: "Couple Photos", title: "Couple Photos" },
  { id: "photo-cpl-4", src: "/gallery/photography/couple/4.jpg", category: "Event Photography", subCategory: "Couple Photos", title: "Couple Photos" },

  //Group Photos
  { id: "photo-grp-1", src: "/gallery/photography/group/1.jpg", category: "Event Photography", subCategory: "Group Photos", title: "Group Photos" },

  //backdrop 
  { id: "photo-back-1", src: "/gallery/photography/backdrop/1.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },
  { id: "photo-back-2", src: "/gallery/photography/backdrop/2.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },
  { id: "photo-back-3", src: "/gallery/photography/backdrop/3.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },
  { id: "photo-back-4", src: "/gallery/photography/backdrop/4.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },
  { id: "photo-back-5", src: "/gallery/photography/backdrop/5.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },
  { id: "photo-back-6", src: "/gallery/photography/backdrop/6.jpg", category: "Event Photography", subCategory: "Backdrop Photos", title: "Backdrop Photos" },

  //Event Videography
  { id: "video-1", src: "/gallery/videography/1.jpg", category: "Event Videography", title: "360 Video Booth Setup" },
  { id: "video-2", src: "/gallery/videography/2.jpg", category: "Event Videography", title: "360 Video Booth Setup" },
  { id: "video-3", src: "/gallery/videography/3.jpg", category: "Event Videography", title: "360 Video Booth Setup" },

  //cCompere
  { id: "compere-1", src: "/gallery/compere/1.jpg", category: "Master of Ceremony & Compere", title: "Professional Compere on Stage" },
  
  // Stage Arrangements 
  { id: "stg-vid-1", src: "/gallery/stage/videowall/1.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-2", src: "/gallery/stage/videowall/2.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-3", src: "/gallery/stage/videowall/3.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-4", src: "/gallery/stage/videowall/4.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-5", src: "/gallery/stage/videowall/5.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },

  { id: "stg-oil-1", src: "/gallery/stage/oillampdeco/1.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-2", src: "/gallery/stage/oillampdeco/2.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-3", src: "/gallery/stage/oillampdeco/3.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-4", src: "/gallery/stage/oillampdeco/4.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-5", src: "/gallery/stage/oillampdeco/5.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },

  { id: "stg-pod-1", src: "/gallery/stage/podium/1.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-2", src: "/gallery/stage/podium/2.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-3", src: "/gallery/stage/podium/3.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-4", src: "/gallery/stage/podium/4.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  
  { id: "stg-digipod-1", src: "/gallery/stage/digipodium/1.jpg", category: "Stage Arrangements", subCategory: "Digital Podium", title: "Digital Podium" },
  { id: "stg-digipod-2", src: "/gallery/stage/digipodium/2.jpg", category: "Stage Arrangements", subCategory: "Digital Podium", title: "Digital Podium" },

  { id: "stg-wel-1", src: "/gallery/stage/welcome/1.jpg", category: "Stage Arrangements", subCategory: "Welcome Wall", title: "Welcome Signage" },
  { id: "stg-wel-2", src: "/gallery/stage/welcome/2.jpg", category: "Stage Arrangements", subCategory: "Welcome Wall", title: "Welcome Signage" },

  { id: "stg-tv-1", src: "/gallery/stage/tv/1.jpg", category: "Stage Arrangements", subCategory: "55_ LED TV", title: "55_ LED TV" },
  { id: "stg-tv-2", src: "/gallery/stage/tv/2.jpg", category: "Stage Arrangements", subCategory: "55_ LED TV", title: "55_ LED TV" },

  { id: "stg-flw-1", src: "/gallery/stage/stageflowerdeco/1.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-2", src: "/gallery/stage/stageflowerdeco/2.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-3", src: "/gallery/stage/stageflowerdeco/3.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-4", src: "/gallery/stage/stageflowerdeco/4.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-5", src: "/gallery/stage/stageflowerdeco/5.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },

  { id: "stg-hd-1", src: "/gallery/stage/headtabledeco/1.jpg", category: "Stage Arrangements", subCategory: "Head Table Decorations", title: "Head Table Decorations" },
  { id: "stg-hd-2", src: "/gallery/stage/headtabledeco/2.jpg", category: "Stage Arrangements", subCategory: "Head Table Decorations", title: "Head Table Decorations" },

  { id: "stg-gar-1", src: "/gallery/stage/garland/1.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-2", src: "/gallery/stage/garland/2.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-3", src: "/gallery/stage/garland/3.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-4", src: "/gallery/stage/garland/4.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },

  // Light Dance
  { id: "ent-light-1", src: "/gallery/entertainment/light/1.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },
  { id: "ent-light-2", src: "/gallery/entertainment/light/2.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },
  { id: "ent-light-3", src: "/gallery/entertainment/light/3.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },
  { id: "ent-light-4", src: "/gallery/entertainment/light/4.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },
  { id: "ent-light-5", src: "/gallery/entertainment/light/5.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },
  { id: "ent-light-6", src: "/gallery/entertainment/light/6.jpg", category: "Entertainment", subCategory: "Light Dance", title: "Light Dance Performance" },

  // Wes Dance
  { id: "ent-west-1", src: "/gallery/entertainment/wes/1.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-2", src: "/gallery/entertainment/wes/2.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-3", src: "/gallery/entertainment/wes/3.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-4", src: "/gallery/entertainment/wes/4.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-5", src: "/gallery/entertainment/wes/5.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-6", src: "/gallery/entertainment/wes/6.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },
  { id: "ent-west-7", src: "/gallery/entertainment/wes/7.jpg", category: "Entertainment", subCategory: "Wes Dance", title: "Wes Dance Performance" },

  // Sesath Holders
  { id: "ent-sesath-7", src: "/gallery/entertainment/sesath/1.jpg", category: "Entertainment", subCategory: "Sesath Holders", title: "Sesath Holders" },

  // Puja Dancers
  { id: "ent-puja-1", src: "/gallery/entertainment/puja/1.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-2", src: "/gallery/entertainment/puja/2.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-3", src: "/gallery/entertainment/puja/3.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-4", src: "/gallery/entertainment/puja/4.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-5", src: "/gallery/entertainment/puja/5.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-6", src: "/gallery/entertainment/puja/6.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },
  { id: "ent-puja-7", src: "/gallery/entertainment/puja/7.jpg", category: "Entertainment", subCategory: "Puja Dancers", title: "Puja Dancers" },

  // latin Dance
  { id: "ent-latin-1", src: "/gallery/entertainment/latin/1.jpg", category: "Entertainment", subCategory: "Latin Dance", title: "Latin Dance Performance" },
  { id: "ent-latin-2", src: "/gallery/entertainment/latin/2.jpg", category: "Entertainment", subCategory: "Latin Dance", title: "Latin Dance Performance" },
  { id: "ent-latin-3", src: "/gallery/entertainment/latin/3.jpg", category: "Entertainment", subCategory: "Latin Dance", title: "Latin Dance Performance" },

  // Indian Classical Dance
  { id: "ent-indian-1", src: "/gallery/entertainment/indian/1.jpg", category: "Entertainment", subCategory: "Indian Classical Dance", title: "Indian Classical Dance" },
  { id: "ent-indian-2", src: "/gallery/entertainment/indian/2.jpg", category: "Entertainment", subCategory: "Indian Classical Dance", title: "Indian Classical Dance" },
  { id: "ent-indian-3", src: "/gallery/entertainment/indian/3.jpg", category: "Entertainment", subCategory: "Indian Classical Dance", title: "Indian Classical Dance" },
  { id: "ent-indian-4", src: "/gallery/entertainment/indian/4.jpg", category: "Entertainment", subCategory: "Indian Classical Dance", title: "Indian Classical Dance" },

  // Flags
  { id: "pc-flag-1", src: "/gallery/pc/flags/1.jpg", category: "Printing & Certificates", subCategory: "Flags", title: "Printing & Certificates" },
  { id: "pc-flag-2", src: "/gallery/pc/flags/2.jpg", category: "Printing & Certificates", subCategory: "Flags", title: "Printing & Certificates" },
  { id: "pc-flag-3", src: "/gallery/pc/flags/3.jpg", category: "Printing & Certificates", subCategory: "Flags", title: "Printing & Certificates" },
  { id: "pc-flag-4", src: "/gallery/pc/flags/4.jpg", category: "Printing & Certificates", subCategory: "Flags", title: "Printing & Certificates" },
  { id: "pc-flag-5", src: "/gallery/pc/flags/5.jpg", category: "Printing & Certificates", subCategory: "Flags", title: "Printing & Certificates" },
  { id: "pc-token-1", src: "/gallery/pc/tokens/1.jpg", category: "Printing & Certificates", subCategory: "TokenOfAppreciation", title: "Printing & Certificates" },
  { id: "pc-token-2", src: "/gallery/pc/tokens/2.jpg", category: "Printing & Certificates", subCategory: "TokenOfAppreciation", title: "Printing & Certificates" },
  { id: "pc-token-3", src: "/gallery/pc/tokens/3.jpg", category: "Printing & Certificates", subCategory: "TokenOfAppreciation", title: "Printing & Certificates" },
  { id: "pc-suvour-1", src: "/gallery/pc/suvour/1.jpg", category: "Printing & Certificates", subCategory: "Suvourniers", title: "Printing & Certificates" },
  { id: "pc-suvour-2", src: "/gallery/pc/suvour/2.jpg", category: "Printing & Certificates", subCategory: "Suvourniers", title: "Printing & Certificates" },

  { id: "grad-garl-1", src: "/gallery/graduationitems/garland/1.jpg", category: "Graduation Items", subCategory: "Garlands", title: "Premium Garlands" },
  { id: "grad-garl-2", src: "/gallery/graduationitems/garland/2.jpeg", category: "Graduation Items", subCategory: "Garlands", title: "Premium Garlands" },
  { id: "grad-garl-3", src: "/gallery/graduationitems/garland/3.jpeg", category: "Graduation Items", subCategory: "Garlands", title: "Premium Garlands" },

  { id: "grad-scroll-1", src: "/gallery/graduationitems/scrolls/1.jpg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-2", src: "/gallery/graduationitems/scrolls/2.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-3", src: "/gallery/graduationitems/scrolls/3.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-4", src: "/gallery/graduationitems/scrolls/4.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-5", src: "/gallery/graduationitems/scrolls/5.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-6", src: "/gallery/graduationitems/scrolls/6.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },
  { id: "grad-scroll-7", src: "/gallery/graduationitems/scrolls/7.jpeg", category: "Graduation Items", subCategory: "Scrolls", title: "Premium Scrolls" },

  { id: "grad-hoods-1", src: "/gallery/graduationitems/hoods/1.jpg", category: "Graduation Items", subCategory: "Hoods", title: "Premium Hoods" },
  { id: "grad-hoods-2", src: "/gallery/graduationitems/hoods/2.jpg", category: "Graduation Items", subCategory: "Hoods", title: "Premium Hoods" },
  { id: "grad-hoods-3", src: "/gallery/graduationitems/hoods/3.jpg", category: "Graduation Items", subCategory: "Hoods", title: "Premium Hoods" },

  { id: "grad-cloaks-1", src: "/gallery/graduationitems/cloaks/1.jpeg", category: "Graduation Items", subCategory: "Cloaks", title: "Premium Cloaks" },
  { id: "grad-cloaks-2", src: "/gallery/graduationitems/cloaks/2.jpeg", category: "Graduation Items", subCategory: "Cloaks", title: "Premium Cloaks" },
  { id: "grad-cloaks-3", src: "/gallery/graduationitems/cloaks/3.jpeg", category: "Graduation Items", subCategory: "Cloaks", title: "Premium Cloaks" },

  { id: "grad-stoles-1", src: "/gallery/graduationitems/stoles/1.jpg", category: "Graduation Items", subCategory: "Stoles", title: "Premium Stoles" },

  { id: "grad-pouches-1", src: "/gallery/graduationitems/pouches/1.jpg", category: "Graduation Items", subCategory: "Certificate Pouches", title: "Premium Certificate Holder Pouches" },

  { id: "grad-hats-1", src: "/gallery/graduationitems/hats/1.jpg", category: "Graduation Items", subCategory: "Hats", title: "Premium Hats" },
  { id: "grad-hats-2", src: "/gallery/graduationitems/hats/2.jpeg", category: "Graduation Items", subCategory: "Hats", title: "Premium Hats" },
  { id: "grad-hats-3", src: "/gallery/graduationitems/hats/3.jpeg", category: "Graduation Items", subCategory: "Hats", title: "Premium Hats" },
  { id: "grad-hats-4", src: "/gallery/graduationitems/hats/4.jpeg", category: "Graduation Items", subCategory: "Hats", title: "Premium Hats" },
  { id: "grad-hats-5", src: "/gallery/graduationitems/hats/5.jpeg", category: "Graduation Items", subCategory: "Hats", title: "Premium Hats" },

  { id: "snd-1", src: "/gallery/sound/1.jpg", category: "Sound & Lighting Systems", title: "Dynamic Concert Lighting" },

  
];

// --- CATEGORY TO YOUTUBE VIDEO MAPPING ---
const categoryVideos: Record<string, string[]> = {
  // Main Categories
  "Seating Arrangements": ["if_Phg6H-FU"],
  "Event Videography": ["wkGEiVu_duQ", "ig-q_lhvFNs", "kfLKCrPA5Ak"],
  "Master of Ceremony & Compere": ["8Se9Yrl3snc", "sWrWX_07ZAo", "e36gEPxbbIc"],
  "Entertainment": ["kQIsAfJ8b7U"],
  "Stage Arrangements": ["Cc5baISr2wA"],

  // Sub-Categories (ඔයාට ඕන Sub-category නමක් මෙතනට දාලා Video IDs දෙන්න පුළුවන්)
  "Light Dance": ["AAhlUA2UxYg", "BnpiFk1-_mM"], 
  "Wes Dance": ["2aXeCaRUSTY"],
  "Latin Dance": ["N8nS014KaUU"],
  "Puja Dancers": ["HXSz-TQ5hdw"],
  "Auditorium": ["video_id_for_auditorium"]
};
const StandardVideoPlayer = ({ videoId }: { videoId: string }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { margin: "0px" });

  // Auto-pause logic using YouTube Iframe API postMessage
  useEffect(() => {
    if (!isInView && ref.current) {
      ref.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    }
  }, [isInView]);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-900 aspect-video group">
      <iframe
        ref={ref}
        // enablejsapi=1 is required for auto-pause. vq=hd1080 forces 1080p.
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&vq=hd1080&rel=0`}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

const CategoryVideoShowcase = ({ videoIds, categoryName }: { videoIds: string[], categoryName: string }) => {
  if (!videoIds || videoIds.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 sm:mt-14 w-full"
    >
      <div className="flex items-center gap-3 mb-6 px-2 lg:px-0">
        <div className="w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center shrink-0">
          <PlayCircle className="w-5 h-5 text-[#a40049] fill-[#a40049]/20" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{categoryName} Highlights</h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Click to experience our world-class execution.</p>
        </div>
      </div>

      {/* Grid dynamically adjusts: 1 video = full width, 2+ videos = 2 columns on Desktop */}
      <div className={`grid gap-6 sm:gap-8 ${videoIds.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {videoIds.map((id, index) => (
          <StandardVideoPlayer key={`${id}-${index}`} videoId={id} />
        ))}
      </div>
    </motion.div>
  );
};


export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // NEW STATE: Track Selected Image for Lightbox Popup
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);

  // Prevent Body Scroll when Mobile Menu or Lightbox is Open
  useEffect(() => {
    if (isMobileFilterOpen || selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileFilterOpen, selectedImage]);

  const handleCategoryChange = (catName: string) => {
    setActiveCategory(catName);
    setActiveSubCategory("All"); 
    
    const catConfig = categoriesConfig.find(c => c.name === catName);
    if (!catConfig?.subCategories) {
      setIsMobileFilterOpen(false);
    }
  };

  const currentCatConfig = categoriesConfig.find(c => c.name === activeCategory);
  const availableSubCategories = currentCatConfig?.subCategories || [];

  // ====================================================================
  // EXACT FILTERING LOGIC
  // ====================================================================
  const filteredImages = useMemo(() => {
    return galleryData.filter((item) => {
      if (activeCategory === "All") return true;

      const isMainCategoryMatch = item.category === activeCategory;
      if (!isMainCategoryMatch) return false;

      if (activeSubCategory === "All") return true;

      return item.subCategory === activeSubCategory;
    });
  }, [activeCategory, activeSubCategory]);

  const activeVideoKey = activeSubCategory !== "All" ? activeSubCategory : activeCategory;
  const activeVideoIds = categoryVideos[activeVideoKey] || [];

  // Reusable Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col space-y-1.5">
      {categoriesConfig.map((cat) => {
        const isActive = activeCategory === cat.name;
        const hasSubCategories = cat.subCategories && cat.subCategories.length > 0;

        return (
          <div key={cat.name} className="flex flex-col">
            <button
              onClick={() => handleCategoryChange(cat.name)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                isActive 
                  ? "bg-[#a40049]/5 text-[#a40049]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#a40049] rounded-r-full" />
              )}
              <span className={`relative z-10 ${isActive ? "pl-2" : ""}`}>{cat.name}</span>
              
              {hasSubCategories && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-180 text-[#a40049]" : "text-gray-400"}`} />
              )}
            </button>

            <AnimatePresence>
              {isActive && hasSubCategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden ml-4 pl-4 border-l border-gray-100 mt-1 space-y-1"
                >
                  <button
                    onClick={() => {
                      setActiveSubCategory("All");
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                      activeSubCategory === "All" ? "text-[#a40049] bg-gray-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight className={`w-3 h-3 shrink-0 ${activeSubCategory === "All" ? "text-[#a40049]" : "opacity-0"}`} />
                    <span className="leading-snug">All {cat.name}</span>
                  </button>

                  {cat.subCategories.map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => {
                        setActiveSubCategory(subCat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                        activeSubCategory === subCat ? "text-[#a40049] bg-gray-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className={`w-3 h-3 shrink-0 ${activeSubCategory === subCat ? "text-[#a40049]" : "opacity-0"}`} />
                      <span className="leading-snug">{subCat}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="bg-[#FAFAFA] min-h-screen pt-8 pb-20">
      
      {/* ==============================================
          MOBILE STICKY FILTER BAR (FIXED LAYOUT)
          ============================================== */}
      <div className="lg:hidden sticky top-[70px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 max-w-full">
          
          {/* Main Category Scroll Row */}
          <div className="flex-1 overflow-x-auto custom-scrollbar-hide flex gap-2 snap-x items-center py-1">
             {categoriesConfig.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 snap-start shrink-0 border ${
                    activeCategory === cat.name
                      ? "bg-[#a40049]/10 text-[#a40049] border-[#a40049]/30 shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>

          {/* Filter Drawer Trigger Button */}
          <div className="shrink-0 pl-2 border-l border-gray-200">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Optional Secondary Sub-Category Row for Mobile */}
        <AnimatePresence>
           {availableSubCategories.length > 0 && (
             <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pt-2 border-t border-gray-100 flex overflow-x-auto gap-2 custom-scrollbar-hide snap-x"
             >
                <button
                  onClick={() => setActiveSubCategory("All")}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 snap-start shrink-0 border ${
                    activeSubCategory === "All"
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  All {activeCategory}
                </button>
                {availableSubCategories.map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubCategory(subCat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 snap-start shrink-0 border ${
                      activeSubCategory === subCat
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {subCat}
                  </button>
                ))}
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* ==============================================
          MOBILE SLIDE-BAR (DRAWER)
          ============================================== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[101] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h3 className="text-gray-900 font-extrabold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#a40049]" /> 
                  Advanced Filters
                </h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)} 
                  className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto flex-1">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 mt-6 lg:mt-12">
        
        {/* ==============================================
            DESKTOP SIDEBAR
            ============================================== */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-gray-900 font-extrabold text-lg mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#a40049]" /> 
              Filter Gallery
            </h3>
            <SidebarContent />
          </div>
        </aside>

        {/* ==============================================
            MAIN CONTENT AREA
            ============================================== */}
        <main className="flex-1 flex flex-col">
          
          <div className="mb-8 hidden lg:flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {activeSubCategory !== "All" ? activeSubCategory : activeCategory} Portfolio
              </h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Showing {filteredImages.length} extraordinary moments.</p>
            </div>
          </div>

          {/* --- PERFORMANCE OPTIMIZED GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  // Background එක කළු කළා (bg-gray-900) Blur එක ලස්සනට පේන්න
                  className="relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 bg-gray-900 transform-gpu will-change-[transform,opacity]"
                  style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}
                >
                  <div className="w-full aspect-square relative flex items-center justify-center overflow-hidden">
                    
                    {/* 1. BLURRED BACKGROUND (මෙතනින් තමයි හිස් ඉඩ ලස්සනට පුරවන්නේ!) */}
                    <img 
                      src={item.src} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 blur-xl scale-125 transform-gpu"
                    />
                    
                    {/* 2. ACTUAL IMAGE (කිසිම කෑල්ලක් කැපෙන්නේ නෑ, කොටුව මැද ලස්සනට තියෙනවා) */}
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      decoding="async" 
                      loading="lazy" 
                      className="relative z-10 w-full h-full object-contain p-2 sm:p-4 transform group-hover:scale-105 transition-transform duration-[800ms] transform-gpu will-change-transform drop-shadow-2xl"
                    />
                    
                    {/* 3. HOVER GRADIENT OVERLAY (z-20 දාලා උඩට ගත්තා) */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* 4. CONTENT & BUTTONS (z-30 දාලා උඩටම ගත්තා) */}
                    <div className="absolute inset-0 z-30 p-5 sm:p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu">
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3 pointer-events-none">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {item.category}
                        </span>
                        {item.subCategory && (
                          <span className="inline-block px-3 py-1 bg-[#a40049]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-white text-lg sm:text-xl font-extrabold leading-tight flex items-center justify-between pointer-events-none">
                        <span className="line-clamp-2 pr-4">{item.title}</span>
                        
                        {/* LIGHTBOX TRIGGER BUTTON */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(item);
                          }}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#a40049] backdrop-blur-sm flex items-center justify-center shrink-0 pointer-events-auto transition-colors duration-300 shadow-lg"
                        >
                          <Maximize2 className="w-4 h-4 text-white" />
                        </button>

                      </h3>
                      
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Fallback Empty State */}
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-32 px-4 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 border-dashed mt-6"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Portfolio Items Yet</h3>
              <p className="text-gray-500 text-sm font-medium max-w-md leading-relaxed">
                We are currently organizing our premium captures for <strong>{activeSubCategory !== "All" ? activeSubCategory : activeCategory}</strong>. Coming soon!
              </p>
            </motion.div>
          )}

          {/* YOUTUBE AMBIENT VIDEO SHOWCASE */}
          <AnimatePresence mode="wait">
            {activeVideoIds && activeVideoIds.length > 0 && (
              <CategoryVideoShowcase 
                key={activeVideoKey} 
                videoIds={activeVideoIds} 
                categoryName={activeVideoKey} 
              />
            )}
          </AnimatePresence>

        </main>
      </div>
      
      {/* ==============================================
          BEAUTIFUL GLASSMORPHIC LIGHTBOX (POPUP) - CLEAN VERSION
          ============================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white/60 backdrop-blur-2xl p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              className="relative max-w-6xl w-full flex items-center justify-center group"
            >
              {/* Close Button - Only visible on hover or mobile */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 sm:top-4 sm:right-4 z-10 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-900 shadow-xl transition-all border border-gray-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Clean Image Container - No Text, No Background Box */}
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}