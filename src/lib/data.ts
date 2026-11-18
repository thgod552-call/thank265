// ─── Property Data ───────────────────────────────────────────────────────────
export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: 'Abuja' | 'Lagos';
  neighborhood: string;
  type: 'House' | 'Apartment' | 'Duplex' | 'Terrace' | 'Land' | 'Commercial';
  status: 'For Sale' | 'Featured' | 'New' | 'Off-Plan' | 'Sold Out';
  price: number | null;
  priceLabel?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  development?: string;
  image: string;
  images?: string[];
  amenities?: string[];
  description: string;
  available: boolean;
  paymentPlan?: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    slug: 'aria-residence-kubwa',
    name: 'The Aria Residence',
    location: 'Kubwa, Abuja',
    city: 'Abuja',
    neighborhood: 'Kubwa',
    type: 'Duplex',
    status: 'For Sale',
    price: 180000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 500,
    development: 'cosnova-heights',
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    amenities: ['Swimming Pool', 'Smart Home System', 'CCTV', 'Generator', 'Parking (3 Cars)', 'Garden'],
    description: 'A stunning contemporary duplex designed for modern living. The Aria Residence combines elegant architecture with functional spaces, premium finishes and a serene environment.',
    available: true,
    paymentPlan: true,
  },
  {
    id: 'prop-002',
    slug: 'cosnova-heights-guzape',
    name: 'Cosnova Heights',
    location: 'Guzape, Abuja',
    city: 'Abuja',
    neighborhood: 'Guzape',
    type: 'House',
    status: 'Featured',
    price: 250000000,
    bedrooms: 5,
    bathrooms: 5,
    area: 600,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    amenities: ['Infinity Pool', 'Home Cinema', 'Smart Automation', 'Generator', 'BQ', 'Landscaped Garden'],
    description: 'Situated on an elevated plot in the prestigious Guzape district, Cosnova Heights delivers panoramic views, exceptional architecture and a lifestyle rarely encountered.',
    available: true,
    paymentPlan: false,
  },
  {
    id: 'prop-003',
    slug: 'nova-apartments-lifecamp',
    name: 'The Nova Apartments',
    location: 'Life Camp, Abuja',
    city: 'Abuja',
    neighborhood: 'Life Camp',
    type: 'Apartment',
    status: 'New',
    price: 120000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 320,
    development: 'nova-gardens',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    amenities: ['Rooftop Lounge', 'Gym', 'Generator', 'CCTV', '24/7 Security'],
    description: 'Contemporary apartments finished to the highest specification in the thriving Life Camp neighbourhood, offering exceptional value and a well-connected location.',
    available: true,
    paymentPlan: true,
  },
  {
    id: 'prop-004',
    slug: 'lagoon-penthouse-ikoyi',
    name: 'Lagoon Penthouse',
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    neighborhood: 'Ikoyi',
    type: 'Apartment',
    status: 'Featured',
    price: null,
    priceLabel: 'Price on Request',
    bedrooms: 5,
    bathrooms: 5,
    area: 650,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    amenities: ['Panoramic Terrace', 'Private Elevator', 'Concierge', 'Pool', 'Gym', 'Smart Home'],
    description: 'An extraordinary duplex penthouse commanding breathtaking views across the Lagos Lagoon. Exceptional architecture, generous proportions and bespoke finishes throughout.',
    available: true,
    paymentPlan: false,
  },
  {
    id: 'prop-005',
    slug: 'katampe-estate-plot',
    name: 'Katampe Estate Plot',
    location: 'Katampe, Abuja',
    city: 'Abuja',
    neighborhood: 'Katampe',
    type: 'Land',
    status: 'For Sale',
    price: 85000000,
    area: 900,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    description: 'Serviced residential plot within a secured gated development in Katampe Extension. Title documentation available. Survey plan and C of O provided.',
    available: true,
  },
  {
    id: 'prop-006',
    slug: 'lekki-terrace-duplex',
    name: 'Lekki Terrace Duplex',
    location: 'Lekki Phase 1, Lagos',
    city: 'Lagos',
    neighborhood: 'Lekki Phase 1',
    type: 'Duplex',
    status: 'Off-Plan',
    price: 195000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 420,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    amenities: ['Pool', 'Gym', 'Generator', 'CCTV', 'Visitors Parking'],
    description: 'Off-plan opportunity within an exclusive gated terrace development in Lekki Phase 1. Completion expected Q3 2026. Flexible payment plan available.',
    available: true,
    paymentPlan: true,
  },
];

// ─── Development Projects ───────────────────────────────────────────────────
export interface Development {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  headline: string;
  description: string;
  image: string;
  units?: number;
  completion?: string;
  amenities?: string[];
  propertyTypes?: string[];
}

export const DEVELOPMENTS: Development[] = [
  {
    id: 'dev-001',
    slug: 'cosnova-heights',
    name: 'Cosnova Heights',
    location: 'Guzape, Abuja',
    city: 'Abuja',
    headline: 'Elevated Living Above the City',
    description: 'A carefully planned residential collection occupying a commanding elevation in Guzape district, Abuja. Architecturally distinctive homes with exceptional views, private gardens and premium finishes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    units: 12,
    completion: '2025',
    amenities: ['Private Gardens', 'Infinity Pool', 'Clubhouse', '24/7 Security', 'CCTV', 'Generator Backup'],
    propertyTypes: ['5-Bedroom Houses', '4-Bedroom Duplexes'],
  },
  {
    id: 'dev-002',
    slug: 'nova-gardens',
    name: 'Nova Gardens',
    location: 'Lugbe, Abuja',
    city: 'Abuja',
    headline: 'A Community by Design',
    description: 'A master-planned residential estate bringing together modern apartments, townhouses and curated communal spaces within a secure, landscaped environment.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    units: 48,
    completion: '2026',
    amenities: ['Community Pool', 'Children\'s Play Area', 'Gym', 'Retail Units', '24/7 Security'],
    propertyTypes: ['3-Bedroom Apartments', '4-Bedroom Townhouses'],
  },
  {
    id: 'dev-003',
    slug: 'crest-estate',
    name: 'The Crest Estate',
    location: 'Katampe, Abuja',
    city: 'Abuja',
    headline: 'Landmarks for the Future',
    description: 'Thoughtfully positioned on a landscaped plateau in Katampe Extension, The Crest Estate offers serviced plots and bespoke homes with sweeping views across Abuja.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    units: 30,
    completion: '2025',
    amenities: ['Serviced Roads', 'Solar Street Lighting', 'Water Treatment', 'Security Gate'],
    propertyTypes: ['Serviced Plots', '5-Bedroom Detached Homes'],
  },
  {
    id: 'dev-004',
    slug: 'riverside-residences',
    name: 'Riverside Residences',
    location: 'Life Camp, Abuja',
    city: 'Abuja',
    headline: 'Serene. Considered. Yours.',
    description: 'A boutique riverside development of semi-detached and terrace homes designed for modern family living within one of Abuja\'s most accessible and vibrant neighbourhoods.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    units: 20,
    completion: '2026',
    amenities: ['Pool', 'Generator', 'CCTV', 'Communal Garden', 'BQ'],
    propertyTypes: ['3-Bedroom Terraces', '4-Bedroom Semi-Detached'],
  },
];

// ─── Insights / Blog ────────────────────────────────────────────────────────
export interface Insight {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  image: string;
}

export const INSIGHTS: Insight[] = [
  {
    id: 'ins-001',
    slug: 'how-to-buy-property-in-nigeria',
    category: 'Guide',
    title: 'How to Buy Property in Nigeria',
    excerpt: 'A step-by-step guide to the Nigerian property purchase process — from identifying a property to obtaining a Governor\'s Consent and completing your transaction safely.',
    date: 'January 10, 2026',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    id: 'ins-002',
    slug: 'top-residential-areas-abuja',
    category: 'Location',
    title: 'Top Residential Areas in Abuja',
    excerpt: 'An in-depth comparison of Maitama, Guzape, Katampe, Life Camp, Jabi and Wuse — helping buyers identify which neighbourhood fits their lifestyle and budget.',
    date: 'January 5, 2026',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 'ins-003',
    slug: 'why-real-estate-is-a-smart-investment',
    category: 'Investment',
    title: 'Why Real Estate is a Smart Investment in Nigeria',
    excerpt: 'Understanding how property serves as an effective inflation hedge, income source and long-term wealth strategy for Nigerian homebuyers and diaspora investors.',
    date: 'December 22, 2025',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
];

// ─── Utility helpers ─────────────────────────────────────────────────────────
export function formatPrice(price: number): string {
  if (price >= 1_000_000_000) {
    return `₦${(price / 1_000_000_000).toFixed(2)}bn`;
  }
  if (price >= 1_000_000) {
    return `₦${(price / 1_000_000).toFixed(0)}m`;
  }
  return `₦${price.toLocaleString('en-NG')}`;
}

export const WHATSAPP_NUMBER = '+2348031254567';

export function buildWhatsAppLink(property?: Property): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;
  if (!property) return `${base}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20property.`;
  const msg = encodeURIComponent(
    `Hello Cosnova Limited, I am interested in *${property.name}* (Ref: ${property.id}) located at ${property.location}. Please share more details.`
  );
  return `${base}?text=${msg}`;
}
