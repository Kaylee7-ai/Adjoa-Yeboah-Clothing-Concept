/*
 * ALL CONTENT IN THIS FILE IS DUMMY DATA AND MUST BE CONFIRMED WITH THE STUDIO.
 * Edit labels, icons, swatches, garment imagery, location, delivery options,
 * turnaround text and payment assumptions here before any public launch.
 */
export interface VisualOption {
  id: string;
  label: string;
  icon: string;
  image?: string;
  accent?: string;
  note?: string;
}

export const CUSTOM_OPTIONS_NOTICE = "DUMMY OPTIONS — TO BE CONFIRMED WITH THE STUDIO";
export const DEPARTMENTS: VisualOption[] = [
  { id: "women", label: "Women", icon: "👗" },
  { id: "men", label: "Men", icon: "🧥" },
  { id: "children", label: "Children", icon: "🧒" },
];

export const GARMENTS: VisualOption[] = [
  { id: "bridal-gown", label: "Bridal gown", icon: "👰", image: "/images/custom/bridal-gown.jpg" },
  { id: "kente-corset-dress", label: "Kente corset dress", icon: "🧵", image: "/images/custom/kente-corset.jpg" },
  { id: "ankara-gown", label: "Ankara gown", icon: "🌺", image: "/images/custom/ankara-gown.jpg" },
  { id: "kaftan", label: "Kaftan", icon: "✨", image: "/images/custom/kaftan.jpg" },
  { id: "agbada-set", label: "Agbada set", icon: "🪡", image: "/images/custom/agbada.jpg" },
  { id: "two-piece-set", label: "Two-piece set", icon: "🧵", image: "/images/custom/two-piece.jpg" },
  { id: "occasion-dress", label: "Occasion dress", icon: "💃", image: "/images/custom/occasion-dress.jpg" },
  { id: "christening-outfit", label: "Christening outfit", icon: "🕊️", image: "/images/custom/christening.jpg" },
  { id: "corporate-dress", label: "Corporate dress", icon: "👜", image: "/images/custom/corporate.jpg" },
  { id: "shirt-blouse", label: "Shirt / blouse", icon: "👚", image: "/images/custom/blouse.jpg" },
  { id: "skirt", label: "Skirt", icon: "👗", image: "/images/custom/skirt.jpg" },
  { id: "jumpsuit", label: "Jumpsuit", icon: "🪡", image: "/images/custom/jumpsuit.jpg" },
];

export const OCCASIONS: VisualOption[] = [
  { id: "wedding", label: "Wedding", icon: "💍" },
  { id: "engagement", label: "Engagement / traditional", icon: "💛" },
  { id: "church", label: "Church", icon: "⛪" },
  { id: "graduation", label: "Graduation", icon: "🎓" },
  { id: "birthday", label: "Birthday", icon: "🎂" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "funeral", label: "Funeral", icon: "🕯️" },
  { id: "naming", label: "Naming ceremony", icon: "🌿" },
  { id: "everyday", label: "Everyday", icon: "☀️" },
  { id: "other", label: "Other", icon: "✦" },
];

export const FABRIC_SOURCES: VisualOption[] = [
  { id: "studio", label: "Use the studio's fabric", icon: "🧵", note: "Choose up to two fabric types below." },
  { id: "own", label: "I'll bring my own fabric", icon: "🛍️", note: "Dummy studio address: 1 Levites Avenue, Accra. Confirm before visiting." },
];

export const OWN_FABRIC_METHODS: VisualOption[] = [
  { id: "drop-off", label: "Drop off at the studio", icon: "📍" },
  { id: "pickup", label: "Arrange pickup", icon: "🚚" },
];

export const FABRICS: VisualOption[] = [
  { id: "kente", label: "Kente", icon: "🟨", image: "/images/fabrics/kente.jpg", accent: "#C69749" },
  { id: "ankara", label: "Ankara / wax print", icon: "🌺", image: "/images/fabrics/ankara.jpg", accent: "#E8743B" },
  { id: "lace", label: "Lace", icon: "✿", image: "/images/fabrics/lace.jpg", accent: "#F1E5D8" },
  { id: "silk", label: "Silk", icon: "〰️", image: "/images/fabrics/silk.jpg", accent: "#8C1D40" },
  { id: "satin", label: "Satin", icon: "✨", image: "/images/fabrics/satin.jpg", accent: "#1E3FA8" },
  { id: "brocade", label: "Brocade", icon: "✧", image: "/images/fabrics/brocade.jpg", accent: "#0F7B5F" },
  { id: "organza", label: "Organza", icon: "🫧", image: "/images/fabrics/organza.jpg", accent: "#E9C9CF" },
  { id: "chiffon", label: "Chiffon", icon: "🌬️", image: "/images/fabrics/chiffon.jpg", accent: "#C6B4D5" },
  { id: "cotton", label: "Cotton", icon: "☁️", image: "/images/fabrics/cotton.jpg", accent: "#E6E0D5" },
];

export const COLOURS: VisualOption[] = [
  { id: "gold", label: "Gold", icon: "●", accent: "#C69749" },
  { id: "emerald", label: "Emerald", icon: "●", accent: "#0F7B5F" },
  { id: "burgundy", label: "Burgundy", icon: "●", accent: "#8C1D40" },
  { id: "royal-blue", label: "Royal blue", icon: "●", accent: "#1E3FA8" },
  { id: "sunset-orange", label: "Sunset orange", icon: "●", accent: "#E8743B" },
  { id: "ivory", label: "Ivory", icon: "●", accent: "#F4EBDD" },
  { id: "black", label: "Black", icon: "●", accent: "#181512" },
  { id: "pink", label: "Pink", icon: "●", accent: "#E9A8B8" },
  { id: "custom", label: "Custom colour", icon: "＋", accent: "conic-gradient(#C69749,#0F7B5F,#1E3FA8,#E8743B)" },
];

export const NECKLINES: VisualOption[] = [
  { id: "sweetheart", label: "Sweetheart", icon: "♡" }, { id: "v-neck", label: "V-neck", icon: "▽" },
  { id: "square", label: "Square", icon: "□" }, { id: "boat", label: "Boat", icon: "⌒" },
  { id: "off-shoulder", label: "Off-shoulder", icon: "↘" }, { id: "high-neck", label: "High neck", icon: "⌃" },
];
export const SLEEVES: VisualOption[] = [
  { id: "sleeveless", label: "Sleeveless", icon: "○" }, { id: "short", label: "Short", icon: "◒" },
  { id: "three-quarter", label: "Three-quarter", icon: "◕" }, { id: "long", label: "Long", icon: "│" },
  { id: "puff", label: "Puff", icon: "❀" }, { id: "bell", label: "Bell", icon: "▽" },
];
export const LENGTHS: VisualOption[] = [
  { id: "mini", label: "Mini", icon: "↟" }, { id: "knee", label: "Knee", icon: "↕" },
  { id: "midi", label: "Midi", icon: "↕" }, { id: "maxi", label: "Maxi", icon: "↕" },
  { id: "floor", label: "Floor-length", icon: "↧" }, { id: "train", label: "With train", icon: "✧" },
];
export const FITS: VisualOption[] = [
  { id: "fitted", label: "Fitted", icon: "◇" }, { id: "semi-fitted", label: "Semi-fitted", icon: "◈" },
  { id: "flowy", label: "Flowy", icon: "〰" }, { id: "corset", label: "Corset bodice", icon: "♧" },
  { id: "a-line", label: "A-line", icon: "△" }, { id: "mermaid", label: "Mermaid", icon: "♧" },
];
export const EXTRAS: VisualOption[] = [
  { id: "lining", label: "Lining", icon: "▤" }, { id: "beading", label: "Beading", icon: "✦" },
  { id: "embroidery", label: "Embroidery", icon: "❀" }, { id: "lace-overlay", label: "Lace overlay", icon: "✿" },
  { id: "pockets", label: "Pockets", icon: "▱" }, { id: "slit", label: "Slit", icon: "↗" },
  { id: "head-wrap", label: "Matching head wrap", icon: "♢" }, { id: "accessories", label: "Matching accessories", icon: "◇" },
];

export const MEASUREMENT_METHODS: VisualOption[] = [
  { id: "manual", label: "Enter my measurements", icon: "📏" },
  { id: "fitting", label: "Book a fitting at the studio", icon: "🪡" },
  { id: "standard", label: "Use standard size, adjust at fitting", icon: "👚" },
];
export const STANDARD_SIZES: VisualOption[] = ["XS", "S", "M", "L", "XL", "XXL"].map((label) => ({ id: label, label, icon: "◯" }));
export const DELIVERY_METHODS: VisualOption[] = [
  { id: "collect", label: "Collect at studio", icon: "📍" },
  { id: "deliver", label: "Deliver to me", icon: "🚚" },
];

// DUMMY timing promise; replace with a studio-approved service-level agreement.
export const QUOTE_TURNAROUND = "The studio will send your price soon.";
// DUMMY delivery, rush-order and payment terms; confirm before launch.
export const RUSH_REQUEST_NOTE = "Rush requests may need confirmation. The studio will confirm feasibility and timing.";
export const DELIVERY_QUOTE_NOTE = "Delivery cost will be confirmed in your quote.";
export const OWN_FABRIC_QUANTITY_NOTE = "Fabric quantity depends on the design and size. The studio will confirm the required amount.";
export const DUMMY_STUDIO_ADDRESS = "1 Levites Avenue, Accra";
