import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// router.use("/bookings", bookingRouter);
// router.use("/traders", traderRouter);
// router.use("/payments", paymentsRouter);
// router.use("/channels/whatsapp", whatsappRouter);
// router.use("/channels/webchat", webchatRouter);

export default router;