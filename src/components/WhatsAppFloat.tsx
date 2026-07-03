import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    '✨ Bonjour Santé & Bien être ! Je souhaite avoir des informations sur vos produits.'
  );
  
  // Utilisation de wa.me qui fonctionne sur mobile et desktop
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Nous contacter sur WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30" />
        
        {/* Button */}
        <div className="relative flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline text-sm">WhatsApp</span>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Besoin d'aide ? Écrivez-nous !
        <div className="absolute top-full right-6 border-4 border-transparent border-t-gray-900" />
      </div>
    </a>
  );
}
