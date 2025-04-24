import { Router } from "express";
import { ticketDao } from "../persistence/mongo/dao/ticket.dao.js";
import mongoose from "mongoose";

const router = Router();

// Obtener todos los tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketDao.getAll();
    res.status(200).json({ status: "ok", tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Obtener un ticket por ID
router.get("/:id", async (req, res) => {
  try {
    const objectId = mongoose.Types.ObjectId.isValid(req.params.id)
      ? new mongoose.Types.ObjectId(req.params.id)
      : null;
    if (!objectId) return res.status(400).json({ status: "Error", msg: "ID inválido" });

    const ticket = await ticketDao.getOne({ _id: objectId });
    if (!ticket) return res.status(404).json({ status: "Error", msg: "Ticket no encontrado" });
    res.status(200).json({ status: "ok", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

export default router;
