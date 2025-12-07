import React, { useState, useEffect } from 'react';
import { 
  Menu, X, TrendingUp, Users, Heart, ShieldCheck, 
  Zap, Coffee, ArrowRight, Award, Target, MessageCircle,
  ShoppingBag, Layers, BookOpen, Link as LinkIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

// --- Color Palette Constants ---
const COLORS = {
  purple: '#7E22CE', // Electric Purple
  teal: '#14B8A6',   // Teal
  orange: '#EA580C', // Burnt Orange
  green: '#16A34A',  // Parrot Green
  neonYellow: '#FACC15', // Neon Yellow/Lime
  bg: '#F3F4F6',
  card: '#FFFFFF',
  text: '#1F2937'
};

// --- Data for Infographics ---

const marketGrowthData = [
  { name: 'Traditional', value: 40, fill: '#9CA3AF' },
  { name: 'Packaged Standard', value: 35, fill: '#F87171' },
  { name: 'Premium Experience', value: 25, fill: COLORS.purple },
];

const competitorMatrixData = [
  { x: 20, y: 30, z: 200, name: 'MDH/Everest', type: 'Legacy', fill: '#EF4444' },
  { x: 30, y: 50, z: 200, name: 'Tata/Red Label', type: 'Mass', fill: '#10B981' },
  { x: 80, y: 80, z: 100, name: 'Chaayos/Vahdam', type: 'Premium', fill: '#F59E0B' },
  { x: 90, y: 90, z: 300, name: 'Indian Taste House', type: 'Target', fill: COLORS.purple },
];

const citationsData = [
  { id: 1, title: "Top 10 Packaging Design Trends in India in 2024", source: "Designtheme Innoventics", link: "https://designatheme.net/top-10-packaging-design-trends-in-india-in-2024/" },
  { id: 2, title: "The Chaayos Cup of Desi Success", source: "The Hard Copy", link: "https://thehardcopy.co/the-chaayos-cup-of-desi-success/" },
  { id: 3, title: "TOP 20 Spice Marketing Statistics 2025", source: "Amra And Elma LLC", link: "https://www.amraandelma.com/spice-marketing-statistics/" },
  { id: 4, title: "MDH Controversy: The King of Masala is Under the Scanner", source: "AB Academies", link: "https://www.abacademies.org/articles/mdh-controversy-the-king-of-masala-is-under-the-scanner-in-international-markets-17155.html" },
  { id: 5, title: "What Are The Latest Trends In The Spices Market In India?", source: "IBEF India", link: "https://sites.google.com/view/ibefindia/article/what-are-the-latest-trends-in-the-spices-market-in-india" },
  { id: 6, title: "Emergence of Masstige Marketing in India", source: "Slideshare", link: "https://www.slideshare.net/slideshow/masstige-marketing-rese/44404392" },
  { id: 7, title: "5 Key Consumer Segments in India", source: "Kadence", link: "https://kadence.com/en-us/knowledge/5-key-consumer-segments-in-india/" },
  { id: 8, title: "Why the Indian Spice Market Is Heating Up in 2025?", source: "Torg", link: "https://usetorg.com/blog/indian-spice-market" },
  { id: 9, title: "The Whole Truth Brand Success", source: "Velocity Blog", link: "https://blog.velocity.in/the-whole-truth-brand-success/" },
  { id: 10, title: "Paper Boat: Emotional Branding & Nostalgia", source: "KTPL Blog", link: "https://blog.kirnanitechnologies.com/paper-boat-emotional-branding-nostalgia-in-packaging-design/" },
  { id: 11, title: "Shri Mahila Griha Udyog Lijjat Papad", source: "Wikipedia", link: "https://en.wikipedia.org/wiki/Shri_Mahila_Griha_Udyog_Lijjat_Papad" },
  { id: 12, title: "Target Market of Tata Consumer Products", source: "SWOT Analysis Example", link: "https://swotanalysisexample.com/blogs/target-market/tataconsumer-target-market" },
  { id: 13, title: "Packaging Vahdam Spices for a Global Market", source: "Packaging of the World", link: "https://packagingoftheworld.com/2024/12/packaging-vahdam-spices-for-a-global-market.html" },
  { id: 14, title: "Packaged spices and seasonings gaining traction", source: "Mintel", link: "https://www.mintel.com/press-centre/packaged-spices-and-seasonings-are-gaining-traction-in-india-with-millennials-as-a-key-consumer-target/" },
  { id: 15, title: "How Purpose Foods and Q-Commerce Reshaped India's Food Sector", source: "Entrepreneur India", link: "https://www.entrepreneur.com/en-in/news-and-trends/how-purpose-foods-and-q-commerce-reshaped-indias-food/500390" },
  { id: 16, title: "The Story | Tea | Brand", source: "Scribd", link: "https://www.scribd.com/document/639080766/Untitled" },
  { id: 17, title: "Triangular Boxed Branding : Indian Snack Co", source: "Trend Hunter", link: "https://www.trendhunter.com/trends/indian-snack-co" },
  { id: 18, title: "Packaging Design Trends for 2024 & 2025", source: "Qualprint", link: "https://qualprint.com/packaging-design-trends-for-2024-2025/" },
  { id: 19, title: "Chai packaging trends for 2025", source: "MTPak Coffee", link: "https://mtpak.coffee/2025/09/chai-packaging-trends-2025/" },
];

// --- Components ---

const SectionHeader = ({ title, subtitle, icon: Icon, color }) => (
  <div className="mb-8 border-b-4 pb-4" style={{ borderColor: color || COLORS.purple }}>
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon size={32} color={color || COLORS.purple} />}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
    </div>
    {subtitle && <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}>
    {children}
  </div>
);

const InfoCard = ({ title, content, icon: Icon, color }) => (
  <Card className="p-6 h-full border-t-4" style={{ borderColor: color }}>
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {Icon && <div className="p-2 rounded-full bg-gray-50"><Icon size={24} color={color} /></div>}
    </div>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </Card>
);

const PersonaCard = ({ title, type, traits, color }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md border-2" style={{ borderColor: color }}>
    <div className="p-6 text-white" style={{ backgroundColor: color }}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
        {type}
      </span>
    </div>
    <div className="p-6">
      <h4 className="font-semibold text-gray-700 mb-3">Psychographics:</h4>
      <ul className="space-y-2">
        {traits.map((trait, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
            <span style={{ color: color }}>•</span> {trait}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main Application ---

const App = () => {
  const [activeSection, setActiveSection] = useState('executive');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'executive', label: 'Executive Summary', icon: TrendingUp },
    { id: 'market', label: 'Market Intelligence', icon: Target },
    { id: 'brand', label: 'Brand Philosophy', icon: Heart },
    { id: 'competitors', label: 'Competition', icon: Layers },
    { id: 'audience', label: 'Target Audience', icon: Users },
    { id: 'visuals', label: 'Visual Identity', icon: Zap },
    { id: 'voice', label: 'Voice & Tone', icon: MessageCircle },
    { id: 'product', label: 'Product Strategy', icon: ShoppingBag },
    { id: 'sources', label: 'Research Sources', icon: BookOpen },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navigation Sidebar/Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
        <span className="font-bold text-xl text-purple-700">Indian Taste House</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 space-y-4 md:hidden overflow-y-auto">
          {sections.map(item => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-3 text-lg font-medium border-b border-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full bg-gray-900 text-white p-6 shadow-2xl z-30">
        <div className="mb-10">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
            Indian Taste House
          </h1>
          <p className="text-xs text-gray-400 mt-2">Brand Manual & Intelligence</p>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {sections.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-purple-700 text-white shadow-lg translate-x-2' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-800 text-xs text-gray-500">
          Strategic Roadmap 2025
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-20 md:pt-0">
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-24 px-6 md:px-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 max-w-4xl">
            <span className="inline-block px-4 py-1 rounded-full bg-teal-500/20 border border-teal-400 text-teal-300 text-sm font-bold mb-6">
              CONFIDENTIAL STRATEGY DOCUMENT
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              The Renaissance of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-400">
                Indian Flavor
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Bridging the gap between the affluent "Conscious Curator" and the aspirational "Mass Market." 
              A blueprint for democratizing premium taste and social upliftment.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-24">

          {/* 1. Executive Summary */}
          <section id="executive">
            <SectionHeader 
              title="Executive Summary" 
              subtitle="The Genesis of a Modern Legacy"
              icon={TrendingUp}
              color={COLORS.purple}
            />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  The Indian F&B landscape is shifting. Consumers are no longer satisfied with mere utility. 
                  They seek <strong>Identity, Story, and Ethical Resonance</strong>.
                </p>
                <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600 shadow-sm">
                  <h4 className="font-bold text-purple-700 mb-2">The Mission</h4>
                  <p className="italic">
                    To architect a "Mass Brand" that bridges the gap between the affluent, health-conscious consumer 
                    and the aspirational lower-middle class—a true "Modern Desi" soul.
                  </p>
                </div>
                <p>
                  Our goal is to out-maneuver giants like Tata Tea and MDH not by mimicking them, but by winning on 
                  <strong> Emotional Connection, Transparency, and Celebration.</strong>
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-gray-800 mb-4 text-center">Market Evolution: The Shift</h4>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketGrowthData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={140} tick={{fontSize: 12}} />
                      <RechartsTooltip />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {marketGrowthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">Projected Market Sentiment Shift 2025</p>
              </div>
            </div>
          </section>

          {/* 2. Market & Cultural Context */}
          <section id="market">
            <SectionHeader 
              title="Market Landscape" 
              subtitle="The 'Indo-Renaissance' & Trust Deficit"
              icon={Target}
              color={COLORS.teal}
            />
            <div className="grid md:grid-cols-3 gap-6">
              <InfoCard 
                title="The Macro Shift" 
                icon={TrendingUp}
                color={COLORS.teal}
                content="Spices are no longer commodities; they are 'Experiences'. Driven by the 'Masstige' phenomenon, the middle class desires affordable luxury to elevate daily rituals."
              />
              <InfoCard 
                title="The Trust Deficit" 
                icon={ShieldCheck}
                color={COLORS.orange}
                content="12% of Indian spice samples failed recent safety standards. Consumers are skeptical of legacy brands. Transparency is now a competitive weapon."
              />
              <InfoCard 
                title="Modern Desi" 
                icon={Zap}
                color={COLORS.purple}
                content="'Desi' is cool. We are moving from sepia-toned nostalgia to 'Technicolor India'—truck art, neon lights, and Hinglish. It's dynamic and confident."
              />
            </div>
          </section>

          {/* 3. Brand Philosophy */}
          <section id="brand">
            <SectionHeader 
              title="Brand Philosophy" 
              subtitle="The Cycle of Goodness"
              icon={Heart}
              color={COLORS.orange}
            />
            
            <div className="bg-orange-50 rounded-2xl p-8 mb-10 border border-orange-100">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">Refined Brand Purpose</h3>
                <p className="text-xl md:text-2xl font-serif italic text-orange-900 leading-relaxed">
                  "To nourish the spirit of India by blending supreme flavor with the power of shared prosperity."
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
               {[
                 { title: "Supreme Taste", desc: "Non-Negotiable Flavor", color: COLORS.purple },
                 { title: "Clean Label", desc: "The Trust Seal", color: COLORS.teal },
                 { title: "Affordable", desc: "The Mass Bridge", color: COLORS.orange },
                 { title: "Convenience", desc: "Modern Utility", color: COLORS.green },
                 { title: "Fulfilling", desc: "Emotional ROI", color: COLORS.neonYellow }
               ].map((pillar, i) => (
                 <div key={i} className="bg-white p-4 rounded-lg shadow border-t-4 text-center" style={{borderColor: pillar.color}}>
                   <div className="font-bold text-lg mb-1">{pillar.title}</div>
                   <div className="text-xs text-gray-500 uppercase tracking-wide">{pillar.desc}</div>
                 </div>
               ))}
            </div>
          </section>

          {/* 4. Competitive Intelligence */}
          <section id="competitors">
            <SectionHeader 
              title="Competitive Landscape" 
              subtitle="Deconstructing the Giants"
              icon={Layers}
              color={COLORS.purple}
            />
            
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-6 text-center">Strategic Positioning Matrix</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="Emotional Connection" unit="%" label={{ value: 'Emotional Connection →', position: 'bottom', offset: 0 }} />
                    <YAxis type="number" dataKey="y" name="Transparency & Safety" unit="%" label={{ value: 'Trust & Safety →', angle: -90, position: 'insideLeft' }} />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Brands" data={competitorMatrixData} fill="#8884d8">
                      {competitorMatrixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div>Legacy</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div>Mass</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div>Niche Premium</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-700"></div>Indian Taste House</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-gray-100 p-6 rounded-lg">
                 <h4 className="font-bold text-lg mb-3">Tier 1: Legacy (MDH, Everest)</h4>
                 <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                   <li><strong>Weakness:</strong> Visual fatigue, pesticide controversies.</li>
                   <li><strong>Opportunity:</strong> Attack on Safety. Position as "New Standard of Purity".</li>
                 </ul>
               </div>
               <div className="bg-gray-100 p-6 rounded-lg">
                 <h4 className="font-bold text-lg mb-3">Tier 3: New-Age (Chaayos, Vahdam)</h4>
                 <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                   <li><strong>Weakness:</strong> Price barrier, inaccessible to masses.</li>
                   <li><strong>Opportunity:</strong> Democratization of Cool. Premium look, mass price.</li>
                 </ul>
               </div>
            </div>
          </section>

          {/* 5. Target Audience */}
          <section id="audience">
            <SectionHeader 
              title="Target Audience" 
              subtitle="From the Curator to the Explorer"
              icon={Users}
              color={COLORS.green}
            />
            <div className="grid md:grid-cols-2 gap-8">
              <PersonaCard 
                title="The Conscious Curator"
                type="Primary Persona (28-50)"
                color={COLORS.purple}
                traits={[
                  "Health Anxiety: Fears adulteration.",
                  "The Super-Host: Wants to impress guests.",
                  "Aspiration: Wants premium feeling within budget.",
                  "Gateway: Buys for the family's health."
                ]}
              />
              <PersonaCard 
                title="The Gen Z Explorer"
                type="Secondary Persona (16-35)"
                color={COLORS.teal}
                traits={[
                  "Visual Eaters: Needs to be Instagrammable.",
                  "Values-Driven: Prefers brands with purpose.",
                  "Convenience Seeker: Lives on Q-Commerce.",
                  "Nostalgia: Craves 'Retro' warmth."
                ]}
              />
            </div>
          </section>

          {/* 6. Visual Identity */}
          <section id="visuals">
            <SectionHeader 
              title="Visual Identity" 
              subtitle="Bold, Colourful, Modern Desi"
              icon={Zap}
              color={COLORS.purple}
            />
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-4">Color Strategy: Hyper-Contrast</h3>
                <p className="mb-6 text-gray-600">Breaking the "Red/Yellow" dominance of the spice aisle.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 rounded-full shadow-inner" style={{backgroundColor: COLORS.purple}}></div>
                    <div>
                      <div className="font-bold">Electric Purple</div>
                      <div className="text-sm text-gray-500">Primary Brand Color (Royalty)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 rounded-full shadow-inner" style={{backgroundColor: COLORS.teal}}></div>
                    <div>
                      <div className="font-bold">Teal</div>
                      <div className="text-sm text-gray-500">Freshness & Modernity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 rounded-full shadow-inner bg-gradient-to-br from-blue-700 to-yellow-400"></div>
                    <div>
                      <div className="font-bold">Flavor Coding</div>
                      <div className="text-sm text-gray-500">Kesar (Royal Blue) • Nimbu (Neon Yellow)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Packaging & Design</h3>
                <div className="bg-gray-900 text-white p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
                  <ul className="space-y-6 relative z-10">
                    <li className="flex gap-4">
                      <div className="bg-white/10 p-2 rounded h-fit"><Award size={20} /></div>
                      <div>
                        <strong className="block text-teal-300">Desi Pop Art</strong>
                        <span className="text-sm text-gray-300">Stylized, colorful vignettes of daily Indian life. No stock photos of tea cups.</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-white/10 p-2 rounded h-fit"><Layers size={20} /></div>
                      <div>
                        <strong className="block text-teal-300">Matte Doy Packs</strong>
                        <span className="text-sm text-gray-300">Stand-up pouches with ziplocks. Tactile premium feel vs. cardboard boxes.</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-white/10 p-2 rounded h-fit"><Users size={20} /></div>
                      <div>
                        <strong className="block text-teal-300">Transparency Window</strong>
                        <span className="text-sm text-gray-300">Shaped windows (Teapot/Kalash) to show product texture and build trust.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Voice & Tone */}
          <section id="voice">
            <SectionHeader 
              title="Voice & Tone" 
              subtitle="The 'Joyful Host' Archetype"
              icon={MessageCircle}
              color={COLORS.orange}
            />
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-red-50 border-l-4 border-red-300 rounded-r-lg">
                <h4 className="font-bold text-red-800 mb-2">The Boring Way (Don't)</h4>
                <p className="text-gray-600 italic">"Contains high-quality dried ginger and spices. Good for immunity."</p>
              </div>
              <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h4 className="font-bold text-green-800 mb-2">The Indian Taste House Way (Do)</h4>
                <p className="text-gray-800 font-medium">"A hug in a mug! ☕ Our Adrak Chai Masala is a spicy whisper of winter warmth. Brew it, sip it, and feel the Josh return."</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Voice Pillars</h3>
              <div className="flex flex-wrap gap-3">
                {['Dil Se Desi', 'Taste Mein Best', 'Hinglish Friendly', 'Joyful & Celebratory', 'Transparent & Bold'].map((tag, i) => (
                   <span key={i} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                     {tag}
                   </span>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Product Strategy & Roadmap */}
          <section id="product">
            <SectionHeader 
              title="Product Roadmap" 
              subtitle="The Flagship & The Future"
              icon={ShoppingBag}
              color={COLORS.purple}
            />
            
            <div className="relative border-l-4 border-purple-200 ml-4 space-y-12">
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-purple-600 w-6 h-6 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-gray-800">Phase 1: The Door Opener</h3>
                <p className="text-purple-600 font-medium">Chai Masala (Flagship)</p>
                <p className="text-gray-600 mt-2 text-sm max-w-lg">
                  High frequency, low ticket. Win the morning chai, win the household.
                  <br/><strong>Differentiation:</strong> "The Fourth Spice" (e.g., Lakadong Turmeric).
                </p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-teal-500 w-6 h-6 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-gray-800">Phase 2: Wellness Mixes</h3>
                <p className="text-teal-600 font-medium">Haldi Doodh, Jaljeera</p>
                <p className="text-gray-600 mt-2 text-sm max-w-lg">
                  Positioned as "Golden Milk Latte" and "Digestive Coolants" to attract younger demographics.
                </p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-orange-500 w-6 h-6 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-gray-800">Phase 3: Snackgrade</h3>
                <p className="text-orange-600 font-medium">Wafers, Makhana, Chikki</p>
                <p className="text-gray-600 mt-2 text-sm max-w-lg">
                  "Guilt-Free Snacking". Protein-packed Chikki bars and "Yoga Snack" Makhana. 
                  Visuals: Pop Art Travel themes (Kerala Boat Race on Banana Chips).
                </p>
              </div>
            </div>
          </section>

          {/* 9. Research Sources */}
          <section id="sources">
            <SectionHeader 
              title="Research Sources" 
              subtitle="Citations & Strategic References"
              icon={BookOpen}
              color={COLORS.teal}
            />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="divide-y divide-gray-100">
                {citationsData.map((item) => (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 group"
                  >
                    <div className="bg-teal-50 p-2 rounded-lg text-teal-600 group-hover:bg-teal-100 transition-colors shrink-0">
                      <LinkIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-teal-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{item.source}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6 border-t border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Indian Taste House</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              "To become the heartbeat of every Indian kitchen—where the warmth of our authentic flavors inspires the joy of togetherness in every home."
            </p>
            <div className="text-sm text-gray-600">
              © 2025 Indian Taste House Strategy Document. Internal Use Only.
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;