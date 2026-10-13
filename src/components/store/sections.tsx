import {
  Brain,
  Check,
  Ear,
  Gift,
  Luggage,
  MessageCircle,
  MonitorOff,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { media } from "@/components/store/product-media";
import { money } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { PixIcon } from "@/components/checkout/parts";
import { brand } from "@/lib/brand";
import { bundleShippingLabel, COLORS, getBundle } from "@/lib/bundles";

/** Coloque aqui apenas avaliações reais de clientes. A seção só aparece quando houver itens. */
const REVIEWS: { name: string; city: string; text: string; rating: number }[] = [];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-primary">
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mx-auto mt-2 max-w-2xl text-center text-[28px] font-black leading-tight sm:text-4xl">
      {children}
    </h2>
  );
}

export function AnnouncementBar() {
  const items = [
    `🚚 ${bundleShippingLabel(getBundle("1"))} para todo o Brasil`,
    "⚡ Pix com aprovação na hora",
    "📦 Envio em até 1 dia útil",
  ];
  return (
    <div className="bg-foreground text-white">
      <div className="mx-auto flex h-9 max-w-[1180px] items-center justify-center gap-8 overflow-hidden px-4 text-xs font-semibold">
        {items.map((t, i) => (
          <span key={t} className={i > 0 ? "hidden sm:inline" : ""}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header({ onBuy }: { onBuy: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a href="#comprar" className="flex items-center gap-2 font-display text-xl font-black">
          <span
            className="grid size-9 place-items-center rounded-xl bg-primary text-lg text-white"
            aria-hidden
          >
            📖
          </span>
          {brand.name}
        </a>
        <nav
          className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex"
          aria-label="Seções"
        >
          <a href="#como-funciona" className="hover:text-foreground">
            Como funciona
          </a>
          <a href="#experimente" className="hover:text-foreground">
            Experimente
          </a>
          <a href="#temas" className="hover:text-foreground">
            Temas
          </a>
          <a href="#duvidas" className="hover:text-foreground">
            Dúvidas
          </a>
        </nav>
        <button type="button" onClick={onBuy} className="cta-btn min-h-10 px-4 text-sm uppercase">
          Comprar
        </button>
      </div>
    </header>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: "Escolha o idioma",
      text: "Um botão alterna entre português e inglês.",
      img: media.capa,
    },
    {
      n: 2,
      title: "Toque na figura",
      text: "Cada imagem é um botão sensível ao toque.",
      img: media.toque,
    },
    {
      n: 3,
      title: "Ouça e repita",
      text: "O livro fala a palavra com pronúncia clara.",
      img: media.idiomas,
    },
  ];
  return (
    <section id="como-funciona" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Eyebrow>Como funciona</Eyebrow>
        <Title>Simples a ponto de a criança brincar sozinha</Title>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              className="overflow-hidden rounded-[20px] border bg-card shop-shadow"
            >
              <div className="aspect-[4/3] bg-white">
                <img
                  src={s.img}
                  alt=""
                  className="h-full w-full object-contain p-3"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="grid size-8 place-items-center rounded-full bg-cta font-display font-black text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 text-xl font-black">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center font-semibold">
          Não precisa de app. Não precisa de Wi-Fi. Não precisa de um adulto guiando o tempo todo.
        </p>
      </div>
    </section>
  );
}

export function Benefits() {
  const items = [
    {
      icon: Ear,
      title: "Ouvido treinado desde cedo",
      text: "A criança escuta a pronúncia certa repetidas vezes, do jeito que aprende a falar.",
    },
    {
      icon: Brain,
      title: "Memória e vocabulário",
      text: "Associar imagem, som e palavra fixa o vocabulário de forma natural.",
    },
    {
      icon: MonitorOff,
      title: "Menos tempo de tela",
      text: "Uma alternativa ao celular que também prende a atenção — com as mãos e os ouvidos.",
    },
    {
      icon: Luggage,
      title: "Leve e portátil",
      text: "Tem alça e cabe na mochila: vai para a viagem, o restaurante e a casa da vó.",
    },
  ];
  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <img
          src={media.familia}
          alt="Crianças brincando juntas com o livro interativo"
          className="aspect-square w-full rounded-[20px] object-cover shop-shadow"
          loading="lazy"
        />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
            Por que funciona
          </p>
          <h2 className="mt-2 text-[28px] font-black leading-tight sm:text-4xl">
            Aprender inglês sem perceber que está estudando
          </h2>
          <p className="mt-3 text-muted-foreground">
            A primeira infância é a melhor fase para ter contato com um segundo idioma. O livro
            transforma esse contato em brincadeira.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="grid size-11 place-items-center rounded-xl bg-sun-soft text-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 text-lg font-black">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const themes = [
  "🔤 Alfabeto",
  "🔢 Números",
  "🖐️ Corpo humano",
  "🎨 Cores e formas",
  "🍎 Frutas e legumes",
  "🎵 Histórias e música",
  "🦁 Animais terrestres",
  "🐳 Animais marinhos",
  "🚗 Veículos",
  "👩‍⚕️ Profissões",
  "⚽ Esportes",
  "🚀 Espaço e clima",
  "🏠 Casa e roupas",
  "🧸 Objetos do dia a dia",
];

export function Themes() {
  return (
    <section id="temas" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Eyebrow>Conteúdo</Eyebrow>
        <Title>Mais de 10 temas do mundinho da criança</Title>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {themes.map((t) => (
            <span
              key={t}
              className="rounded-full border-2 bg-card px-4 py-2.5 font-display font-extrabold"
            >
              {t}
            </span>
          ))}
        </div>
        <img
          src={media.temas}
          alt="Exemplos de páginas: frutas, veículos, corpo humano e profissões"
          className="mx-auto mt-10 w-full max-w-2xl rounded-[20px] border bg-white shop-shadow"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export function Comparison() {
  const rows = [
    "Ensina português e inglês",
    "Estimula fala e coordenação",
    "Funciona sem internet",
    "Sem anúncios nem vídeos aleatórios",
    "Não cansa os olhos",
  ];
  return (
    <section className="bg-secondary/60 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Eyebrow>Comparação</Eyebrow>
        <Title>Livro interativo × celular ou tablet</Title>
        <div className="mt-10 overflow-hidden rounded-[20px] border bg-card shop-shadow">
          <div className="grid grid-cols-[1fr_88px_88px] items-center border-b bg-muted px-4 py-3 text-xs font-black uppercase sm:grid-cols-[1fr_120px_120px]">
            <span />
            <span className="text-center text-primary">Livro</span>
            <span className="text-center text-muted-foreground">Telas</span>
          </div>
          {rows.map((r) => (
            <div
              key={r}
              className="grid grid-cols-[1fr_88px_88px] items-center border-b px-4 py-3.5 last:border-0 sm:grid-cols-[1fr_120px_120px]"
            >
              <span className="font-semibold">{r}</span>
              <span className="flex justify-center">
                <span className="grid size-7 place-items-center rounded-full bg-mint text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
              </span>
              <span className="flex justify-center">
                <span className="grid size-7 place-items-center rounded-full bg-muted text-muted-foreground">
                  <X className="size-4" strokeWidth={3} />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  if (REVIEWS.length === 0) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Eyebrow>Avaliações</Eyebrow>
        <Title>O que as famílias dizem</Title>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name + r.text} className="rounded-[20px] border bg-card p-6 shop-shadow">
              <div className="flex gap-0.5 text-sun" aria-label={`${r.rating} de 5 estrelas`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" fill={i < r.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <blockquote className="mt-3">{r.text}</blockquote>
              <figcaption className="mt-4 text-sm font-bold">
                {r.name} <span className="font-normal text-muted-foreground">· {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Specs() {
  const specs = [
    ["Idiomas", "Português e inglês"],
    ["Temas", "Mais de 10, com várias palavras cada"],
    ["Idade recomendada", "A partir de 3 anos"],
    ["Material", "Papel resistente com eletrônica embutida"],
    ["Alimentação", "3 pilhas AAA (não inclusas)"],
    ["Dimensões", "Aprox. 25 × 25 × 2 cm"],
    ["Peso", "Aprox. 400 g"],
    ["Cores", COLORS.map((c) => c.label).join(" ou ")],
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
            Especificações
          </p>
          <h2 className="mt-2 text-[28px] font-black leading-tight sm:text-4xl">
            Tudo o que você precisa saber
          </h2>
          <dl className="mt-6 overflow-hidden rounded-[20px] border bg-card">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[42%_1fr] gap-3 border-b px-5 py-3.5 text-sm last:border-0"
              >
                <dt className="font-bold">{k}</dt>
                <dd className="text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[20px] bg-mint-soft p-6">
            <ShieldCheck className="size-9 text-mint" />
            <h3 className="mt-3 text-2xl font-black">Compra sem risco</h3>
            <p className="mt-2 text-muted-foreground">
              Você tem <strong className="text-foreground">7 dias após o recebimento</strong> para
              devolver, se mudar de ideia. É só falar com a gente que orientamos todo o processo.
            </p>
          </div>
          <div className="rounded-[20px] bg-sun-soft p-6">
            <Gift className="size-9 text-cta" />
            <h3 className="mt-3 text-2xl font-black">Presente que ensina</h3>
            <p className="mt-2 text-muted-foreground">
              Aniversário, Dia das Crianças ou Natal: um presente que a criança usa todos os dias e
              que os pais aprovam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    [
      "Para qual idade é indicado?",
      "A partir de 3 anos. As figuras são grandes e as páginas são resistentes para mãos pequenas. Crianças menores também gostam, sempre com um adulto por perto.",
    ],
    [
      "Precisa de celular, aplicativo ou internet?",
      "Não. O livro funciona sozinho: é só colocar as pilhas, escolher o idioma e tocar nas figuras.",
    ],
    [
      "Quais pilhas usa? Vêm junto?",
      "Usa 3 pilhas AAA (palito), que não vêm inclusas por segurança no transporte.",
    ],
    [
      "Qual a diferença entre as cores?",
      "Apenas a cor. O conteúdo, os temas e os áudios são os mesmos no azul e no rosa.",
    ],
    [
      "Quanto tempo demora para chegar?",
      `Enviamos em até 1 dia útil após o pagamento. Você recebe o código de rastreio por e-mail assim que o pedido sai, e o prazo exato aparece no checkout de acordo com o seu CEP.`,
    ],
    [
      "Quais as formas de pagamento?",
      "Pagamento via Pix, com aprovação na hora. Assim que o Pix é confirmado, o pedido já é separado para envio.",
    ],
    [
      "E se eu não gostar?",
      "Você pode pedir a devolução em até 7 dias após receber, conforme o Código de Defesa do Consumidor. Devolvemos o valor pago.",
    ],
  ] as [string, string][];
  return (
    <section id="duvidas" className="bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Eyebrow>Dúvidas</Eyebrow>
        <Title>Perguntas frequentes</Title>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-5 font-display text-[17px] font-extrabold hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {brand.whatsapp.phoneE164 && (
          <a
            href={`https://wa.me/${brand.whatsapp.phoneE164}`}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border-2 px-5 py-3 font-bold hover:bg-muted"
          >
            <MessageCircle className="size-5 text-mint" /> Ainda com dúvida? Fale no WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}

export function FinalCta({ onBuy }: { onBuy: () => void }) {
  const kit = getBundle("1");
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-primary p-6 text-white sm:p-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Sparkles className="size-8 text-sun" />
            <h2 className="mt-3 text-[30px] font-black leading-tight sm:text-[42px]">
              Dê ao seu filho uma vantagem que dura a vida toda
            </h2>
            <p className="mt-3 text-lg text-white/85">
              Português e inglês na ponta do dedo, longe das telas. Por apenas{" "}
              <strong className="text-white">{money(kit.price)}</strong>.
            </p>
            <button
              type="button"
              onClick={onBuy}
              className="cta-btn mt-7 min-h-[60px] w-full px-10 text-xl uppercase sm:w-auto"
            >
              Quero o meu
            </button>
          </div>
          <img
            src={media.capa}
            alt=""
            className="mx-auto w-full max-w-[340px] rounded-[20px] bg-white p-4"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    { to: "/rastreio", label: "Rastrear pedido" },
    { to: "/contato", label: "Contato" },
    { to: "/politica-envio", label: "Política de envio" },
    { to: "/politica-reembolso", label: "Trocas e devoluções" },
    { to: "/politica-privacidade", label: "Privacidade" },
  ] as const;
  return (
    <footer className="border-t bg-card pb-28 pt-10 text-sm text-muted-foreground lg:pb-10">
      <div className="mx-auto grid max-w-[1180px] gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto_auto] md:gap-12">
        <div>
          <p className="font-display text-lg font-black text-foreground">{brand.name}</p>
          {brand.company.legalName && <p>{brand.company.legalName}</p>}
          {brand.company.cnpj && <p>CNPJ {brand.company.cnpj}</p>}
          {brand.email && (
            <p>
              <a href={`mailto:${brand.email}`} className="hover:text-foreground">
                {brand.email}
              </a>
            </p>
          )}
        </div>
        <nav aria-label="Atendimento" className="grid gap-1.5">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase">Pagamento</p>
          <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold">
            <PixIcon className="h-3.5 w-3.5" /> Pix
          </span>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1180px] px-4 text-xs sm:px-6">
        © {new Date().getFullYear()} {brand.name}. Imagens ilustrativas.
      </p>
    </footer>
  );
}
