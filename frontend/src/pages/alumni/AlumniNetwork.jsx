import { useState, useEffect } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { getCurrentUser } from "../../utils/auth";
import { 
  Users, GraduationCap
} from "lucide-react";

const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

export default function AlumniNetwork() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('network');

  useEffect(() => {
    // Dynamically load the WidgetBot HTML embed script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/html-embed';
    script.async = true;
    script.defer = true;
    
    document.body.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    <div className="min-h-screen mobile-scroll-container" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Networking Hub</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Connect with students, offer mentorship, and engage with the alumni community through our Discord platform.
          </p>
        </div>

        {/* Discord Widget Integration */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Community Chat</h2>
          <p className="text-slate-600 mb-4">Connect with students, offer mentorship, and participate in alumni discussions through our Discord community.</p>
          
          {/* Discord Widget */}
          <div className="rounded-lg overflow-hidden">
            <widgetbot
              server="1420060670828744877"
              channel="1420060672045355010"
              width="1170"
              height="600"
            ></widgetbot>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
      </main>
    </div>
  );
}