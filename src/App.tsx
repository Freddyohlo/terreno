import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Telescope,
  Mountain,
  MapPin,
  Zap,
  TrendingUp,
  Trees,
  Building2,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Send,
  Loader2,
  Star,
  Route,
  Waves,
  Sparkles,
  ShieldCheck,
  FileSignature,
  Lock,
  Gem,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
};

const interests = [
  'Inversión / Plusvalía',
  'Energía solar',
  'Turismo / Glamping',
  'Minería / Litio',
  'Uso residencial',
  'Otro',
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'El Terreno', href: '#destacados' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Potencial', href: '#potencial' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/27852897/pexels-photo-27852897.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Atacama Desert dunes at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/60 to-stone-950/90" />
      </div>

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-stone-950/90 backdrop-blur-md py-3 shadow-lg shadow-black/30'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">Tamarugal</span>
            <span className="text-amber-400 font-light hidden sm:inline">| Terreno en venta</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-200 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
            >
              Iniciar proceso
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950/95 backdrop-blur-md mt-3 mx-4 rounded-xl p-4 flex flex-col gap-3 border border-stone-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-amber-400 transition-colors py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber-500 text-stone-900 px-5 py-3 rounded-lg font-semibold text-sm text-center"
            >
              Iniciar proceso
            </a>
          </div>
        )}
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 text-xs font-medium tracking-wide uppercase">
              Región de Tarapacá · Norte de Chile
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            Tu oportunidad en el
            <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              corazón del desierto
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un terreno excepcional en la Pampa del Tamarugal, donde el cielo más
            limpio del mundo se encuentra con un potencial de inversión sin
            límites. A minutos de Iquique, rodeado de patrimonio mundial y con
            acceso exclusivo bajo acuerdo de confidencialidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="group bg-amber-500 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              Solicitar acceso exclusivo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#destacados"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              Conocer el terreno
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { value: '330+', label: 'Días de sol al año' },
              { value: '55 km', label: 'Desde Iquique' },
              { value: '0%', label: 'Contaminación lumínica' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const features = [
    {
      icon: Sun,
      title: 'Sol radiante todo el año',
      description:
        'Más de 330 días de sol al año con uno de los índices de radiación solar más altos del planeta. Ideal para proyectos de energía fotovoltaica.',
      accent: 'from-amber-500 to-orange-600',
    },
    {
      icon: Telescope,
      title: 'Cielo más limpio del mundo',
      description:
        'Cero contaminación lumínica en la zona. El desierto de Atacama es reconocido mundialmente como el mejor lugar para la observación astronómica.',
      accent: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Trees,
      title: 'Reserva natural del Tamarugo',
      description:
        'Colindante con la Reserva Nacional Pampa del Tamarugal, un ecosistema único de bosques de tamarugo en pleno desierto.',
      accent: 'from-emerald-500 to-green-600',
    },
    {
      icon: Building2,
      title: 'Patrimonio UNESCO',
      description:
        'A minutos de las oficinas salitreras de Humberstone y Santa Laura, declaradas Patrimonio Mundial por la UNESCO en 2005.',
      accent: 'from-rose-500 to-red-600',
    },
    {
      icon: Route,
      title: 'Conectividad estratégica',
      description:
        'Acceso directo desde Ruta 5 Panamericana. A 55 km de Iquique y su puerto, con conexión al corredor bioceánico.',
      accent: 'from-violet-500 to-purple-600',
    },
    {
      icon: Gem,
      title: 'Potencial minero y de litio',
      description:
        'El norte de Chile alberga las mayores reservas mundiales de litio. Este terreno puede contener minerales estratégicos de alto valor global.',
      accent: 'from-teal-500 to-cyan-600',
    },
    {
      icon: ShieldCheck,
      title: 'Acceso exclusivo bajo NDA',
      description:
        'Dada la sensibilidad de la información geológica y minera, los detalles se comparten solo bajo acuerdo de confidencialidad. Seriedad y exclusividad que protegen tu inversión.',
      accent: 'from-stone-400 to-stone-600',
    },
  ];

  return (
    <section id="destacados" className="py-24 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Por qué este terreno
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Seis razones que lo hacen único
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            No es solo un terreno. Es una posición privilegiada en una de las
            regiones con mayor proyección de Chile.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <div className="group h-full bg-stone-900 border border-stone-800 rounded-2xl p-7 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-stone-400 leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  const nearby = [
    {
      icon: Waves,
      title: 'Iquique',
      distance: '55 km',
      description: 'Ciudad costera con puerto, zona franca (ZOFRI) y playas. A menos de una hora por Ruta 16.',
    },
    {
      icon: Building2,
      title: 'Humberstone (UNESCO)',
      distance: '~15 km',
      description: 'Antigua oficina salitrera declarada Patrimonio Mundial. Atracción turística de alcance internacional.',
    },
    {
      icon: Mountain,
      title: 'Geoglifos de Pintados',
      distance: 'Cercano',
      description: 'Más de 350 figuras precolombinas talladas en el desierto a lo largo de 4 km. Arte rupestre milenario.',
    },
    {
      icon: Trees,
      title: 'Reserva Pampa del Tamarugal',
      distance: 'Colindante',
      description: '130.000 hectáreas de bosque de tamarugo protegido. Camping, senderos interpretativos y biodiversidad única.',
    },
    {
      icon: Route,
      title: 'Ruta 5 Panamericana',
      distance: 'Acceso directo',
      description: 'Conexión con todo Chile y el corredor bioceánico hacia Argentina y Brasil.',
    },
    {
      icon: Zap,
      title: 'Parques solares',
      distance: 'En la región',
      description: 'El Atacama es polo nacional de inversión en energía solar y almacenamiento. Proyectos en expansión.',
    },
  ];

  return (
    <section id="ubicacion" className="py-24 bg-gradient-to-b from-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Ubicación estratégica
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            En el centro de todo
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            Pampa del Tamarugal, Región de Tarapacá. En el cruce entre la costa,
            el desierto y la gran ruta que conecta el continente.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map-like visual */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden h-[480px] border border-stone-800 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/28304728/pexels-photo-28304728.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Atacama Desert landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Pampa del Tamarugal</span>
                </div>
                <p className="text-white text-lg font-medium">
                  Tarapacá, Norte de Chile
                </p>
                <p className="text-stone-300 text-sm mt-1">
                  En el corazón del desierto más árido del mundo
                </p>
              </div>
              {/* Pulsing marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-amber-500 rounded-full" />
                  <div className="absolute inset-0 w-4 h-4 bg-amber-500 rounded-full animate-ping" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Nearby points */}
          <div className="space-y-4">
            {nearby.map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <div className="flex gap-4 p-5 bg-stone-900/50 border border-stone-800 rounded-xl hover:border-amber-500/40 hover:bg-stone-900 transition-all group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-stone-800 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                    <point.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-white font-semibold">{point.title}</h3>
                      <span className="text-amber-400 text-sm font-bold whitespace-nowrap">
                        {point.distance}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentPotential() {
  const opportunities = [
    {
      icon: Sun,
      title: 'Energía solar fotovoltaica',
      description:
        'El desierto de Atacama recibe la mayor radiación solar del planeta. La región ya atrae megaproyectos solares y de almacenamiento. Un terreno aquí es una apuesta directa a la transición energética.',
      tag: 'Alta plusvalía',
    },
    {
      icon: Telescope,
      title: 'Turismo astronómico y glamping',
      description:
        'El astroturismo es una de las industrias de mayor crecimiento en Chile. Cielos prístinos, geoglifos milenarios y patrimonio UNESCO crean una oferta turística de nivel mundial.',
      tag: 'Turismo en auge',
    },
    {
      icon: TrendingUp,
      title: 'Plusvalía por infraestructura',
      description:
        'La mejora de la conectividad, la expansión del corredor bioceánico y el crecimiento de Iquique impulsan el valor del suelo en toda la Pampa del Tamarugal.',
      tag: 'En crecimiento',
    },
    {
      icon: Trees,
      title: 'Agroindustria del tamarugo',
      description:
        'El bosque de tamarugo permite ganadería caprina y ovina, y tiene potencial para proyectos de carbono y restauración de suelos. Un uso productivo del terreno con bajo consumo de agua.',
      tag: 'Sostenible',
    },
    {
      icon: Gem,
      title: 'Potencial minero: litio y más',
      description:
        'El norte de Chile concentra las mayores reservas mundiales de litio. Los terrenos de la zona pueden albergar minerales estratégicos de alto valor, lo que convierte cada hectárea en una oportunidad única.',
      tag: 'Recurso estratégico',
    },
    {
      icon: ShieldCheck,
      title: 'Acceso exclusivo bajo NDA',
      description:
        'Dada la sensibilidad de la información geológica y minera, los detalles del terreno se comparten solo bajo acuerdo de confidencialidad. Esto garantiza seriedad, exclusividad y protege el valor de la oportunidad.',
      tag: 'Exclusividad',
    },
  ];

  return (
    <section id="potencial" className="py-24 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-1/3 h-full opacity-10">
        <img
          src="https://images.pexels.com/photos/7527908/pexels-photo-7527908.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Potencial de inversión
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            No solo compras terreno. Compras futuro.
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            La Región de Tarapacá vive un momento de transformación. Este
            terreno te posiciona a la vanguardia de cuatro tendencias que
            redefinen el norte de Chile.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp, i) => (
            <Reveal key={opp.title} delay={i * 100}>
              <div className="group relative h-full bg-gradient-to-br from-stone-900 to-stone-900/50 border border-stone-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <opp.icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
                      {opp.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{opp.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{opp.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA banner */}
        <Reveal delay={200}>
          <div className="mt-12 relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/29719483/pexels-photo-29719483.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Atacama sunset"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/40" />
            </div>
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  ¿Listo para acceder a esta oportunidad?
                </h3>
                <p className="text-stone-300 text-lg">
                  Inicia el proceso de acceso exclusivo bajo acuerdo de confidencialidad.
                </p>
              </div>
              <a
                href="#contacto"
                className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 flex items-center gap-2 whitespace-nowrap"
              >
                Iniciar proceso
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/33149756/pexels-photo-33149756.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Atacama Desert mountains and clear skies',
      label: 'Paisaje del altiplano',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      url: 'https://images.pexels.com/photos/31021507/pexels-photo-31021507.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Starry night sky over the desert',
      label: 'Noches estrelladas',
      span: '',
    },
    {
      url: 'https://images.pexels.com/photos/30052802/pexels-photo-30052802.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Atacama dunes and hills under blue sky',
      label: 'Dunas y cerros',
      span: '',
    },
    {
      url: 'https://images.pexels.com/photos/13627641/pexels-photo-13627641.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Solar farm in the desert',
      label: 'Potencial solar',
      span: '',
    },
    {
      url: 'https://images.pexels.com/photos/24836791/pexels-photo-24836791.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Atacama golden sand dunes at sunset',
      label: 'Atardeceres dorados',
      span: '',
    },
  ];

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Galería
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Un paisaje que vende solo
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            Imágenes representativas de la zona. La belleza del desierto de
            Atacama como argumento de venta.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[240px]">
          {images.map((img, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={`group relative overflow-hidden rounded-xl ${img.span}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-white font-semibold text-sm">{img.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        'El norte de Chile vive un momento único. La combinación de sol, conectividad y demanda energética hace que terrenos como este sean una pieza estratégica.',
      author: 'Analista del sector energético',
      role: 'Tarapacá',
    },
    {
      quote:
        'El astroturismo en Atacama no para de crecer. Los cielos de la Pampa del Tamarugal son de los más prístinos del planeta.',
      author: 'Operador turístico regional',
      role: 'Iquique',
    },
  ];

  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Lo que dicen del norte
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Una región que inspira confianza
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="h-full bg-stone-950 border border-stone-800 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-200 text-lg leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-white font-semibold">{t.author}</div>
                  <div className="text-amber-400 text-sm">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Ingresa tu nombre';
    if (!form.email.trim()) {
      e.email = 'Ingresa tu email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Email no válido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        interest: form.interest || null,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      setStatus('success');
      setForm(initialForm);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full bg-stone-900 border ${
      errors[field] ? 'border-red-500' : 'border-stone-700'
    } rounded-xl px-4 py-3.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors`;

  return (
    <section id="contacto" className="py-24 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.pexels.com/photos/36366675/pexels-photo-36366675.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/80" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: info */}
          <Reveal>
            <div>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
                Proceso de acceso
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-6">
                Inicia tu proceso de acceso exclusivo
              </h2>
              <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                Por la naturaleza estratégica del terreno —incluido su potencial
                minero— la información detallada se comparte bajo acuerdo de
                confidencialidad (NDA). Un proceso simple, serio y diseñado para
                proteger tu inversión.
              </p>

              <div className="space-y-5">
                {[
                  { num: '01', icon: Send, title: 'Completa el formulario', text: 'Cuéntanos quién eres y qué te interesa. Te contactamos en menos de 24 horas.' },
                  { num: '02', icon: FileSignature, title: 'Acuerdo de confidencialidad', text: 'Firmamos un NDA que protege la información sensible del terreno y su potencial geológico.' },
                  { num: '03', icon: CheckCircle2, title: 'Acceso a información completa', text: 'Recibes ficha técnica, planos, estudios geológicos, precio y todos los detalles.' },
                ].map((step, i) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      {i < 2 && <div className="w-px h-8 bg-stone-700 mt-2" />}
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-400 text-xs font-bold">{step.num}</span>
                        <h3 className="text-white font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-stone-400 text-sm leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150}>
            <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-800 rounded-2xl p-8 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud recibida!</h3>
                  <p className="text-stone-400">
                    Gracias por tu interés. Te contactaremos en menos de 24 horas
                    para iniciar el proceso de acuerdo de confidencialidad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-stone-300 text-sm font-medium mb-2">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        className={`${inputClass('name')} pl-11`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-stone-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        className={`${inputClass('email')} pl-11`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-stone-300 text-sm font-medium mb-2">
                      Teléfono (opcional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+56 9 1234 5678"
                        className={`${inputClass('phone')} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 text-sm font-medium mb-2">
                      ¿En qué estás interesado?
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className={inputClass('interest')}
                    >
                      <option value="">Selecciona una opción</option>
                      {interests.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 text-sm font-medium mb-2">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntanos tu interés y disponibilidad para firmar el NDA..."
                      rows={3}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                      Hubo un problema al enviar. Por favor intenta nuevamente.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-stone-900 px-6 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-xl hover:shadow-amber-500/30 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Iniciar proceso de acceso
                      </>
                    )}
                  </button>
                  <p className="text-stone-500 text-xs text-center flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Tus datos están protegidos. Solo se usan para este proceso.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
            </div>
            <span className="font-bold tracking-tight">Tamarugal</span>
            <span className="text-stone-500 font-light hidden sm:inline">| Terreno en venta</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-400">
            <a href="#destacados" className="hover:text-amber-400 transition-colors">El Terreno</a>
            <a href="#ubicacion" className="hover:text-amber-400 transition-colors">Ubicación</a>
            <a href="#potencial" className="hover:text-amber-400 transition-colors">Potencial</a>
            <a href="#galeria" className="hover:text-amber-400 transition-colors">Galería</a>
            <a href="#contacto" className="hover:text-amber-400 transition-colors">Contacto</a>
          </div>

          <p className="text-stone-500 text-sm text-center md:text-right">
            Región de Tarapacá, Norte de Chile
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
          <p>
            Información referencial. Las imágenes son representativas de la zona.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans antialiased">
      <Hero />
      <Highlights />
      <LocationSection />
      <InvestmentPotential />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
