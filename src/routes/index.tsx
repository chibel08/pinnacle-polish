import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Phone, MessageCircle, Check, Star, MapPin, Sparkles, Car, Droplets,
  ShieldCheck, Clock, Wrench, Home, Instagram, Facebook, Music2, ChevronRight,
} from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clean Car Detailing Liège & Verviers | Detailing Automobile Haut de Gamme à Domicile" },
      { name: "description", content: "Service premium de detailing automobile à domicile à Liège, Verviers et partout en Belgique. Nettoyage intérieur, extérieur et packs complets. Résultat professionnel garanti." },
      { property: "og:title", content: "Clean Car Detailing — Detailing Automobile Premium à Domicile" },
      { property: "og:description", content: "Detailing automobile professionnel à Liège, Verviers et partout en Belgique. Service à domicile, résultat garanti." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Clean Car Detailing",
        image: "/og.jpg",
        description: "Detailing automobile premium à domicile à Liège, Verviers et partout en Belgique.",
        telephone: ["+32499184971", "+32470556810"],
        areaServed: "BE",
        address: { "@type": "PostalAddress", addressRegion: "Liège", addressCountry: "BE" },
        priceRange: "€€",
        sameAs: ["https://www.instagram.com/cleancardetailing"],
      }),
    }],
  }),
  component: Index,
});

type Vehicle = "petite" | "berline" | "suv" | "camionnette";
const vehicleLabels: Record<Vehicle, string> = {
  petite: "Petite voiture",
  berline: "Berline",
  suv: "SUV / Monospace",
  camionnette: "Camionnette",
};

const pricing = {
  ext:   { petite: 40, berline: 50, suv: 85, camionnette: 80 },
  int:   { petite: 60, berline: 80, suv: 100, camionnette: 150 },
  pack:  { petite: 85, berline: 110, suv: 140, camionnette: 190 },
};

const options = [
  { key: "cuir",        label: "Traitement cuir",          price: { petite: 50, berline: 70, suv: 90, camionnette: 100 } },
  { key: "cire",        label: "Cire de protection",       price: { petite: 40, berline: 50, suv: 65, camionnette: 75 } },
  { key: "plafond",     label: "Nettoyage tissu plafond",  price: { petite: 60, berline: 80, suv: 100, camionnette: 120 } },
  { key: "tabac",       label: "Traitement anti-odeur tabac", price: { petite: 50, berline: 70, suv: 90, camionnette: 110 } },
  { key: "confort",     label: "Pack Confort",             price: { petite: 90, berline: 125, suv: 160, camionnette: 190 } },
  { key: "protection",  label: "Pack Protection",          price: { petite: 90, berline: 120, suv: 150, camionnette: 180 } },
  { key: "premium",     label: "Pack Premium Complet",     price: { petite: 175, berline: 240, suv: 310, camionnette: 370 } },
] as const;

const services = [
  { key: "ext",  label: "Lavage extérieur" },
  { key: "int",  label: "Lavage intérieur" },
  { key: "pack", label: "Pack complet" },
] as const;

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i * 0.4) % 6}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

function Section({ id, eyebrow, title, children, className = "" }: { id?: string; eyebrow?: string; title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[var(--gold)]">
              <span className="h-px w-8 bg-[var(--gold)]" /> {eyebrow} <span className="h-px w-8 bg-[var(--gold)]" />
            </div>
          )}
          <h2 className="text-5xl md:text-7xl font-normal text-foreground">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Index() {
  const [vehicle, setVehicle] = useState<Vehicle>("berline");
  const [tarifsVehicle, setTarifsVehicle] = useState<Vehicle>("berline");
  const [service, setService] = useState<"ext" | "int" | "pack">("pack");
  const [extras, setExtras] = useState<Set<string>>(new Set());

  const toggleExtra = (k: string) => {
    setExtras((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  };

  const total = useMemo(() => {
    let t = pricing[service][vehicle];
    options.forEach((o) => { if (extras.has(o.key)) t += o.price[vehicle]; });
    return t;
  }, [vehicle, service, extras]);

  const whatsappLink = useMemo(() => {
    const lines = [
      "Bonjour Clean Car Detailing,",
      "Je souhaite un devis :",
      `• Véhicule : ${vehicleLabels[vehicle]}`,
      `• Prestation : ${services.find((s) => s.key === service)?.label}`,
    ];
    const sel = options.filter((o) => extras.has(o.key));
    if (sel.length) {
      lines.push(`• Options : ${sel.map((o) => o.label).join(", ")}`);
    }
    lines.push(`• Estimation totale : ${total} €`);
    return `https://wa.me/32499184971?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [vehicle, service, extras, total]);

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-7xl px-6 py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 grid place-items-center w-10 h-10 rounded-md" style={{ background: "var(--gradient-gold)" }}>
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl tracking-wider truncate">CLEAN CAR <span className="text-[var(--gold)]">DETAILING</span></div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground hidden sm:block">Premium · Belgique</div>
            </div>
          </a>
          <div className="flex items-center gap-3 shrink-0">
            <nav className="hidden lg:flex items-center gap-7 text-sm uppercase tracking-widest text-muted-foreground mr-4">
              <a href="#prestations" className="hover:text-[var(--gold)] transition">Prestations</a>
              <a href="#tarifs" className="hover:text-[var(--gold)] transition">Tarifs</a>
              <a href="#devis" className="hover:text-[var(--gold)] transition">Devis</a>
              <a href="#contact" className="hover:text-[var(--gold)] transition">Contact</a>
            </nav>
            <a href="tel:0499184971" className="hidden md:inline-flex items-center gap-2 text-sm text-foreground hover:text-[var(--gold)] transition">
              <Phone className="w-4 h-4" /> 0499 18 49 71
            </a>
            <a href="#devis" className="btn-gold btn-gold-hover !py-2.5 !px-4 text-xs">Devis</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCar} alt="BMW noire de luxe brillante après detailing professionnel" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <Particles />

        <div className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Service Premium · Liège · Verviers · Belgique</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] mb-6">
              <span className="block shine-text">VOTRE VOITURE</span>
              <span className="block shine-text" style={{ animationDelay: "1s" }}>MÉRITE</span>
              <span className="block gold-text">L'EXCELLENCE</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Le detailing automobile professionnel directement chez vous, partout en Belgique.
              Une finition irréprochable, signée par des passionnés.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#devis" className="btn-gold btn-gold-hover">
                Demander un devis <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#tarifs" className="btn-outline-gold hover:bg-[var(--gold)] hover:text-background">
                Voir nos tarifs
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["À domicile", "Liège & Verviers", "Toute la Belgique", "Résultat garanti"].map((b) => (
                <span key={b} className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--gold)]" /> {b}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-border">
              <a href="tel:0499184971" className="group flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full glass group-hover:bg-[var(--gold)] transition">
                  <Phone className="w-4 h-4 text-[var(--gold)] group-hover:text-background" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">Appelez-nous</span>
                  <span className="block font-display text-2xl tracking-wider">0499 18 49 71</span>
                </span>
              </a>
              <a href="tel:0470556810" className="group flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full glass group-hover:bg-[var(--gold)] transition">
                  <Phone className="w-4 h-4 text-[var(--gold)] group-hover:text-background" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">Ou</span>
                  <span className="block font-display text-2xl tracking-wider">0470 55 68 10</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-muted-foreground/70 flex-col items-center gap-2">
          <span>Découvrir</span>
          <span className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* PRESTATIONS */}
      <Section id="prestations" eyebrow="Nos prestations" title={<>Un service <span className="gold-text">d'exception</span></>}>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Droplets, title: "Lavage extérieur complet", items: ["Lavage à la main", "Shampoing carrosserie", "Nettoyage des jantes", "Séchage soigné", "Finition brillante"] },
            { icon: Car,      title: "Nettoyage intérieur complet", items: ["Aspiration complète", "Nettoyage des plastiques", "Nettoyage des vitres", "Sièges et tapis", "Désodorisation"] },
            { icon: Sparkles, title: "Pack complet", items: ["Nettoyage intérieur complet", "Lavage extérieur complet", "Nettoyage des jantes", "Finition brillante"], popular: true },
          ].map(({ icon: Icon, title, items, popular }) => (
            <article key={title} className="relative glass rounded-2xl p-8 group hover:-translate-y-1 transition-transform duration-500">
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider text-background" style={{ background: "var(--gradient-gold)" }}>
                  ⭐ LE PLUS POPULAIRE
                </span>
              )}
              <div className="grid place-items-center w-14 h-14 rounded-xl mb-6 border border-[var(--gold)]/30" style={{ background: "rgba(201,168,106,0.08)" }}>
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h3 className="text-3xl font-display tracking-wider mb-5">{title}</h3>
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-4 h-4 text-[var(--gold)] mt-1 shrink-0" /> <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* TARIFS */}
      <Section id="tarifs" eyebrow="Tarification transparente" title={<>Nos <span className="gold-text">Tarifs</span></>}>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.keys(vehicleLabels) as Vehicle[]).map((v) => (
            <button
              key={v}
              onClick={() => setTarifsVehicle(v)}
              className={`px-5 py-3 rounded-lg text-sm uppercase tracking-widest transition-all border ${
                tarifsVehicle === v
                  ? "border-[var(--gold)] text-background shadow-[0_0_30px_-5px_rgba(201,168,106,0.6)]"
                  : "border-border text-muted-foreground hover:text-[var(--gold)] hover:border-[var(--gold)]/40"
              }`}
              style={tarifsVehicle === v ? { background: "var(--gradient-gold)" } : undefined}
            >
              {vehicleLabels[v]}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] text-center mb-6">Tarifs de base</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Lavage extérieur", price: pricing.ext[tarifsVehicle] },
              { label: "Lavage intérieur", price: pricing.int[tarifsVehicle] },
              { label: "Pack complet",     price: pricing.pack[tarifsVehicle], featured: true },
            ].map((p) => (
              <div key={p.label} className={`glass rounded-2xl p-8 text-center ${p.featured ? "ring-1 ring-[var(--gold)]/40" : ""}`}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{p.label}</div>
                <div className="font-display text-7xl text-foreground">
                  {p.price}<span className="gold-text text-5xl ml-2">€</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] text-center mb-6">Options & Packs</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((o) => (
              <div key={o.key} className="glass rounded-xl p-6 flex items-center justify-between gap-4">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">{o.label}</div>
                <div className="font-display text-3xl shrink-0">
                  {o.price[tarifsVehicle]}<span className="gold-text ml-1">€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DEVIS */}
      <Section id="devis" eyebrow="Devis en ligne" title={<>Calculez votre <span className="gold-text">devis</span></>}>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="glass rounded-2xl p-8 md:p-10 space-y-10">
            <Step n={1} label="Type de véhicule">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(vehicleLabels) as Vehicle[]).map((v) => (
                  <button key={v} onClick={() => setVehicle(v)}
                    className={`p-4 rounded-xl border text-left transition ${vehicle === v ? "border-[var(--gold)] bg-[var(--gold)]/5" : "border-border hover:border-[var(--gold)]/40"}`}>
                    <Car className={`w-6 h-6 mb-2 ${vehicle === v ? "text-[var(--gold)]" : "text-muted-foreground"}`} />
                    <span className="block text-sm font-medium">{vehicleLabels[v]}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={2} label="Prestation">
              <div className="grid sm:grid-cols-3 gap-3">
                {services.map((s) => (
                  <button key={s.key} onClick={() => setService(s.key)}
                    className={`p-4 rounded-xl border transition ${service === s.key ? "border-[var(--gold)] bg-[var(--gold)]/5" : "border-border hover:border-[var(--gold)]/40"}`}>
                    <div className="text-sm font-medium mb-1">{s.label}</div>
                    <div className="font-display text-2xl">{pricing[s.key][vehicle]}<span className="gold-text">€</span></div>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={3} label="Options supplémentaires">
              <div className="grid sm:grid-cols-2 gap-2">
                {options.map((o) => {
                  const on = extras.has(o.key);
                  return (
                    <button key={o.key} onClick={() => toggleExtra(o.key)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${on ? "border-[var(--gold)] bg-[var(--gold)]/5" : "border-border hover:border-[var(--gold)]/40"}`}>
                      <span className="flex items-center gap-3 text-sm">
                        <span className={`w-5 h-5 rounded grid place-items-center border ${on ? "bg-[var(--gold)] border-[var(--gold)]" : "border-border"}`}>
                          {on && <Check className="w-3 h-3 text-background" />}
                        </span>
                        {o.label}
                      </span>
                      <span className="font-display text-lg shrink-0">+{o.price[vehicle]}<span className="gold-text">€</span></span>
                    </button>
                  );
                })}
              </div>
            </Step>
          </div>

          <aside className="lg:sticky lg:top-28 self-start glass rounded-2xl p-8 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Votre estimation</div>
            <div className="font-display text-7xl md:text-8xl mb-2 leading-none">
              {total}<span className="gold-text">€</span>
            </div>
            <p className="text-xs text-muted-foreground mb-8">Ce devis est fourni à titre indicatif.</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-gold btn-gold-hover w-full justify-center">
              <MessageCircle className="w-4 h-4" /> Demander sur WhatsApp
            </a>
            <div className="mt-6 pt-6 border-t border-border space-y-1 text-sm text-muted-foreground">
              <div>Véhicule : <span className="text-foreground">{vehicleLabels[vehicle]}</span></div>
              <div>Prestation : <span className="text-foreground">{services.find(s => s.key === service)?.label}</span></div>
              {extras.size > 0 && <div>{extras.size} option{extras.size > 1 ? "s" : ""} sélectionnée{extras.size > 1 ? "s" : ""}</div>}
            </div>
          </aside>
        </div>
      </Section>

      {/* ZONE */}
      <Section id="zone" eyebrow="Zone d'intervention" title={<>Nous venons <span className="gold-text">chez vous</span></>}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="glass rounded-2xl p-6 md:p-10 relative overflow-hidden flex items-center justify-center">
            <img
              src={belgiumMap}
              alt="Carte de la Belgique avec les villes desservies : Liège, Verviers, Bruxelles, Namur, Charleroi, Mons"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>

          <div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Nous nous déplaçons partout en Belgique. Vous n'avez rien à faire,
              nous venons directement chez vous avec tout notre matériel professionnel.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Liège", "Verviers", "Bruxelles", "Namur", "Charleroi", "Mons", "Louvain", "Belgique entière"].map((z) => (
                <div key={z} className="glass rounded-lg px-4 py-3 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0" /> {z}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* POURQUOI */}
      <Section eyebrow="Pourquoi nous choisir" title={<>L'exigence du <span className="gold-text">détail</span></>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Wrench, t: "Matériel professionnel", d: "Produits haut de gamme." },
            { icon: Home, t: "Service à domicile", d: "Nous nous déplaçons où vous le souhaitez." },
            { icon: ShieldCheck, t: "Résultat garanti", d: "Finition irréprochable." },
            { icon: Clock, t: "Disponible 7j/7", d: "Réponse rapide via téléphone et WhatsApp." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="glass rounded-2xl p-8 text-center">
              <div className="mx-auto grid place-items-center w-14 h-14 rounded-xl mb-5 border border-[var(--gold)]/30" style={{ background: "rgba(201,168,106,0.08)" }}>
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h3 className="font-display text-2xl tracking-wider mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALERIE */}
      <Section id="galerie" eyebrow="Avant / Après" title={<>Notre <span className="gold-text">galerie</span></>}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[g1, g2, g3, g4, g5, g6].map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl group">
              <img src={src} alt={`Detailing automobile photo ${i + 1}`} loading="lazy" width={1024} height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://instagram.com/cleancardetailing" target="_blank" rel="noopener noreferrer" className="btn-outline-gold hover:bg-[var(--gold)] hover:text-background">
            <Instagram className="w-4 h-4" /> Voir plus sur Instagram @cleancardetailing
          </a>
        </div>
      </Section>

      {/* AVIS */}
      <Section id="avis" eyebrow="Témoignages" title={<>Avis <span className="gold-text">clients</span></>}>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Voiture comme neuve ! Travail rapide et impeccable.", a: "Thomas L.", c: "Liège" },
            { t: "Service à domicile extrêmement pratique.", a: "Sarah M.", c: "Verviers" },
            { t: "Résultat incroyable sur mon SUV.", a: "Kevin D.", c: "Bruxelles" },
          ].map((r) => (
            <figure key={r.a} className="glass rounded-2xl p-8">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />))}
              </div>
              <blockquote className="text-lg leading-relaxed mb-6">« {r.t} »</blockquote>
              <figcaption className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{r.a}</span> — {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Réservation" title={<>Prenez <span className="gold-text">contact</span></>}>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-10 space-y-8">
            <div>
              <h3 className="font-display text-3xl mb-4 tracking-wider">Informations</h3>
              <div className="space-y-3">
                <a href="tel:0499184971" className="flex items-center gap-3 hover:text-[var(--gold)] transition">
                  <Phone className="w-4 h-4 text-[var(--gold)]" /> <span className="font-display text-2xl tracking-wider">0499 18 49 71</span>
                </a>
                <a href="tel:0470556810" className="flex items-center gap-3 hover:text-[var(--gold)] transition">
                  <Phone className="w-4 h-4 text-[var(--gold)]" /> <span className="font-display text-2xl tracking-wider">0470 55 68 10</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-[var(--gold)]" /> Toute la Belgique — à domicile
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Suivez-nous</div>
              <div className="flex gap-3">
                {[{ I: Instagram, l: "Instagram" }, { I: Facebook, l: "Facebook" }, { I: Music2, l: "TikTok" }].map(({ I, l }) => (
                  <a key={l} href="#" aria-label={l} className="grid place-items-center w-11 h-11 rounded-full glass hover:bg-[var(--gold)] hover:text-background transition">
                    <I className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="glass rounded-2xl p-10 space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = whatsappLink; }}>
            <h3 className="font-display text-3xl mb-2 tracking-wider">Envoyez votre demande</h3>
            {[
              { name: "name", placeholder: "Nom complet", type: "text" },
              { name: "phone", placeholder: "Téléphone / WhatsApp", type: "tel" },
              { name: "vehicle", placeholder: "Type de véhicule", type: "text" },
              { name: "service", placeholder: "Prestation souhaitée", type: "text" },
              { name: "city", placeholder: "Ville / Code postal", type: "text" },
            ].map((f) => (
              <input key={f.name} {...f} required
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none transition" />
            ))}
            <textarea placeholder="Votre message" rows={4} required
              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none transition resize-none" />
            <button type="submit" className="btn-gold btn-gold-hover w-full justify-center">
              Envoyer ma demande <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative border-t border-border bg-[var(--anthracite)]/50 px-6 py-16">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid place-items-center w-10 h-10 rounded-md" style={{ background: "var(--gradient-gold)" }}>
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <div className="font-display text-xl tracking-wider">CLEAN CAR <span className="text-[var(--gold)]">DETAILING</span></div>
            </div>
            <p className="text-sm text-muted-foreground">Detailing automobile premium à domicile partout en Belgique.</p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            {["Prestations", "Tarifs", "Devis", "Zone", "Galerie", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-[var(--gold)] transition">{l}</a>
            ))}
          </nav>
          <div className="flex md:justify-end items-start gap-3">
            {[Instagram, Facebook, Music2].map((I, i) => (
              <a key={i} href="#" className="grid place-items-center w-10 h-10 rounded-full glass hover:bg-[var(--gold)] hover:text-background transition">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Clean Car Detailing — Service à domicile partout en Belgique</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--gold)]">Mentions légales</a>
            <a href="#" className="hover:text-[var(--gold)]">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Contactez-nous sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
        <span className="hidden md:inline-block px-4 py-2 rounded-full glass text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
          Contactez-nous sur WhatsApp
        </span>
        <span className="grid place-items-center w-14 h-14 rounded-full shadow-[0_10px_40px_-5px_rgba(201,168,106,0.6)] transition-transform hover:scale-110"
          style={{ background: "var(--gradient-gold)" }}>
          <MessageCircle className="w-6 h-6 text-background" />
        </span>
      </a>
    </div>
  );
}

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="grid place-items-center w-8 h-8 rounded-full border border-[var(--gold)] text-[var(--gold)] text-sm font-medium">{n}</span>
        <h3 className="font-display text-2xl tracking-wider">{label}</h3>
      </div>
      {children}
    </div>
  );
}
