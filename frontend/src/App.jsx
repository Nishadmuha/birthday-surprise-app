import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Cake as CakeIcon, Gift, Mail, Heart, Sparkles, Star } from 'lucide-react';
import { defaultConfig } from './config';
import API from './services/api';

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const floatingBalloonAnimation = (delay) => ({
  y: [0, -20, 0],
  x: [0, (Math.random() - 0.5) * 10, 0],
  transition: {
    duration: 3 + Math.random() * 2,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay
  }
});

function Scene1Countdown({ onNext }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onNext(), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onNext]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        key={count}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]"
      >
        {count}
      </motion.h1>
      <p className="mt-8 text-2xl font-serif italic text-pink-300 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)] text-center px-4">
        Crafting your special moment...
      </p>
    </motion.div>
  );
}

function Scene2Welcome({ onNext, config }) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div animate={floatingAnimation} className="mb-8 relative">
        {config?.welcomeImage ? (
          <img src={config.welcomeImage} alt="Welcome" className="w-40 h-40 object-cover rounded-full shadow-[0_0_40px_rgba(255,0,255,0.6)] border-4 border-pink-300" />
        ) : (
          <div className="w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,0,255,0.6)] border-4 border-pink-300">
            <span className="text-6xl">🐻</span>
          </div>
        )}
        <Sparkles className="absolute top-0 right-0 text-yellow-300 animate-pulse" size={32} />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        {config?.welcomeHeading || "A Cutiepie was born today!"}
      </h2>
      <p className="text-xl text-purple-200 mb-12">
        {config?.welcomeText || "Yes, it's YOU! A little surprise awaits..."}
      </p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 105, 180, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold text-xl shadow-[0_0_15px_rgba(255,0,255,0.5)] border border-pink-300"
      >
        Start the surprise
      </motion.button>
    </motion.div>
  );
}

function Scene3Cake({ onNext }) {
  const [step, setStep] = useState(0);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
    >
      {step === 2 && <Confetti recycle={false} numberOfPieces={500} gravity={0.15} />}
      
      <motion.div animate={floatingAnimation} className="mb-12 relative h-64 w-64 flex items-center justify-center">
        <div className="relative">
          <CakeIcon size={160} color={step > 0 ? "#ff69b4" : "#ffffff"} className="drop-shadow-[0_0_20px_rgba(255,105,180,0.6)] transition-colors duration-1000" />
          
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-1/2 flex flex-wrap justify-around px-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ y: -20, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ delay: i * 0.05 }}
                      className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-yellow-300' : 'bg-blue-300'}`} 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="absolute top-[-30px] left-1/2 transform -translate-x-1/2"
              >
                <div className="w-4 h-8 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,0,0.8)]"></div>
                <div className="w-2 h-4 bg-orange-300 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {step === 0 && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(1)}
          className="px-8 py-4 bg-pink-500 rounded-full text-white font-bold text-xl shadow-[0_0_15px_rgba(255,105,180,0.8)]"
        >
          Decorate
        </motion.button>
      )}
      {step === 1 && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(2)}
          className="px-8 py-4 bg-purple-500 rounded-full text-white font-bold text-xl shadow-[0_0_15px_rgba(157,0,255,0.8)]"
        >
          Light the Candle
        </motion.button>
      )}
      {step === 2 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-white font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        >
          Pop the Balloons -&gt;
        </motion.button>
      )}
    </motion.div>
  );
}

function Scene4Balloons({ onNext, config }) {
  const [popped, setPopped] = useState([false, false, false, false]);
  const words = config.balloonWords || ["You", "are", "my", "Cutie"];
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

  const handlePop = (index) => {
    const newPopped = [...popped];
    newPopped[index] = true;
    setPopped(newPopped);
  };

  const allPopped = popped.every(Boolean);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-center text-pink-300 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)] mb-16">
        Pop all 4 balloons
      </h2>

      <div className="flex justify-around w-full max-w-md h-64 relative">
        {words.map((word, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <motion.div 
              className={`absolute top-1/2 transform -translate-y-1/2 text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] ${popped[index] ? 'opacity-100' : 'opacity-0'}`}
              initial={{ scale: 0.5 }}
              animate={popped[index] ? { scale: 1, rotate: [-10, 10, 0] } : {}}
            >
              {word}
            </motion.div>

            <AnimatePresence>
              {!popped[index] && (
                <motion.div
                  animate={floatingBalloonAnimation(index * 0.2)}
                  exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.2 } }}
                  onClick={() => handlePop(index)}
                  className="cursor-pointer flex flex-col items-center z-10"
                >
                  <div className={`w-16 h-20 rounded-full ${colors[index]} shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),_0_0_15px_rgba(255,255,255,0.5)]`} />
                  <div className="w-0.5 h-24 bg-gray-400 mt-1 opacity-50" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allPopped && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="mt-16 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-xl shadow-[0_0_15px_rgba(255,0,255,0.8)]"
          >
            Next
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Scene5Swipe({ onNext, config }) {
  const [cards, setCards] = useState(config.cards || []);

  const handleDragEnd = (event, info, id) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold text-center text-purple-300 drop-shadow-[0_0_10px_rgba(157,0,255,0.8)] mb-8">
        Some Sweet Moments<br/><span className="text-sm font-normal">(Swipe the cards)</span>
      </h2>

      <div className="relative w-72 h-96 flex items-center justify-center mb-8">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => handleDragEnd(e, info, card.id)}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1 - (cards.length - 1 - index) * 0.05, 
                opacity: 1, 
                y: -(cards.length - 1 - index) * 10,
                zIndex: index
              }}
              exit={{ x: 300, opacity: 0, transition: { duration: 0.3 } }}
              className="absolute w-full h-full bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-pink-200 cursor-grab active:cursor-grabbing flex flex-col"
            >
              <div className="flex-1 rounded-xl overflow-hidden mb-4 bg-gray-200">
                <img src={card.img} alt="Memory" className="w-full h-full object-cover pointer-events-none" />
              </div>
              <p className="text-center text-gray-800 font-serif text-lg font-semibold">{card.text}</p>
            </motion.div>
          ))}
          {cards.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-pink-300 text-xl font-bold drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
            >
              So many more to come! 💕
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {cards.length === 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-bold text-xl shadow-[0_0_15px_rgba(255,0,255,0.8)]"
          >
            Open My Message
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Scene6Envelope({ onNext, config }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="envelope"
            animate={floatingAnimation}
            exit={{ scale: 5, opacity: 0, transition: { duration: 0.8 } }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="w-64 h-48 bg-gradient-to-br from-purple-600 to-pink-700 rounded-lg shadow-[0_0_40px_rgba(157,0,255,0.8)] border border-purple-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[96px] border-t-purple-800 opacity-80" />
              <Mail size={64} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" />
            </div>
            <p className="mt-8 text-2xl font-bold text-purple-300 drop-shadow-[0_0_10px_rgba(157,0,255,0.8)] animate-pulse">
              Tap to Open
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_30px_rgba(255,105,180,0.4)] border border-pink-500/30 text-center"
          >
            <Heart size={48} className="text-pink-500 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]" fill="#ec4899" />
            <h2 className="text-3xl font-bold text-pink-300 mb-6 font-serif">Happy Birthday, {config.name || "Sumayya"}!</h2>
            <p className="text-lg text-white leading-relaxed font-medium mb-8 drop-shadow-md">
              {config.letterText || "You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter. I hope your day is filled with laughter, surprises, and moments that make your heart happy."}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-[0_0_15px_rgba(255,0,255,0.8)]"
            >
              Next -&gt;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Scene7Final({ onReplay }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-white mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        One Last Thing...
      </h2>

      <AnimatePresence>
        {!opened ? (
          <motion.div
            key="gift"
            animate={floatingAnimation}
            exit={{ scale: 0, opacity: 0, rotate: 180, transition: { duration: 0.5 } }}
            onClick={() => setOpened(true)}
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="relative">
              <Gift size={120} className="text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]" fill="#ef4444" />
              <Star size={32} className="absolute -top-4 -right-4 text-yellow-400 animate-spin-slow" fill="#facc15" />
            </div>
            <p className="mt-8 text-xl font-semibold text-red-300 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              Tap the gift
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="sticker"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="flex flex-col items-center"
          >
            <Confetti recycle={false} numberOfPieces={300} gravity={0.2} colors={['#ff0000', '#ff69b4', '#ffffff']} />
            
            <div className="w-64 h-64 bg-pink-100 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,105,180,1)] border-8 border-pink-400 transform -rotate-6">
              <Heart size={80} className="text-red-500 mb-2 animate-bounce" fill="#ef4444" />
              <p className="text-2xl font-bold text-pink-600 font-serif leading-tight text-center px-4">
                Lots of love<br/>for you
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <p className="text-xl text-purple-200 mb-8 font-medium">
                Once again, Happy Birthday!<br/>Hope you loved your surprise.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                className="px-8 py-3 bg-transparent border-2 border-pink-500 rounded-full text-pink-400 font-bold text-lg hover:bg-pink-500 hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(255,105,180,0.5)]"
              >
                Replay
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function App() {
  const [scene, setScene] = useState(1);
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");
      if (res.data) {
        setConfig(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextScene = () => setScene(s => s + 1);
  const reset = () => {
    setScene(1);
    fetchSettings(); // reload config on replay
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-transparent">
      <AnimatePresence mode="wait">
        {scene === 1 && <Scene1Countdown key="scene1" onNext={nextScene} />}
        {scene === 2 && <Scene2Welcome key="scene2" onNext={nextScene} config={config} />}
        {scene === 3 && <Scene3Cake key="scene3" onNext={nextScene} />}
        {scene === 4 && <Scene4Balloons key="scene4" onNext={nextScene} config={config} />}
        {scene === 5 && <Scene5Swipe key="scene5" onNext={nextScene} config={config} />}
        {scene === 6 && <Scene6Envelope key="scene6" onNext={nextScene} config={config} />}
        {scene === 7 && <Scene7Final key="scene7" onReplay={reset} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
