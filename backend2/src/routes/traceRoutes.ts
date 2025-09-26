// routes/traceRoutes.ts
import express from "express";
import { saveTransactions } from "../etherscan";

const router = express.Router();

router.post("/trace", async (req, res) => {
    const { address } = req.body;
    try {
        await saveTransactions(address);
        res.json({ message: "Transactions saved!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to trace transactions" });
    }
});

export default router;