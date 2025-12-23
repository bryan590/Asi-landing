
import React from 'react';

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  location: string;
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

// Added Project interface for InteractiveMap integration
export interface Project {
  id: number;
  title: string;
  type: string;
  region: string;
  volume: string;
}
