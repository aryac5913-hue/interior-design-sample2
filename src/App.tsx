import { FormEvent, ReactNode, useEffect, useState } from 'react'

type Route = 'home' | 'about' | 'services' | 'pricing' | 'portfolio' | 'project' | 'contact' | 'faq'

const images = {
  hero: '/images/atelier-hero.png',
  living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88',
  kitchen: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=88',
  bedroom: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=88',
  villa: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88',
  bath: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=88',
  office: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88',
  dining: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=88',
  neutral: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=88',
  details: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=88',
}

const nav: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Studio', route: 'about' },
  { label: 'Services', route: 'services' },
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'Pricing', route: 'pricing' },
  { label: 'Contact', route: 'contact' },
]

function Arrow({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function routeFromHash(): Route {
  const value = window.location.hash.replace('#/', '').split('/')[0]
  return (['home', 'about', 'services', 'pricing', 'portfolio', 'project', 'contact', 'faq'].includes(value) ? value : 'home') as Route
}

function go(route: Route) {
  window.location.hash = `#/${route}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Button({ children, to = 'contact', light = false }: { children: ReactNode; to?: Route; light?: boolean }) {
  return (
    <button onClick={() => go(to)} className={`group inline-flex items-center justify-center gap-4 px-6 py-4 text-[11px] uppercase tracking-[.22em] transition-all duration-500 ${light ? 'bg-[#f5efe5] text-[#251b16] hover:bg-white' : 'bg-[#493425] text-white hover:bg-[#b08a57]'}`}>
      {children}<Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  )
}

function Header({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#1c1511]/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-10">
        <button onClick={() => go('home')} className="text-left">
          <span className="block font-serif text-[22px] leading-none tracking-[.12em]">VĀSA</span>
          <span className="mt-1 block text-[8px] uppercase tracking-[.42em] text-[#d7bd94]">Atelier · India</span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(item => <button key={item.route} onClick={() => go(item.route)} className={`nav-link ${route === item.route ? 'active' : ''}`}>{item.label}</button>)}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="https://wa.me/919876543210?text=Hello%20Vasa%20Atelier,%20I%20would%20like%20to%20discuss%20my%20interiors." target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[.18em] text-[#d7bd94]">WhatsApp</a>
          <button onClick={() => go('contact')} className="border border-[#cbb18b]/60 px-5 py-3 text-[10px] uppercase tracking-[.18em] transition hover:bg-[#cbb18b] hover:text-[#241a14]">Book consultation</button>
        </div>
        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
          <span className="h-px w-5 bg-white"/><span className="h-px w-5 bg-white"/><span className="h-px w-5 bg-white"/>
        </button>
      </div>
      {open && <div className="border-t border-white/10 bg-[#1c1511] px-6 py-6 md:hidden">
        {nav.map(item => <button key={item.route} onClick={() => { go(item.route); setOpen(false) }} className="block w-full border-b border-white/10 py-3 text-left font-serif text-2xl text-[#efe7db]">{item.label}</button>)}
        <button onClick={() => { go('faq'); setOpen(false) }} className="block py-3 font-serif text-2xl text-[#efe7db]">FAQ</button>
      </div>}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1c1511] px-5 py-16 text-[#e9dfd1] md:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
        <div><div className="font-serif text-3xl tracking-[.12em]">VĀSA</div><p className="mt-5 max-w-xs text-sm leading-7 text-[#ac9e91]">Quietly luxurious interiors, shaped around the rhythms, rituals and stories of modern Indian living.</p></div>
        <div><p className="footer-title">Explore</p>{nav.slice(1).map(n => <button key={n.route} onClick={() => go(n.route)} className="footer-link">{n.label}</button>)}</div>
        <div><p className="footer-title">Visit us</p><p className="text-sm leading-7 text-[#ac9e91]">12, Altamount Road<br/>Mumbai 400 026<br/>Maharashtra, India</p></div>
        <div><p className="footer-title">Begin a conversation</p><a className="footer-link" href="tel:+919876543210">+91 98765 43210</a><a className="footer-link" href="mailto:studio@vasaatelier.in">studio@vasaatelier.in</a><button onClick={() => go('faq')} className="footer-link">Frequently asked questions</button></div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 pt-7 text-[9px] uppercase tracking-[.2em] text-[#766b61] md:flex-row md:justify-between"><span>© 2025 Vāsa Atelier</span><span>Mumbai · Bengaluru · New Delhi</span></div>
    </footer>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] ${light ? 'text-[#d8be97]' : 'text-[#9a7349]'}`}><span className="h-px w-8 bg-current"/>{children}</p>
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-[#211813] pt-28 text-white">
      <img src={image} className="absolute inset-0 h-full w-full object-cover opacity-55" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c1511]/90 via-[#1c1511]/45 to-transparent"/>
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] md:text-7xl lg:text-[92px]">{title}</h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-[#e2d9ce] md:text-base">{text}</p>
      </div>
    </section>
  )
}

function Home() {
  return <main>
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#211813] text-white">
      <img src={images.hero} alt="Luxury living room designed by Vāsa Atelier" className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-r from-[#17100d]/80 via-[#17100d]/30 to-transparent"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#17100d]/70 via-transparent to-[#17100d]/20"/>
      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-12 pt-32 md:px-10 md:pb-20">
        <Eyebrow light>Luxury interior architecture · India</Eyebrow>
        <h1 className="max-w-4xl font-serif text-5xl leading-[.98] md:text-7xl lg:text-[96px]">Spaces That Reflect<br/><em className="font-light text-[#e1c8a3]">Your Lifestyle</em></h1>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Button light to="portfolio">Explore our work</Button>
          <Button>Begin your project</Button>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 hidden items-center gap-3 text-[9px] uppercase tracking-[.25em] lg:flex"><span>Scroll to discover</span><span className="h-px w-12 bg-white/60"/></div>
    </section>

    <section className="bg-[#f5f0e8] px-5 py-20 md:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><Eyebrow>Our point of view</Eyebrow><h2 className="heading">Homes with a sense<br/>of <em>belonging.</em></h2></div>
        <div className="lg:pl-20"><p className="max-w-2xl text-lg leading-8 text-[#65594f]">We create deeply personal interiors that pair Indian craftsmanship with a refined, global sensibility. Every room is considered, tactile and designed to age beautifully.</p><button onClick={() => go('about')} className="text-link mt-8">Meet the studio <Arrow className="h-4 w-4"/></button></div>
      </div>
    </section>

    <section className="bg-[#f5f0e8] px-5 pb-24 md:px-10 lg:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between"><div><Eyebrow>Selected residences</Eyebrow><h2 className="heading">Featured projects</h2></div><button onClick={() => go('portfolio')} className="text-link hidden md:flex">View all projects <Arrow className="h-4 w-4"/></button></div>
        <div className="grid gap-5 md:grid-cols-2">
          <ProjectCard image={images.living} title="The Altamount Residence" meta="Mumbai · 4,800 sq. ft." large/>
          <div className="grid gap-5"><ProjectCard image={images.villa} title="Monsoon House" meta="Alibaug · 7,200 sq. ft."/><ProjectCard image={images.kitchen} title="The Courtyard Apartment" meta="Bengaluru · 3,100 sq. ft."/></div>
        </div>
      </div>
    </section>

    <section className="bg-[#2b2019] px-5 py-20 text-white md:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]"><Eyebrow light>What we do</Eyebrow><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><h2 className="heading text-white">From first sketch<br/>to final <em>detail.</em></h2><div className="grid md:grid-cols-2">{['Interior Architecture','Residential Interiors','Bespoke Kitchens','Furniture & Styling'].map((s,i) => <button onClick={() => go('services')} key={s} className="group border-b border-[#6c5a4c] py-6 text-left md:odd:mr-8"><span className="mr-5 text-xs text-[#b89568]">0{i+1}</span><span className="font-serif text-2xl">{s}</span><Arrow className="float-right mt-2 h-4 w-4 transition-transform group-hover:translate-x-1"/></button>)}</div></div></div>
    </section>

    <section className="grid bg-[#e9dfd1] lg:grid-cols-2">
      <img src={images.neutral} alt="Warm minimal living room" className="h-[480px] w-full object-cover lg:h-full"/>
      <div className="flex items-center px-7 py-20 md:px-16 lg:min-h-[680px]"><div><Eyebrow>Client stories</Eyebrow><blockquote className="font-serif text-3xl leading-tight text-[#33251d] md:text-5xl">“They understood how we wanted to live, not just how we wanted our home to look.”</blockquote><p className="mt-8 text-xs uppercase tracking-[.2em] text-[#8d7157]">Ananya & Rohan Mehta · Mumbai</p><div className="mt-12 flex gap-2"><span className="h-px w-12 bg-[#493425]"/><span className="h-px w-5 bg-[#b5a99b]"/><span className="h-px w-5 bg-[#b5a99b]"/></div></div></div>
    </section>
    <Cta/>
  </main>
}

function ProjectCard({ image, title, meta, large = false }: { image: string; title: string; meta: string; large?: boolean }) {
  return <button onClick={() => go('project')} className="image-card group relative block overflow-hidden text-left"><img src={image} alt={title} className={`w-full object-cover transition duration-1000 group-hover:scale-105 ${large ? 'h-[620px] md:h-[760px]' : 'h-[370px]'}`}/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><div className="absolute bottom-0 p-7 text-white"><p className="mb-2 text-[9px] uppercase tracking-[.25em] text-[#dec49d]">{meta}</p><h3 className="font-serif text-3xl">{title}</h3></div></button>
}

function About() {
  const values = [{n:'01',t:'Thoughtful restraint',d:'Luxury is found in proportion, material and the confidence to leave space.'},{n:'02',t:'Deeply personal',d:'Every design begins with how you live, gather and retreat.'},{n:'03',t:'Made in India',d:'We champion exceptional local makers, craftspeople and natural materials.'}]
  return <main><PageHero eyebrow="The studio" title="Designing from the inside out." text="Vāsa is a Mumbai-based interior architecture studio creating enduring homes across India and beyond." image={images.details}/>
    <section className="page-section"><div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-24"><div><Eyebrow>Our story</Eyebrow><h2 className="heading">Beauty, with<br/><em>purpose.</em></h2></div><div><p className="lead">Founded in 2014, Vāsa Atelier was born from a desire to create interiors that feel as good as they look.</p><p className="body-copy">Our work sits at the intersection of architecture, craft and contemporary culture. We look beyond trends, composing homes through light, tactility and a close understanding of our clients’ lives. From city apartments to coastal villas, each project is distinct, yet unmistakably Vāsa.</p></div></div></section>
    <section className="grid lg:grid-cols-2"><img src={images.dining} className="h-[600px] w-full object-cover" alt="Dining interior"/><div className="flex items-center bg-[#dfd1be] p-8 md:p-16 lg:p-24"><div><Eyebrow>Our philosophy</Eyebrow><h2 className="heading">Quiet rooms.<br/>Rich <em>stories.</em></h2><p className="body-copy mt-7">We believe a home should reveal itself slowly. Our palette is warm, our materials honest, and our details considered. We draw from India’s extraordinary craft traditions without nostalgia—creating spaces that feel both rooted and relevant.</p></div></div></section>
    <section className="page-section"><div className="mx-auto max-w-[1400px]"><Eyebrow>What guides us</Eyebrow><div className="mt-10 grid border-t border-[#cbbdad] md:grid-cols-3">{values.map(v=><div className="border-b border-[#cbbdad] py-10 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0" key={v.n}><span className="text-[10px] tracking-[.2em] text-[#a37a50]">{v.n}</span><h3 className="mt-10 font-serif text-3xl">{v.t}</h3><p className="mt-4 text-sm leading-7 text-[#71655b]">{v.d}</p></div>)}</div></div></section>
    <section className="bg-[#2b2019] px-5 py-20 text-white md:px-10 lg:py-28"><div className="mx-auto max-w-[1400px]"><Eyebrow light>Leadership</Eyebrow><div className="grid gap-8 md:grid-cols-2"><Team name="Mira Shah" role="Founder & Creative Director" image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"/><Team name="Arjun Mehra" role="Design Principal" image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85"/></div></div></section><Cta/></main>
}

function Team({name,role,image}:{name:string;role:string;image:string}) { return <div><img src={image} className="h-[520px] w-full object-cover object-top grayscale-[20%]" alt={name}/><h3 className="mt-5 font-serif text-3xl">{name}</h3><p className="mt-1 text-[10px] uppercase tracking-[.2em] text-[#c5a878]">{role}</p></div> }

const serviceItems = [
  ['Residential Interiors','Complete, considered homes—from spatial planning and material palettes to bespoke furniture and final styling.',images.living],
  ['Modular Kitchens','Ergonomic, beautifully detailed kitchens with precision storage and premium hardware.',images.kitchen],
  ['Bedrooms','Private sanctuaries composed for deep rest, elegant storage and serene daily rituals.',images.bedroom],
  ['Living Rooms','Warm, layered gathering spaces designed around your family, art and way of entertaining.',images.neutral],
  ['Bathrooms','Spa-like retreats crafted in natural stone, refined metalwork and atmospheric light.',images.bath],
  ['Office Interiors','Sophisticated workplaces balancing brand, wellbeing, focus and effortless collaboration.',images.office],
  ['Space Planning','Intelligent layouts that improve flow, proportion, natural light and every square foot.',images.dining],
  ['3D Visualisation','Photoreal visual stories that let you experience every finish before execution begins.',images.details],
]

function Services() {
  return <main><PageHero eyebrow="Our expertise" title="Every detail, beautifully resolved." text="A complete interior design service, bringing clarity, creativity and exacting care to every stage of your project." image={images.kitchen}/>
    <section className="page-section"><div className="mx-auto max-w-[1400px]"><div className="mb-14 grid gap-7 lg:grid-cols-2"><h2 className="heading">How we shape<br/>your <em>world.</em></h2><p className="lead max-w-xl">From the architecture of a room to the feel of a handle in your hand, we see every decision as part of one cohesive story.</p></div><div className="grid gap-x-6 gap-y-12 md:grid-cols-2">{serviceItems.map(([title,desc,image],i)=><article key={title} className="group"><div className="overflow-hidden"><img src={image} alt={title} className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[470px]"/></div><div className="mt-5 grid grid-cols-[auto_1fr] gap-5"><span className="pt-2 text-[10px] text-[#a37a50]">0{i+1}</span><div><h3 className="font-serif text-3xl">{title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-[#71655b]">{desc}</p></div></div></article>)}</div></div></section>
    <section className="bg-[#ddd0be] px-5 py-20 md:px-10"><div className="mx-auto max-w-[1200px] text-center"><Eyebrow>Our process</Eyebrow><h2 className="heading">A seamless journey</h2><div className="mt-12 grid gap-4 md:grid-cols-4">{['Discover','Define','Design','Deliver'].map((p,i)=><div key={p} className="border border-[#b9a992] px-5 py-9"><span className="text-[10px] text-[#987047]">0{i+1}</span><h3 className="mt-6 font-serif text-2xl">{p}</h3></div>)}</div></div></section><Cta/></main>
}

function Pricing() {
  const plans=[{name:'Basic',price:'₹12,000',desc:'A clear foundation for beautifully considered spaces.',items:['Design consultation','Space planning','Furniture layout','Concept direction']},{name:'Premium',price:'₹25,000',desc:'A detailed design vision, ready to bring to life.',items:['Everything in Basic','Detailed designs','3D visualisation','Material selection'],featured:true},{name:'Luxury',price:'₹45,000',desc:'An immersive, entirely bespoke design experience.',items:['Everything in Premium','Customised interiors','Advanced photoreal renders','Bespoke detail design']}]
  return <main><PageHero eyebrow="Design investment" title="Clarity from the very beginning." text="Flexible design packages, tailored to the ambition and scale of your space." image={images.neutral}/>
    <section className="page-section"><div className="mx-auto max-w-[1400px]"><div className="grid gap-6 lg:grid-cols-3">{plans.map(p=><article key={p.name} className={`relative flex min-h-[520px] flex-col border p-8 md:p-10 ${p.featured?'border-[#9a7349] bg-[#2b2019] text-white':'border-[#cdbfae] bg-[#f8f4ee]'}`}>{p.featured&&<span className="absolute right-0 top-0 bg-[#b08a57] px-4 py-2 text-[8px] uppercase tracking-[.2em]">Most preferred</span>}<p className="text-[10px] uppercase tracking-[.25em] text-[#a37a50]">{p.name}</p><p className="mt-9 text-xs uppercase tracking-[.2em] opacity-60">Starting at</p><h2 className="mt-2 font-serif text-5xl">{p.price}</h2><p className="mt-6 min-h-14 text-sm leading-6 opacity-70">{p.desc}</p><ul className="mt-7 border-t border-current/15 pt-6">{p.items.map(i=><li key={i} className="mb-4 flex gap-3 text-sm"><span className="text-[#b08a57]">—</span>{i}</li>)}</ul><div className="mt-auto"><Button light={!!p.featured}>Choose {p.name}</Button></div></article>)}</div><div className="mt-10 border-l-2 border-[#b08a57] bg-[#e8ddcf] p-6 text-sm leading-7 text-[#64584e]"><strong className="font-medium text-[#33251d]">Please note:</strong> Package prices cover design services only. Execution, furniture, materials, civil work, taxes and site travel are estimated and charged separately after design sign-off.</div></div></section>
    <section className="bg-[#2b2019] px-5 py-20 text-white md:px-10"><div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center"><h2 className="heading text-white">Not sure which<br/>package fits?</h2><div><p className="mb-7 leading-7 text-[#c4b7aa]">Tell us about your space and aspirations. Our designers will recommend the right level of support in a complimentary 20-minute discovery call.</p><Button light>Speak to a designer</Button></div></div></section></main>
}

const projects = [
  {title:'The Altamount Residence',cat:'Residential',place:'Mumbai',img:images.living},
  {title:'Monsoon House',cat:'Villas',place:'Alibaug',img:images.villa},
  {title:'An Heirloom Kitchen',cat:'Kitchens',place:'New Delhi',img:images.kitchen},
  {title:'The Courtyard Apartment',cat:'Residential',place:'Bengaluru',img:images.neutral},
  {title:'Casa Serein',cat:'Bedrooms',place:'Goa',img:images.bedroom},
  {title:'Atelier Offices',cat:'Workspaces',place:'Gurugram',img:images.office},
]

function Portfolio() {
  const [filter,setFilter]=useState('All')
  const categories=['All','Residential','Villas','Kitchens','Bedrooms','Workspaces']
  return <main><PageHero eyebrow="Selected work" title="Interiors with soul and substance." text="A collection of residences and spaces shaped by place, personality and the poetry of everyday life." image={images.villa}/>
    <section className="page-section"><div className="mx-auto max-w-[1400px]"><div className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-[#cdbfae] pb-5">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={`text-[10px] uppercase tracking-[.2em] transition ${filter===c?'text-[#8a633c]':'text-[#8a8179] hover:text-[#33251d]'}`}>{c}</button>)}</div><div className="grid gap-x-6 gap-y-12 md:grid-cols-2">{projects.filter(p=>filter==='All'||p.cat===filter).map((p,i)=><button onClick={()=>go('project')} key={p.title} className={`group text-left ${i%3===0?'md:row-span-2':''}`}><div className="overflow-hidden"><img src={p.img} alt={p.title} className={`w-full object-cover transition duration-1000 group-hover:scale-105 ${i%3===0?'h-[620px]':'h-[430px]'}`}/></div><p className="mt-5 text-[9px] uppercase tracking-[.25em] text-[#9a7349]">{p.cat} · {p.place}</p><h2 className="mt-2 font-serif text-3xl">{p.title}</h2></button>)}</div></div></section><Cta/></main>
}

function ProjectDetail() {
  return <main><section className="relative h-[88vh] bg-[#201712]"><img src={images.living} className="h-full w-full object-cover opacity-75" alt="Altamount Residence"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute bottom-16 left-5 text-white md:left-12"><Eyebrow light>Residential · Mumbai</Eyebrow><h1 className="font-serif text-5xl md:text-8xl">The Altamount<br/>Residence</h1></div></section>
    <section className="page-section"><div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.65fr_1.35fr]"><div className="grid grid-cols-2 gap-6 text-xs leading-6"><div><p className="meta">Location</p><p>Mumbai</p></div><div><p className="meta">Area</p><p>4,800 sq. ft.</p></div><div><p className="meta">Scope</p><p>Turnkey interiors</p></div><div><p className="meta">Completed</p><p>2024</p></div></div><div><Eyebrow>The concept</Eyebrow><h2 className="heading">A quiet sanctuary<br/>above the <em>city.</em></h2><p className="body-copy mt-7">Designed for a family of four, this expansive Mumbai home balances the owners’ love of contemporary art with their desire for warmth and ease. Curved forms soften the architecture, while a palette of ivory limestone, smoked oak and aged brass creates a calm, luminous whole.</p></div></div></section>
    <section className="px-3 md:px-6"><img src={images.neutral} className="h-[75vh] w-full object-cover" alt="Residence living room"/></section>
    <section className="page-section"><div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2"><img src={images.dining} className="h-[680px] w-full object-cover" alt="Dining room"/><img src={images.details} className="h-[680px] w-full object-cover" alt="Interior details"/></div><div className="mx-auto mt-20 max-w-3xl text-center"><Eyebrow>Materials</Eyebrow><h2 className="heading">Tactile by nature</h2><p className="body-copy mt-6">Lime plaster · Italian travertine · Smoked oak · Brushed brass · Handwoven wool · Natural linen</p></div></section>
    <section className="grid md:grid-cols-2"><img src={images.bedroom} className="h-[620px] w-full object-cover" alt="Principal bedroom"/><img src={images.kitchen} className="h-[620px] w-full object-cover" alt="Kitchen"/></section>
    <div className="bg-[#e3d7c7] py-14 text-center"><p className="mb-3 text-[9px] uppercase tracking-[.25em] text-[#92704e]">Next project</p><button onClick={()=>go('portfolio')} className="font-serif text-4xl transition hover:text-[#9a7349]">Monsoon House →</button></div></main>
}

function Contact() {
  const [sent,setSent]=useState(false)
  function submit(e:FormEvent){e.preventDefault();setSent(true)}
  return <main><PageHero eyebrow="Start a conversation" title="Tell us about your space." text="Every extraordinary interior begins with a thoughtful conversation. Share a little about your project and our studio will be in touch." image={images.dining}/>
    <section className="page-section"><div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>Contact</Eyebrow><h2 className="heading">We'd love to<br/><em>hear from you.</em></h2><div className="mt-10 space-y-7 text-sm leading-7 text-[#685c52]"><div><p className="meta">Studio</p><p>12, Altamount Road<br/>Mumbai 400 026</p></div><div><p className="meta">Email</p><a href="mailto:studio@vasaatelier.in">studio@vasaatelier.in</a></div><div><p className="meta">Phone</p><a href="tel:+919876543210">+91 98765 43210</a></div></div><a href="https://wa.me/919876543210?text=Hello%20Vasa%20Atelier,%20I%20would%20like%20to%20discuss%20my%20interiors." target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 border border-[#92704e] px-5 py-4 text-[10px] uppercase tracking-[.2em] text-[#674a31]">Chat with us on WhatsApp <Arrow className="h-4 w-4"/></a></div>
      {sent?<div className="flex min-h-[500px] items-center justify-center border border-[#cabaa7] bg-[#eee5d9] p-10 text-center"><div><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#9a7349] text-2xl text-[#9a7349]">✓</span><h2 className="mt-7 font-serif text-4xl">Thank you.</h2><p className="mt-4 text-sm leading-7 text-[#685c52]">Your enquiry is with our studio. We’ll get back to you within two working days.</p><button onClick={()=>setSent(false)} className="text-link mx-auto mt-8">Send another enquiry</button></div></div>:<form onSubmit={submit} className="grid gap-x-6 gap-y-7 md:grid-cols-2"><Field label="Your name" placeholder="Full name" required/><Field label="Phone number" placeholder="+91" type="tel" required/><Field label="Email address" placeholder="you@email.com" type="email" required/><Field label="City" placeholder="e.g. Mumbai" required/><Select label="Property type" options={['Apartment','Villa','Office','Other']}/><Select label="Approximate budget" options={['₹5–15 lakh','₹15–30 lakh','₹30–60 lakh','₹60 lakh+']}/><label className="md:col-span-2"><span className="field-label">Tell us about your project</span><textarea rows={4} className="field" placeholder="Scope, size, timeline and anything else you would like us to know..."/></label><div className="md:col-span-2"><button className="group flex items-center gap-4 bg-[#493425] px-8 py-5 text-[10px] uppercase tracking-[.22em] text-white transition hover:bg-[#b08a57]">Send enquiry <Arrow className="h-4 w-4 transition group-hover:translate-x-1"/></button><p className="mt-4 text-[10px] leading-5 text-[#8b8178]">By submitting, you agree to be contacted regarding your enquiry.</p></div></form>}</div></section></main>
}

function Field({label,placeholder,type='text',required=false}:{label:string;placeholder:string;type?:string;required?:boolean}) { return <label><span className="field-label">{label}</span><input className="field" type={type} placeholder={placeholder} required={required}/></label> }
function Select({label,options}:{label:string;options:string[]}) { return <label><span className="field-label">{label}</span><select className="field" required defaultValue=""><option value="" disabled>Select one</option>{options.map(o=><option key={o}>{o}</option>)}</select></label> }

function FAQ() {
  const faqs=[['How much does interior design cost?','Our design-only packages begin at ₹12,000 for focused planning and consultation. Premium and Luxury packages begin at ₹25,000 and ₹45,000 respectively. Execution, furniture and materials are estimated separately once the design is approved.'],['What types of projects do you undertake?','We design full homes, individual rooms, villas, modular kitchens, bathrooms and office interiors. We work on both new-build and renovation projects across India.'],['How long does a typical project take?','Design typically takes 6–12 weeks depending on scope. Full execution may take 12–28 weeks after design sign-off, subject to project scale, site conditions and custom fabrication.'],['What is your design process?','We begin with discovery and site study, followed by concept direction, space planning, design development, 3D visualisation and technical documentation. If engaged for turnkey execution, our team then manages procurement, fabrication and installation.'],['Can you work remotely or outside Mumbai?','Yes. We work across India and selectively internationally. Our process combines in-person milestones with virtual presentations and well-structured site coordination.'],['Do you offer only 3D visualisation?','Yes. We offer visualisation as part of our Premium and Luxury packages, and as a standalone service for suitable projects.'],['Are materials included in your package price?','No. Published package prices cover professional design services. Materials, furniture, execution, taxes, logistics and travel are quoted separately.']]
  const [open,setOpen]=useState(0)
  return <main><PageHero eyebrow="Frequently asked questions" title="Good design begins with clarity." text="Answers to the questions our clients ask most often about scope, investment and process." image={images.details}/><section className="page-section"><div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.6fr_1.4fr]"><div><Eyebrow>Need to know</Eyebrow><h2 className="heading">Your questions,<br/><em>answered.</em></h2><p className="body-copy mt-6">Still curious? Our studio is always happy to help.</p><button onClick={()=>go('contact')} className="text-link mt-7">Contact our studio <Arrow className="h-4 w-4"/></button></div><div>{faqs.map(([q,a],i)=><div key={q} className="border-b border-[#c7b8a5]"><button onClick={()=>setOpen(open===i?-1:i)} className="flex w-full items-center justify-between gap-6 py-7 text-left"><span className="font-serif text-xl md:text-2xl">{q}</span><span className="text-2xl font-light text-[#9a7349]">{open===i?'−':'+'}</span></button>{open===i&&<p className="max-w-2xl pb-7 text-sm leading-7 text-[#6f6359]">{a}</p>}</div>)}</div></div></section><Cta/></main>
}

function Cta() { return <section className="relative overflow-hidden bg-[#6b5140] px-5 py-24 text-center text-white md:px-10 lg:py-32"><div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_center,#fff,transparent_60%)]"/><div className="relative mx-auto max-w-3xl"><Eyebrow light>Begin your story</Eyebrow><h2 className="font-serif text-5xl leading-tight md:text-7xl">Let’s create a home<br/>that feels <em>like you.</em></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#e2d7cc]">Share your vision with us. The first conversation is always complimentary.</p><div className="mt-8"><Button light>Book a consultation</Button></div></div></section> }

export default function App() {
  const [route,setRoute]=useState<Route>(routeFromHash())
  useEffect(()=>{const update=()=>setRoute(routeFromHash());window.addEventListener('hashchange',update);if(!window.location.hash)window.location.hash='#/home';return()=>window.removeEventListener('hashchange',update)},[])
  const pages:Record<Route,ReactNode>={home:<Home/>,about:<About/>,services:<Services/>,pricing:<Pricing/>,portfolio:<Portfolio/>,project:<ProjectDetail/>,contact:<Contact/>,faq:<FAQ/>}
  return <div className="min-h-screen bg-[#f5f0e8] text-[#33251d]"><Header route={route}/>{pages[route]}<Footer/></div>
}
