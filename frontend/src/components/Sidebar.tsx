import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Shield, 
  BarChart3, 
  Search, 
  Eye,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Addresses', href: '/addresses', icon: MapPin },
    { name: 'Entities', href: '/entities', icon: Users },
    { name: 'Investigations', href: '/investigations', icon: Shield },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Scraping', href: '/scraping', icon: Search },
    { name: 'Monitoring', href: '/monitoring', icon: Eye },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CryptoIntel</h1>
            <p className="text-xs text-slate-400">Analysis Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }
              `}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">SH</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">singhsourya137@gmail.com</p>
            <p className="text-xs text-slate-400">Analyst</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
