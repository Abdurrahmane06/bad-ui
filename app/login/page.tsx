'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';

export default function BadUIForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [fallingChar, setFallingChar] = useState<string | null>(null);
  const [showFalling, setShowFalling] = useState(false);
  const [fallingPosition, setFallingPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // message d'erreur au-dessus de l'input mot de passe
  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (e.target.value.length > 0) {
      passwordRef.current?.focus();
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // On efface le message d'erreur dès que l'utilisateur recommence à taper
    if (error) {
      setError('');
    }

    // Si le mot de passe a déjà 7 caractères et qu'on essaie d'en ajouter un
    if (password.length === 7 && newValue.length > password.length) {
      const extraChar = newValue[newValue.length - 1]; // le 8e caractère tapé

      // 📌 Position de l'input mot de passe dans la fenêtre
      if (passwordRef.current) {
        const rect = passwordRef.current.getBoundingClientRect();

        // On démarre la chute depuis le centre horizontal de l'input, en haut
        setFallingChar(extraChar);
        setFallingPosition({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
        setShowFalling(true);

        // On garde visuellement la valeur à 7 caractères dans l'input
        passwordRef.current.value = password;
      }

      // Arrêter l'animation après 1 seconde
      setTimeout(() => {
        setShowFalling(false);
        setFallingChar(null);
      }, 1000);

      return; // ❗ on ne modifie PAS le state password
    }

    // Cas normal : on limite à 7 caractères côté state
    const trimmed = newValue.slice(0, 7);
    setPassword(trimmed);

    if (trimmed.length > 0) {
      usernameRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // On affiche le message au-dessus de l'input mot de passe
    setError('Le mot de passe doit contenir au moins 8 caractères');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-300 relative overflow-hidden">
      {/* Caractère qui tombe depuis l'input mot de passe */}
      {showFalling && fallingChar && (
        <div
          className="text-6xl font-bold text-red-600"
          style={{
            position: 'fixed',
            left: fallingPosition.x,
            top: fallingPosition.y,
            animation: 'fall 1s ease-in forwards',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {fallingChar}
        </div>
      )}

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fall {
          0% {
            font-size: 30px;
            color: black;
            font-weight: 250;
            transform: translate(-250%, 0%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 500px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="bg-pink-500 p-10 border-8 border-green-400 w-96 transform rotate-2 relative z-10">
        <h2
          className="text-4xl font-black text-center text-orange-600 mb-8 underline decoration-wavy"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          CoNnExIoN
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-2xl font-bold text-blue-900 italic"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Nom d'utilisateur :
            </label>
            <input
              ref={usernameRef}
              type="password"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full px-4 py-2 border-4 border-red-600 bg-lime-200 text-purple-900 text-lg font-bold transform -rotate-1"
              style={{ fontFamily: 'Courier New, monospace' }}
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-2xl font-bold text-red-700 italic"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Mot de passe : <span className="text-sm">(min 8 caractères)</span>
            </label>

            <input
              ref={passwordRef}
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Entrez votre mot de passe"
              // pas de maxLength ici, on gère nous-mêmes
              className="w-full px-4 py-2 border-4 border-blue-600 bg-yellow-200 text-green-900 text-lg font-bold transform rotate-1"
              style={{ fontFamily: 'Courier New, monospace' }}
            />

            {/* Message d'erreur EN DESSOUS de l'input */}
            {error && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {error}
              </p>
            )}
          </div>

          <div className="relative h-20">
            <button
              type="submit"
              style={{
                fontFamily: 'Comic Sans MS, cursive',
                transition: 'transform 0.3s ease',
              }}
              className="w-full px-4 py-3 bg-orange-600 text-yellow-200 font-black text-xl border-4 border-purple-700 shadow-lg hover:bg-red-600"
            >
              ✨ CLIQUEZ ICI ✨
            </button>
          </div>
        </form>
      </div>

      {/* Corbeille en bas */}
      <div className="absolute bottom-10 left-10/21 transform -translate-x-1/2 text-9xl z-0">
        🗑️
      </div>
    </div>
  );
}