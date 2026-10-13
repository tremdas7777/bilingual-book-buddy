import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Globe2,
  Heart,
  RotateCcw,
  Settings2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StorySpread } from "@/components/book/story-spread";
import { Vocabulary } from "@/components/book/vocabulary";
import { story, nextPage, type ReadingLanguage } from "@/lib/story";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Era uma vez — Luna e a pequena semente" },
      {
        name: "description",
        content:
          "Uma aventura infantil ilustrada em português e inglês. Acompanhe Luna e descubra uma história de amizade, carinho e paciência.",
      },
      { property: "og:title", content: "Era uma vez — Luna e a pequena semente" },
      {
        property: "og:description",
        content:
          "Leia uma história bilíngue ilustrada e descubra novas palavras com Luna, a pequena raposa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function Index() {
  const [current, setCurrent] = useState(0);
  const [language, setLanguage] = useState<ReadingLanguage>("both");
  const [largeText, setLargeText] = useState(false);
  const [audioStatus, setAudioStatus] = useState("");
  const page = story[current] ?? story[0];
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        ["INPUT", "SELECT", "BUTTON"].includes(event.target.tagName)
      )
        return;
      if (event.key === "ArrowRight") setCurrent((p) => nextPage(p, 1));
      if (event.key === "ArrowLeft") setCurrent((p) => nextPage(p, -1));
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.speechSynthesis?.cancel();
    };
  }, []);
  function speak(text: string, lang: string) {
    if (!("speechSynthesis" in window)) {
      setAudioStatus("A leitura em voz alta não está disponível neste navegador.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.onstart = () => setAudioStatus("Lendo…");
    utterance.onend = () => setAudioStatus("");
    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted")
        setAudioStatus("Não foi possível reproduzir o áudio neste navegador.");
    };
    window.speechSynthesis.speak(utterance);
  }
  function changePage(direction: number) {
    window.speechSynthesis?.cancel();
    setAudioStatus("");
    setCurrent((p) => nextPage(p, direction));
  }
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex h-[82px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <a href="#livro" className="flex items-center gap-3" aria-label="Era uma vez, início">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-6" />
            </span>
            <span className="font-display text-[23px] font-extrabold">
              Era uma vez<span className="text-story-accent">.</span>
            </span>
          </a>
          <nav className="hidden items-center gap-9 text-sm md:flex" aria-label="Principal">
            <a href="#livro" className="font-semibold text-primary">
              O livro
            </a>
            <a href="#palavrinhas" className="text-muted-foreground hover:text-primary">
              Palavrinhas
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <Globe2 className="size-4" /> Português + English
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Preferências de leitura"
                  title="Preferências de leitura"
                >
                  <Settings2 className="size-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Preferências de leitura</DialogTitle>
                </DialogHeader>
                <p className="text-sm font-medium">Tamanho do texto</p>
                <div className="flex gap-2">
                  <Button
                    variant={largeText ? "outline" : "default"}
                    onClick={() => setLargeText(false)}
                  >
                    Normal {!largeText && <Check />}
                  </Button>
                  <Button
                    variant={largeText ? "default" : "outline"}
                    onClick={() => setLargeText(true)}
                  >
                    Grande {largeText && <Check />}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <main id="livro" className="mx-auto max-w-[1200px] px-5 pt-9 sm:px-8 sm:pt-10">
        <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" />
          <span>DUAS LÍNGUAS. UMA GRANDE AVENTURA.</span>
        </div>
        <h1 className="text-center font-display text-3xl font-extrabold sm:text-[42px] sm:leading-tight">
          Luna e a pequena semente
        </h1>
        <p className="mt-2 text-center font-display text-base text-muted-foreground">
          Luna and the little seed
        </p>
        <div className="mt-4 flex justify-center gap-3 text-[11px]">
          <span className="rounded-full bg-secondary px-3 py-1.5 text-primary">5–7 anos</span>
          <span className="rounded-full bg-story-accent-soft px-3 py-1.5 text-story-accent">
            Amizade & natureza
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <BookOpen className="size-3" /> 4 páginas
          </span>
        </div>
        <div className="mx-auto mt-7 max-w-[1040px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div
              className="flex items-center gap-1 rounded-lg bg-secondary p-1"
              role="group"
              aria-label="Idioma de leitura"
            >
              {(
                [
                  { value: "both", label: "PT + EN" },
                  { value: "pt", label: "Português" },
                  { value: "en", label: "English" },
                ] as const
              ).map((item) => (
                <Button
                  key={item.value}
                  size="sm"
                  variant={language === item.value ? "default" : "ghost"}
                  className="h-7 px-3 text-[11px]"
                  aria-pressed={language === item.value}
                  onClick={() => setLanguage(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() =>
                speak(language === "en" ? page.en : page.pt, language === "en" ? "en-US" : "pt-BR")
              }
            >
              <Volume2 />
              <span className="hidden sm:inline">Ouvir a história</span>
            </Button>
          </div>
          <StorySpread
            page={page}
            pageNumber={current + 1}
            language={language}
            largeText={largeText}
            onSpeak={speak}
          />
          <div className="mt-5 grid grid-cols-3 items-center">
            <Button
              variant="outline"
              className="w-fit gap-2 bg-card"
              disabled={current === 0}
              onClick={() => changePage(-1)}
              aria-label="Página anterior"
            >
              <ArrowLeft />
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-xs text-muted-foreground" aria-live="polite">
                Página <span className="font-semibold text-foreground">{current + 1}</span> de 4
              </span>
              <div className="flex h-2 items-center gap-1.5" aria-hidden="true">
                {story.map((p, i) => (
                  <span
                    key={p.title}
                    className={cn("page-dot", i === current && "page-dot-active")}
                  />
                ))}
              </div>
            </div>
            {current < story.length - 1 ? (
              <Button
                className="ml-auto gap-2"
                onClick={() => changePage(1)}
                aria-label="Próxima página"
              >
                <span className="hidden sm:inline">Próxima</span>
                <ArrowRight />
              </Button>
            ) : (
              <Button
                className="ml-auto gap-2"
                onClick={() => {
                  changePage(-current);
                }}
                aria-label="Ler de novo"
              >
                <span className="hidden sm:inline">Ler de novo</span>
                <RotateCcw />
              </Button>
            )}
          </div>
          <div
            className="mt-5 flex min-h-5 items-center justify-center gap-2 text-xs text-muted-foreground"
            role="status"
          >
            {audioStatus || (
              <>
                <Heart className="size-3.5 text-story-accent" /> Uma história para ler, aprender e
                crescer juntos.
              </>
            )}
          </div>
        </div>
        <Vocabulary onSpeak={speak} />
      </main>
      <footer className="border-t border-border px-5 py-5">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" /> Era uma vez. Pequenos leitores, grandes
            mundos.
          </span>
          <a href="#livro" className="flex items-center gap-1 hover:text-primary">
            Voltar ao livro <ChevronDown className="size-3 rotate-180" />
          </a>
        </div>
      </footer>
    </div>
  );
}
