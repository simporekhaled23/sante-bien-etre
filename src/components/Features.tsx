import { Headphones, Shield, Leaf, Truck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Headphones,
    title: 'Service Client 24h/24',
    description: 'Notre équipe est disponible à tout moment pour vous accompagner',
  },
  {
    icon: Shield,
    title: 'Données Sécurisées',
    description: 'Vos informations personnelles sont protégées et confidentielles',
  },
  {
    icon: Leaf,
    title: 'Produits Naturels',
    description: 'Des ingrédients 100% naturels pour votre santé et bien-être',
  },
  {
    icon: Truck,
    title: 'Livraison Rapide',
    description: 'Livraison disponible à Bobo-Dioulasso et environs',
  },
];

export default function Features() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-14 bg-gradient-to-r from-green-50 via-emerald-50/50 to-green-50 border-y border-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center text-center p-4 transition-all duration-700 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-green-100 flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
