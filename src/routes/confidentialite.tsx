import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Clean Car Detailing" },
      { name: "description", content: "Politique de confidentialité de Clean Car Detailing : collecte, utilisation et protection de vos données personnelles." },
    ],
  }),
  component: Confidentialite,
});

function Confidentialite() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gold)] transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-10">Politique de confidentialité</h1>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">1. Données collectées</h2>
          <p>Nous collectons uniquement les données suivantes via le formulaire de contact :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Nom</li>
            <li>Numéro de téléphone</li>
            <li>Email (si fourni)</li>
            <li>Informations sur le véhicule et la demande</li>
          </ul>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">2. Utilisation des données</h2>
          <p>Ces données sont utilisées uniquement pour :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Répondre aux demandes de devis</li>
            <li>Contacter le client</li>
            <li>Fournir le service demandé</li>
          </ul>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">3. Stockage des données</h2>
          <p>Les données ne sont pas revendues et sont conservées uniquement le temps nécessaire au traitement de la demande.</p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">4. Droits de l'utilisateur</h2>
          <p>Conformément au RGPD, vous pouvez demander :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>l'accès à vos données</li>
            <li>la modification</li>
            <li>la suppression</li>
          </ul>
          <p>Contact : <a href="mailto:cleancardetailing17@gmail.com" className="hover:text-[var(--gold)]">cleancardetailing17@gmail.com</a></p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-wider text-[var(--gold)]">5. Cookies</h2>
          <p>Le site peut utiliser des cookies pour améliorer l'expérience utilisateur et mesurer l'audience.</p>
        </section>
      </article>
    </main>
  );
}
