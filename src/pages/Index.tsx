import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ShoppingCart, Heart, ChevronRight, ChevronDown,
  Phone, Mail, Truck, RotateCcw, Star, Menu, X, Zap, ArrowRight,
} from "lucide-react";

// ── Brand palette
const PINK = "#D91571";
const BLUE = "#008FCA";
const DARK = "#0A021C";

// ── Hero banner slides (1400x500, rotate in order by filename)
const heroSlides = [
  "/hero/1.png",
  "/hero/2.png",
  "/hero/3.png",
  "/hero/4.jpg",
  "/hero/5.png",
  "/hero/6.png",
];

// ── Data
const categories = ["Mujeres", "Hombres", "Niñas", "Niños", "Deportes & Fitness"];

const brands = [
  "FERRACINI", "RAMARIM", "VIA MARTE", "PETITE JOLIE",
  "KELME", "LIVE PRO", "DANNA LU", "LEBLU",
  "PUMA", "VANS", "FREE WAY", "POLO GO",
];

const products = [
  {
    name: "Bota Urbano Ferracini", brand: "FERRACINI", price: "₲ 542.000", oldPrice: "",
    img: "/products/1.jpg",
    tag: "Nuevo", isOffer: false,
  },
  {
    name: "Zapatilla Goma Petite Jolie", brand: "PETITE JOLIE", price: "₲ 290.000", oldPrice: "",
    img: "/products/2.jpg",
    tag: "Nuevo", isOffer: false,
  },
  {
    name: "Champion Urbano Polo Go", brand: "POLO GO", price: "₲ 159.000", oldPrice: "₲ 238.900",
    img: "/products/3.jpg",
    tag: "33% OFF", isOffer: true,
  },
  {
    name: "Zapato Social Patachoca", brand: "PATACHOCA", price: "₲ 504.000", oldPrice: "",
    img: "/products/4.jpg",
    tag: "Top Venta", isOffer: false,
  },
  {
    name: "Bota Comfort Petite Jolie", brand: "PETITE JOLIE", price: "₲ 360.000", oldPrice: "",
    img: "/products/5.jpg",
    tag: "Nuevo", isOffer: false,
  },
  {
    name: "Bolso Fem Danna Lu", brand: "DANNA LU", price: "₲ 172.000", oldPrice: "",
    img: "/products/6.jpg",
    tag: "Nuevo", isOffer: false,
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function Logo({ height = 36 }: { height?: number }) {
  return (
    <img
      src="/logo-principal.png"
      alt="Patachoca"
      style={{ height }}
      className="object-contain"
    />
  );
}

export default function Index() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;
    const id = setInterval(() => {
      setHeroSlide((i) => (i + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [heroPaused]);

  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">

      {/* ANNOUNCEMENT BAR */}
      <div className="bg-black text-white text-[11px] font-medium tracking-widest uppercase text-center py-2 px-4">
        Envíos a todo el Paraguay · Más de 20.000 productos · patachoca.com.py
      </div>

      {/* NAVBAR */}
      <header className="bg-white border-b border-black/8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a href="#" className="shrink-0">
            <Logo height={26} />
          </a>
          <nav className="hidden md:flex items-center gap-0">
            {["Inicio", "Productos", "Blog", "Ofertas"].map((link, i) => (
              <a key={link} href="#"
                className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-black/70 hover:text-black transition-colors cursor-pointer tracking-wide">
                {link}
                {i === 1 && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button className="relative p-2.5 hover:bg-black/5 rounded-lg transition-colors cursor-pointer hidden md:flex">
              <Heart className="w-5 h-5 text-black/60" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] font-black text-white flex items-center justify-center bg-black">0</span>
            </button>
            <button className="relative p-2.5 hover:bg-black/5 rounded-lg transition-colors cursor-pointer hidden md:flex">
              <ShoppingCart className="w-5 h-5 text-black/60" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] font-black text-white flex items-center justify-center bg-black">0</span>
            </button>
            <a href="#" className="hidden md:block ml-2">
              <button className="bg-black text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors cursor-pointer tracking-wide">
                ₲ 0 — Ver carrito
              </button>
            </a>
            <button className="md:hidden p-2 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-black/8 bg-white overflow-hidden">
              <div className="px-6 py-4 space-y-1">
                {["Inicio", "Productos", "Blog", "Ofertas", ...categories].map((l) => (
                  <a key={l} href="#"
                    className="block px-3 py-2.5 text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors cursor-pointer">{l}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* COLORED BAR: categories + search */}
      <div style={{ background: BLUE }}>
        <div className="max-w-7xl mx-auto px-3 md:px-6 flex items-stretch">
          <div className="relative shrink-0">
            <button onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-3 md:py-4 h-full min-w-0 md:min-w-[220px] cursor-pointer transition-colors"
              style={{ background: catOpen ? "rgba(0,0,0,0.18)" : PINK }}>
              <div className="flex flex-col gap-[3px] shrink-0">
                <span className="block w-4 h-[2px] bg-white rounded" />
                <span className="block w-4 h-[2px] bg-white rounded" />
                <span className="block w-4 h-[2px] bg-white rounded" />
              </div>
              <div className="text-left">
                <p className="text-white font-black text-sm tracking-wide whitespace-nowrap">Categorías</p>
                <p className="text-white/70 text-[11px] font-normal hidden md:block">Navegue entre más de 20.000 productos</p>
              </div>
              <ChevronDown className={`hidden md:block w-4 h-4 text-white/70 ml-auto transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-56 bg-white shadow-2xl z-50 border-x border-b border-black/8 rounded-b-xl overflow-hidden">
                  {categories.map((cat, i) => (
                    <a key={cat} href="#"
                      className={`flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-black/80 hover:bg-black/5 cursor-pointer transition-colors ${i < categories.length - 1 ? "border-b border-black/5" : ""}`}
                      onClick={() => setCatOpen(false)}>
                      {cat}<ChevronRight className="w-3.5 h-3.5 text-black/30" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex-1 flex items-center px-2 md:px-5 gap-3 min-w-0">
            <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden max-w-2xl shadow-sm min-w-0">
              <Search className="w-4 h-4 text-black/30 ml-2.5 md:ml-3.5 shrink-0" />
              <input type="text" placeholder="Buscar productos, marcas..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-0 px-2 md:px-3 py-3 text-sm text-black outline-none bg-transparent" />
              <a href="#" className="shrink-0">
                <button className="px-3 md:px-6 py-3 text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ background: PINK }}>Buscar</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-5">
          <aside className="hidden lg:flex flex-col gap-4 w-52 shrink-0">
            <div className="border border-black/8 rounded-xl overflow-hidden">
              {categories.map((cat, i) => (
                <a key={cat} href="#"
                  className={`flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-black/75 hover:bg-black/4 cursor-pointer transition-colors ${i < categories.length - 1 ? "border-b border-black/5" : ""}`}>
                  {cat}<ChevronRight className="w-3.5 h-3.5 text-black/20" />
                </a>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden border border-black/8 bg-black text-white p-5 relative">
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Nueva Colección</p>
              <p className="font-black text-base leading-tight">Otoño / Invierno<br />2025</p>
              <a href="#">
                <button className="mt-4 text-black text-xs font-black bg-white px-4 py-2 rounded-full hover:bg-white/90 cursor-pointer transition-colors">Ver todo</button>
              </a>
            </div>
          </aside>
          <div className="flex-1 flex flex-col gap-4">
            <a href="#" className="relative block rounded-xl overflow-hidden bg-black group" style={{ aspectRatio: "14/5" }}
              onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ background: `linear-gradient(to bottom, ${PINK}, ${BLUE})` }} />
              <AnimatePresence mode="sync">
                <motion.img
                  key={heroSlide}
                  src={heroSlides[heroSlide]}
                  alt="Patachoca"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); setHeroSlide(i); }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === heroSlide ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
                    aria-label={`Ver slide ${i + 1}`}
                  />
                ))}
              </div>
            </a>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Ofertas Relámpago", sub: "Hasta 33% de descuento", icon: Zap,
                  img: "https://images.unsplash.com/photo-1710553455491-482fa1751dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
                { title: "Más Vendidos", sub: "Los favoritos del Paraguay", icon: Star,
                  img: "https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600" },
              ].map((b) => (
                <motion.a key={b.title} href="#"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }}
                  whileHover={{ y: -3 }} className="relative rounded-xl overflow-hidden cursor-pointer block bg-black" style={{ aspectRatio: "16/9" }}>
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <b.icon className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-white font-black text-base sm:text-lg leading-tight">{b.title}</p>
                      <p className="text-white/50 text-xs mt-0.5">{b.sub}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="border-t border-black/6 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">Nuestras marcas</p>
              <h2 className="font-black text-2xl tracking-tight">Navegar por marcas</h2>
            </div>
            <a href="#"
              className="flex items-center gap-1 text-sm font-bold underline underline-offset-2 cursor-pointer text-black/50 hover:text-black transition-colors">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-4 sm:grid-cols-6 gap-px bg-black/8 border border-black/8 rounded-xl overflow-hidden">
            {brands.map((brand) => (
              <motion.a key={brand} variants={fadeUp} href="#"
                className="bg-white flex items-center justify-center py-5 px-3 text-center hover:bg-black hover:text-white transition-colors cursor-pointer group">
                <span className="text-[11px] font-black uppercase tracking-wider text-black/50 group-hover:text-white transition-colors">{brand}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="border-t border-black/6 py-12 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">Tendencias</p>
              <h2 className="font-black text-2xl tracking-tight">Productos destacados</h2>
            </div>
            <a href="#"
              className="flex items-center gap-1 text-sm font-bold underline underline-offset-2 cursor-pointer text-black/50 hover:text-black transition-colors">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {products.map((p) => (
              <motion.a key={p.name} variants={fadeUp} href="#"
                whileHover={{ y: -4 }} className="bg-white border border-black/8 rounded-xl overflow-hidden hover:shadow-xl hover:border-black/15 transition-all cursor-pointer group flex flex-col">
                <div className="relative overflow-hidden bg-[#F2F2F2]" style={{ aspectRatio: "1/1" }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide"
                    style={{ background: p.isOffer ? PINK : "black" }}>{p.tag}</span>
                  <button className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Heart className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
                <div className="p-3.5 flex flex-col flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-1">{p.brand}</p>
                  <p className="text-[13px] font-semibold text-black leading-snug mb-3 line-clamp-2">{p.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
                    <span className="text-sm font-black text-black">{p.price}</span>
                    {p.oldPrice && <span className="text-[10px] text-black/35 line-through">{p.oldPrice}</span>}
                  </div>
                  <button className="w-full bg-black text-white text-xs font-bold py-2 rounded-lg hover:bg-black/80 transition-colors cursor-pointer tracking-wide">
                    Agregar al carrito
                  </button>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="border-t border-black/6 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-black rounded-2xl overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, ${PINK}, ${BLUE})` }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-12 md:py-14 gap-8">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] mb-3">Otoño / Invierno 2025</p>
                <h2 className="text-white font-black text-3xl md:text-4xl leading-tight tracking-tight">
                  Nueva colección disponible.<br />
                  <span style={{ color: PINK }}>Más de 20.000 productos.</span>
                </h2>
                <p className="text-white/40 mt-3 text-sm">Las mejores marcas del Paraguay y Brasil en un solo lugar.</p>
              </div>
              <a href="#" className="shrink-0">
                <button className="bg-white text-black font-black text-sm px-10 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer tracking-wide whitespace-nowrap">
                  Ir a la tienda →
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <div className="border-t border-black/6 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck,     label: "Envíos a todo el país",  sub: "Recibí tu pedido donde estés" },
            { icon: RotateCcw, label: "30 días para cambios",   sub: "Devoluciones sin complicaciones" },
            { icon: Star,      label: "+20.000 productos",      sub: "La mayor variedad del Paraguay" },
            { icon: Phone,     label: "Atención al cliente",    sub: "WhatsApp disponible" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="w-9 h-9 border border-black/10 rounded-lg flex items-center justify-center shrink-0">
                <f.icon className="w-4 h-4 text-black/60" />
              </div>
              <div>
                <p className="text-sm font-black text-black leading-tight">{f.label}</p>
                <p className="text-xs text-black/40 mt-0.5">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ background: DARK }} className="py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-xl tracking-tight">Suscríbase a nuestro boletín</h3>
            <p className="text-white/40 text-sm mt-1">Reciba actualizaciones por correo electrónico sobre ofertas especiales</p>
          </div>
          <div className="flex w-full md:w-auto gap-0 rounded-xl overflow-hidden border border-white/10 max-w-sm md:max-w-none">
            <div className="flex items-center bg-white/5 flex-1">
              <Mail className="w-4 h-4 text-white/30 ml-4 shrink-0" />
              <input type="email" placeholder="Tu correo electrónico"
                className="flex-1 px-3 py-3 text-sm text-white bg-transparent outline-none placeholder:text-white/30" />
            </div>
            <button className="text-white text-sm font-black px-6 py-3 shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
              style={{ background: PINK }}>Registrarse</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#EFEFEF] text-black pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-black/10">
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.15em] mb-5 text-black/60">Quiénes Somos</h4>
              <ul className="space-y-3">
                {["Sobre Nosotros", "Franquicia", "Sucursales"].map((l) => (
                  <li key={l}><a href="#"
                    className="text-sm text-black/50 hover:text-black transition-colors cursor-pointer">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.15em] mb-5 text-black/60">Secciones</h4>
              <ul className="space-y-3">
                {["Nuestras Marcas"].map((l) => (
                  <li key={l}><a href="#"
                    className="text-sm text-black/50 hover:text-black transition-colors cursor-pointer">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.15em] mb-5 text-black/60">Información</h4>
              <ul className="space-y-3">
                {["Como Comprar", "Formas De Pago", "Términos Y Condiciones", "Políticas De Privacidad"].map((l) => (
                  <li key={l}><a href="#"
                    className="text-sm text-black/50 hover:text-black transition-colors cursor-pointer">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col items-center gap-5">
            <img src="/logo-secundario.png" alt="Patachoca" className="h-[45px] object-contain opacity-70" />
            <div className="flex items-center gap-3">
              <a href="#"
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:border-black transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-black/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>
              <a href="#"
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:border-black transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-black/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#"
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:border-black transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-black/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <p className="text-black/30 text-xs">Copyright {new Date().getFullYear()} · All Right Reserved</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="#"
        className="fixed bottom-6 right-6 z-50 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer border border-white/20"
        style={{ background: "#25D366", width: 50, height: 50 }}>
        <Phone className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
