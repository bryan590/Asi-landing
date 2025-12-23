
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '#home' },
    { name: 'Repository', href: '#products' },
    { name: 'Protocols', href: '#why-choose' },
    { name: 'Global Network', href: '#global-reach' }
  ];

  return (
    <nav 
      className={`fixed w-full z-[90] transition-all duration-700 ease-[0.23, 1, 0.32, 1] ${
        scrolled 
          ? 'py-4 bg-[#1a1f22]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
          : 'py-10 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* LOGO */}
        <motion.a
          href="#home"
          className="flex items-center space-x-3 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <img
              src="/frame_1.png"
              alt="ASI Logo"
              className="h-8 w-auto brightness-0 invert opacity-90"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-3 top-1 w-1.5 h-1.5 bg-[#2176ff] rounded-full shadow-[0_0_8px_#2176ff]"
            />
          </div>
          <div className="h-6 w-[1px] bg-white/10 mx-2 hidden lg:block" />
          <span className="mono text-[8px] uppercase tracking-[0.4em] text-[#edf5fc]/30 hidden lg:block font-bold">Industrial <br/>Procurement</span>
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#edf5fc]/30 hover:text-[#edf5fc] transition-all relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#2176ff] group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          <motion.a 
            href="#contact" 
            whileHover={{ y: -2 }}
            className="bg-[#2176ff] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-[0_10px_20px_-5px_rgba(33,118,255,0.4)] border border-white/10"
          >
            Connect
          </motion.a>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl glass border-white/5 text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[95] bg-[#1a1f22] p-10 flex flex-col"
          >
             <div className="flex justify-between items-center mb-20">
                <img
                  src="/frame_1.png"
                  alt="ASI Logo"
                  className="h-10 w-auto brightness-0 invert opacity-90"
                />
                <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-xl glass text-white"><X size={20} /></button>
             </div>

             <div className="flex flex-col space-y-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-4xl font-serif text-[#edf5fc] hover:text-[#2176ff] transition-all italic"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                <div className="pt-20 border-t border-white/5">
                  <a 
                    href="#contact" 
                    onClick={() => setIsOpen(false)} 
                    className="w-full block py-6 bg-[#2176ff] text-white text-center font-black uppercase tracking-[0.5em] rounded-2xl shadow-xl text-xs"
                  >
                    Authorize Session
                  </a>
                </div>
             </div>
             <div className="mt-auto opacity-10 mono text-[8px] tracking-[1em] uppercase">ASI_MOBILE_RELAY_v.01</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
