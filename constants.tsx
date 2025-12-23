
import React from 'react';
import { Search, Globe, Truck, Anchor, Recycle, ShieldCheck, Zap, Warehouse, Clock, ListFilter } from 'lucide-react';
import { Benefit, Product, Testimonial, PricingTier, Project } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Industrial Oven Parts",
    description: "High-temperature resistant components and replacement parts for industrial ovens.",
    features: ["Industrial Certifications", "Permanent Stock", "Express Shipping"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Washers and Gaskets",
    description: "High-quality seals and washers for industrial and automotive applications.",
    features: ["10,000+ References", "Authenticity Guarantee", "Complete Traceability"],
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Train Jacks",
    description: "Heavy-duty hydraulic jacks for railway maintenance and repair.",
    features: ["Technical Advice", "NIST Certified", "Post-Sale Support"],
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Railway Parts",
    description: "Complete range of certified parts for locomotives and railway cars.",
    features: ["Stock availability", "Certified Grade", "Technical Expertise"],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Fire Truck Parts",
    description: "Emergency vehicle components and replacement parts for fire departments.",
    features: ["Express Global Logistics", "Authenticity Guarantee", "24/7 Priority Support"],
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Specialized Parts",
    description: "Custom industrial components for specific applications and machinery.",
    features: ["Personalized Search", "Red Network Access", "10,000+ Parts"],
    image: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&q=80&w=800"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Maintenance Manager",
    company: "Ferrocarriles del Norte",
    location: "Chile",
    content: "RepuestosUSA has been our reliable partner for over 50 years. Their railway parts are always original and arrive on time."
  },
  {
    id: 2,
    name: "Ana Rodriguez",
    role: "Operations Director",
    company: "Industrial Furnaces Corp",
    location: "Colombia",
    content: "The quality of their oven parts is exceptional. They have helped us reduce downtime significantly."
  },
  {
    id: 3,
    name: "Miguel Santos",
    role: "Fleet Chief",
    company: "Bomberos Voluntarios",
    location: "Argentina",
    content: "Fast and reliable service. When we need fire truck parts urgently, we know we can count on them."
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "Fast Global Shipping",
    description: "Specialized logistics network with optimized delivery times for Latin America. Express shipping and real-time tracking available.",
    icon: <Truck className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Certified Original Parts",
    description: "We work exclusively with certified suppliers and original factory parts. Full traceability and authenticity guarantee.",
    icon: <ShieldCheck className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Bilingual Technical Support",
    description: "Expert technical team specialized in industrial and railway machinery. 24/7 support in both Spanish and English.",
    icon: <Globe className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Extensive Parts Catalog",
    description: "Inventory with immediate availability and access to specialized suppliers. Over 10,000 references in permanent stock.",
    icon: <ListFilter className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
  }
];

export const COLLABORATORS = [
  "Bimbo International", "Unacem", "Cementos Lima", "Panaderias San Antonio", "Antamina Mining", "Glencore", "Bureau Veritas", "NIST USA"
];

export const PRICING: PricingTier[] = [
  {
    id: 1,
    name: "Ad-Hoc Sourcing",
    price: "Project",
    period: "Single Event",
    description: "One-time sourcing for specific or rare machinery parts.",
    features: ["Global Factory Search", "Manufacturer Verification", "Miami Hub Transit"],
    cta: "Get Quote"
  },
  {
    id: 2,
    name: "Industrial Partner",
    price: "Premium",
    period: "Retainer",
    description: "Integrated supply chain for recurring industrial needs.",
    features: ["Priority Logistics", "Inventory Management", "24/7 Specialized Support", "Customs Clearance"],
    cta: "Apply Now",
    highlighted: true
  },
  {
    id: 3,
    name: "Fleet Management",
    price: "Volume",
    period: "Annual",
    description: "Full parts support for large railway or emergency fleets.",
    features: ["Dedicated Technical Manager", "Bulk Procurement", "Charter Logistics", "Strategic Stocking"],
    cta: "Contact Sales"
  }
];

export const PROJECTS: Project[] = [
  { id: 1, title: "Miami Strategic Hub", type: "LOGISTICS", region: "Miami Hub", volume: "$2.4M" },
  { id: 2, title: "Lima/Callao Expansion", type: "INFRASTRUCTURE", region: "Lima/Callao Port", volume: "$1.8M" },
  { id: 3, title: "EU Sourcing Network", type: "PROCUREMENT", region: "EU Hub (Bulgaria)", volume: "$900K" },
  { id: 4, title: "DACH Heavy Machinery", type: "INVENTORY", region: "DACH Network (Germany)", volume: "$3.1M" },
  { id: 5, title: "Dakar Logistics Corridor", type: "TRANSIT", region: "Dakar Transit", volume: "$450K" },
  { id: 6, title: "Miami Port Operations", type: "DISTRIBUTION", region: "Miami Hub", volume: "$5.2M" }
];
