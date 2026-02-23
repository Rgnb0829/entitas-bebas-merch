import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Crown, Instagram, Mail, Skull, Disc, ShieldAlert, Zap, PenTool, Mic2, Star, Sun, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import api from '../lib/api';
import { useTheme } from '../context/ThemeContext';

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
    
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    
    .animate-slide-in-right {
      animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Light/Dark transition */
    * {
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
  `}</style>
);

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyle = "relative overflow-hidden px-8 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 text-xs border border-white group";
    const variants = {
        primary: "bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:border-black dark:hover:border-white",
        outline: "bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
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
    <div className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200 via-zinc-100 to-zinc-50 dark:from-zinc-900 dark:via-black dark:to-black opacity-50"></div>

        <div className="relative z-10 container mx-auto grid md:grid-cols-12 gap-8 items-center pt-20 md:pt-0">
            <div className="md:col-span-8 text-left">
                <div className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-800 px-4 py-2 mb-8 bg-zinc-200/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">System: Sovereign Mode Active</span>
                </div>

                <h1 className="text-6xl md:text-9xl font-black text-black dark:text-white mb-2 tracking-tighter leading-[0.85]">
                    ENTITAS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-black dark:from-zinc-400 dark:to-white italic font-serif">BEBAS</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 mb-10 max-w-xl font-normal border-l-2 border-black dark:border-white pl-6 py-2 mt-8">
                    "Mahkota Suara Rakyat. <br />Kebebasan Dalam Distorsi."
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                    <Button onClick={() => setPage('catalog')}>Jelajahi Distorsi</Button>
                    <button onClick={() => setPage('manifesto')} className="text-zinc-500 hover:text-black dark:hover:text-white uppercase tracking-widest text-xs border-b border-transparent hover:border-black dark:hover:border-white transition-all pb-1 w-max">
                        Baca Manifesto
                    </button>
                </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end relative mt-12 md:mt-0">
                <div className="relative w-64 h-80 border-2 border-black/10 dark:border-white/20 p-2">
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 transform rotate-3"></div>
                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden grayscale contrast-125">
                        <Crown size={80} className="text-black dark:text-white relative z-10 mix-blend-exclusion" strokeWidth={1} />
                        {/* Simple noise pattern fallback */}
                        <div className="absolute inset-0 opacity-20 bg-repeat bg-[length:100px_100px] bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-black text-black dark:text-white p-4 border border-black dark:border-white font-mono text-xs max-w-[150px]">
                        ARCHETYPE: <br /> THE REBEL & THE RULER
                    </div>
                </div>
            </div>
        </div>

        {/* Running Text Footer */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-zinc-200 dark:border-zinc-900 py-4 bg-zinc-100 dark:bg-black">
            <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-zinc-400 dark:text-zinc-600 text-xs font-bold tracking-[0.5em] uppercase">
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-6 animate-fade-in transition-colors duration-500">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
                <h2 className="text-5xl md:text-7xl font-serif font-black text-black dark:text-white mb-8 leading-none uppercase">
                    Revolusi<br />Sunyi
                </h2>
                <p className="text-zinc-700 dark:text-zinc-400 text-lg leading-relaxed mb-8 font-medium">
                    Merek ini berani menantang status quo (Rebel) namun dengan tujuan untuk membangun kedaulatan identitas dan suara yang otentik (Ruler).
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-zinc-300 dark:border-zinc-800 p-6 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors">
                        <h3 className="text-black dark:text-white font-bold uppercase mb-2">Visi</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Menjadi platform merchandise metalcore dan seni gelap terkemuka yang menyuarakan narasi sosial.</p>
                    </div>
                    <div className="border border-zinc-300 dark:border-zinc-800 p-6 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors">
                        <h3 className="text-black dark:text-white font-bold uppercase mb-2">Misi</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Medium visual bagi "suara representatif masyarakat" yang berani bicara.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-12 text-zinc-800 dark:text-zinc-200 font-normal text-justify leading-loose border-l border-zinc-300 dark:border-zinc-800 pl-8 md:pl-12">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-black dark:first-letter:text-white first-letter:float-left first-letter:mr-4">
                    Kami bukan sekadar pakaian. Kami adalah lambang kedaulatan yang Anda kenakan. Setiap goresan desain, setiap jahitan, membawa distorsi dan kemarahan metalcore.
                </p>
                <p>
                    Kami berdiri tegak sebagai Entitas Bebas, mengangkat mahkota untuk setiap suara yang berani menuntut kebenaran. Kenakan kami dan jadilah bagian dari revolusi sunyi yang menggelegar di bawah permukaan.
                </p>

                <div className="my-12 py-12 border-y border-zinc-300 dark:border-zinc-800 relative">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-50 dark:bg-black px-4 text-zinc-500 text-xs uppercase tracking-widest">Pilar Kolaborasi</span>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="p-3 bg-zinc-200 dark:bg-zinc-900 h-fit"><Zap className="text-black dark:text-white" size={20} /></div>
                            <div>
                                <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-sm mb-1">The Amplifier</h4>
                                <p className="text-xs text-zinc-500">Kolaborasi dengan Band & Musisi Metalcore/Deathcore. Merch eksklusif berbasis lirik kritik sosial.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-zinc-200 dark:bg-zinc-900 h-fit"><PenTool className="text-black dark:text-white" size={20} /></div>
                            <div>
                                <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-sm mb-1">The Illustrator</h4>
                                <p className="text-xs text-zinc-500">Artis Visual & Ilustrator Seni Gelap. Wearable Art yang memprovokasi pemikiran.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-zinc-200 dark:bg-zinc-900 h-fit"><Mic2 className="text-black dark:text-white" size={20} /></div>
                            <div>
                                <h4 className="text-black dark:text-white font-bold uppercase tracking-widest text-sm mb-1">The Messenger</h4>
                                <p className="text-xs text-zinc-500">Jurnalis, Penulis, Aktivis. Menyuarakan isu tabu melalui medium pakaian.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Filter active images
    const images = product.images && product.images.length > 0 ? product.images : (product.imageUrl ? [{ imageUrl: product.imageUrl, label: 'Front' }] : []);

    // Extract unique variants
    const uniqueColors = product.variants ? [...new Set(product.variants.map(v => v.color).filter(Boolean))] : [];
    const uniqueSizes = product.variants ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];

    // Hover effect: Switch to "Back" view if available, or just 2nd image
    useEffect(() => {
        if (isHovered && images.length > 1) {
            // Try to find an image labeled "Back" or just use the second one
            const backIndex = images.findIndex(img => img.label === 'Back');
            if (backIndex !== -1 && backIndex !== currentImageIndex) {
                // specific logic if we want to auto-flip. 
                // For now, let's just let the user swipe. 
                // User request: "melihat produk dari dua sisi dengan tampilan yang dinamis dan mudah digeser"
                // Maybe just auto-play or show second image on hover?
            }
        }
    }, [isHovered, images]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="group relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:border-black dark:hover:border-zinc-500 transition-colors duration-500 h-full flex flex-col shadow-sm dark:shadow-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden flex items-center justify-center">

                {/* Product Image */}
                {images.length > 0 ? (
                    <div className="w-full h-full relative">
                        {/* Main Image */}
                        <img
                            src={images[currentImageIndex].imageUrl}
                            alt={product.name}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />

                        {/* Hover Image (Swap to 2nd image if exists and not active) - Optional "Flip" feel */}
                        {images.length > 1 && isHovered && (
                            <div className="absolute inset-0 bg-black/10 transition-colors" />
                        )}

                        {/* Label Badge */}
                        {images[currentImageIndex].label && (
                            <div className="absolute top-4 left-4 border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-widest text-zinc-400 bg-black/80 backdrop-blur-sm z-20">
                                {images[currentImageIndex].label}
                            </div>
                        )}

                        {/* Navigation Arrows (Only show on hover) */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all duration-300 z-30 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-white text-black dark:text-white hover:text-black p-2 rounded-full transition-all duration-300 z-30 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                            className={`h-1 cursor-pointer transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-zinc-600 hover:bg-zinc-400'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <product.icon size={80} className="text-zinc-700 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                )}

                {/* Quick Add Button on Hover */}
                <div className={`absolute bottom-16 left-0 right-0 p-4 flex justify-center transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                        onClick={() => product.addToCart(product)}
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 uppercase font-black text-xs tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-serif text-black dark:text-white uppercase tracking-wide leading-tight max-w-[75%]">
                            {product.name}
                        </h3>
                        <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                            {product.price}K
                        </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-500 uppercase tracking-wider mb-3 font-medium">{product.tag}</p>
                </div>

                {/* Variants Display */}
                {(uniqueColors.length > 0 || uniqueSizes.length > 0) && (
                    <div className="flex flex-wrap gap-2 items-center mt-2 pt-3 border-t border-zinc-900/50">
                        {uniqueColors.length > 0 && (
                            <div className="flex gap-1 mr-3">
                                {uniqueColors.map((color, i) => (
                                    <div key={i} className="w-3 h-3 rounded-full border border-zinc-700" style={{ backgroundColor: color.toLowerCase() }} title={color}></div>
                                ))}
                            </div>
                        )}
                        {uniqueSizes.length > 0 && (
                            <div className="flex gap-1">
                                {uniqueSizes.map((size, i) => (
                                    <span key={i} className="text-[10px] text-zinc-500 border border-zinc-800 px-1 uppercase">{size}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};



const Catalog = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/api/products')
            .then(res => {
                setProducts(res.data.map(p => ({
                    ...p,
                    icon: Crown, // Fallback icon
                    // If image is present, it will be used by ProductCard
                })));
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-6 animate-fade-in transition-colors duration-500">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-300 dark:border-zinc-800 pb-8">
                    <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase leading-[0.8]">
                        Koleksi<br /><span className="text-zinc-400 dark:text-zinc-800">Distorsi</span>
                    </h2>
                    <div className="text-right mt-6 md:mt-0">
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm max-w-xs mb-4 font-medium">
                            Manifestasi fisik dari kebenaran yang mentah. Diukir dengan estetika gelap.
                        </p>
                        <span className="text-xs font-mono text-black dark:text-white border border-black dark:border-white px-2 py-1">SEASON: 2024 / DYSTOPIA</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={{ ...product, addToCart }} />
                    ))}
                    {products.length === 0 && <p className="text-zinc-500 italic">Loading catalog or no items found...</p>}
                </div>
            </div>
        </div>
    );
};

const Contact = () => (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pt-32 pb-20 px-6 flex items-center animate-fade-in transition-colors duration-500">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-0 border border-zinc-300 dark:border-zinc-800">
            <div className="bg-zinc-200/50 dark:bg-zinc-900/50 p-12 md:p-20 flex flex-col justify-between min-h-[600px]">
                <div>
                    <h2 className="text-5xl font-black text-black dark:text-white mb-8 uppercase tracking-tighter">Hubungi<br />Entitas</h2>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-12 max-w-sm text-lg font-medium">
                        Apakah Anda memiliki suara yang ingin didengar? Bergabunglah dengan kolaborasi atau sampaikan distorsi Anda.
                    </p>
                </div>

                <div className="space-y-6 font-mono text-sm">
                    <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                        <div className="w-8 h-[1px] bg-black dark:bg-white"></div>
                        <span>Jakarta, ID. Sector 666.</span>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                        <div className="w-8 h-[1px] bg-black dark:bg-white"></div>
                        <span>info@entitasbebas.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
                        <div className="w-8 h-[1px] bg-black dark:bg-white"></div>
                        <span>@entitasbebas.merch</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-black p-12 md:p-20 border-l border-zinc-300 dark:border-zinc-800">
                <form className="space-y-8 h-full flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
                    <div className="group">
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">Identitas (Nama)</label>
                        <input type="text" className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 text-black dark:text-white py-4 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-serif text-xl placeholder-zinc-400 dark:placeholder-zinc-800" placeholder="Ketik nama anda..." />
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

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart, clearCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        alert(`Payment of ${total}K Successful! Processing order...`);
        clearCart();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            {/* Drawer */}
            <div className="relative z-10 w-full max-w-md bg-white dark:bg-black border-l border-zinc-200 dark:border-zinc-800 h-full flex flex-col animate-slide-in-right shadow-2xl shadow-zinc-300 dark:shadow-zinc-900">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-100/50 dark:bg-zinc-900/50">
                    <h2 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">Cart ({cart.length})</h2>
                    <button onClick={onClose}><X className="text-black dark:text-white hover:text-red-500 transition-colors" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-zinc-500 mt-20">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="uppercase tracking-widest text-xs">Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center bg-zinc-900/30 p-4 border border-zinc-800">
                                <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center shrink-0">
                                    <item.icon className="text-zinc-500" size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-sm uppercase truncate">{item.name}</h4>
                                    <p className="text-zinc-500 text-xs mt-1">{item.code}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-white font-mono text-sm">{item.price}K</p>
                                    <button onClick={() => removeFromCart(index)} className="text-red-500 text-[10px] uppercase tracking-widest mt-2 hover:text-red-400">Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-xs">Total</span>
                        <span className="text-2xl font-black text-black dark:text-white font-mono">{total}K</span>
                    </div>
                    <Button onClick={handleCheckout} className="w-full justify-center" variant={cart.length === 0 ? 'outline' : 'primary'}>
                        Checkout System
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

function LandingPage() {
    const [activePage, setActivePage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const { theme, toggleTheme } = useTheme();

    const addToCart = (product) => {
        setCart([...cart, product]);
        // Removed alert to be less intrusive, maybe user wants to add multiple
        setIsCartOpen(true); // Open cart to show addition
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const clearCart = () => {
        setCart([]);
    };

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
                        <Crown size={28} className="text-zinc-900 dark:text-white group-hover:rotate-12 transition-transform duration-500" />
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-widest uppercase leading-none text-black dark:text-white">Entitas Bebas</span>
                            <span className="text-[9px] tracking-[0.3em] opacity-70 text-zinc-800 dark:text-zinc-300">MERCHANDISE</span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-12">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'manifesto', label: 'Manifesto' },
                            { id: 'catalog', label: 'Katalog' },
                            { id: 'contact', label: 'Kontak' }
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
                        <div className="flex items-center gap-1 border border-white/20 rounded-full p-1">
                            <button
                                onClick={() => theme === 'dark' && toggleTheme()}
                                className={`p-1 rounded-full transition-all ${theme === 'light' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                                title="Light Mode"
                            >
                                <Sun size={14} />
                            </button>
                            <button
                                onClick={() => theme === 'light' && toggleTheme()}
                                className={`p-1 rounded-full transition-all ${theme === 'dark' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                                title="Dark Mode"
                            >
                                <Moon size={14} />
                            </button>
                        </div>
                        <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag size={20} className="text-black dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
                        </div>
                        <button className="md:hidden text-black dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                {activePage === 'catalog' && <Catalog addToCart={addToCart} />}
                {activePage === 'contact' && <Contact />}
            </main>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
            />

            {/* Footer */}
            <footer className="relative z-10 bg-black border-t border-zinc-900 py-20 px-6">
                <div className="container mx-auto grid md:grid-cols-4 gap-12 text-zinc-500 dark:text-zinc-500 text-xs tracking-widest uppercase leading-loose">
                    <div className="md:col-span-2">
                        <h4 className="text-black dark:text-white font-bold text-lg mb-4 font-serif">Entitas Bebas</h4>
                        <p className="max-w-sm lowercase first-letter:uppercase text-zinc-600 dark:text-zinc-500">
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
                            <li className="hover:text-white flex items-center gap-2"><Instagram size={14} /> Instagram</li>
                            <li className="hover:text-white flex items-center gap-2"><Mail size={14} /> Email</li>
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

export default LandingPage;
