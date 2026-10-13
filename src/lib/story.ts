import forest from '@/assets/luna-forest.jpg';
import garden from '@/assets/luna-garden.jpg';
import flower from '@/assets/luna-flower.jpg';
export type ReadingLanguage = 'both' | 'pt' | 'en';
export interface StoryPage { title: string; image: string; alt: string; pt: string; en: string; }
export const story: StoryPage[] = [
  { title: 'Uma pequena descoberta', image: forest, alt: 'Luna, uma raposinha, e um passarinho amarelo encontram uma semente na floresta.', pt: 'Em uma manhã de sol, Luna encontrou uma pequena semente na floresta. “O que será que você vai ser?”, perguntou a curiosa raposinha.', en: 'One sunny morning, Luna found a little seed in the forest. “What will you grow into?” asked the curious little fox.' },
  { title: 'Um amigo para ajudar', image: garden, alt: 'Luna e o passarinho plantam a semente em um lugar ensolarado.', pt: 'Um passarinho amarelo chegou para ajudar. Juntos, eles fizeram um buraquinho e plantaram a semente em um lugar cheio de sol.', en: 'A little yellow bird came to help. Together, they dug a tiny hole and planted the seed in a sunny spot.' },
  { title: 'Um pouquinho de paciência', image: garden, alt: 'Luna cuida da semente com seu amigo e um regador.', pt: 'Todos os dias, Luna regava a terra com carinho. “As coisas bonitas precisam de tempo”, cantava seu amigo passarinho.', en: 'Every day, Luna watered the soil with care. “Beautiful things take time,” sang her little bird friend.' },
  { title: 'Uma surpresa floresceu', image: flower, alt: 'Luna e o passarinho admiram uma grande flor cor-de-rosa.', pt: 'Até que uma linda flor se abriu! Luna sorriu: com amizade, carinho e paciência, uma pequena semente virou uma grande alegria.', en: 'Then a beautiful flower bloomed! Luna smiled: with friendship, care, and patience, a little seed had grown into a great joy.' },
];
export function nextPage(current: number, direction: number): number { return Math.max(0, Math.min(story.length - 1, current + direction)); }
