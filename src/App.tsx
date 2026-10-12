import Navbar from './components/Navbar';
import Catalogue from './components/Catalogue';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Catalogue />
      <Footer />
    </div>
  );
}
