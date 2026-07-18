import React, { useState } from 'react';
import { CATALOG_TOPICS, CatalogTopic, CatalogPage, CatalogModel } from '../data/catalogPages';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShoppingBag, 
  Info, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Sliders,
  Award
} from 'lucide-react';

interface DigitalCatalogProps {
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenCart: () => void;
}

export default function DigitalCatalog({ onAddToCart, onOpenCart }: DigitalCatalogProps) {
  const [selectedTopic, setSelectedTopic] = useState<CatalogTopic>(CATALOG_TOPICS[0]);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<CatalogModel | null>(null);
  
  // Sizing and Quantity config for the catalog model quick-add
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // Zoom States
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1 = 100%, 2.5 = 250%
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activePage = selectedTopic.pages[activePageIndex] || selectedTopic.pages[0];

  const getStartingEstimate = (modelId: string) => {
    if (modelId.startsWith('HOU_STL')) {
      return '₹3,999.00';
    } else if (modelId === 'PRIM_MDL074') {
      return '₹2,199.00';
    } else if (modelId === 'PRIM_MDL075') {
      return '₹1,499.00';
    } else if (modelId.startsWith('SPRT_MDL002')) {
      return '₹2,599.00';
    } else if (modelId.startsWith('SPRT_MDL001')) {
      return '₹1,699.00';
    } else if (modelId.startsWith('KG_MDL')) {
      return '₹1,399.00';
    }
    return '₹1,599.00';
  };

  const handleTopicChange = (topic: CatalogTopic) => {
    setSelectedTopic(topic);
    setActivePageIndex(0);
    setSelectedModel(null);
    setSelectedSize('');
    setZoomLevel(1);
  };

  const handlePageChange = (index: number) => {
    setActivePageIndex(index);
    setSelectedModel(null);
    setSelectedSize('');
    setZoomLevel(1);
  };

  const selectModel = (model: CatalogModel) => {
    setSelectedModel(model);
    setSelectedSize(model.sizes[0] || 'M');
    setQuantity(1);
    setIsAddedFeedback(false);
  };

  // Convert CatalogModel into standard Product type for checkout integration
  const handleAddCatalogProductToCart = () => {
    if (!selectedModel) return;

    let appCategory: 'primary' | 'high' | 'sports' | 'accessories' = 'primary';
    let priceEst = '₹1,599.00';

    if (selectedTopic.id === 'sports-wear') {
      appCategory = 'sports';
    } else if (selectedTopic.id === 'woven-series' || selectedModel.id.startsWith('HOU_STL') || selectedModel.id.startsWith('PRIM_MDL02')) {
      appCategory = 'high';
    }

    // Set professional dynamic pricing matching our grid catalog
    if (selectedModel.id.startsWith('HOU_STL')) {
      priceEst = '₹3,999.00';
    } else if (selectedModel.id === 'PRIM_MDL074') {
      priceEst = '₹2,199.00';
    } else if (selectedModel.id === 'PRIM_MDL075') {
      priceEst = '₹1,499.00';
    } else if (selectedModel.id.startsWith('SPRT_MDL002')) {
      priceEst = '₹2,599.00';
    }

    const mappedProduct: Product = {
      id: selectedModel.id,
      name: `Catalogue Fit: ${selectedModel.name}`,
      category: appCategory,
      categoryLabel: selectedTopic.title,
      priceEstimate: priceEst,
      image: activePage.image,
      description: `${selectedModel.description}. Fabric: ${selectedModel.fabric}`,
      features: ['Official Spread Model', 'Guaranteed Quality Stitching', 'Pre-Shrunk Material'],
      sizes: selectedModel.sizes,
      badge: 'Catalog Item',
      material: selectedModel.fabric
    };

    onAddToCart(mappedProduct, selectedSize, quantity);
    
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 2000);
  };

  return (
    <section id="digital-catalog" className="bg-[#fcfdfd] py-10 sm:py-16 md:py-24 border-b border-brand-border/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Title Block */}
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase bg-brand-yellow/15 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full inline-block">
            Digital Spread Layout
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-black text-brand-blue mt-3 sm:mt-4">
            Interactive Catalog Book
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-brand-muted mt-2.5 sm:mt-3 font-sans leading-relaxed">
            Browse through our exact uniform spreadsheets, select models, zoom in to inspect stitches, and directly add configuration mockups to your design quote.
          </p>
        </div>

        {/* Topic Selector Tabs (At least 44px Touch Targets) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-10">
          {CATALOG_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic)}
                id={`tab-topic-${topic.id}`}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-lg font-headline font-bold text-[11px] sm:text-xs md:text-sm transition-all cursor-pointer min-h-[44px] ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15'
                    : 'bg-white text-brand-muted hover:text-brand-blue border border-brand-border/10 hover:border-brand-blue/30 shadow-sm'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{topic.title}</span>
              </button>
            );
          })}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

          {/* LEFT 7 COLS: The Catalogue Spread with Zoom & Navigation */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">

            {/* Top Bar with Navigation & Zoom Controls */}
            <div className="flex items-center justify-between bg-white p-2.5 sm:p-3.5 rounded-xl border border-brand-border/15 shadow-sm gap-1">

              {/* Pagination */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(0, activePageIndex - 1))}
                  disabled={activePageIndex === 0}
                  className="p-1.5 rounded-md hover:bg-brand-light disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5 text-brand-blue" />
                </button>
                <span className="text-xs font-mono font-bold text-brand-blue">
                  Page {activePageIndex + 1} of {selectedTopic.pages.length}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(selectedTopic.pages.length - 1, activePageIndex + 1))}
                  disabled={activePageIndex === selectedTopic.pages.length - 1}
                  className="p-1.5 rounded-md hover:bg-brand-light disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5 text-brand-blue" />
                </button>
              </div>

              {/* Title of active page */}
              <div className="hidden md:block">
                <h4 className="text-xs font-headline font-black text-brand-blue line-clamp-1">
                  {activePage.title}
                </h4>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                  disabled={zoomLevel === 1}
                  className="p-1.5 rounded-md bg-brand-light hover:bg-brand-yellow/25 disabled:opacity-40 disabled:hover:bg-brand-light transition-all cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-brand-blue" />
                </button>
                
                {/* Zoom range input */}
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.25"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="w-16 md:w-24 accent-brand-blue cursor-pointer"
                />

                <button
                  onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
                  disabled={zoomLevel === 2.5}
                  className="p-1.5 rounded-md bg-brand-light hover:bg-brand-yellow/25 disabled:opacity-40 disabled:hover:bg-brand-light transition-all cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-brand-blue" />
                </button>

                <button
                  onClick={() => {
                    setIsFullscreen(!isFullscreen);
                    setZoomLevel(1);
                  }}
                  className={`p-1.5 rounded-md hover:bg-brand-light transition-all cursor-pointer ${isFullscreen ? 'bg-brand-yellow/35' : 'bg-brand-light'}`}
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-brand-blue" />
                </button>
              </div>

            </div>

            {/* The Image Container with smooth panning/overflow-scroll if zoomed */}
            <div 
              id="catalog-zoom-container"
              className={`bg-brand-blue/5 rounded-2xl border border-brand-border/15 overflow-auto relative flex items-center justify-center shadow-inner transition-all duration-300 ${
                isFullscreen 
                  ? 'fixed inset-4 z-50 bg-black/90 p-4' 
                  : 'aspect-[4/3] md:aspect-[3/2] w-full'
              }`}
            >
              {/* Reset view helper text if zoomed in */}
              {zoomLevel > 1 && (
                <div className="absolute top-4 left-4 z-20 bg-brand-blue/80 backdrop-blur text-white text-[10px] py-1 px-2.5 rounded-md flex items-center gap-1.5 font-sans pointer-events-none">
                  <Sliders className="w-3.5 h-3.5 animate-pulse text-brand-yellow" />
                  <span>Zoom active: {Math.round(zoomLevel * 100)}% - Drag/Scroll to pan details</span>
                </div>
              )}

              {/* Close Fullscreen Button */}
              {isFullscreen && (
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 z-30 bg-brand-yellow text-brand-blue font-headline font-extrabold text-xs py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  Exit Preview
                </button>
              )}

              {/* The Actual Catalogue spread Page Image */}
              <div 
                className="transition-transform duration-300 origin-center"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  minWidth: '100%',
                  height: isFullscreen ? '90%' : '100%'
                }}
              >
                <img
                  src={activePage.image}
                  alt={activePage.title}
                  className="w-full h-full object-contain select-none"
                  draggable="false"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

            {/* Quick Helper Tips */}
            <p className="text-[11px] text-brand-muted/70 text-center italic font-sans flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-brand-blue-light" />
              Use the slider above to inspect fabric weave density, badge stitches, and tailoring guides in ultra-clear quality.
            </p>

          </div>

          {/* RIGHT 5 COLS: Topic Details, Interactive Models Index, Configurator */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Topic Info Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-brand-border/15 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-brand-yellow/20 p-2.5 rounded-lg text-brand-blue mt-0.5 shrink-0">
                  <Award className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-headline font-black text-brand-blue">
                    {selectedTopic.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {selectedTopic.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Models Sheet list shown on this Page */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-brand-border/15 shadow-sm flex flex-col gap-3 sm:gap-4">
              <div>
                <h4 className="text-xs font-headline font-black text-brand-blue uppercase tracking-wider">
                  Select Model Shown on Page
                </h4>
                <p className="text-[11px] text-brand-muted font-sans mt-0.5">
                  Click on any model ID from the page illustration to inspect and request samples.
                </p>
              </div>

              {/* List grid of models */}
              <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                {activePage.models.map((model) => {
                  const isSelected = selectedModel?.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => selectModel(model)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all cursor-pointer border min-h-[50px] ${
                        isSelected
                          ? 'bg-brand-blue/5 border-brand-blue/50 ring-1 ring-brand-blue/40 shadow-sm'
                          : 'bg-[#fafbfe]/80 border-brand-border/10 hover:border-brand-blue/20 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded ${
                          isSelected ? 'bg-brand-blue text-white' : 'bg-brand-yellow/25 text-brand-blue'
                        }`}>
                          {model.id}
                        </span>
                        <div>
                          <p className="text-xs font-headline font-black text-brand-blue">
                            {model.name}
                          </p>
                          <p className="text-[10px] text-brand-muted mt-0.5">
                            {model.type}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-brand-blue' : 'text-brand-muted/50'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Model Configurator Details (Shows only if model is selected) */}
            <AnimatePresence mode="wait">
              {selectedModel ? (
                <motion.div
                  key={selectedModel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-b-4 border-brand-blue shadow-md flex flex-col gap-4 sm:gap-5"
                >
                  {/* Model Header */}
                  <div className="flex items-start justify-between border-b border-brand-border/10 pb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold bg-brand-blue text-white px-2 py-0.5 rounded">
                        {selectedModel.id}
                      </span>
                      <h4 className="text-base font-headline font-black text-brand-blue mt-1.5">
                        {selectedModel.name}
                      </h4>
                      <p className="text-xs text-brand-muted font-headline font-semibold mt-0.5">
                        Type: <span className="text-brand-blue-light">{selectedModel.type}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-brand-muted font-sans">Starting Estimate</p>
                      <p className="text-sm font-headline font-black text-brand-blue mt-0.5">
                        {getStartingEstimate(selectedModel.id)}
                      </p>
                    </div>
                  </div>

                  {/* Model Description & Specs */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-brand-muted leading-relaxed font-sans">
                      {selectedModel.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3.5 bg-brand-light p-3 rounded-lg border border-brand-border/10">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-brand-muted font-headline">Fabric Blend</p>
                        <p className="text-xs text-brand-blue font-semibold mt-0.5 font-sans leading-tight">
                          {selectedModel.fabric}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-brand-muted font-headline">Available Colors</p>
                        <p className="text-xs text-brand-blue font-semibold mt-0.5 font-sans leading-tight">
                          {selectedModel.colors.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Size Options Chip lists (Min 44px on mobile) */}
                  <div>
                    <span className="text-[10px] font-headline font-bold text-brand-blue uppercase tracking-wider block mb-2">
                      Sizing Fitting Option
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.sizes.map((size) => {
                        const isSizeSel = selectedSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[44px] min-h-[44px] rounded-lg border text-xs font-bold font-mono flex items-center justify-center transition-all cursor-pointer ${
                              isSizeSel
                                ? 'bg-brand-blue text-white border-brand-blue shadow'
                                : 'bg-[#fafbfe]/80 border-brand-border/15 text-brand-blue hover:border-brand-blue/40 hover:bg-white'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add action row */}
                  <div className="flex items-center gap-3 border-t border-brand-border/10 pt-4">
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-brand-border/15 rounded-lg bg-brand-light">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-brand-blue font-bold text-xs hover:bg-brand-border/10 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-headline font-black text-brand-blue">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-brand-blue font-bold text-xs hover:bg-brand-border/10 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={handleAddCatalogProductToCart}
                      className="flex-grow min-h-[44px] bg-brand-blue hover:bg-brand-blue-light text-white font-headline font-black text-xs py-3 px-6 rounded-lg transition-all shadow shadow-brand-blue/15 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
                    >
                      {isAddedFeedback ? (
                        <span className="flex items-center gap-1.5 text-brand-yellow">
                          <CheckCircle className="w-4 h-4 text-brand-yellow animate-bounce" />
                          Configuration Added!
                        </span>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Request Sizing Sample</span>
                        </>
                      )}
                    </button>

                  </div>

                </motion.div>
              ) : (
                <div className="bg-brand-light/70 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-dashed border-brand-border/20 text-center flex flex-col items-center justify-center gap-3 py-8 sm:py-16">
                  <div className="bg-brand-yellow/15 p-3 rounded-full text-brand-yellow shrink-0">
                    <Sparkles className="w-6 h-6 text-brand-blue-light" />
                  </div>
                  <div>
                    <h5 className="text-sm font-headline font-black text-brand-blue">
                      No Model Inspected Yet
                    </h5>
                    <p className="text-xs text-brand-muted max-w-[240px] mx-auto mt-1 leading-normal font-sans">
                      Select any model index item listed above to load detailed fit information, fabric blends, and size ranges.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
