import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    name: 'Aminata Ouédraogo',
    location: 'Bobo-Dioulasso, Burkina Faso',
    avatar: '👩🏾',
    rating: 5,
    text: "Le Sérum visage hydra-deep a littéralement transformé ma peau ! En seulement 2 semaines, mon teint est devenu plus lumineux et unifié. Je recommande à 100% !",
    product: 'Sérum hydra-deep',
  },
  {
    name: 'Fatou Traoré',
    location: 'Ouagadougou, Burkina Faso',
    avatar: '👩🏾',
    rating: 5,
    text: "J'ai essayé beaucoup de crèmes hydratantes, mais la Crème de jour hydratante à l’Aloe. apaise, Ma peau est douce comme de la soie et l'odeur est divine.",
    product: 'Crème de jour hydratante',
  },
  {
    name: 'Mariam Sanogo',
    location: 'Bobo-Dioulasso, Burkina Faso',
    avatar: '👩🏾',
    rating: 5,
    text: "La crème miracle est un vrai bijou ! L'éclat qu'elle donne à la peau est incroyable. Je l'utilise matin et soir, c'est devenu mon rituel beauté.",
    product: 'crème miracle',
  },
  {
    name: 'Aïcha Diallo',
    location: 'Banfora, Burkina Faso',
    avatar: '👩🏾',
    rating: 5,
    text: "Le parfum insolite est envoûtant ! Je reçois des compliments à chaque fois que je le porte. Sa tenue est exceptionnelle, il dure toute la journée.",
    product: 'Eau de Parfum insolite',
  },
  {
    name: 'Kadiatou Konaté',
    location: 'Bobo-Dioulasso, Burkina Faso',
    avatar: '👩🏾',
    rating: 5,
    text: "Le Coffret harem est le cadeau parfait ! Ma mère était ravie. La qualité des produits est au rendez-vous, un emballage magnifique.",
    product: 'Coffret harem',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isInView } = useInView();

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="temoignages" className="relative py-20 md:py-32 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-green-200 text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
            Nos clientes nous font
            <span className="block bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="relative glass rounded-3xl p-8 md:p-12">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-green-300/30" />

            <div className="relative">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-white/90 font-light leading-relaxed italic">
                "{testimonials[activeIndex].text}"
              </blockquote>

              {/* Product mention */}
              <p className="mt-4 text-sm text-green-300">
                À propos de : <span className="font-semibold">{testimonials[activeIndex].product}</span>
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-2xl">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-green-300 text-sm">
                    {testimonials[activeIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 h-3 bg-gradient-to-r from-green-400 to-emerald-500'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Voir témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
