import { Leaf, Heart, ShieldCheck, Clock, Headphones } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref: sectionRef, isInView } = useInView();

  return (
    <section id="histoire" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header */}
          <div className={`transition-all duration-1000 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              À Propos de Nous
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Votre santé et
              <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                bien-être au naturel
              </span>
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              <strong className="text-green-700">Santé & Bien être</strong> est votre boutique de référence 
              à Bobo-Dioulasso pour tous vos produits naturels. Nous avons sélectionné avec soin les 
              meilleurs produits pour prendre soin de vous au quotidien.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Notre gamme comprend du <strong>maquillage</strong>, des <strong>parfums raffinés</strong>, 
              des <strong>savons</strong> et des <strong>compléments alimentaires</strong> de qualité. 
              Chaque produit est choisi pour ses bienfaits et sa composition naturelle.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Nous croyons que la beauté vient de l'intérieur et que prendre soin de soi devrait être 
              un plaisir quotidien avec des produits sains et efficaces.
            </p>
          </div>

          {/* Features cards */}
          <div className={`mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {[
              { icon: Leaf, title: '100% Naturel', desc: 'Produits naturels sélectionnés' },
              { icon: ShieldCheck, title: 'Qualité Garantie', desc: 'Produits de haute qualité' },
              { icon: Headphones, title: 'Service 24h/24', desc: 'Toujours à votre écoute' },
              { icon: Clock, title: 'Livraison Rapide', desc: 'À Bobo et environs' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-700 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105"
            >
              Découvrir nos produits
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-200 text-green-700 font-semibold rounded-full hover:bg-green-50 transition-all duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
