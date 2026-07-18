import React, { useState } from 'react';
import { X, Trash2, Mail, Landmark, FileText, Send, CheckCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  // Form details
  const [parentName, setParentName] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');
  const [parentEmail, setParentEmail] = useState<string>('');
  const [customEmbroidery, setCustomEmbroidery] = useState<boolean>(false);
  const [inquiryNotes, setInquiryNotes] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const priceNum = parseFloat(item.product.priceEstimate.replace(/[^0-9.]/g, ''));
      return acc + (priceNum * item.quantity);
    }, 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !parentName || !parentEmail) return;

    setIsSubmitting(true);

    // Simulate sending proposal to Ridhvick backend/email desk
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClearCart();
        setIsSuccess(false);
        onClose();
        // Reset form
        setParentName('');
        setSchoolName('');
        setParentEmail('');
        setCustomEmbroidery(false);
        setInquiryNotes('');
      }, 5000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 p-4 sm:p-6 flex flex-col shadow-2xl overflow-y-auto"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border/10">
              <div>
                <h3 className="text-base sm:text-lg font-headline font-black text-brand-blue flex items-center gap-2 flex-wrap">
                  <span>Custom Uniform Package</span>
                  <span className="text-[10px] sm:text-xs bg-brand-yellow/20 text-brand-blue px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold">
                    Inquiry Desk
                  </span>
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">Build your academic or sports wear package quote</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-brand-light text-brand-blue cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            {isSuccess ? (
              /* Success Panel Animation */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center p-6 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <CheckCircle className="w-10 h-10 text-green-600 animate-bounce" />
                </div>
                <h4 className="text-xl font-headline font-black text-brand-blue">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
                  Thank you, <strong>{parentName}</strong>. Your custom uniform quote specification sheet for <strong>{schoolName || 'Academic Institution'}</strong> has been safely delivered to the Ridhvick Tailoring Desk. 
                </p>
                <div className="p-3 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-blue text-[11px] rounded-lg mt-2 font-headline font-medium">
                  Our service desk will contact you at <strong>{parentEmail}</strong> within 24 business hours with physical fabric sample suggestions and a structured pricing breakdown.
                </div>
              </motion.div>
            ) : cart.length === 0 ? (
              /* Empty Cart State */
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6 gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <FileText className="w-6 h-6 text-brand-border" />
                </div>
                <h4 className="text-sm font-headline font-bold text-brand-blue">No Uniform Packs Selected</h4>
                <p className="text-xs text-brand-muted max-w-xs leading-relaxed">
                  Browse the catalog below, select preferred school sizing, and add items here to build a tailored manufacturing request!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs bg-brand-blue text-white font-headline font-bold px-4 py-2 rounded hover:bg-brand-blue-light cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              /* Items list & Checkout Inquiry Form */
              <div className="flex-grow flex flex-col gap-4 sm:gap-6 mt-3 sm:mt-4">

                {/* Scrollable list of cart items */}
                <div className="flex-col gap-2.5 sm:gap-3 flex max-h-[26vh] sm:max-h-[30vh] overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-brand-light rounded-lg border border-brand-border/10"
                    >
                      {/* Image Thumbnail */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 rounded object-cover object-top border border-brand-border/10"
                        referrerPolicy="no-referrer"
                      />

                      {/* Product Text Details */}
                      <div className="flex-grow min-w-0">
                        <h5 className="text-xs font-headline font-bold text-brand-blue truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] text-brand-muted flex items-center gap-1.5 mt-0.5">
                          <span>Size: <strong className="text-brand-blue">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>Est. {item.product.priceEstimate}</span>
                        </p>
                      </div>

                      {/* Quantity Controls & Trash */}
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center border border-brand-border/20 bg-white rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-brand-light cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-[11px] font-bold text-brand-blue">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-brand-light cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="p-1 hover:text-red-600 text-brand-muted cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estimate pricing block */}
                <div className="p-4 bg-brand-blue text-white rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/70">Estimate Material Total</span>
                    <p className="text-xs text-white/80">Excluding bulk/embroidery setup discounts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-headline font-black text-brand-yellow">₹{calculateTotal()}</p>
                  </div>
                </div>

                {/* Inquire Form */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 border-t border-brand-border/10 pt-4 mt-auto">
                  <h4 className="text-xs font-headline font-black text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-brand-blue" />
                    School / Custom Volume Details
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Your Name</label>
                      <input 
                        type="text" 
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-brand-light border border-brand-border/20 rounded px-3 py-2 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">School / Org Name</label>
                      <input 
                        type="text" 
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="E.g. Academy Heights"
                        className="w-full bg-brand-light border border-brand-border/20 rounded px-3 py-2 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="johndoe@example.com"
                      required
                      className="w-full bg-brand-light border border-brand-border/20 rounded px-3 py-2 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[38px]"
                    />
                  </div>

                  {/* Embroidery toggle with premium highlight */}
                  <div className="p-3 bg-brand-light rounded border border-brand-yellow/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-headline font-bold text-brand-blue flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin-slow" />
                        Custom Logo Embroidery Needed?
                      </span>
                      <p className="text-[10px] text-brand-muted mt-0.5">Includes digitizing setup for chest logo crests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={customEmbroidery}
                        onChange={(e) => setCustomEmbroidery(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-blue"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted mb-1 uppercase">Additional Notes or Sizing Specifications</label>
                    <textarea 
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      placeholder="E.g. We require 20 packs of high school sports wear with embroidered names on the back..."
                      rows={2}
                      className="w-full bg-brand-light border border-brand-border/20 rounded px-3 py-2 text-xs text-brand-blue focus:outline-none focus:border-brand-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue font-headline font-black rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                        Transmitting Proposal...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Package Quote Specification
                      </>
                    )}
                  </button>
                </form>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
