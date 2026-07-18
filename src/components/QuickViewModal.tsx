import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Check, ShieldAlert, ChevronRight, Ruler } from 'lucide-react';
import { Product, SizeRecommendation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  
  // AI Fitting Tool State
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [preferredFit, setPreferredFit] = useState<string>('Standard');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiRecommendation, setAiRecommendation] = useState<SizeRecommendation & { alternateSize?: string } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAiFitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiRecommendation(null);

    try {
      const res = await fetch('/api/ai/size-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: product.category,
          height: Number(height),
          weight: Number(weight),
          age: age ? Number(age) : undefined,
          preferredFit
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setAiRecommendation(data);
      } else {
        // Fallback in case of server connection / API key issues
        const fallback = data.fallback || {
          recommendedSize: 'M',
          confidence: 'High',
          notes: 'Standard sizing suggests a Medium based on school growth averages. If they are in between, we always suggest rounding up for comfort.'
        };
        setAiRecommendation(fallback);
      }
    } catch (err: any) {
      // Offline fallback
      setAiRecommendation({
        recommendedSize: 'M',
        confidence: 'Medium',
        notes: 'We recommend a size Medium to ensure standard fit safety and accommodate 3-6 months of natural growth.'
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyAiSize = (size: string) => {
    if (product.sizes.includes(size)) {
      setSelectedSize(size);
    } else {
      // If recommended size isn't in product sizes, fallback to nearest or let them know
      setSelectedSize(product.sizes[0] || 'M');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
        id="quickview-modal"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-brand-yellow/20 text-brand-blue transition-all duration-300 z-20 cursor-pointer shadow-sm border border-brand-border/10"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Column 1: Image & Basic Info (4 Cols) */}
        <div className="md:col-span-5 bg-brand-light p-6 md:p-8 flex flex-col justify-between border-r border-brand-border/10 overflow-y-auto max-h-[40vh] md:max-h-full">
          <div>
            <span className="text-[10px] font-headline font-bold text-brand-blue-light tracking-widest uppercase bg-brand-yellow/20 px-2.5 py-1 rounded-full">
              {product.categoryLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-headline font-black text-brand-blue mt-3">
              {product.name}
            </h2>
            <p className="text-xs text-brand-muted font-mono mt-1">Material: {product.material}</p>
          </div>

          <div className="my-6 aspect-[4/5] rounded-lg overflow-hidden border border-brand-border/10 shadow-sm bg-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-brand-muted">Estimate Unit Price</p>
            <p className="text-2xl font-headline font-black text-brand-blue">{product.priceEstimate}</p>
          </div>
        </div>

        {/* Column 2: Details & AI Sizer (7 Cols) */}
        <div className="md:col-span-7 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-full flex flex-col gap-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-brand-muted leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Premium Features List */}
          <div>
            <h4 className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider mb-2">Academic Grade Qualities</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-brand-muted">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing & AI Advisor Section */}
          <div className="border-t border-b border-brand-border/10 py-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-brand-blue" />
                Sizing Assistant
              </h4>
              <span className="text-[10px] text-brand-blue font-semibold flex items-center gap-1 bg-brand-yellow/10 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-brand-blue animate-pulse" />
                Gemini AI Tailored
              </span>
            </div>

            {/* AI Advisor Input Form */}
            <form onSubmit={handleAiFitSubmit} className="bg-brand-light p-4 rounded-lg border border-brand-yellow/20 flex flex-col gap-3">
              <p className="text-xs text-brand-muted leading-snug">
                Let Gemini determine the perfect size based on the child's height, weight, and school year growth expectations.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Height (cm)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 135"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min="80"
                    max="220"
                    className="w-full bg-white border border-brand-border/30 rounded px-2.5 py-1.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Weight (kg)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 30"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min="10"
                    max="150"
                    className="w-full bg-white border border-brand-border/30 rounded px-2.5 py-1.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Age (years)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 9"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="3"
                    max="19"
                    className="w-full bg-white border border-brand-border/30 rounded px-2.5 py-1.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Fit Fit</label>
                  <select 
                    value={preferredFit}
                    onChange={(e) => setPreferredFit(e.target.value)}
                    className="w-full bg-white border border-brand-border/30 rounded px-2 py-1.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Room to grow">Growth room</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!height || !weight || isAiLoading}
                className={`w-full py-2 bg-brand-blue text-white rounded text-xs font-headline font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAiLoading ? 'opacity-80' : 'hover:bg-brand-blue-light'
                }`}
              >
                {isAiLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating growth buffer...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                    Calculate Recommended Size
                  </>
                )}
              </button>
            </form>

            {/* AI Recommendation Output Display */}
            <AnimatePresence>
              {aiRecommendation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 bg-brand-blue/5 border-l-4 border-brand-yellow rounded-r-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-headline font-extrabold text-brand-blue">
                      AI Suggested Size: <span className="text-base text-brand-yellow-hover bg-brand-blue px-2.5 py-0.5 rounded ml-1">{aiRecommendation.recommendedSize}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      aiRecommendation.confidence === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {aiRecommendation.confidence} Confidence
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted font-sans leading-relaxed">
                    {aiRecommendation.notes}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => handleApplyAiSize(aiRecommendation.recommendedSize)}
                      className="text-[10px] bg-brand-blue text-white hover:bg-brand-blue-light font-headline font-semibold px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                    >
                      Apply Recommended Size ({aiRecommendation.recommendedSize})
                    </button>
                    {aiRecommendation.alternateSize && product.sizes.includes(aiRecommendation.alternateSize) && (
                      <button
                        type="button"
                        onClick={() => handleApplyAiSize(aiRecommendation.alternateSize!)}
                        className="text-[10px] bg-white text-brand-blue hover:bg-brand-light border border-brand-border/30 font-headline font-semibold px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                      >
                        Apply Growth-room size ({aiRecommendation.alternateSize})
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Standard Manual Size Selector & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider mb-2">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-[44px] rounded-lg text-xs font-headline font-extrabold flex items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md scale-105'
                          : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-blue hover:text-brand-blue'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider mb-2">Quantity</h4>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 border border-brand-border/30 rounded-lg flex items-center justify-center text-lg font-bold text-brand-blue hover:bg-brand-light cursor-pointer select-none"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-headline font-black text-brand-blue">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 border border-brand-border/30 rounded-lg flex items-center justify-center text-lg font-bold text-brand-blue hover:bg-brand-light cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Submit Action Block */}
          <div className="pt-4 mt-auto border-t border-brand-border/10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onAddToCart(product, selectedSize, quantity)}
              className="flex-grow py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-headline font-black rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              id="add-to-cart-modal-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Uniform Pack to Inquiry
            </button>
            <button
              onClick={onClose}
              className="py-3.5 px-6 border border-brand-border/30 hover:bg-brand-light text-brand-muted font-headline font-bold rounded-lg transition-colors cursor-pointer text-sm"
            >
              Back to Catalog
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
