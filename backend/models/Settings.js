import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  name: String,
  welcomeHeading: String,
  welcomeText: String,
  welcomeImage: String,
  balloonWords: [String],
  letterText: String,

  cards: [
    {
      id: Number,
      img: String,
      text: String,
    },
  ],
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
