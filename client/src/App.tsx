import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Compass,
  DraftingCompass,
  Facebook,
  HardHat,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  XIcon,
} from "lucide-react";

const imageUrl = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=${width}&q=86`;

const images = {
  hero: imageUrl("photo-1503387762-592deb58ef4e"),
  intro: imageUrl("photo-1541971875076-8f970d573be6", 1200),
  about: imageUrl("photo-1511818966892-d7d671e672a2", 1400),
  detail: imageUrl("photo-1504917595217-d4dc5ebe6122", 1400),
  home: imageUrl("photo-1565008447742-97f6f38c985c", 1200),
  office: imageUrl("photo-1497366754035-f200968a6e72", 1200),
  worker: imageUrl("photo-1504307651254-35680f356dfd", 1200),
  blueprint: imageUrl("photo-1541971875076-8f970d573be6", 1200),
};

type IconType = typeof Building2;

type Project = {
  title: string;
  category: "Residential" | "Commercial" | "Civil Works" | "Renovations";
  location: string;
  description: string;
  image: string;
  services: string[];
  status?: string;
};

const projects: Project[] = [
  {
    title: "Modern Family Home",
    category: "Residential",
    location: "Harare, Zimbabwe",
    description: "Placeholder project profile for a contemporary residential build focused on clear planning, durable materials and a considered handover experience.",
    image: images.home,
    services: ["Building construction", "Cost estimation", "Project coordination"],
    status: "Representative profile",
  },
  {
    title: "Commercial Building Development",
    category: "Commercial",
    location: "Zimbabwe",
    description: "Placeholder project profile for a commercial development demonstrating the structured coordination required across design, procurement and delivery.",
    image: images.office,
    services: ["General contracting", "Quantity surveying", "Quality control"],
    status: "Representative profile",
  },
  {
    title: "Residential Renovation",
    category: "Renovations",
    location: "Harare, Zimbabwe",
    description: "Placeholder project profile for a renovation and extension, balancing existing conditions with practical upgrades and a refined finish.",
    image: images.detail,
    services: ["Renovation works", "House plans", "Construction supervision"],
    status: "Representative profile",
  },
  {
    title: "Civil Infrastructure Project",
    category: "Civil Works",
    location: "Zimbabwe",
    description: "Placeholder project profile for civil works that require safe sequencing, technical oversight and disciplined site coordination.",
    image: images.worker,
    services: ["Civil works", "Site coordination", "Project management"],
    status: "Representative profile",
  },
  {
    title: "Urban Office Fit-Out",
    category: "Commercial",
    location: "Harare, Zimbabwe",
    description: "Placeholder project profile for a modern office transformation, from initial scope definition through practical completion.",
    image: images.blueprint,
    services: ["Project planning", "Cost estimation", "Finishes coordination"],
    status: "Representative profile",
  },
  {
    title: "Residential Extension",
    category: "Residential",
    location: "Zimbabwe",
    description: "Placeholder project profile for a carefully integrated extension designed around an existing family home and its everyday use.",
    image: images.intro,
    services: ["Architectural services", "Renovation works", "Build supervision"],
    status: "Representative profile",
  },
];

const services = [
  { number: "01", title: "Building Construction", description: "From foundations to finishes, we coordinate build work with a sharp eye for quality, sequencing and durability.", icon: Building2 },
  { number: "02", title: "Residential Buildings", description: "Thoughtful homes shaped around how people live, with careful detailing and cost-aware delivery.", icon: Ruler },
  { number: "03", title: "Commercial Buildings", description: "Practical commercial spaces delivered with structured planning, clear communication and technical control.", icon: Compass },
  { number: "04", title: "Renovations & Extensions", description: "Confidently transform existing spaces while respecting the structure, context and ambition of the brief.", icon: DraftingCompass },
  { number: "05", title: "Civil Works", description: "Reliable infrastructure and site works underpinned by safe execution and sound engineering judgement.", icon: HardHat },
  { number: "06", title: "Quantity Surveying", description: "Make informed project decisions with clear budgets, measurement and cost visibility from day one.", icon: Ruler },
  { number: "07", title: "Project Management", description: "Keep every moving part aligned through disciplined coordination, reporting and accountability.", icon: ShieldCheck },
  { number: "08", title: "Construction Cost Estimation", description: "Build with confidence using realistic cost planning and practical value engineering.", icon: Sparkles },
  { number: "09", title: "House Plans & Architecture", description: "Translate ideas into clear, buildable plans that give your project direction and momentum.", icon: DraftingCompass },
  { number: "10", title: "General Contracting", description: "A dependable point of coordination for clients who value a complete, carefully managed delivery.", icon: Building2 },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Victory Vintage Civil Engineering | Construction & Engineering Zimbabwe", description: "Victory Vintage Civil Engineering delivers construction, civil engineering, quantity surveying and project management solutions across Zimbabwe." },
  "/about": { title: "About Victory Vintage Civil Engineering", description: "Learn about Victory Vintage Civil Engineering's approach to quality, reliability, technical expertise and long-term value." },
  "/services": { title: "Construction & Civil Engineering Services | Victory Vintage", description: "Explore professional building construction, civil works, quantity surveying, project management and architectural services." },
  "/projects": { title: "Projects | Victory Vintage Civil Engineering", description: "Explore representative construction and engineering project profiles from Victory Vintage Civil Engineering." },
  "/contact": { title: "Contact Victory Vintage Civil Engineering", description: "Discuss your construction, renovation or civil engineering project with the Victory Vintage team in Zimbabwe." },
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Victory Vintage Civil Engineering home">
      {/* Use uploaded logo image. Adjust class for sizing via CSS (.brand-logo) */}
      <img src="/logo.jpg" alt="Victory Vintage logo" className="brand-logo" />
      <span className={light ? "brand-copy brand-copy-light" : "brand-copy"}>
        <strong>Victory Vintage</strong>
        <small>Civil Engineering</small>
      </span>
    </Link>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), [location]);
  return null;
}

function PageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = pageMeta[location] ?? pageMeta["/"];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", meta.description);
  }, [location]);
  return null;
}

function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isHome = location === "/";
  return (
    <header className={`site-header ${scrolled || !isHome ? "site-header-solid" : ""}`}>
      <div className="container nav-inner">
        <Logo light={isHome && !scrolled} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={location === item.href ? "nav-link active" : "nav-link"}>{item.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">Get a quote <ArrowUpRight /></Link>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
        {navItems.map((item) => <Link key={item.href} href={item.href} className="mobile-nav-link">{item.label}<ArrowRight /></Link>)}
        <Link href="/contact" className="button button-gold mobile-menu-cta">Start a conversation <ArrowUpRight /></Link>
      </div>
    </header>
  );
}

function ArrowUpRight() {
  return <ArrowDownRight className="arrow-up-right" />;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand-block">
          <Logo light />
          <p>Building the future with precision and excellence.</p>
          <div className="social-row"><a href="#" aria-label="Facebook"><Facebook /></a><a href="#" aria-label="Instagram"><Instagram /></a><a href="mailto:info@victoryvintage.co.zw" aria-label="Email"><Mail /></a></div>
        </div>
        <div className="footer-column"><span className="footer-label">Explore</span>{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div className="footer-column"><span className="footer-label">Capabilities</span><span>Construction</span><span>Civil engineering</span><span>Quantity surveying</span><span>Project management</span></div>
        <div className="footer-column contact-column"><span className="footer-label">Get in touch</span><a href="tel:+263786179717"><Phone /> +263 786 179 717</a><a href="tel:+263716747212"><Phone /> +263 716 747 212</a><a href="mailto:info@victoryvintage.co.zw"><Mail /> info@victoryvintage.co.zw</a><span><MapPin /> Zimbabwe</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Victory Vintage Civil Engineering. All rights reserved.</span><span>Built for lasting value.</span></div>
    </footer>
  );
}

function ButtonLink({ href, children, variant = "gold", className = "" }: { href: string; children: ReactNode; variant?: "gold" | "outline" | "text"; className?: string }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}<ArrowUpRight /></Link>;
}

function SectionHeading({ eyebrow, title, body, light = false, align = "left" }: { eyebrow: string; title: string; body?: string; light?: boolean; align?: "left" | "center" }) {
  return <div className={`section-heading ${light ? "section-heading-light" : ""} ${align === "center" ? "section-heading-center" : ""}`}><span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function PageHero({ eyebrow, title, body, image, compact = false }: { eyebrow: string; title: ReactNode; body: string; image: string; compact?: boolean }) {
  return <section className={`page-hero ${compact ? "page-hero-compact" : ""}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(6, 21, 40, .94), rgba(6, 21, 40, .58) 58%, rgba(6, 21, 40, .34)), url(${image})` }}><div className="container page-hero-content"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />{eyebrow}</span><h1>{title}</h1><p>{body}</p></div><div className="page-hero-index">0{compact ? "4" : "1"}<span>/</span>05</div></section>;
}

function Home() {
  return <>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 19, 35, .94) 0%, rgba(5, 19, 35, .72) 46%, rgba(5, 19, 35, .12) 100%), url(${images.hero})` }}>
      <div className="hero-grid" />
      <div className="container hero-content"><div className="hero-kicker"><span className="kicker-dot" /> VICTORY VINTAGE CIVIL ENGINEERING</div><h1>Building the future<br /><em>with precision.</em></h1><p>Reliable construction, civil engineering and project management solutions designed to bring every project from concept to completion.</p><div className="hero-actions"><ButtonLink href="/contact">Request a quote</ButtonLink><ButtonLink href="/projects" variant="outline">View our projects</ButtonLink></div></div>
      <div className="hero-meta"><span>Est. Zimbabwe</span><span className="meta-rule" /><span>Construction · Engineering · Delivery</span></div>
      <div className="hero-scroll"><span>Scroll to explore</span><ChevronDown /></div>
    </section>

    <section className="intro-section section-pad"><div className="container intro-grid"><div className="intro-visual reveal"><div className="image-frame"><img src={images.intro} alt="Engineer reviewing construction plans on site" /><span className="image-corner image-corner-tl" /><span className="image-corner image-corner-br" /></div><div className="experience-stamp"><strong>Precision</strong><span>in every detail</span></div></div><div className="intro-copy"><SectionHeading eyebrow="Who we are" title="Building with purpose. Delivering with excellence." body="Victory Vintage Civil Engineering is a Zimbabwean construction and civil engineering company committed to quality, reliability and long-term value. We combine technical expertise, careful planning and professional project management to deliver outcomes our clients can stand behind." /><ButtonLink href="/about" variant="text">More about Victory Vintage</ButtonLink><div className="mini-stats"><div><strong>01</strong><span>Clear communication</span></div><div><strong>02</strong><span>Disciplined delivery</span></div></div></div></div></section>

    <section className="services-preview section-pad section-tint"><div className="container"><div className="section-row"><SectionHeading eyebrow="What we do" title="Built around your brief." body="A considered team for the decisions, details and delivery that make projects move forward." /><ButtonLink href="/services" variant="text" className="desktop-only">View all services</ButtonLink></div><div className="service-grid-home">{services.slice(0, 6).map((service) => <ServiceCard key={service.number} {...service} />)}</div><div className="mobile-only mobile-center"><ButtonLink href="/services" variant="outline">Explore all services</ButtonLink></div></div></section>

    <section className="why-section section-pad"><div className="container why-grid"><div><SectionHeading eyebrow="The Victory Vintage standard" title="The detail is the difference." body="We believe the best project experience is built on trust, transparent thinking and an uncompromising respect for the work." light /><ButtonLink href="/about" variant="outline">Our approach</ButtonLink></div><div className="why-list">{[{title: "Quality construction", body: "High standards of workmanship and attention to detail at every stage.", icon: Check}, {title: "Reliable delivery", body: "Professional planning and project coordination you can count on.", icon: ShieldCheck}, {title: "Technical expertise", body: "Practical engineering and construction knowledge applied to real constraints.", icon: Ruler}, {title: "Trusted results", body: "A commitment to delivering responsibly, professionally and with care.", icon: CircleCheck}].map((item, index) => <div className="why-item" key={item.title}><span className="why-number">0{index + 1}</span><span className="why-icon"><item.icon /></span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div></div></section>

    <section className="projects-preview section-pad"><div className="container"><div className="section-row"><SectionHeading eyebrow="Selected work" title="Projects with purpose." body="Representative project profiles showing how we approach quality, precision and professional delivery." /><ButtonLink href="/projects" variant="text" className="desktop-only">View all projects</ButtonLink></div><div className="project-grid">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.title} project={project} featured={index === 0} />)}</div><div className="mobile-only mobile-center"><ButtonLink href="/projects" variant="outline">View all projects</ButtonLink></div></div></section>

    <CTASection />
  </>;
}

function ServiceCard({ number, title, description, icon: Icon }: { number: string; title: string; description: string; icon: IconType }) {
  return <div className="service-card"><div className="service-card-top"><span>{number}</span><Icon /></div><h3>{title}</h3><p>{description}</p><Link href="/contact" className="card-link">Discuss this service <ArrowRight /></Link></div>;
}

function ProjectCard({ project, featured = false, onClick }: { project: Project; featured?: boolean; onClick?: () => void }) {
  const content = <><div className="project-image"><img src={project.image} alt={`${project.title} placeholder project profile`} /><span className="project-category">{project.category}</span><span className="project-view"><ArrowUpRight /></span></div><div className="project-card-body"><div><h3>{project.title}</h3><span className="project-location"><MapPin />{project.location}</span></div><ArrowRight className="project-arrow" /></div></>;
  return onClick ? <button className={`project-card ${featured ? "project-card-featured" : ""}`} onClick={onClick}>{content}</button> : <Link href="/projects" className={`project-card ${featured ? "project-card-featured" : ""}`}>{content}</Link>;
}

function CTASection() {
  return <section className="cta-section"><div className="cta-grid" /><div className="container cta-inner"><div><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />Start a conversation</span><h2>Let's build something<br /><em>that lasts.</em></h2></div><div className="cta-copy"><p>Have a construction, civil engineering or development project in mind? Speak with our team about your requirements.</p><ButtonLink href="/contact">Contact our team</ButtonLink></div></div></section>;
}

function About() {
  return <><PageHero eyebrow="About Victory Vintage" title={<>Built on trust.<br /><em>Driven by detail.</em></>} body="A Zimbabwean construction and civil engineering company focused on quality, reliability and long-term value." image={images.about} /><section className="section-pad about-intro"><div className="container about-intro-grid"><div><SectionHeading eyebrow="Who we are" title="A practical partner for ambitious projects." /></div><div><p className="lead-copy">Victory Vintage Civil Engineering provides professional construction and engineering services across Zimbabwe. Our work is grounded in a simple belief: the best projects come from combining good people, considered planning and disciplined execution.</p><p>From an early conversation to the final handover, we bring a calm, accountable approach to the detail that matters. We listen carefully, communicate clearly and make decisions with the project’s long-term value in mind.</p></div></div></section><section className="mission-section"><div className="container mission-grid"><div className="mission-card mission-card-dark"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />Our mission</span><h2>Deliver reliable, high-quality solutions through professional workmanship, careful planning and technical expertise.</h2></div><div className="mission-card mission-card-gold"><span className="eyebrow"><span className="eyebrow-line" />Our vision</span><h2>To become a trusted and respected company known for quality, innovation, reliability and excellence.</h2></div></div></section><ValuesSection /><ApproachSection /><CTASection /></>;
}

function ValuesSection() {
  const values = [{ title: "Quality", body: "We maintain high standards throughout every stage of our projects." }, { title: "Integrity", body: "We conduct our work with honesty, accountability and professionalism." }, { title: "Reliability", body: "We take responsibility for delivering on our commitments." }, { title: "Excellence", body: "We continuously strive to improve the quality of our work." }, { title: "Safety", body: "We prioritize safe and responsible construction practices." }, { title: "Client focus", body: "We listen to our clients and work to understand their needs." }];
  return <section className="section-pad values-section section-tint"><div className="container"><SectionHeading eyebrow="What guides us" title="Principles that hold the work together." /><div className="values-grid">{values.map((value, index) => <div className="value-card" key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.body}</p></div>)}</div></div></section>;
}

function ApproachSection() {
  const steps = [{ n: "01", title: "Consultation", body: "Understand the client's needs and project requirements." }, { n: "02", title: "Planning", body: "Develop a practical and detailed project plan." }, { n: "03", title: "Construction", body: "Execute the project using professional standards and quality workmanship." }, { n: "04", title: "Delivery", body: "Complete and hand over the project with attention to quality and expectations." }];
  return <section className="section-pad approach-section"><div className="container"><SectionHeading eyebrow="How we work" title="A clear path from first conversation to handover." /><div className="approach-grid">{steps.map((step) => <div className="approach-step" key={step.n}><span className="approach-number">{step.n}</span><div className="approach-line" /><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></div></section>;
}

function Services() {
  return <><PageHero eyebrow="Our services" title={<>The right expertise.<br /><em>At every stage.</em></>} body="Professional construction and engineering solutions for residential, commercial and civil projects." image={images.detail} compact /><section className="section-pad services-page"><div className="container"><div className="services-intro-row"><SectionHeading eyebrow="Capabilities" title="Built for the whole brief." body="Whether you are shaping a new build, upgrading an existing space or coordinating civil works, our services flex around what your project needs." /><div className="services-side-note"><span>01—10</span><p>From first estimate to final finish, we help make the next decision clearer.</p></div></div><div className="service-grid-page">{services.map((service) => <ServiceCard key={service.number} {...service} />)}</div></div></section><section className="process-section section-pad"><div className="container"><SectionHeading eyebrow="The process" title="How we work." light /><div className="process-timeline">{["Consultation", "Planning & design", "Cost estimation", "Construction", "Quality control", "Project completion"].map((step, index) => <div className="process-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3>{index < 5 && <ChevronRight className="process-chevron" />}</div>)}</div></div></section><section className="small-cta section-pad"><div className="container small-cta-inner"><div><span className="eyebrow"><span className="eyebrow-line" />Need a considered next step?</span><h2>Have a project in mind?</h2></div><ButtonLink href="/contact">Request a quote</ButtonLink></div></section></>;
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filters = ["All", "Residential", "Commercial", "Civil Works", "Renovations"];
  const filtered = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);
  return <><PageHero eyebrow="Selected work" title={<>Projects with<br /><em>purpose.</em></>} body="Explore representative project profiles demonstrating our approach to precision, professionalism and thoughtful delivery." image={images.worker} compact /><section className="section-pad projects-page"><div className="container"><div className="projects-toolbar"><SectionHeading eyebrow="Portfolio" title="A closer look at the work." body="Actual project information can be added as your portfolio grows. Profiles below are clearly marked representative placeholders." /><div className="filter-row" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} className={filter === item ? "filter-button active" : "filter-button"} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="project-grid project-grid-page">{filtered.map((project, index) => <ProjectCard key={project.title} project={project} featured={index === 0 && filter === "All"} onClick={() => setSelected(project)} />)}</div></div></section>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose(); document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); }; }, [onClose]);
  return <div className="modal-backdrop" onClick={onClose}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close project details"><XIcon /></button><div className="modal-image"><img src={project.image} alt={`${project.title} project placeholder`} /></div><div className="modal-content"><span className="eyebrow"><span className="eyebrow-line" />{project.category} · {project.status}</span><h2 id="project-modal-title">{project.title}</h2><span className="project-location"><MapPin />{project.location}</span><p>{project.description}</p><h3>Services provided</h3><ul>{project.services.map((service) => <li key={service}><Check />{service}</li>)}</ul><ButtonLink href="/contact">Discuss a similar project</ButtonLink></div></div></div>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) { setError("Please complete the required fields before sending your inquiry."); form.reportValidity(); return; } setError(""); setSubmitted(true); form.reset(); };
  return <><PageHero eyebrow="Contact" title={<>Let's discuss<br /><em>your project.</em></>} body="Whether you're planning a new construction project, renovation or civil engineering project, our team is ready to hear from you." image={images.blueprint} compact /><section className="section-pad contact-page"><div className="container contact-grid"><div className="contact-details"><SectionHeading eyebrow="Start here" title="Bring us the brief." body="Tell us what you are working on and we will get back to you to discuss the right next step." /><div className="contact-detail-list"><a href="tel:+263786179717"><span className="contact-icon"><Phone /></span><span><small>Call us</small><strong>+263 786 179 717</strong></span><ArrowUpRight /></a><a href="tel:+263716747212"><span className="contact-icon"><Phone /></span><span><small>Call us</small><strong>+263 716 747 212</strong></span><ArrowUpRight /></a><a href="mailto:info@victoryvintage.co.zw"><span className="contact-icon"><Mail /></span><span><small>Email</small><strong>info@victoryvintage.co.zw</strong></span><ArrowUpRight /></a><div><span className="contact-icon"><MapPin /></span><span><small>Based in</small><strong>Zimbabwe</strong></span></div></div></div><div className="contact-form-wrap">{submitted ? <div className="form-success"><span className="success-icon"><Check /></span><span className="eyebrow"><span className="eyebrow-line" />Inquiry received</span><h2>Thank you for reaching out.</h2><p>Your message has been captured for this demonstration. A member of the Victory Vintage team will be in touch to discuss your project.</p><button className="button button-outline" onClick={() => setSubmitted(false)}>Send another inquiry <ArrowRight /></button></div> : <form className="contact-form" onSubmit={onSubmit}><div className="form-heading"><span className="eyebrow"><span className="eyebrow-line" />Project inquiry</span><h2>Tell us about the work.</h2></div><div className="form-grid"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input type="email" name="email" required placeholder="you@company.com" /></label><label>Phone number<input name="phone" placeholder="+263 ..." /></label><label>Project type<select name="type" defaultValue=""><option value="" disabled>Select a service</option><option>Building construction</option><option>Residential building</option><option>Commercial building</option><option>Renovation & extension</option><option>Civil works</option><option>Other</option></select></label><label>Project location<input name="location" placeholder="City / area" /></label><label>Estimated budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under USD 25,000</option><option>USD 25,000 – 75,000</option><option>USD 75,000 – 150,000</option><option>USD 150,000+</option><option>Not sure yet</option></select></label></div><label>Tell us more<textarea name="message" required placeholder="A short overview of your project, timeline or requirements..." rows={5} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-gold form-submit">Send inquiry <Send /></button><p className="form-note">We respect your details and only use them to respond to your inquiry.</p></form>}</div></div></section></>;
}

function NotFound() {
  return <section className="not-found section-pad"><div className="container"><span className="eyebrow"><span className="eyebrow-line" />Page not found</span><h1>That page has moved.</h1><p>Return to the main site and continue exploring Victory Vintage.</p><ButtonLink href="/">Back to home</ButtonLink></div></section>;
}

function App() {
  return <><ScrollToTop /><PageMeta /><Navbar /><main><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/projects" component={Projects} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></main><Footer /></>;
}

export default App;
