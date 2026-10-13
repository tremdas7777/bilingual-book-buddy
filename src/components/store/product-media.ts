import capa from "@/assets/produto/capa.jpg";
import familia from "@/assets/produto/familia.jpg";
import comoFunciona from "@/assets/produto/como-funciona.jpg";
import toque from "@/assets/produto/toque.jpg";
import temas from "@/assets/produto/temas.jpg";
import idiomas from "@/assets/produto/idiomas.jpg";

export const media = { capa, familia, comoFunciona, toque, temas, idiomas };

export const gallery = [
  {
    src: capa,
    alt: "Livro interativo bilíngue com capa colorida e alça para carregar",
    fit: "contain" as const,
  },
  {
    src: familia,
    alt: "Duas crianças brincando com o livro interativo em uma mesa",
    fit: "cover" as const,
  },
  {
    src: comoFunciona,
    alt: "Infográfico: toque e escute, mais de 10 temas e dois idiomas",
    fit: "contain" as const,
  },
  {
    src: toque,
    alt: "Dedo de criança tocando a figura de um gato no livro",
    fit: "contain" as const,
  },
  {
    src: temas,
    alt: "Páginas com temas de frutas, veículos, corpo humano e profissões",
    fit: "contain" as const,
  },
  {
    src: idiomas,
    alt: "Figuras de bicicleta e cachorro com nomes em português e inglês",
    fit: "contain" as const,
  },
];
