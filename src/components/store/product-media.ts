import capaAzul from "@/assets/produto/capa-azul.webp";
import capaRosa from "@/assets/produto/capa-rosa.webp";
import crianca from "@/assets/produto/crianca.webp";
import toque from "@/assets/produto/toque.webp";
import paginas from "@/assets/produto/paginas.webp";
import familia from "@/assets/produto/familia.webp";
import type { ColorId } from "@/lib/bundles";

export const media = { capaAzul, capaRosa, crianca, toque, paginas, familia };

/** Capa de cada cor (a galeria troca a primeira foto quando o cliente escolhe a cor). */
export const coverByColor: Record<ColorId, string> = { azul: capaAzul, rosa: capaRosa };

export type GalleryImage = { src: string; alt: string };

export function galleryFor(color: ColorId): GalleryImage[] {
  const other: ColorId = color === "azul" ? "rosa" : "azul";
  return [
    {
      src: coverByColor[color],
      alt: `Livro interativo bilíngue na cor ${color}, com alça para carregar`,
    },
    { src: crianca, alt: "Criança tocando uma figura do livro e ouvindo a palavra" },
    { src: toque, alt: "Dedo tocando a figura do gato na página do livro" },
    { src: paginas, alt: "Livro aberto nas páginas de frutas e veículos" },
    { src: familia, alt: "Duas crianças brincando juntas com os livros azul e rosa" },
    { src: coverByColor[other], alt: `Livro interativo bilíngue na cor ${other}` },
  ];
}
