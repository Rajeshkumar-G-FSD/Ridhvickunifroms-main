import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface AiChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AiChatAssistant({
  isOpen,
  onClose,
  onOpen
}: AiChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      text: "Hello! Welcome to Ridhvick Uniforms. I'm your Ridhvick Sizing and Manufacturing AI Assistant. Ask me anything about our school uniform fabrics, custom embroidery setups, or how to get tailored volume estimates!"
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Tell me about Sports Wear fabrics",
    "How does custom embroidery design work?",
    "Do you offer bulk school discounts?",
    "How should we care for woven blazers?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessageId = `u-${Date.now()}`;
    const userMsg: ChatMessage = { id: userMessageId, role: 'user', text: textToSend };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Structure chat history format for server endpoint
      const chatHistory = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          chatHistory
        })
      });

      const data = await res.json();

      const replyMsg: ChatMessage = {
        id: `r-${Date.now()}`,
        role: 'assistant',
        text: data.reply || data.fallback
      };

      setMessages(prev => [...prev, replyMsg]);
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: "I am having trouble connecting right now, but Ridhvick Uniforms offers full product design and premium woven fabrics under one roof! Contact our main office at contact@ridhvick.com for active bulk orders."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-brand-blue hover:bg-brand-blue-light text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-brand-yellow group"
        aria-label="Open AI Assistant"
        id="chat-bubble-fab"
      >
        <MessageSquare className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
        </span>
      </motion.button>

      {/* Chat Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-brand-blue/30 z-40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed right-3 sm:right-4 bottom-20 sm:bottom-24 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[min(72vh,550px)] bg-white rounded-2xl shadow-3xl z-50 flex flex-col overflow-hidden border border-brand-border/20"
              id="chat-panel"
            >
              {/* Chat Header */}
              <div className="bg-brand-blue text-white p-4 flex items-center justify-between border-b border-brand-yellow">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-yellow/15 flex items-center justify-center border border-brand-yellow">
                    <Sparkles className="w-5 h-5 text-brand-yellow animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-sm font-headline font-black tracking-tight">Ridhvick AI Assistant</h3>
                    <p className="text-[10px] text-brand-yellow/85 uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Virtual Uniform Expert
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-grow p-4 overflow-y-auto bg-brand-light flex flex-col gap-4">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-brand-blue text-white rounded-br-none'
                            : 'bg-white text-brand-blue border border-brand-border/10 rounded-bl-none'
                        }`}
                      >
                        <p className="font-sans whitespace-pre-line">{m.text}</p>
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-brand-muted border border-brand-border/10 rounded-xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2.5">
                      <RefreshCw className="w-3.5 h-3.5 text-brand-blue animate-spin" />
                      <span className="text-[11px] font-medium font-headline">Tailoring response...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion Chips */}
              <div className="p-3 border-t border-brand-border/10 bg-white">
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Common Questions:</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
                  {suggestionChips.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chip)}
                      className="shrink-0 text-[10px] font-headline font-semibold text-brand-blue bg-brand-light hover:bg-brand-yellow/10 hover:text-brand-blue border border-brand-border/20 px-3 py-1.5 rounded-full cursor-pointer transition-colors snap-center whitespace-nowrap"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Footer Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="p-3 border-t border-brand-border/15 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Type your uniform inquiry..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow bg-brand-light border border-brand-border/20 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue text-brand-blue placeholder-brand-muted h-[40px]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer h-[40px] w-[40px]"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
