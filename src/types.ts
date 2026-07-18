export interface Product {
  id: string;
  name: string;
  category: 'primary' | 'high' | 'sports' | 'accessories';
  categoryLabel: string;
  priceEstimate: string; // Uniform builders usually do estimates or price per item
  image: string;
  description: string;
  features: string[];
  sizes: string[];
  badge?: string;
  material: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface SizeRecommendation {
  recommendedSize: string;
  confidence: 'High' | 'Medium';
  notes: string;
}
