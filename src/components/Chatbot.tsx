import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Nova, the AI assistant for NovaWave Digital Solutions PLC, a digital agency based in Addis Ababa, Ethiopia.
Your goal is to help users understand NovaWave's services and pricing.

NovaWave Services:
1. Logo Design: Professional logos, custom concepts, revisions, vector files.
2. Social Media Management: Strategy, content creation, posting, growth, engagement.
3. Web Development: Modern, responsive websites, SEO optimized.

Pricing Packages (in Birr):
- Bronze (2500): 1 Logo, 3 revisions, 1 platform setup, 5 posts/month, 1-page website.
- Silver (3500): 2 Logo concepts, 5 revisions, 2 platforms, 12 posts/month, 3-page website, basic SEO.
- Gold (4500): 3 Logo concepts + Brand Kit, unlimited revisions, 3 platforms, 20 posts/month, 5-page website, SEO optimization, monthly reports.
- Premium (12000): Full Brand Identity, unlimited concepts/revisions, all platforms, 30+ posts/month, unlimited pages website, advanced SEO, dedicated manager.
N.B: Domain names can slightly affect pricing (e.g., .com vs .org).

Team:
- Michael Genanew: CEO and Founder.

Contact Info:
- Email: genanewmichael90@gmail.com
- Phone/WhatsApp/Telegram: +251940471155
- Location: Addis Ababa, Ethiopia

Be professional, helpful, and concise. If you don't know the answer, suggest they contact the team directly via the provided phone number or email.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am Nova. How can I help you with NovaWave\'s digital solutions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [runtimeApiKey, setRuntimeApiKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the API key from our server at runtime
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.GEMINI_API_KEY) {
          setRuntimeApiKey(data.GEMINI_API_KEY);
        }
      })
      .catch(err => console.error("Failed to fetch runtime config:", err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use the runtime key if available, otherwise fallback to the baked-in one
      let apiKey = runtimeApiKey || process.env.GEMINI_API_KEY;
      
      // If still missing, try one last fetch (just in case)
      if (!apiKey) {
        const res = await fetch('/api/config');
        const data = await res.json();
        apiKey = data.GEMINI_API_KEY;
        if (apiKey) setRuntimeApiKey(apiKey);
      }

      if (!apiKey) {
        throw new Error("API Key is missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare history for generateContent
      // The model expects 'user' and 'model' roles
      const history = [
        ...messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: history,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again or contact us directly.";
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage = error instanceof Error && error.message === "API Key is missing" 
        ? "AI configuration is incomplete. Please ensure the API key is set."
        : "Sorry, I'm having trouble connecting. Please try again later.";
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-brand-purple flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Nova AI</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">NovaWave Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-purple/20 text-brand-purple'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-purple text-white rounded-tr-none' : 'glass text-[var(--text-primary)] rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl glass text-[var(--text-primary)] rounded-tl-none flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs italic">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 border-t border-white/5 bg-white/5 flex gap-2"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nova about our services..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-accent transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-brand-purple rounded-xl hover:bg-brand-purple/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-white text-brand-purple rotate-90' : 'bg-brand-purple text-white glow-purple'}`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};
