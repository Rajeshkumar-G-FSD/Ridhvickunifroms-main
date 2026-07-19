import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import SplitText from './SplitText';
import BlurText from './BlurText';
import DecryptedText from './DecryptedText';

interface ProductCardProps {
  key?: string;
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-lg sm:rounded-xl border border-brand-border/20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Top Image Box */}
      <div className="relative h-36 sm:h-52 md:h-64 overflow-hidden bg-brand-light">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
        />

        {/* Floating Custom Badge */}
        {product.badge && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-brand-yellow text-brand-blue text-[9px] sm:text-xs font-headline font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-brand-yellow-hover">
            {product.badge}
          </div>
        )}

        {/* Hover overlay details button (desktop) */}
        <div className="absolute inset-0 bg-brand-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center backdrop-blur-[2px]">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white text-brand-blue font-headline font-bold text-xs px-5 py-2.5 rounded-lg shadow-md hover:bg-brand-yellow hover:text-brand-blue hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Quick View & AI Fitting
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-2.5 sm:p-4 md:p-6 flex flex-col flex-grow gap-1.5 sm:gap-3 relative z-10 border-t-2 sm:border-t-4 border-brand-blue">
        <div className="flex items-center justify-between gap-2 text-[9px] sm:text-xs font-headline font-semibold text-brand-blue-light uppercase tracking-widest">
          <SplitText
            tag="span"
            text={product.categoryLabel}
            splitType="chars"
            duration={0.5}
            delay={15}
            from={{ opacity: 0, y: 8 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            singleLine
            className="shrink-0 max-w-[45%]"
          />
          <SplitText
            tag="span"
            text={product.material.split(',')[0]}
            splitType="chars"
            duration={0.5}
            delay={10}
            from={{ opacity: 0, y: 8 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="right"
            singleLine
            className="min-w-0 max-w-[50%] text-brand-muted text-right"
          />
        </div>

        <BlurText
          as="h3"
          text={product.name}
          animateBy="words"
          direction="top"
          singleLine
          className="text-xs sm:text-base md:text-lg font-headline font-bold text-brand-blue group-hover:text-brand-blue-light transition-colors"
        />

        <DecryptedText
          text={product.description}
          animateOn="view"
          sequential
          speed={16}
          maxIterations={10}
          revealDirection="start"
          className="text-brand-muted"
          encryptedClassName="text-brand-muted/40"
          parentClassName="block text-[10px] sm:text-sm font-sans text-brand-muted flex-grow line-clamp-2 leading-relaxed"
        />

        {/* Bottom Details Section */}
        <div className="pt-1.5 sm:pt-4 border-t border-brand-border/10 flex items-center justify-between mt-auto gap-1">
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-brand-muted">Estimate Cost</p>
            <p className="text-xs sm:text-lg font-headline font-black text-brand-blue truncate">{product.priceEstimate}</p>
          </div>

          <button
            onClick={() => onQuickView(product)}
            className="inline-flex items-center text-[10px] sm:text-xs font-headline font-bold text-brand-blue hover:text-brand-yellow-hover group/link cursor-pointer gap-0.5 sm:gap-1 shrink-0"
          >
            <span className="hidden sm:inline">Sizing & </span>Quote
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
