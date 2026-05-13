import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultConfig } from './config';
import API from "./services/api";
import { Save, RefreshCw, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Admin() {
  const [config, setConfig] = useState(defaultConfig);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        setLoginError("");
      }
    } catch (error) {
      setLoginError("Invalid username or password");
    }
  };

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
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await API.post("/settings", config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    setConfig(defaultConfig);
    try {
      await API.post("/settings", defaultConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBalloonWord = (index, value) => {
    const newWords = [...config.balloonWords];
    newWords[index] = value;
    setConfig({ ...config, balloonWords: newWords });
  };

  const updateCard = (index, field, value) => {
    const newCards = [...config.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setConfig({ ...config, cards: newCards });
  };

  const processImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWelcomeImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImage(file, (dataUrl) => {
      setConfig({ ...config, welcomeImage: dataUrl });
    });
  };

  const handleFileUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImage(file, (dataUrl) => {
      updateCard(index, 'img', dataUrl);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 font-sans">
        <div className="bg-gray-800 p-8 rounded-xl shadow-[0_0_20px_rgba(255,0,255,0.2)] border border-gray-700 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">Admin Login</h2>
            <p className="text-gray-400">Please authenticate to access the portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-300">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-300">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
            </div>
            
            {loginError && <div className="text-red-400 text-sm text-center">{loginError}</div>}
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:opacity-90 transition-opacity"
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
            >
              &larr; Back to App
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 overflow-y-auto font-sans">
      <div className="max-w-2xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/')} className="flex items-center text-pink-400 hover:text-pink-300">
            <ArrowLeft className="mr-2" size={20} /> Back to App
          </button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Admin Portal
          </h1>
        </div>

        {/* Welcome Screen Configuration */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Welcome Screen (Scene 2)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-gray-300">Welcome Image (Optional)</label>
              <div className="flex items-center gap-4">
                {config.welcomeImage ? (
                  <img src={config.welcomeImage} alt="preview" className="w-16 h-16 object-cover rounded-md border border-gray-600" />
                ) : (
                  <div className="w-16 h-16 bg-gray-900 rounded-md border border-gray-600 flex items-center justify-center text-3xl">🐻</div>
                )}
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleWelcomeImageUpload}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700 cursor-pointer"
                  />
                  <div className="mt-3 text-xs text-gray-500">Or paste an image URL:</div>
                  <input 
                    type="text" 
                    value={config.welcomeImage?.startsWith('data:') ? '' : config.welcomeImage}
                    onChange={(e) => setConfig({ ...config, welcomeImage: e.target.value })}
                    className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-yellow-500 text-sm"
                    placeholder={config.welcomeImage?.startsWith('data:') ? "(Using uploaded file)" : "https://... or leave empty for bear"}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Welcome Heading</label>
              <input 
                type="text" 
                value={config.welcomeHeading}
                onChange={(e) => setConfig({ ...config, welcomeHeading: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder="A Cutiepie was born today!"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Welcome Text</label>
              <input 
                type="text" 
                value={config.welcomeText}
                onChange={(e) => setConfig({ ...config, welcomeText: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                placeholder="Yes, it's YOU! A little surprise awaits..."
              />
            </div>
          </div>
        </div>

        {/* Name Configuration */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">Receiver's Name</h2>
          <input 
            type="text" 
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            placeholder="e.g. Sumayya"
          />
        </div>

        {/* Balloons Configuration */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">Balloon Words (4 words max)</h2>
          <div className="grid grid-cols-2 gap-4">
            {config.balloonWords.map((word, idx) => (
              <input 
                key={idx}
                type="text" 
                value={word}
                onChange={(e) => updateBalloonWord(idx, e.target.value)}
                maxLength={10}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder={`Word ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Cards Configuration */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Sweet Moments Cards (3 Cards)</h2>
          {config.cards.map((card, idx) => (
            <div key={card.id} className="mb-6 pb-6 border-b border-gray-700 last:border-0 last:pb-0 last:mb-0">
              <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Card {idx + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-300">Upload Image</label>
                  <div className="flex items-center gap-4">
                    {card.img && (
                      <img src={card.img} alt="preview" className="w-16 h-16 object-cover rounded-md border border-gray-600" />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(idx, e)}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                      />
                      <div className="mt-3 text-xs text-gray-500">Or paste an image URL:</div>
                      <input 
                        type="text" 
                        value={card.img.startsWith('data:') ? '' : card.img}
                        onChange={(e) => updateCard(idx, 'img', e.target.value)}
                        className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                        placeholder={card.img.startsWith('data:') ? "(Using uploaded file)" : "https://..."}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Caption Text</label>
                  <input 
                    type="text" 
                    value={card.text}
                    onChange={(e) => updateCard(idx, 'text', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="E.g. Our first date"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Letter Configuration */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Envelope Letter Content</h2>
          <textarea 
            value={config.letterText}
            onChange={(e) => setConfig({ ...config, letterText: e.target.value })}
            rows={5}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 resize-none leading-relaxed"
            placeholder="Write your beautiful message here..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 sticky bottom-6 z-10">
          <button 
            onClick={handleSave}
            className="flex-1 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:opacity-90 transition-opacity"
          >
            <Save className="mr-2" size={20} />
            Save & Preview
          </button>
          
          <button 
            onClick={handleReset}
            className="flex items-center justify-center bg-gray-700 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
            title="Reset to default"
          >
            <RefreshCw size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
