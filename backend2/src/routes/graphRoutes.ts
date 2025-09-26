// routes/graphRoutes.ts
import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get("/graph-data", async (req, res) => {
    const inputAddress = req.query.address as string;

    if (!inputAddress) {
        return res.status(400).json({ error: "Address query parameter is required" });
    }

    const mainAddress = await prisma.address.findUnique({
        where: { address: inputAddress.toLowerCase() },
        include: {
            transactionsFrom: {
                include: { toAddress: true }
            },
            transactionsTo: {
                include: { fromAddress: true }
            }
        }
    });

    if (!mainAddress) {
        return res.status(404).json({ error: "Address not found in database" });
    }

    // Create nodes: main address + all connected addresses (from and to)
    const relatedAddresses = new Map<string, any>();

    // Add main address as node
    relatedAddresses.set(mainAddress.address, {
        id: mainAddress.address,
        data: { label: mainAddress.address },
        position: { x: Math.random() * 600, y: Math.random() * 400 }
    });

    // Add "to" addresses from outgoing txs
    for (const tx of mainAddress.transactionsFrom) {
        relatedAddresses.set(tx.toAddress.address, {
            id: tx.toAddress.address,
            data: { label: tx.toAddress.address },
            position: { x: Math.random() * 600, y: Math.random() * 400 }
        });
    }

    // Add "from" addresses from incoming txs
    for (const tx of mainAddress.transactionsTo) {
        relatedAddresses.set(tx.fromAddress.address, {
            id: tx.fromAddress.address,
            data: { label: tx.fromAddress.address },
            position: { x: Math.random() * 600, y: Math.random() * 400 }
        });
    }

    // Create edges
    const edges = [];

    for (const tx of mainAddress.transactionsFrom) {
        edges.push({
            id: `tx-${tx.id}`,
            source: mainAddress.address,
            target: tx.toAddress.address,
            label: `${tx.value} ETH`,
        });
    }

    for (const tx of mainAddress.transactionsTo) {
        edges.push({
            id: `tx-${tx.id}`,
            source: tx.fromAddress.address,
            target: mainAddress.address,
            label: `${tx.value} ETH`,
        });
    }

    res.json({
        nodes: Array.from(relatedAddresses.values()),
        edges,
    });
});

export default router;
