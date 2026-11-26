export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "bridal",
    name: "Bridal",
    slug: "bridal",
    description: "Custom wedding and traditional bridal pieces",
  },
  {
    id: "kente",
    name: "Kente",
    slug: "kente",
    description: "Handwoven and Kente-inspired statement pieces",
  },
  {
    id: "occasion",
    name: "Occasion Wear",
    slug: "occasion",
    description: "Engagement, gala, christening and formal ensembles",
  },
  {
    id: "menswear",
    name: "Menswear",
    slug: "menswear",
    description: "Tailored traditional and formal wear for men",
  },
];
