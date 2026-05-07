"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, Rows3, Camera, Video, Mic, LayoutTemplate, 
  Music, Speaker, Printer, GraduationCap, Plus, Check, ShoppingBag, Send, ExternalLink, Trash2, CheckCircle2,
  ChevronDown
} from "lucide-react";
import WhatsAppModal from "./WhatsAppModal"; 

const structuredServices = [
  {
    id: "C1", category: "Registration", icon: ClipboardCheck,
    desc: "A front desk for guest check-in, gown distribution, and verification of graduate details.",
    hideSelectAll: true,
    items: [
      "Student Seat Number Allocation", 
      "Distribution of Student Cloaks & Garlands", 
      "Distribution of Guest & Parent Entrance Passes", 
      "Distribution of Refreshment Tokens"
    ]
  },
  {
    id: "C2", category: "Seating Arrangements", icon: Rows3,
    desc: "Comfortable and organized seating for graduates, faculty, VIPs, and guests with proper numbering.",
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
      }
    ]
  },
  {
    id: "C3", category: "Event Photography", icon: Camera,
    desc: "Professional photo coverage to capture stage moments, group photos, and event highlights.",
    photoSizes: [
      { name: "Group", size: '12"x18"' },
      { name: "Bust", size: '12"x15"' },
      { name: "Full", size: '12"x18"' },
      { name: "Family", size: '12"x18"' },
      { name: "Couple", size: '12"x18"' },
      { name: "Stage", size: '12"x15"' }
    ],
    subCategories: [
      { name: "Event Coverage", items: ["Fully Edited Highlight Photos", "Group Photos"] },
      { name: "Photobooth Coverage ( Photo Package)", items: ["Full & Bust Photos", "Family Photos", "Couple Photos", "Award Receiving Stage Photos"] },
      { name: "Photo Backdrops", items: ["Custom Themed Photo Backdrop | Selfie Background"], desc: "8'x12' Flex matte print with red Carpet" }
    ]
  },
  {
    id: "C4", category: "Event Videography", icon: Video,
    desc: "Professional video coverage, highlight videos, live streaming, and interactive 360 booths.",
    items: [
      "Fully Edited Event Coverage Video", "Fully Edited Highlight Video", 
      "Fully Edited Guest Speeches", "Live Streaming on Facebook & YouTube", 
      "Review & Testimonial Video Clips"
    ],
    subCategories: [
      { 
        name: "360 Video Booth", 
        items: [
          "04-Hour Package", 
          "Full-Day (08 hours) Package", 
          "7'x3' Matte Flex Print University & Campus Branding Boards"
        ] 
      }
    ]
  },
  {
    id: "C5", category: "Master of Ceremony & Compere", icon: Mic,
    desc: "Professional announcers and comperes to guide the event smoothly in multiple languages.",
    hideSelectAll: true,
    items: ["Sinhala Compere", "English Compere", "Tamil Compere"],
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
    desc: "A professionally designed stage with podium, LED video wall, lighting, and floral decorations.",
    subCategories: [
      { 
        name: "Stage Flower Decorations", 
        items: ["Stage Edge Decoration - Flower Band", "Oil Lamp Decoration", "Podium Decoration", "Head Table Decoration", "Flower Garlands & Baskets", ],
        nestedGroups: [
          {
            title: "Stage Decoration",
            singleSelect: true,
            options: ["Fresh Flowers", "Artificial Flowers"]
          }
        ]
      },
      { 
        name: "LED Video Wall", 
        items: ['55" LED TV on Stage', "Digital Podium", "Welcome Panadol - Digital"],
        nestedGroups: [
          {
            title: "LED Video Wall",
            desc: "P3 LED Video Wall on 3' Hight platform | Live on Wall | Arena Play Back",
            options: ["50’x12’", "40’x10’", "30’x10’", "20’x10’"],
            moreOptions: ["8'x6'", "12'x7'", "15'x7'", "16'x10'", "12'x10'"], // New sizes added
            hasCustom: true // Enables the custom button
          }
        ]
      }
    ]
  },
  {
    id: "C7", category: "Entertainment", icon: Music,
    desc: "Cultural, traditional, and modern entertainment acts to captivate your audience.",
    hideSelectAll: true, // Hides the Select All button for this category
    items: ["Traditional Welcome Dance (Wes Dance)", "Sesath Holders", "Puja Dance (Girls)", "Light Performance Dance", "Latin Dance", "Indian Dance Act", "Comedian Act", "Solo Dance", "Belly Dance", "Mask Dance Act"],
    subCategories: [
      { name: "Instrumental Items", items: ["Drum Orchestra", "Indian Doll Act with Dancers"] }
    ]
  },
  {
    id: "C8", category: "Printing & Certificates", icon: Printer,
    desc: "Official certificates, secure folders, flags, and promotional materials.",
    items: ["Promo Flag Printing - 10' x 2.5'", "Promo Flag Poles"],
    subCategories: [
      { name: "Stage Flag Printing - 6' x 4'", items: ["University Flag", "Campus Flag", "Department Flag"] }
    ]
  },
  {
    id: "C9", category: "Graduation Items", icon: GraduationCap,
    desc: "Premium graduation cloaks, ceremonial gowns, and high quality garlands for your special day.",
    hideSelectAll: true, // Hides the Select All button for this category
    subCategories: [
      { name: "Graduation Cloak", items: ["Black", "Ash", "Blue", "Maroon", "Red"] },
      { name: "Ceremonial Cloak", items: ["Red", "Blue", "Maroon"] },
      { name: "Garlands", items: ["Purple", "Red", "Yellow", "Pink"] },
      { name: "Scrolls", items: ["Red", "Blue", "Maroon", "Black", "Green", "Gold", "Silver"] },
     ]
  },
  {
    id: "C10", category: "Sound & Lighting Systems", icon: Speaker,
    desc: "Clear audio equipment and atmospheric stage lighting to enhance visibility and atmosphere.",
    items: ["Professional Sound System Setup", "Dynamic Stage Lighting Setup"]
  },
];

export default function ServicesContent() {
  const [cart, setCart] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const toggleGroupExpand = (title: string) => {
    setExpandedGroups(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
  }, [cart]);

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

      // 2. Stage Flower Decorations Auto-Select (Except Fresh/Artificial button)
      if (itemFullString.startsWith("Stage Arrangements - Stage Flower Decorations: ") && !itemFullString.includes("Stage Decoration -")) {
        const flowerItems = [
          "Stage Arrangements - Stage Flower Decorations: Oil Lamp Decoration",
          "Stage Arrangements - Stage Flower Decorations: Podium Decoration",
          "Stage Arrangements - Stage Flower Decorations: Head Table Decoration",
          "Stage Arrangements - Stage Flower Decorations: Flower Garlands & Baskets",
          "Stage Arrangements - Stage Flower Decorations: Stage Edge Decoration - Flower Band"
        ];
        const isSelected = flowerItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !flowerItems.includes(i));
        flowerItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
      }

      // 3. Event Videography (Coverage + Highlight) Auto-Select
      if (itemFullString === "Event Videography: Fully Edited Event Coverage Video" || itemFullString === "Event Videography: Fully Edited Highlight Video") {
        const videoItems = [
          "Event Videography: Fully Edited Event Coverage Video",
          "Event Videography: Fully Edited Highlight Video"
        ];
        const isSelected = videoItems.every(i => prev.includes(i));
        if (isSelected) return prev.filter(i => !videoItems.includes(i));
        videoItems.forEach(i => { if (!newCart.includes(i)) newCart.push(i); });
        return newCart;
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

  const SelectablePill = ({ label, categoryName, isSingleSelect = false, groupPrefix = "" }: { label: string, categoryName: string, isSingleSelect?: boolean, groupPrefix?: string }) => {
    const fullString = `${categoryName}: ${label}`;
    const isSelected = cart.includes(fullString);
    const prefixToClear = groupPrefix ? `${categoryName}: ${groupPrefix}` : `${categoryName}:`;

    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleCart(fullString, isSingleSelect, prefixToClear)}
        className={`flex items-start sm:items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border transform-gpu text-left w-full sm:w-auto h-auto ${
          isSelected 
            ? "bg-[#a40049] text-white border-[#a40049] shadow-md" 
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
        }`}
      >
        <div className="shrink-0 mt-0.5 sm:mt-0">
          {isSelected ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-gray-400" />}
        </div>
        <span className="leading-snug break-words">{label}</span>
      </motion.button>
    );
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
                      {/* අලුතින් හදපු Photo Sizes Grid එක */}
                      {(cat as any).photoSizes && (
                        <div className="mt-4 bg-[#a40049]/5 p-3.5 sm:p-4 rounded-xl border border-[#a40049]/10">
                          
                          {/* 1 Row Left-Middle-Right Title with Dots */}
                          <div className="flex items-center justify-between w-full text-[8.5px] min-[375px]:text-[9.5px] sm:text-xs text-[#a40049] font-extrabold mb-3">
                            {["Fully Edited", "Printed", "Laminated Photobooth"].reduce((acc: any[], part: string, i: number, arr: string[]) => {
                              acc.push(<span key={`text-${i}`} className="whitespace-nowrap truncate">{part}</span>);
                              if (i < arr.length - 1) {
                                acc.push(<span key={`dot-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#a40049]/50 shrink-0 mx-1 sm:mx-2"></span>);
                              }
                              return acc;
                            }, [])}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                            {(cat as any).photoSizes.map((sizeObj: any) => (
                              <div key={sizeObj.name} className="flex items-center justify-between text-[11px] sm:text-xs font-bold">
                                <span className="text-gray-600">{sizeObj.name}</span>
                                <div className="flex-1 mx-3 border-b border-dashed border-[#a40049]/20" />
                                <span className="text-[#a40049]">{sizeObj.size}</span>
                              </div>
                            ))}
                          </div>
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
                              <div className="flex flex-wrap gap-2.5">
                                {nested.options.map((opt: string) => (
                                  <SelectablePill 
                                    key={opt} 
                                    label={`${nested.title} - ${opt}`} 
                                    categoryName={cat.category} 
                                    isSingleSelect={nested.singleSelect} 
                                    groupPrefix={`${nested.title} -`} 
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub Categories */}
                      {cat.subCategories && (
                        <div className="space-y-4">
                          {cat.subCategories.map((sub: any) => (
                            <div key={sub.name} className="bg-[#FAFAFA] border border-gray-200/60 p-3.5 sm:p-4 rounded-2xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide">{sub.name}</h4>
                              </div>
                              {sub.desc && <p className="text-[10px] sm:text-xs text-gray-500 mb-3 -mt-2 font-medium leading-snug">{sub.desc}</p>}
                              {/* Standard Sub-category Items */}
                              {sub.items && sub.items.length > 0 && (
                                <div className="flex flex-wrap gap-2.5 mb-2">
                                  {sub.items.map((item: string) => (
                                    <SelectablePill key={item} label={item} categoryName={`${cat.category} - ${sub.name}`} />
                                  ))}
                                </div>
                              )}

                              {/* Nested Deep Sub-Categories */}
                              {/* Nested Deep Sub-Categories */}
{sub.nestedGroups && sub.nestedGroups.length > 0 && (
  <div className="mt-4 space-y-3">
    {sub.nestedGroups.map((nested: any) => {
      const isExpanded = expandedGroups.includes(nested.title);
      return (
      <div key={nested.title} className="bg-white border border-gray-100 p-3 sm:p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <h5 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          Select {nested.title}
        </h5>
        
        {/* LED Video Wall Description එක (Left-Middle-Right) */}
        {nested.desc && (
          <div className="flex items-center justify-between w-full text-[7.5px] min-[375px]:text-[8.5px] md:text-[10px] lg:text-[11px] text-[#a40049] font-semibold mb-3">
            {nested.desc.split(' | ').reduce((acc: any[], part: string, i: number, arr: string[]) => {
              acc.push(<span key={`text-${i}`} className="whitespace-nowrap truncate">{part.trim()}</span>);
              if (i < arr.length - 1) {
                acc.push(<span key={`dot-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#a40049]/50 shrink-0 mx-1 sm:mx-2"></span>);
              }
              return acc;
            }, [])}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2.5 mt-2">
          {nested.options.map((opt: string) => (
            <SelectablePill 
              key={opt} 
              label={`${nested.title} - ${opt}`} 
              categoryName={`${cat.category} - ${sub.name}`} 
              isSingleSelect={nested.singleSelect} 
              groupPrefix={`${nested.title} -`} 
            />
          ))}

          {/* More Options / Custom Button / "More Sizes" Toggle */}
          {nested.moreOptions && isExpanded && nested.moreOptions.map((opt: string) => (
            <SelectablePill 
              key={opt}
              label={`${nested.title} - ${opt}`} 
              categoryName={`${cat.category} - ${sub.name}`} 
              isSingleSelect={nested.singleSelect} 
              groupPrefix={`${nested.title} -`} 
            />
          ))}

          {nested.hasCustom && isExpanded && (
            <SelectablePill 
              label={`${nested.title} - Custom Size`} 
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
                          ))}
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