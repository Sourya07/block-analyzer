import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AlertTriangle, Mail, Phone, User } from "lucide-react"; // icons

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

// Map network names to logos
const networkLogos: Record<string, string> = {
    eth: "https://t4.ftcdn.net/jpg/02/20/82/37/240_F_220823745_LdWP6XNZkeNMifrl7a9aKUfCUZpRGRnS.jpg",
    btc: "https://t4.ftcdn.net/jpg/02/20/82/37/240_F_220823745_LdWP6XNZkeNMifrl7a9aKUfCUZpRGRnS.jpg",
    usdt: "https://t4.ftcdn.net/jpg/02/20/82/37/240_F_220823745_LdWP6XNZkeNMifrl7a9aKUfCUZpRGRnS.jpg",
    usdc: "https://t4.ftcdn.net/jpg/02/20/82/37/240_F_220823745_LdWP6XNZkeNMifrl7a9aKUfCUZpRGRnS.jpg",
};

const Highrisk: React.FC = () => {
    const [reports, setReports] = useState<ScamReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get("http://localhost:3000/scam-reports");
                const filtered = res.data.reports.filter(
                    (r: ScamReport) => r.reportCount > 100
                );
                setReports(filtered);
            } catch (err: any) {
                console.error("Failed to fetch scam reports:", err);
                setError("Failed to fetch scam reports");
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
            <h2 className="text-2xl font-bold text-white">🚨 High-Risk Cryptocurrency Addresses</h2>

            {reports.length === 0 ? (
                <p className="text-slate-400">No reports above 100 found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => {
                        const logo =
                            networkLogos[report.network] ||
                            "https://cryptologos.cc/logos/generic-crypto-logo.png";
                        console.log(report.network + logo)
                        return (
                            <div
                                key={report.id}
                                className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:shadow-lg transition-shadow"
                            >
                                <Link
                                    to="/addressgraph"
                                    className="block bg-slate-900 rounded-lg p-5 border border-slate-700 hover:border-slate-500 transition-colors"
                                >
                                    {/* Header: network logo + name */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={logo}
                                            alt={report.network}
                                            className="w-7 h-7 rounded-full border border-slate-600"
                                        />
                                        <span className="text-white font-semibold capitalize">
                                            {report.network}
                                        </span>
                                    </div>

                                    {/* Address */}
                                    <p className="text-white font-mono text-sm break-words">
                                        {report.address}
                                    </p>

                                    {/* Report count with icon */}
                                    <div className="flex items-center gap-2 text-red-500 mt-2 font-semibold">
                                        <AlertTriangle size={16} />
                                        <span>{report.reportCount} reports</span>
                                    </div>

                                    {/* Last reported */}
                                    <p className="text-slate-400 mt-1 text-sm">
                                        Last Reported:{" "}
                                        {new Date(report.lastReported).toLocaleDateString()}
                                    </p>

                                    {/* Optional info */}
                                    {report.username && (
                                        <p className="text-slate-400 mt-1 flex items-center gap-1 text-sm">
                                            <User size={14} /> {report.username}
                                        </p>
                                    )}
                                    {report.email && (
                                        <p className="text-slate-400 mt-1 flex items-center gap-1 text-sm">
                                            <Mail size={14} /> {report.email}
                                        </p>
                                    )}
                                    {report.phoneNumber && (
                                        <p className="text-slate-400 mt-1 flex items-center gap-1 text-sm">
                                            <Phone size={14} /> {report.phoneNumber}
                                        </p>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Highrisk;