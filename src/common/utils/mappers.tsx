// Función utilitaria
const mapToOptions = (map: Record<string, string>) =>
  Object.entries(map).map(([value, label]) => ({ value, label }));

// Mapas
export const gameModeMap: Record<string, string> = {
  CASUAL: "🎮 Casual",
  COMPETITIVE: "⚔️ Competitivo",
  COMPLETIST: "🏆 Completista",
};

export const voiceModeMap: Record<string, string> = {
  TEXT: "🔇 Texto",
  HEAR: "👂 Escuchar",
  TALK: "💬 Hablar",
};

export const languageMap: Record<string, string> = {
  INDEF: "🌐 Indefinido",
  ES: "🇪🇸 Español",
  EN: "🇬🇧 Inglés",
  FR: "🇫🇷 Francés",
  PT: "🇵🇹 Portugués",
  IT: "🇮🇹 Italiano",
};

export const durationMap: Record<string, string> = {
  "15-30": "⏱️ 15–30 min",
  "30-60": "⏱️ 30–60 min",
  "60-120": "⏱️ 1–2 h",
  "120-180": "⏱️ 2–3 h",
  "180-240": "⏱️ 3–4 h",
  "240+": "⏱️ +4 h",
};

// Opciones para Select
export const gameModeOptions = mapToOptions(gameModeMap);
export const voiceModeOptions = mapToOptions(voiceModeMap);
export const languageOptions = mapToOptions(languageMap);
export const durationOptions = mapToOptions(durationMap);
