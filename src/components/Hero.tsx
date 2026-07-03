import { ArrowDown, Leaf, Star, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/accueil.jpg"
          alt="Parfum ARVEA - Santé & Bien-être Burkina Faso"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/40 to-teal-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-float animation-delay-400" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl animate-float animation-delay-800" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 animate-fade-in-up">
          <Leaf className="w-4 h-4 text-green-300" />
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Produits 100% Naturels
          </span>
          <Heart className="w-4 h-4 text-green-300" />
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up animation-delay-200">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
            Santé & Bien être
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl font-light mt-4 text-white/80">
            Votre beauté au naturel
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          Découvrez notre sélection de <strong className="text-green-300">maquillage</strong>, <strong className="text-green-300">parfums</strong>, <strong className="text-green-300">soins capillaires & corps</strong> et <strong className="text-green-300">compléments alimentaires</strong> naturels pour prendre soin de vous au quotidien.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
          <a
            href="#catalogue"
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Découvrir nos Produits
              <Leaf className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 animate-shimmer opacity-30" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/25 transition-all duration-300 hover:scale-105"
          >
            Nous Contacter
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up animation-delay-800">
          {[
            { value: '100%', label: 'Naturel' },
            { value: '500+', label: 'Clients' },
            { value: '4.9', label: 'Étoiles', icon: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </span>
                {stat.icon && <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />}
              </div>
              <span className="text-white/60 text-sm mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#histoire" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <span className="text-xs tracking-widest uppercase">Défiler</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
