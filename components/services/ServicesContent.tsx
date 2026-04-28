"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, Rows3, Camera, Video, Mic, LayoutTemplate, 
  Music, Speaker, Printer, GraduationCap, Plus, Check, ShoppingBag, Send, ExternalLink, Trash2, CheckCircle2
} from "lucide-react";
import WhatsAppModal from "./WhatsAppModal"; 

// --- ADVANCED HIERARCHICAL DATA STRUCTURE WITH DESCRIPTIONS ---
const structuredServices = [
  {
    id: "C1", category: "Registration", icon: ClipboardCheck,
    desc: "A front desk for guest check-in, gown distribution, and verification of graduate details.",
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
    subCategories: [
      { name: "Event Coverage", items: ["Fully Edited Highlight Photos", "Stage Photos"] },
      { name: "Photobooth Coverage", items: ["Full & Bust Photos", "Family Photos", "Couple Photos", "Group Photos"] },
      { name: "Photo Backdrops", items: ["Custom Themed Photo Backdrop"] }
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
          "Full-Day Package", 
          "7'x3' Matte Flex Print University & Campus Branding Boards"
        ] 
      }
    ]
  },
  {
    id: "C5", category: "Master of Ceremony & Compere", icon: Mic,
    desc: "Professional announcers and comperes to guide the event smoothly in multiple languages.",
    hideSelectAll: true, // Hides the Select All button for this category
    items: ["Sinhala Compere", "English Compere", "Tamil Compere"],
    nestedGroups: [
      {
        title: "Compere",
        options: ["Male", "Female", "Male & Female"]
      },
      {
        title: "Review Interview Host",
        options: ["Male", "Female", "Male & Female"]
      }
    ]
  },
  {
    id: "C6", category: "Stage Arrangements", icon: LayoutTemplate,
    desc: "A professionally designed stage with podium, backdrop, lighting, and floral decorations.",
    subCategories: [
      { 
        name: "Stage Flower Decorations", 
        items: ["Oil Lamp Decoration", "Podium Decoration", "Head Table Decoration", "Flower Garlands & Baskets"],
        nestedGroups: [
          {
            title: "Stage Decoration",
            options: ["Fresh Flowers", "Artificial Flowers"]
          }
        ]
      },
      { 
        name: "LED Video Wall", 
        items: ["55' LED TV on Stage", "Digital Podium", "Welcome Panel LED Video Wall"],
        nestedGroups: [
          {
            title: "LED Video Wall",
            options: ["50’x12’", "40’x10’", "30’x10’", "20’x10’"]
          }
        ]
      }
    ]
  },
  {
    id: "C7", category: "Entertainment", icon: Music,
    desc: "Cultural, traditional, and modern entertainment acts to captivate your audience.",
    hideSelectAll: true, // Hides the Select All button for this category
    items: ["Light Performance Dance", "Traditional Welcome Dance (Wes Dance)", "Sesath Holders", "Puja Dance (Girls)", "Comedian Act"],
    subCategories: [
      { name: "Girls' Dance Items", items: ["Solo Dance", "Latin Dance", "Belly Dance", "Indian Dance Act", "Mask Dance Act"] },
      { name: "Instrumental Items", items: ["Drum Orchestra", "Indian Doll Act with Dancers"] }
    ]
  },
  {
    id: "C8", category: "Sound & Lighting Systems", icon: Speaker,
    desc: "Clear audio equipment and atmospheric stage lighting to enhance visibility and atmosphere.",
    items: ["Professional Sound System Setup", "Dynamic Stage Lighting Setup"]
  },
  {
    id: "C9", category: "Printing & Certificates", icon: Printer,
    desc: "Official certificates, secure folders, flags, and promotional materials.",
    items: ["Promo Flag Printing", "Promo Flag Poles"],
    subCategories: [
      { name: "Stage Flag Printing", items: ["University Flag", "Campus Flag", "Department Flag"] }
    ]
  },
  {
    id: "C10", category: "Graduation Items", icon: GraduationCap,
    desc: "Premium graduation cloaks, ceremonial gowns, and beautiful garlands for your special day.",
    hideSelectAll: true, // Hides the Select All button for this category
    subCategories: [
      { name: "Graduation Cloak", items: ["Black", "Ash", "Blue", "Maroon", "Red"] },
      { name: "Ceremonial Cloak", items: ["Red", "Blue", "Maroon"] },
      { name: "Garlands", items: ["Purple", "Red", "Yellow", "Pink"] },
      { name: "Scrolls", items: ["Red", "Blue", "Maroon", "Black", "Green", "Gold", "Silver"] },
     ]
  }
];

export default function ServicesContent() {
  const [cart, setCart] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (itemFullString: string) => {
    setCart(prev => prev.includes(itemFullString) ? prev.filter(i => i !== itemFullString) : [...prev, itemFullString]);
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

    // Direct nested groups (e.g. Compere options)
    if (cat.nestedGroups) {
      cat.nestedGroups.forEach((nested: any) => {
        nested.options.forEach((opt: string) => {
          allItems.push(`${cat.category}: ${nested.title} - ${opt}`);
        });
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
        // Nested groups inside sub-categories
        if (sub.nestedGroups) {
          sub.nestedGroups.forEach((nested: any) => {
            nested.options.forEach((opt: string) => {
              allItems.push(`${cat.category} - ${sub.name}: ${nested.title} - ${opt}`);
            });
          });
        }
      });
    }
    return allItems;
  };

  // Select/Deselect All Handler
  const handleSelectAllCategory = (cat: any) => {
    const allItems = getAllItemsInCategory(cat);
    
    // Check if ALL items in this category are currently in the cart
    const areAllSelected = allItems.every((item) => cart.includes(item));

    if (areAllSelected) {
      // If all are selected, DESELECT them
      setCart((prev) => prev.filter((cartItem) => !allItems.includes(cartItem)));
    } else {
      // If not all are selected, SELECT all of them (avoiding duplicates)
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

  const SelectablePill = ({ label, categoryName }: { label: string, categoryName: string }) => {
    const fullString = `${categoryName}: ${label}`;
    const isSelected = cart.includes(fullString);
    
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleCart(fullString)}
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
      <section className="pb-12 md:pb-20 pt-16 bg-white relative">
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
                  
                  <div className="relative bg-white rounded-[1.9rem] sm:rounded-[2.4rem] px-6 py-8 sm:p-8 md:p-10 flex flex-col h-full">
                    
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8">
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
                      {cat.desc && <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{cat.desc}</p>}
                    </div>

                    <div className="flex-grow space-y-6">
                      
                      {/* Direct Items */}
                      {cat.items && cat.items.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                          {cat.items.map(item => (
                            <SelectablePill key={item} label={item} categoryName={cat.category} />
                          ))}
                        </div>
                      )}

                      {/* NEW: Direct Nested Groups (e.g. for Master of Ceremony) */}
                      {cat.nestedGroups && cat.nestedGroups.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {cat.nestedGroups.map((nested: any) => (
                            <div key={nested.title} className="bg-[#FAFAFA] border border-gray-200/60 p-4 sm:p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
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
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub Categories */}
                      {cat.subCategories && (
                        <div className="space-y-4 mt-4">
                          {cat.subCategories.map((sub: any) => (
                            <div key={sub.name} className="bg-[#FAFAFA] border border-gray-200/60 p-4 sm:p-5 rounded-2xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide">{sub.name}</h4>
                              </div>
                              
                              {/* Standard Sub-category Items */}
                              {sub.items && sub.items.length > 0 && (
                                <div className="flex flex-wrap gap-2.5 mb-2">
                                  {sub.items.map((item: string) => (
                                    <SelectablePill key={item} label={item} categoryName={`${cat.category} - ${sub.name}`} />
                                  ))}
                                </div>
                              )}

                              {/* Nested Deep Sub-Categories */}
                              {sub.nestedGroups && sub.nestedGroups.length > 0 && (
                                <div className="mt-4 space-y-3">
                                  {sub.nestedGroups.map((nested: any) => (
                                    <div key={nested.title} className="bg-white border border-gray-100 p-3 sm:p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                      <h5 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                        Select {nested.title}
                                      </h5>
                                      <div className="flex flex-wrap gap-2.5">
                                        {nested.options.map((opt: string) => (
                                          <SelectablePill 
                                            key={opt} 
                                            label={`${nested.title} - ${opt}`} 
                                            categoryName={`${cat.category} - ${sub.name}`} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ))}
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