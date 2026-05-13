export const defaultConfig = {
  name: "Sumayya",
  welcomeImage: "",
  welcomeHeading: "A Cutiepie was born today!",
  welcomeText: "Yes, it's YOU! A little surprise awaits...",
  balloonWords: ["You", "are", "my", "Cutie"],
  cards: [
    { id: 1, img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80", text: "That beautiful smile..." },
    { id: 2, img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80", text: "Our fun times!" },
    { id: 3, img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80", text: "Together forever <3" }
  ],
  letterText: "You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter. I hope your day is filled with laughter, surprises, and moments that make your heart happy."
};

export const getConfig = () => {
  const saved = localStorage.getItem('birthday_config');
  if (saved) {
    try {
      return { ...defaultConfig, ...JSON.parse(saved) };
    } catch (e) {
      return defaultConfig;
    }
  }
  return defaultConfig;
};

export const saveConfig = (config) => {
  localStorage.setItem('birthday_config', JSON.stringify(config));
};
