import { Leaf, Heart, ArrowUp, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

const footerLinks = {
  'Navigation': [
    { label: 'Accueil', href: '#accueil' },
    { label: 'À Propos', href: '#histoire' },
    { label: 'Catalogue', href: '#catalogue' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ],
  'Catégories': [
    { label: 'Soins Visage', href: '#catalogue' },
    { label: 'Soins Corps', href: '#catalogue' },
    { label: 'Maquillage', href: '#catalogue' },
    { label: 'Parfums', href: '#catalogue' },
    { label: 'Compléments Alimentaires', href: '#catalogue' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lien WhatsApp
  const whatsappMessage = encodeURIComponent('Bonjour Santé & Bien être ! Je souhaite passer une commande.');
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-green-950 text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400" />

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-800/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-bold tracking-wide">Santé & Bien être</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Votre boutique de produits naturels à Bobo-Dioulasso. Maquillage, parfums, savons artisanaux et compléments alimentaires pour votre bien-être au quotidien.
            </p>
            
            {/* Contact info in footer */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+226 70 27 48 66 / 79 35 27 34</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span>Zoenabo.simpore@yahoo.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                <span>787 Rue Demegnongon Koné, Bobo-Dioulasso, Burkina Faso</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-green-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="py-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-serif font-bold text-white">Commandez facilement via WhatsApp</h4>
              <p className="text-gray-400 text-sm mt-1">Service client disponible 24h/24 pour vous accompagner.</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all text-sm hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Contacter sur WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © 2026 Santé & Bien être. Tous droits réservés.
            <Heart className="w-3.5 h-3.5 text-green-500 fill-green-500" />
            Burkina Faso
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-green-600 text-gray-400 hover:text-white transition-all group"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
