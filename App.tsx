
import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import { BENEFITS, COLLABORATORS, PRODUCTS, TESTIMONIALS } from './constants';
import { ChevronRight, Globe, Mail, Phone, MapPin, Send, Star, ArrowRight, ShieldCheck, Clock, Activity, Warehouse, Zap, MessageSquare } from 'lucide-react';

// Lazy loading del componente pesado de mapa
const InteractiveMap = lazy(() => import('./components/InteractiveMap'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1f22] selection:bg-[#2176ff] selection:text-white relative">
      <div className="scanline" />
      <Navbar />
      
      {/* QUICK QUOTE FAB */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-[#2176ff] text-white rounded-full shadow-[0_15px_30px_rgba(33,118,255,0.4)] flex items-center justify-center group border border-white/20"
      >
        <MessageSquare className="group-hover:animate-pulse" size={24} />
      </motion.button>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 lg:pt-32 pb-24 overflow-hidden px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(33,118,255,0.08)_0%,_transparent_100%)]" />
        
        <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full glass border-[#2176ff]/20 mb-10">
              <span className="w-2.5 h-2.5 bg-[#2176ff] rounded-full animate-pulse shadow-[0_0_10px_#2176ff]" />
              <span className="mono text-[11px] uppercase tracking-[0.3em] text-[#2176ff] font-bold">Operational Status: Optimal</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-[#edf5fc] leading-[0.85] mb-14 tracking-tighter">
              <span className="block overflow-hidden pb-2">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="block">Global</motion.span>
              </span>
              <span className="text-[#2176ff] italic block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }} className="block">Specialists.</motion.span>
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-[#edf5fc]/40 mb-16 max-w-xl leading-relaxed font-light">
              Architecting high-precision industrial corridors from the United States to Latin America. <span className="text-[#edf5fc]/80 italic">Precision in procurement, excellence in delivery.</span>
            </p>
            
            <div className="flex flex-wrap gap-8 items-center">
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(33, 118, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-14 py-7 bg-[#2176ff] text-white font-black text-sm uppercase tracking-[0.4em] rounded-2xl shadow-xl transition-all border border-white/10"
              >
                Initiate Protocol
              </motion.a>
              <a href="#products" className="flex items-center text-[11px] font-black text-[#edf5fc]/30 uppercase tracking-[0.5em] hover:text-[#edf5fc] transition-colors group">
                System Catalog 
                <ChevronRight size={20} className="ml-4 group-hover:translate-x-4 transition-transform text-[#2176ff]" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }} 
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
            viewport={{ once: true }}
            className="hidden lg:block relative"
          >
             <div className="relative rounded-[5rem] overflow-hidden glass border-[#edf5fc]/10 shadow-2xl group p-6">
              <div className="rounded-[4rem] overflow-hidden relative">
                {/* Fixed casing for fetchPriority attribute to resolve TS error */}
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=1000" 
                  fetchPriority="high"
                  className="w-full h-[650px] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
                  alt="Industrial Facility" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1f22] via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-16 left-16 p-12 glass rounded-[3rem] border-[#edf5fc]/10 max-w-sm backdrop-blur-3xl">
                 <div className="flex items-baseline space-x-3 mb-6">
                  <p className="text-7xl font-bold tracking-tighter italic text-[#2176ff]">10Y</p>
                  <span className="mono text-sm text-[#2176ff]/60 font-bold uppercase tracking-widest">+ EXP</span>
                 </div>
                 <p className="text-xs font-black uppercase tracking-widest text-[#edf5fc]/40 leading-relaxed">Integrated bridge between North American manufacturers and the LatAm industrial heartland.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-20 border-y border-[#edf5fc]/5 bg-black/30">
        <div className="flex overflow-hidden whitespace-nowrap opacity-25 hover:opacity-100 transition-opacity duration-700">
          <div className="flex space-x-32 animate-scroll items-center">
            {Array(4).fill(COLLABORATORS).flat().map((c, i) => (
              <div key={i} className="flex items-center space-x-8">
                <div className="w-2 h-2 bg-[#2176ff] rounded-full shadow-[0_0_8px_#2176ff]" />
                <span className="text-3xl font-serif text-[#edf5fc] tracking-tighter uppercase italic">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO PRODUCTS CATALOG */}
      <section id="products" className="py-48 lg:py-64">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
             <div className="max-w-2xl">
               <span className="text-[11px] font-black text-[#2176ff] uppercase tracking-[0.6em] mb-6 block">Engineered Solutions</span>
               <h2 className="text-6xl md:text-8xl font-serif text-[#edf5fc] tracking-tighter">System Components.</h2>
             </div>
             <p className="text-[#edf5fc]/30 text-xl lg:text-2xl font-light max-w-lg text-right border-r-4 border-[#2176ff] pr-12 italic leading-relaxed">Certified high-performance parts for critical industrial infrastructure.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {PRODUCTS.map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card glass rounded-[4rem] border-[#edf5fc]/5 overflow-hidden group flex flex-col"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={`${p.image}&w=600&q=75`} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                    alt={p.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f22] to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-10">
                    <span className="mono text-[10px] text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">ID_CODE: {1000 + p.id}</span>
                  </div>
                </div>
                <div className="p-12 lg:p-14 flex-grow flex flex-col">
                  <h3 className="text-4xl font-bold text-[#edf5fc] mb-6 tracking-tight group-hover:text-[#2176ff] transition-colors">{p.title}</h3>
                  <p className="text-[#edf5fc]/30 mb-10 text-base leading-relaxed font-light line-clamp-3">{p.description}</p>
                  <div className="mt-auto pt-10 border-t border-[#edf5fc]/5 space-y-4">
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex items-center text-[11px] font-bold text-[#edf5fc]/50 uppercase tracking-widest">
                        <ArrowRight size={14} className="mr-4 text-[#2176ff]" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH SECTION - FULL WIDTH */}
      <section id="global-reach" className="py-24 relative overflow-hidden bg-black/20">
        <div className="scanline opacity-10" />
        <Suspense fallback={
          <div className="w-full h-[900px] flex flex-col items-center justify-center bg-[#14181b]">
            <div className="w-16 h-16 border-4 border-[#2176ff]/10 border-t-[#2176ff] rounded-full animate-spin mb-8" />
            <p className="mono text-xs uppercase tracking-[0.5em] text-[#2176ff]/40">Allocating Network Resources...</p>
          </div>
        }>
          <InteractiveMap />
        </Suspense>
      </section>

      {/* WHY CHOOSE US - TECH STACK STYLE */}
      <section id="why-choose" className="py-48 lg:py-64 relative">
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-40">
              <span className="text-[11px] font-black text-[#2176ff] uppercase tracking-[0.7em] mb-8 block">ASI Advantage</span>
              <h2 className="text-7xl lg:text-9xl font-serif text-[#edf5fc] tracking-tighter leading-[0.95]">Reliability Protocol.</h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {BENEFITS.map((b, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-12 lg:p-14 glass rounded-[3rem] border-[#edf5fc]/5 group hover:bg-[#2176ff]/10 transition-all border-b-8 border-transparent hover:border-b-[#2176ff] flex flex-col items-center text-center"
                >
                  <div className="mb-10 w-16 h-16 bg-[#2176ff]/10 rounded-2xl flex items-center justify-center text-[#2176ff] group-hover:scale-110 transition-transform shadow-[0_10px_30px_rgba(33,118,255,0.1)]">
                    {b.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#edf5fc] mb-6 tracking-tight uppercase group-hover:translate-y-[-4px] transition-transform">{b.title}</h3>
                  <p className="text-[#edf5fc]/30 text-base leading-relaxed font-light">{b.description}</p>
                </motion.div>
              ))}
           </div>

           {/* STATS STRIP */}
           <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { label: 'Operations History', value: '10+', unit: 'Years' },
                { label: 'Inventory Throughput', value: '15K', unit: 'Units' },
                { label: 'Regional Coverage', value: '07', unit: 'Countries' },
                { label: 'Service Uptime', value: '98', unit: '%' }
              ].map((stat, i) => (
                <div key={i} className="p-10 lg:p-12 glass rounded-[3rem] border-[#edf5fc]/5 flex flex-col items-center justify-center text-center group hover:border-[#2176ff]/30 transition-colors">
                   <div className="flex items-baseline space-x-2">
                    <p className="text-5xl lg:text-6xl font-black text-[#2176ff] tracking-tighter group-hover:scale-110 transition-transform">{stat.value}</p>
                    <span className="text-sm lg:text-base text-[#2176ff]/60 font-bold uppercase">{stat.unit}</span>
                   </div>
                   <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-[#edf5fc]/20 mt-4">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CONTACT - THE COMMAND CENTER FORM */}
      <section id="contact" className="py-48 lg:py-64">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-0 bg-[#2176ff]/5 rounded-[5rem] border border-[#edf5fc]/5 overflow-hidden shadow-[0_0_120px_rgba(33,118,255,0.08)]">
            <div className="lg:col-span-5 p-16 lg:p-24 xl:p-32 relative overflow-hidden bg-[#1a1f22]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#2176ff] to-transparent" />
              <h2 className="text-6xl lg:text-7xl font-serif text-[#edf5fc] mb-14 tracking-tighter leading-tight">Request <br/> <span className="text-[#2176ff] italic">Deployment.</span></h2>
              <p className="text-[#edf5fc]/30 text-xl mb-20 font-light max-w-sm leading-relaxed">Our technical sales engineers respond to all procurement requests within <span className="text-[#edf5fc] font-bold">24 operational hours.</span></p>
              
              <div className="space-y-12">
                <div className="flex items-center space-x-8 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-[#2176ff] group-hover:bg-[#2176ff] group-hover:text-white transition-all shadow-xl"><Mail size={24}/></div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#edf5fc]/20 mb-2">Secure Channel</p>
                    <p className="text-[#edf5fc] font-bold text-lg">ventas@repuestosusa.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-[#2176ff] group-hover:bg-[#2176ff] group-hover:text-white transition-all shadow-xl"><Phone size={24}/></div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#edf5fc]/20 mb-2">Direct Line</p>
                    <p className="text-[#edf5fc] font-bold text-lg">+1 (305) 555-0123</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8 group">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-[#2176ff] group-hover:bg-[#2176ff] group-hover:text-white transition-all shadow-xl"><MapPin size={24}/></div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#edf5fc]/20 mb-2">Headquarters</p>
                    <p className="text-[#edf5fc] font-bold text-lg">Miami, FL, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-16 lg:p-24 xl:p-32 bg-white/[0.01]">
              <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input type="text" className="w-full bg-transparent border-b-2 border-[#edf5fc]/10 py-5 text-[#edf5fc] text-xl focus:border-[#2176ff] outline-none transition-all placeholder:text-transparent peer" id="name" placeholder="Name" />
                    <label htmlFor="name" className="absolute left-0 top-0 text-[11px] uppercase font-bold tracking-widest text-[#edf5fc]/20 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#2176ff]">Identity Protocol</label>
                  </div>
                  <div className="relative group">
                    <input type="text" className="w-full bg-transparent border-b-2 border-[#edf5fc]/10 py-5 text-[#edf5fc] text-xl focus:border-[#2176ff] outline-none transition-all placeholder:text-transparent peer" id="company" placeholder="Company" />
                    <label htmlFor="company" className="absolute left-0 top-0 text-[11px] uppercase font-bold tracking-widest text-[#edf5fc]/20 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#2176ff]">Corporate Entity</label>
                  </div>
                </div>
                <div className="relative group">
                  <input type="email" className="w-full bg-transparent border-b-2 border-[#edf5fc]/10 py-5 text-[#edf5fc] text-xl focus:border-[#2176ff] outline-none transition-all placeholder:text-transparent peer" id="email" placeholder="Email" />
                  <label htmlFor="email" className="absolute left-0 top-0 text-[11px] uppercase font-bold tracking-widest text-[#edf5fc]/20 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#2176ff]">Communication Node</label>
                </div>
                <div className="relative group">
                  <textarea rows={5} className="w-full bg-transparent border-b-2 border-[#edf5fc]/10 py-5 text-[#edf5fc] text-xl focus:border-[#2176ff] outline-none transition-all placeholder:text-transparent peer resize-none" id="msg" placeholder="Requirements"></textarea>
                  <label htmlFor="msg" className="absolute left-0 top-0 text-[11px] uppercase font-bold tracking-widest text-[#edf5fc]/20 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#2176ff]">Mission Parameters (Part Numbers, Brands, Models)</label>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#2176ff", boxShadow: "0 20px 60px rgba(33, 118, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-10 bg-[#2176ff] text-white font-black uppercase tracking-[0.6em] text-sm rounded-[2rem] shadow-2xl transition-all flex items-center justify-center border border-white/10"
                >
                  Authorize Sourcing Probe <Zap size={22} className="ml-6" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 border-t border-[#edf5fc]/5 bg-black/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-24 lg:gap-32 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-12">
                <span className="text-6xl font-black tracking-tighter text-[#edf5fc]">ASI</span>
                <div className="w-3 h-3 bg-[#2176ff] rounded-full shadow-[0_0_15px_#2176ff]" />
              </div>
              <p className="text-[#edf5fc]/20 text-base max-w-md leading-relaxed mb-14 font-light">Leading industrial bridge since 1990. Engineered for precision procurement across the Americas. Bridging the distance with uncompromising quality.</p>
              <div className="flex space-x-10">
                 {['Linkedin', 'Twitter', 'X-Cloud'].map(social => (
                   <span key={social} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#edf5fc]/10 hover:text-[#2176ff] cursor-pointer transition-colors">{social}</span>
                 ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-[11px] font-black text-[#edf5fc] uppercase tracking-[0.5em] mb-12">Network Hub</h5>
              <div className="flex flex-col space-y-6 text-sm font-bold text-[#edf5fc]/20">
                <a href="#home" className="hover:text-[#2176ff] transition-colors">Main Dashboard</a>
                <a href="#products" className="hover:text-[#2176ff] transition-colors">Parts Repository</a>
                <a href="#about" className="hover:text-[#2176ff] transition-colors">About ASI</a>
                <a href="#contact" className="hover:text-[#2176ff] transition-colors">Request Link</a>
              </div>
            </div>

            <div>
              <h5 className="text-[11px] font-black text-[#edf5fc] uppercase tracking-[0.5em] mb-12">Global OPS</h5>
              <div className="text-sm font-bold text-[#edf5fc]/20 leading-loose">
                Miami Logistics Complex #116<br />
                Florida 33166, USA<br />
                <span className="text-[#2176ff] block mt-4 uppercase tracking-widest text-[11px]">EST Timezone Support</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-[#edf5fc]/5 opacity-10">
            <p className="text-[11px] font-black text-[#edf5fc] uppercase tracking-[0.6em] mb-6 md:mb-0">© 2025 ALLIED SERVICES INTERNATIONAL INC.</p>
            <p className="mono text-[10px] tracking-[0.4em]">AUTH_REF: ASI_PRO_RELAY_2025_V.04</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
