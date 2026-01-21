import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Crown, Instagram, Mail, Skull, Disc, ShieldAlert, Zap, PenTool, Mic2 } from 'lucide-react';

// --- Global Styles & Effects (Injected via Style Tag for simplicity in this file) ---
const GlobalStyles = () => (
  <style>{`
    @keyframes noise {
      0%, 100% { transform: translate(0,0); }
      10% { transform: translate(-5%,-5%); }
      20% { transform: translate(-10%,5%); }
      30% { transform: translate(5%,-10%); }
      40% { transform: translate(-5%,15%); }
      50% { transform: translate(-10%,5%); }
      60% { transform: translate(15%,0); }
      70% { transform: translate(0,10%); }
      80% { transform: translate(-15%,0); }
      90% { transform: translate(10%,5%); }
    }
    
    .bg-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 5;
      animation: noise 8s steps(10) infinite;
      opacity: 0.08;
    }
  `}</style>
);

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "relative overflow-hidden px-8 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 text-xs border border-white group";
  const variants = {
    primary: "bg-white text-black hover:bg-black hover:text-white hover:border-white",
    outline: "bg-transparent text-white hover:bg-white hover:text-black",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10 group-hover:tracking-[0.3em] transition-all duration-300">{children}</span>
      <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference"></div>
    </button>
  );
};

// --- Sections ---

const Home = ({ setPage }) => (
  <div className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50"></div>
    
    <div className="relative z-10 container mx-auto grid md:grid-cols-12 gap-8 items-center pt-20 md:pt-0">
      <div className="md:col-span-8 text-left">
        <div className="inline-flex items-center gap-2 border border-zinc-800 px-4 py-2 mb-8 bg-zinc-900/50 backdrop-blur-sm">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
          <span className="text-xs text-zinc-400 uppercase tracking-widest">System: Sovereign Mode Active</span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black text-white mb-2 tracking-tighter leading-[0.85]">
          ENTITAS<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-white italic font-serif">BEBAS</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-xl font-light border-l-2 border-white pl-6 py-2 mt-8">
          "Mahkota Suara Rakyat. <br/>Kebebasan Dalam Distorsi."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Button onClick={() => setPage('catalog')}>Jelajahi Distorsi</Button>
          <button onClick={() => setPage('manifesto')} className="text-zinc-500 hover:text-white uppercase tracking-widest text-xs border-b border-transparent hover:border-white transition-all pb-1 w-max">
            Baca Manifesto
          </button>
        </div>
      </div>

      <div className="md:col-span-4 flex justify-center md:justify-end relative mt-12 md:mt-0">
        <div className="relative w-64 h-80 border-2 border-white/20 p-2">
          <div className="absolute inset-0 bg-white/5 transform rotate-3"></div>
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative overflow-hidden grayscale contrast-125">
             <Crown size={80} className="text-white relative z-10 mix-blend-exclusion" strokeWidth={1} />
             {/* Simple noise pattern fallback */}
             <div className="absolute inset-0 opacity-20 bg-repeat bg-[length:100px_100px] bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-black text-white p-4 border border-white font-mono text-xs max-w-[150px]">
            ARCHETYPE: <br/> THE REBEL & THE RULER
          </div>
        </div>
      </div>
    </div>

    {/* Running Text Footer */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-zinc-900 py-4 bg-black">
      <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-zinc-600 text-xs font-bold tracking-[0.5em] uppercase">
        Kedaulatan // Distorsi // Suara Rakyat // Entitas Bebas // Estetika Gelap // Kebenaran Mentah // Kedaulatan // Distorsi // Kedaulatan // Distorsi // Suara Rakyat // Entitas Bebas // Estetika Gelap // Kebenaran Mentah //
      </div>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

const Manifesto = () => (
  <div className="min-h-screen bg-black pt-32 pb-20 px-6 animate-fade-in">
    <div className="container mx-auto grid md:grid-cols-2 gap-16 items-start">
      <div className="sticky top-32">
        <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 leading-none uppercase">
          Revolusi<br/>Sunyi
        </h2>
        <p className="text-zinc-500 text-lg leading-relaxed mb-8">
          Merek ini berani menantang status quo (Rebel) namun dengan tujuan untuk membangun kedaulatan identitas dan suara yang otentik (Ruler).
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-zinc-800 p-6 hover:bg-zinc-900 transition-colors">
             <h3 className="text-white font-bold uppercase mb-2">Visi</h3>
             <p className="text-xs text-zinc-400">Menjadi platform merchandise metalcore dan seni gelap terkemuka yang menyuarakan narasi sosial.</p>
          </div>
          <div className="border border-zinc-800 p-6 hover:bg-zinc-900 transition-colors">
             <h3 className="text-white font-bold uppercase mb-2">Misi</h3>
             <p className="text-xs text-zinc-400">Medium visual bagi "suara representatif masyarakat" yang berani bicara.</p>
          </div>
        </div>
      </div>

      <div className="space-y-12 text-zinc-300 font-light text-justify leading-loose border-l border-zinc-800 pl-8 md:pl-12">
        <p className="first-letter:text-6xl first-letter:font-black first-letter:text-white first-letter:float-left first-letter:mr-4">
          Kami bukan sekadar pakaian. Kami adalah lambang kedaulatan yang Anda kenakan. Setiap goresan desain, setiap jahitan, membawa distorsi dan kemarahan metalcore.
        </p>
        <p>
          Kami berdiri tegak sebagai Entitas Bebas, mengangkat mahkota untuk setiap suara yang berani menuntut kebenaran. Kenakan kami dan jadilah bagian dari revolusi sunyi yang menggelegar di bawah permukaan.
        </p>
        
        <div className="my-12 py-12 border-y border-zinc-800 relative">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-zinc-500 text-xs uppercase tracking-widest">Pilar Kolaborasi</span>
          
          <div className="space-y-8">
            <div className="flex gap-4">
               <div className="p-3 bg-zinc-900 h-fit"><Zap className="text-white" size={20}/></div>
               <div>
                 <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">The Amplifier</h4>
                 <p className="text-xs text-zinc-500">Kolaborasi dengan Band & Musisi Metalcore/Deathcore. Merch eksklusif berbasis lirik kritik sosial.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="p-3 bg-zinc-900 h-fit"><PenTool className="text-white" size={20}/></div>
               <div>
                 <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">The Illustrator</h4>
                 <p className="text-xs text-zinc-500">Artis Visual & Ilustrator Seni Gelap. Wearable Art yang memprovokasi pemikiran.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="p-3 bg-zinc-900 h-fit"><Mic2 className="text-white" size={20}/></div>
               <div>
                 <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">The Messenger</h4>
                 <p className="text-xs text-zinc-500">Jurnalis, Penulis, Aktivis. Menyuarakan isu tabu melalui medium pakaian.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="group relative bg-zinc-950 border border-zinc-800 hover:border-zinc-500 transition-colors duration-500">
    <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
      
      {/* Product Icon */}
      <product.icon size={80} className="text-zinc-700 group-hover:text-white group-hover:scale-110 transition-all duration-500 z-10" strokeWidth={1} />
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/60 backdrop-blur-sm">
        <button className="bg-white text-black px-6 py-2 uppercase font-bold text-xs tracking-widest hover:bg-zinc-200">
          Add to Cart
        </button>
      </div>

      <div className="absolute top-4 left-4 border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-widest text-zinc-400 bg-black">
        {product.code}
      </div>
    </div>
    
    <div className="p-5 border-t border-zinc-900">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-serif text-white uppercase tracking-wide leading-tight max-w-[70%]">
          {product.name}
        </h3>
        <span className="text-sm font-mono text-zinc-400">
          {product.price}K
        </span>
      </div>
      <p className="text-xs text-zinc-600 uppercase tracking-wider">{product.tag}</p>
    </div>
  </div>
);

const Catalog = () => {
  const products = [
    { id: 1, code: "EB-001", name: "Sovereign Tee", price: 250, tag: "Signature Series", icon: Crown },
    { id: 2, code: "EB-002", name: "Distortion Hoodie", price: 450, tag: "Heavyweight", icon: Disc },
    { id: 3, code: "EB-003", name: "Rebel Voice LS", price: 300, tag: "Graphic", icon: Mic2 },
    { id: 4, code: "DA-001", name: "Dark Art: Omen", price: 275, tag: "Artist Series", icon: Skull },
    { id: 5, code: "EB-ACC", name: "Gothic Cap", price: 150, tag: "Headwear", icon: ShieldAlert },
    { id: 6, code: "EB-BAG", name: "Broken Tote", price: 125, tag: "Accessories", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800 pb-8">
           <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
             Koleksi<br/><span className="text-zinc-800">Distorsi</span>
           </h2>
           <div className="text-right mt-6 md:mt-0">
             <p className="text-zinc-500 text-sm max-w-xs mb-4">
               Manifestasi fisik dari kebenaran yang mentah. Diukir dengan estetika gelap.
             </p>
             <span className="text-xs font-mono text-white border border-white px-2 py-1">SEASON: 2024 / DYSTOPIA</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6 flex items-center animate-fade-in">
    <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-0 border border-zinc-800">
      <div className="bg-zinc-900/50 p-12 md:p-20 flex flex-col justify-between min-h-[600px]">
        <div>
          <h2 className="text-5xl font-black text-white mb-8 uppercase tracking-tighter">Hubungi<br/>Entitas</h2>
          <p className="text-zinc-400 mb-12 max-w-sm text-lg">
            Apakah Anda memiliki suara yang ingin didengar? Bergabunglah dengan kolaborasi atau sampaikan distorsi Anda.
          </p>
        </div>
        
        <div className="space-y-6 font-mono text-sm">
          <div className="flex items-center gap-4 text-zinc-300">
             <div className="w-8 h-[1px] bg-white"></div>
             <span>Jakarta, ID. Sector 666.</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
             <div className="w-8 h-[1px] bg-white"></div>
             <span>info@entitasbebas.com</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
             <div className="w-8 h-[1px] bg-white"></div>
             <span>@entitasbebas.merch</span>
          </div>
        </div>
      </div>

      <div className="bg-black p-12 md:p-20 border-l border-zinc-800">
        <form className="space-y-8 h-full flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Identitas (Nama)</label>
            <input type="text" className="w-full bg-transparent border-b border-zinc-800 text-white py-4 focus:outline-none focus:border-white transition-colors font-serif text-xl placeholder-zinc-800" placeholder="Ketik nama anda..." />
          </div>
          <div className="group">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Frekuensi (Email)</label>
            <input type="email" className="w-full bg-transparent border-b border-zinc-800 text-white py-4 focus:outline-none focus:border-white transition-colors font-serif text-xl placeholder-zinc-800" placeholder="Ketik email anda..." />
          </div>
          <div className="group">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Pesan Distorsi</label>
            <textarea rows="3" className="w-full bg-transparent border-b border-zinc-800 text-white py-4 focus:outline-none focus:border-white transition-colors font-serif text-xl placeholder-zinc-800 resize-none" placeholder="Suarakan pesan anda..."></textarea>
          </div>
          <div className="pt-8">
             <Button className="w-full justify-center">Kirim Transmisi</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-zinc-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <GlobalStyles />
      <div className="bg-noise"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <Crown size={28} className="text-white group-hover:rotate-12 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-widest uppercase leading-none">Entitas Bebas</span>
              <span className="text-[9px] tracking-[0.3em] opacity-70">MERCHANDISE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {[
              {id: 'home', label: 'Home'},
              {id: 'manifesto', label: 'Manifesto'},
              {id: 'catalog', label: 'Katalog'},
              {id: 'contact', label: 'Kontak'}
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs uppercase font-bold tracking-[0.2em] hover:text-white transition-all relative group ${activePage === link.id ? 'text-white' : 'text-zinc-500'}`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${activePage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
               <ShoppingBag size={20} className="group-hover:text-white transition-colors" />
               <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden">
          <div className="space-y-8 text-center">
            {['home', 'manifesto', 'catalog', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className="block text-4xl font-serif font-black text-white uppercase tracking-tighter hover:text-zinc-500 transition-colors"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {activePage === 'home' && <Home setPage={handleNavClick} />}
        {activePage === 'manifesto' && <Manifesto />}
        {activePage === 'catalog' && <Catalog />}
        {activePage === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-zinc-900 py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-12 text-zinc-500 text-xs tracking-widest uppercase leading-loose">
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-lg mb-4 font-serif">Entitas Bebas</h4>
            <p className="max-w-sm lowercase first-letter:uppercase">
              Membangun kedaulatan identitas dan suara yang otentik melalui estetika gelap dan distorsi metalcore.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Navigasi</h5>
            <ul className="space-y-2 cursor-pointer">
              <li onClick={() => handleNavClick('catalog')} className="hover:text-white">Koleksi Terbaru</li>
              <li onClick={() => handleNavClick('manifesto')} className="hover:text-white">Tentang Kami</li>
              <li className="hover:text-white">Size Chart</li>
              <li className="hover:text-white">FAQ</li>
            </ul>
          </div>
          <div>
             <h5 className="text-white font-bold mb-4">Sosial</h5>
             <ul className="space-y-2">
               <li className="hover:text-white flex items-center gap-2"><Instagram size={14}/> Instagram</li>
               <li className="hover:text-white flex items-center gap-2"><Mail size={14}/> Email</li>
             </ul>
          </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-zinc-900 text-zinc-700 text-[10px]">
          &copy; {new Date().getFullYear()} Entitas Bebas Merch. // All Rights Reserved. // Design by Dystopia.
        </div>
      </footer>
    </div>
  );
}

export default App;