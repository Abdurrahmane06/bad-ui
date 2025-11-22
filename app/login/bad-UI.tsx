// app/login/BadLoginForm.tsx
"use client";

import React from "react";

export default function BadLoginForm() {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");

  const userRef = React.useRef<HTMLInputElement | null>(null);
  const passRef = React.useRef<HTMLInputElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  // username -> type password, focus saute vers mot de passe
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
    if (passRef.current) passRef.current.focus();
  };

  // password -> type text, focus saute vers username
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    if (userRef.current) userRef.current.focus();
  };

  // bouton qui fuit la souris
  const escapeButton = () => {
    if (!buttonRef.current) return;
    const btn = buttonRef.current;
    btn.style.position = "absolute";
    btn.style.left = Math.random() * 80 + "%";
    btn.style.top = Math.random() * 70 + "%";
  };

  return (
    <div
      style={{
        // bloc centré mais sans fond propre : on voit le gradient derrière
        padding: "24px 20px",
        borderRadius: "18px",
        border: "3px solid #ffdd00",
        boxShadow: "0 0 25px rgba(0,0,0,0.6)",
        width: "100%",
        maxWidth: "360px",
        color: "#00ffea",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent)",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: "22px",
          textAlign: "center",
          marginBottom: "6px",
          color: "#ffdd00",
          textShadow: "0 0 5px #ff00ff",
        }}
      >
        Connexion (BAD UI 2.0)
      </h1>
      <p
        style={{
          fontSize: "12px",
          textAlign: "center",
          color: "#e5e7eb",
          marginBottom: "18px",
        }}
      >
        Username caché, mot de passe visible, bouton impossible à cliquer 😈
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Username (type password) */}
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#f9fafb",
              marginBottom: "4px",
              display: "block",
            }}
          >
            Nom d’utilisateur{" "}
            <span style={{ fontSize: "11px", color: "#c4b5fd" }}>
              (champ masqué)
            </span>
          </label>
          <input
            ref={userRef}
            type="password"
            value={user}
            onChange={handleUserChange}
            placeholder="Nom d'utilisateur (secret 🤡)"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "999px",
              border: "3px solid #ffdd00",
              background: "#ff0080",
              color: "#f9fafb",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        {/* Mot de passe (type text) */}
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "13px",
              color: "#f9fafb",
              marginBottom: "4px",
              display: "block",
            }}
          >
            Mot de passe{" "}
            <span style={{ fontSize: "11px", color: "#f97316" }}>
              (affiché en clair)
            </span>
          </label>
          <input
            ref={passRef}
            type="text"
            value={pass}
            onChange={handlePassChange}
            placeholder="Mot de passe bien visible 😂"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "999px",
              border: "3px dotted #ff0080",
              background: "#00ffea",
              color: "#111827",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>
      </div>

      <button
        ref={buttonRef}
        onMouseEnter={escapeButton}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "9px",
          borderRadius: "999px",
          border: "3px solid #ffdd00",
          background: "#ff0000",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "4px 4px 0 #000",
          position: "relative",
        }}
      >
        Se connecter
      </button>
    </div>
  );
}