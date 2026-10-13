import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Lang = "pt" | "en";

const words = [
  { emoji: "🐱", pt: "Gato", en: "Cat", bg: "bg-pinkish" },
  { emoji: "🐶", pt: "Cachorro", en: "Dog", bg: "bg-sun-soft" },
  { emoji: "🍎", pt: "Maçã", en: "Apple", bg: "bg-mint-soft" },
  { emoji: "🚗", pt: "Carro", en: "Car", bg: "bg-secondary" },
  { emoji: "🦁", pt: "Leão", en: "Lion", bg: "bg-sun-soft" },
  { emoji: "🐳", pt: "Baleia", en: "Whale", bg: "bg-secondary" },
  { emoji: "⚽", pt: "Bola", en: "Ball", bg: "bg-mint-soft" },
  { emoji: "🚀", pt: "Foguete", en: "Rocket", bg: "bg-pinkish" },
];

// Simula o livro com a voz do navegador; o produto físico tem alto-falante e gravações próprias.
export function TryIt() {
  const [lang, setLang] = useState<Lang>("pt");
  const [playing, setPlaying] = useState<string | null>(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function play(word: (typeof words)[number]) {
    if (!("speechSynthesis" in window)) {
      setUnsupported(true);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word[lang]);
    u.lang = lang === "pt" ? "pt-BR" : "en-US";
    u.rate = 0.85;
    u.onend = () => setPlaying(null);
    setPlaying(word.pt);
    window.speechSynthesis.speak(u);
  }

  return (
    <section id="experimente" className="bg-foreground py-16 text-white sm:py-20">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-sun">
          Experimente agora
        </p>
        <h2 className="mt-2 text-center text-[28px] font-black leading-tight sm:text-4xl">
          Toque numa figura e ouça 👇
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/75">
          É assim que seu filho vai brincar: escolhe o idioma, toca na figura e escuta a palavra.
        </p>

        <div
          className="mx-auto mt-8 flex w-fit rounded-full bg-white/10 p-1"
          role="radiogroup"
          aria-label="Idioma"
        >
          {(["pt", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={lang === l}
              onClick={() => setLang(l)}
              className={cn(
                "min-h-11 rounded-full px-5 font-display font-extrabold transition",
                lang === l ? "bg-white text-foreground" : "text-white/80 hover:text-white",
              )}
            >
              {l === "pt" ? "🇧🇷 Português" : "🇺🇸 English"}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {words.map((w) => (
            <button
              key={w.pt}
              type="button"
              onClick={() => play(w)}
              aria-label={`Ouvir ${w[lang]}`}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl p-5 text-foreground transition hover:-translate-y-0.5",
                w.bg,
                playing === w.pt && "sound-ring ring-4 ring-sun",
              )}
            >
              <span className="text-5xl" aria-hidden>
                {w.emoji}
              </span>
              <span className="font-display text-lg font-black">{w[lang]}</span>
            </button>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-white/55">
          {unsupported
            ? "Seu navegador não reproduz áudio nesta demonstração."
            : "Demonstração com a voz do seu navegador. O livro tem alto-falante e áudios próprios."}
        </p>
      </div>
    </section>
  );
}
