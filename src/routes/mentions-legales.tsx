import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Clean Car Detailing" },
      { name: "description", content: "Mentions légales de Clean Car Detailing, service de detailing automobile à domicile en Belgique." },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gold)] transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-10">Mentions légales</h1>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">1. Informations sur l'entreprise</h2>
          <p><strong>Nom de l'entreprise :</strong> Clean Car Detailing</p>
          <p><strong>Forme juridique :</strong> Personne physique</p>
          <p><strong>Numéro d'entreprise (BCE) :</strong> 1038.664.221</p>
          <p><strong>TVA :</strong> BE1038664221</p>
          <p><strong>Adresse du siège social :</strong><br />Rue Henri Pirenne 49, 4800 Verviers</p>
          <p><strong>Téléphone :</strong> <a href="tel:+32499184971" className="hover:text-[var(--gold)]">+32 499 18 49 71</a> / <a href="tel:+32470556810" className="hover:text-[var(--gold)]">+32 470 55 68 10</a></p>
          <p><strong>Email :</strong> <a href="mailto:cleancardetailing17@gmail.com" className="hover:text-[var(--gold)]">cleancardetailing17@gmail.com</a></p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">2. Responsable de publication</h2>
          <p><strong>Nom :</strong> Aïdan Yernaux</p>
          <p><strong>Responsable du site :</strong> Clean Car Detailing</p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">3. Hébergement du site</h2>
          <p><strong>Hébergeur :</strong> Vercel</p>
          <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)]">vercel.com</a></p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">4. Activité</h2>
          <p>Clean Car Detailing propose des services de nettoyage automobile à domicile en Belgique, incluant lavage extérieur, nettoyage intérieur et detailing complet.</p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">5. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu du site (textes, images, logo, design) est la propriété de Clean Car Detailing. Toute reproduction est interdite sans autorisation.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">6. Limitation de responsabilité</h2>
          <p>L'entreprise ne peut être tenue responsable des dommages directs ou indirects liés à l'utilisation du site.</p>
        </section>
      </article>
    </main>
  );
}
