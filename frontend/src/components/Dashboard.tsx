import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Globe, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScamReport {
  id: string;
  address: string;
  network: string;
  reportCount: number;
  lastReported: string;
}

interface DashboardData {
  metrics: {
    totalAddresses: { value: number; change: string; trend: string };
    highRisk: { value: number; change: string; trend: string };
    activeInvestigations: { value: number; change: string; trend: string };
    volumeTracked: { value: number; formatted: string; change: string; trend: string };
  };
  globalThreatDistribution: Array<{ country: string; addresses: number; riskLevel: string }>;
  riskCategories: Array<{ category: string; count: number }>;
  recentAddresses: ScamReport[];
}

const mockDashboardData: DashboardData = {
  metrics: {
    totalAddresses: { value: 0, change: '+0%', trend: 'up' },
    highRisk: { value: 0, change: '+0%', trend: 'up' },
    activeInvestigations: { value: 89, change: '+5.7%', trend: 'up' },
    volumeTracked: { value: 2400000, formatted: '$2.4M', change: '+18.2%', trend: 'up' }
  },
  globalThreatDistribution: [
    { country: 'Russia', addresses: 234, riskLevel: 'high' },
    { country: 'North Korea', addresses: 156, riskLevel: 'critical' },
    { country: 'China', addresses: 89, riskLevel: 'medium' },
    { country: 'Iran', addresses: 67, riskLevel: 'high' },
    { country: 'Unknown', addresses: 445, riskLevel: 'critical' }
  ],
  riskCategories: [
    { category: 'Money Laundering', count: 450 },
    { category: 'Drug Trafficking', count: 230 },
    { category: 'Terrorism', count: 120 },
    { category: 'Fraud', count: 580 },
    { category: 'Ransomware', count: 150 }
  ],
  recentAddresses: []
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(mockDashboardData);

  const riskLevelColors = {
    critical: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#10b981'
  };

  const chartData = dashboardData.riskCategories.map(item => ({
    name: item.category.replace(' ', '\n'),
    value: item.count
  }));
  // Fetch scam reports from backend
  useEffect(() => {
    const fetchScamReports = async () => {
      try {
        const res = await axios.get(' http://localhost:3000/scam-reports');
        const reports: ScamReport[] = res.data.reports;
        console.log(res.data)


        const totalReports = res.data.totalReports;
        const highRiskCount = reports.filter(r => r.reportCount > 100).length;

        setDashboardData(prev => ({
          ...prev,
          metrics: {
            ...prev.metrics,
            totalAddresses: { ...prev.metrics.totalAddresses, value: totalReports },
            highRisk: { ...prev.metrics.highRisk, value: highRiskCount }
          },
          recentAddresses: reports.slice(0, 5) // latest 5 addresses
        }));
      } catch (err) {
        console.error('Failed to fetch scam reports:', err);
      }
    };

    fetchScamReports();
  }, []);

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Addresses */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Addresses</p>
              <p className="text-3xl font-bold text-white mt-2">{dashboardData.metrics.totalAddresses.value.toLocaleString()}</p>
              <p className="text-green-400 text-sm mt-1">{dashboardData.metrics.totalAddresses.change} from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* High Risk */}
        <div className="">
          <Link
            to="/highrisk"
            className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">High Risk</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {dashboardData.metrics.highRisk.value.toLocaleString()}
                </p>
                <p className="text-orange-400 text-sm mt-1">
                  {dashboardData.metrics.highRisk.change} from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </Link>
        </div>

        {/* Active Investigations */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Investigations</p>
              <p className="text-3xl font-bold text-white mt-2">{dashboardData.metrics.activeInvestigations.value}</p>
              <p className="text-green-400 text-sm mt-1">{dashboardData.metrics.activeInvestigations.change} from last month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Volume Tracked */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Volume Tracked</p>
              <p className="text-3xl font-bold text-white mt-2">{dashboardData.metrics.volumeTracked.formatted}</p>
              <p className="text-green-400 text-sm mt-1">{dashboardData.metrics.volumeTracked.change} from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Global Threat Distribution & Risk Categories Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Global Threat Distribution</h3>
            </div>
            <div className="space-y-4">
              {dashboardData.globalThreatDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: riskLevelColors[item.riskLevel as keyof typeof riskLevelColors] }}></div>
                    <span className="text-slate-300">{item.country}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-medium">{item.addresses} addresses</span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${item.riskLevel === 'critical' ? 'bg-red-900 text-red-300' :
                      item.riskLevel === 'high' ? 'bg-orange-900 text-orange-300' :
                        'bg-blue-900 text-blue-300'
                      }`}>
                      {item.riskLevel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Categories Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Risk Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Addresses</h3>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-4">
            {dashboardData.recentAddresses.map(addr => (
              <div key={addr.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-mono text-sm">{addr.address}</p>
                  <p className="text-slate-400 text-sm mt-1">{addr.network}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">{addr.reportCount}%</span>
                  <div className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs font-medium">
                    active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Investigations */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Active Investigations</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No active investigations</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Create Investigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;