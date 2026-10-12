import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Catalogue from './components/Catalogue';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Catalogue />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
