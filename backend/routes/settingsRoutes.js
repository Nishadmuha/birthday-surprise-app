import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.json(settings);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (settings) {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    } else {
      settings = await Settings.create(req.body);
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
