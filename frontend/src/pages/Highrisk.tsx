import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ScamReport {
    id: string;
    address: string;
    network: string;
    reportCount: number;
    lastReported: string;
    username: string | null;
    phoneNumber: string | null;
    email: string | null;
}

const Highrisk: React.FC = () => {
    const [reports, setReports] = useState<ScamReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('http://localhost:3000/scam-reports');
                // Filter only reports with reportCount > 100
                const filtered = res.data.reports.filter(
                    (r: ScamReport) => r.reportCount > 100
                );
                setReports(filtered);
            } catch (err: any) {
                console.error('Failed to fetch scam reports:', err);
                setError('Failed to fetch scam reports');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">High-Risk Cryptocurrency highrisk</h2>
            {reports.length === 0 ? (
                <p className="text-slate-400">No reports above 100 found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {reports.map((report) => (
                        <div

                            key={report.id}
                            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:shadow-lg transition-shadow"
                        >
                            <Link
                                to="/addressgraph"
                                className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg transition-shadow"
                            >
                                <p className="text-white font-mono break-words">{report.address}</p>
                                <p className="text-slate-400 mt-1">
                                    Network: {report.network.toUpperCase()}
                                </p>
                                <p className="text-slate-400 mt-1">
                                    Reports: {report.reportCount}
                                </p>
                                <p className="text-slate-400 mt-1">
                                    Last Reported: {new Date(report.lastReported).toLocaleDateString()}
                                </p>
                                {report.username && (
                                    <p className="text-slate-400 mt-1">Username: {report.username}</p>
                                )}
                                {report.email && (
                                    <p className="text-slate-400 mt-1">Email: {report.email}</p>
                                )}
                                {report.phoneNumber && (
                                    <p className="text-slate-400 mt-1">Phone: {report.phoneNumber}</p>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Highrisk;