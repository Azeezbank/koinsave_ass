import prisma from "../prismaClient.js";
export const depositMoney = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        const amt = Number(amount);
        if (amt <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }
        // Update user balance atomically
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                balance: { increment: amt },
            },
        });
        return res.status(200).json({
            success: true,
            message: `Successfully deposited ${amt}`,
            data: {
                id: user.id,
                balance: user.balance,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
