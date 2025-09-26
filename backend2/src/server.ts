import express from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import traceRoutes from "./routes/traceRoutes";
import graphRoutes from "./routes/graphRoutes";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.CHECK_CRYPTO_API_KEY;

interface WalletNetwork {
    symbol: string;
}

interface ScamReportAPI {
    address: string;
    reportCount: string;
    lastReported: string;
    walletNetwork: WalletNetwork;
    username?: string;
    phoneNumber?: string;
    email?: string;
}


app.use("/api", traceRoutes);
app.use("/api", graphRoutes);
// Fetch up to 10 pages
const fetchScamReports = async (maxPages: number) => {
    let allReports: ScamReportAPI[] = [];

    for (let page = 1; page <= maxPages; page++) {
        try {
            const response = await axios.get<{ data: ScamReportAPI[] }>(
                `https://api.checkcryptoaddress.com/scam-reports?page=${page}&search=`,
                { headers: { 'X-Api-Key': API_KEY } }
            );

            const data = response.data.data;

            if (!data || data.length === 0) {
                console.log(`No data on page ${page}, stopping.`);
                break;
            }

            allReports = allReports.concat(data);
            console.log(`Fetched page ${page}, total reports: ${allReports.length}`);

        } catch (err: any) {
            console.error(`Failed to fetch page ${page}:`, err.message);
            break;
        }
    }

    return allReports;
};

app.post('/store-scam-reports', async (req, res) => {
    try {
        const reports = await fetchScamReports(2);

        let insertedCount = 0;

        for (const report of reports) {
            try {
                const existing = await prisma.scamReport.findFirst({
                    where: {
                        address: report.address,
                        network: report.walletNetwork.symbol,
                    },
                });

                if (!existing) {
                    await prisma.scamReport.create({
                        data: {
                            address: report.address,
                            network: report.walletNetwork.symbol,
                            reportCount: parseInt(report.reportCount) || 0,
                            lastReported: report.lastReported ? new Date(report.lastReported) : new Date(),
                            username: report.username || null,
                            phoneNumber: report.phoneNumber || null,
                            email: report.email || null,
                        },
                    });
                    insertedCount++;
                }
            } catch (dbErr: any) {
                console.error(`Failed to insert ${report.address}:`, dbErr.message);
            }
        }

        res.json({ message: 'Scam reports stored successfully', insertedCount });
    } catch (err: any) {
        console.error('Failed to fetch or store data:', err.message);
        res.status(500).json({ error: 'Failed to fetch or store data', details: err.message });
    }
});
app.get('/scam-reports', async (req, res) => {
    try {
        // Optional: support query parameters for pagination
        // const page = parseInt(req.query.page as string) || 1;
        // const limit = parseInt(req.query.limit as string) || 20;
        // const skip = (page - 1) * limit;

        const totalReports = await prisma.scamReport.count();
        const reports = await prisma.scamReport.findMany({
            // skip,
            // take: limit,
            orderBy: { lastReported: 'desc' }, // latest reports first
        });

        res.json({
            // page,
            // limit,
            totalReports,
            // totalPages: Math.ceil(totalReports / limit),
            reports,
        });
    } catch (err: any) {
        console.error('Failed to fetch scam reports:', err.message);
        res.status(500).json({ error: 'Failed to fetch scam reports', details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));