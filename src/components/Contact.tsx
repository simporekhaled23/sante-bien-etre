import { useState, type FormEvent } from 'react';
import { Send, MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { WHATSAPP_NUMBER } from '../data/products';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// XSS sanitizer
function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export default function Contact() {
  const { ref, isInView } = useInView();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères.';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Le sujet doit contenir au moins 3 caractères.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const sanitized = sanitize(value);
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  // Lien WhatsApp avec wa.me
  const whatsappMessage = encodeURIComponent('Bonjour Santé & Bien être ! Je souhaite avoir des informations sur vos produits.');
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const contactInfo = [
    { icon: MapPin, label: '787 Rue Demegnongon Koné, Bobo-Dioulasso, Burkina Faso', href: undefined },
    { icon: Phone, label: '+226 70 27 48 66 / 79 35 27 34', href: 'tel:+22670274866' },
    { icon: Mail, label: 'Zoenabo.simpore@yahoo.com', href: 'mailto:Zoenabo.simpore@yahoo.com' },
    { icon: Clock, label: 'Lun-Ven : 9h-18h | Sam : 10h-17h', href: undefined },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Contact
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            Restons en
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              contact
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Une question ? Besoin d'un conseil ? Notre équipe est à votre écoute 24h/24.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-serif font-bold mb-2">Santé & Bien être</h3>
              <p className="text-green-200 text-sm mb-8">
                Votre boutique de produits naturels à Bobo-Dioulasso. Nous sommes là pour vous conseiller et répondre à toutes vos questions.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-green-200" />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white/80 hover:text-white transition-colors text-sm leading-relaxed mt-2"
                      >
                        {info.label}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm leading-relaxed mt-2">{info.label}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* WhatsApp section */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-sm text-green-200 mb-4">Commander via WhatsApp</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 rounded-full text-white font-semibold transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  +226 70 27 48 66
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              {submitted && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    maxLength={100}
                    placeholder="Votre nom"
                    className={`w-full px-4 py-3.5 rounded-xl border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-300 focus:ring-rose-300 bg-rose-50/50'
                        : 'border-gray-200 focus:ring-green-400 focus:border-transparent'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    maxLength={200}
                    placeholder="votre@email.com"
                    className={`w-full px-4 py-3.5 rounded-xl border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-300 focus:ring-rose-300 bg-rose-50/50'
                        : 'border-gray-200 focus:ring-green-400 focus:border-transparent'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    maxLength={200}
                    placeholder="Objet de votre message"
                    className={`w-full px-4 py-3.5 rounded-xl border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.subject
                        ? 'border-rose-300 focus:ring-rose-300 bg-rose-50/50'
                        : 'border-gray-200 focus:ring-green-400 focus:border-transparent'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    maxLength={2000}
                    rows={5}
                    placeholder="Votre message..."
                    className={`w-full px-4 py-3.5 rounded-xl border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? 'border-rose-300 focus:ring-rose-300 bg-rose-50/50'
                        : 'border-gray-200 focus:ring-green-400 focus:border-transparent'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-300/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
