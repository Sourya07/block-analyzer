// etherscanService.ts
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const prisma = new PrismaClient();

export async function fetchTransactions(address: string) {
    const res = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
    );
    console.log(res.data.result)
    return res.data.result;

}

export async function saveTransactions(address: string, depth = 1, maxDepth = 2) {
    if (depth > maxDepth) return;

    const txs = await fetchTransactions(address);

    for (const tx of txs) {
        const fromAddr = await prisma.address.upsert({
            where: { address: tx.from },
            update: {},
            create: { address: tx.from },
        });

        const toAddr = await prisma.address.upsert({
            where: { address: tx.to },
            update: {},
            create: { address: tx.to },
        });

        await prisma.transaction.create({
            data: {
                fromId: fromAddr.id,
                toId: toAddr.id,
                value: parseFloat(tx.value) / 1e18,
                timestamp: new Date(parseInt(tx.timeStamp) * 1000),
                chain: "ethereum",
            },
        });

        await saveTransactions(tx.to, depth + 1, maxDepth);
    }
}