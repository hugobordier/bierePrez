"use client";

import { useEffect, useState } from "react";

interface LoserData {
  loser: { name: string; timestamp: number } | null;
  leaderboard: { name: string; timestamp: number }[];
}

export function LoserDisplay() {
  const [data, setData] = useState<LoserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLoser = async () => {
    try {
      const response = await fetch("/api/loser");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching loser:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoser();
    const interval = setInterval(fetchLoser, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center p-12 bg-black/60 rounded-lg border-2 border-amber-600/50 backdrop-blur-sm">
        <div className="animate-pulse text-amber-400 text-2xl font-bold">
          Chargement...
        </div>
      </div>
    );
  }

  if (!data?.loser) {
    return (
      <div className="text-center p-12 bg-black/60 rounded-lg border-2 border-amber-600/50 backdrop-blur-sm">
        <img
          src="/golden-beer-mug-with-foam.jpg"
          alt="Beer"
          className="w-24 h-24 mx-auto mb-4 rounded-full"
        />
        <p className="text-amber-100 text-2xl font-bold">
          Personne ne s'est encore connecté...
        </p>
        <p className="text-amber-400 mt-2">Sois le premier a te connecté!</p>
      </div>
    );
  }

  return (
    <div className="text-center p-8 bg-black/70 rounded-lg border-2 border-amber-600 backdrop-blur-sm">
      <div className="mb-6">
        <img
          src="/two-golden-beer-mugs-clinking-together-with-foam.jpg"
          alt="Beers"
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-amber-400 mb-6 tracking-tight">
        BHAAAA LE GROS LOSER
      </h1>

      <div className="bg-amber-950/80 rounded-lg p-6 border border-amber-700/50">
        <p className="text-amber-200 text-xl mb-2 font-bold">C'est:</p>
        <p className="text-amber-100 text-4xl md:text-6xl font-black uppercase">
          {data.loser.name}
        </p>
        <p className="text-amber-400 mt-4">
          Connecté il y a{" "}
          {Math.floor((Date.now() - data.loser.timestamp) / 1000)}s
        </p>
      </div>

      {data.leaderboard.length > 0 && (
        <div className="mt-8 bg-black/60 rounded-lg p-6 border border-amber-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">
            Leaderboard des Connection
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {data.leaderboard.map((entry, index) => (
              <div
                key={`${entry.timestamp}-${index}`}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0
                    ? "bg-amber-600/30 border border-amber-500"
                    : "bg-amber-950/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold text-lg w-8">
                    #{index + 1}
                  </span>
                  <span className="text-amber-100 font-bold uppercase">
                    {entry.name}
                  </span>
                </div>
                <span className="text-amber-400 text-sm">
                  {new Date(entry.timestamp).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
