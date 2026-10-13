import { Leaf, ArrowUp, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent('Bonjour Santé & Bien être ! Je souhaite passer une commande.');
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <footer className="bg-[#F5EFE6] text-black border-t border-[#E6DCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-serif font-bold tracking-wide">Santé & Bien être</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Votre boutique de produits naturels à Bobo-Dioulasso.
            </p>
          </div>

          {/* Coordonnées + WhatsApp */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+226 70 27 48 66 / 79 35 27 34</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="break-all">Zoenabo.simpore@yahoo.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>787 Rue Demegnongon Koné, Bobo-Dioulasso, Burkina Faso</span>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-medium uppercase tracking-wide rounded-md hover:bg-gray-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contacter sur WhatsApp
            </a>
          </div>
        </div>

        {/* Bas */}
        <div className="py-4 border-t border-[#E6DCCB] flex items-center justify-between gap-4">
          <p className="text-xs">© 2026 Santé & Bien être. Tous droits réservés.</p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-black/5 hover:bg-black hover:text-white transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
