import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ReadingLanguage, StoryPage } from '@/lib/story';
export interface StorySpreadProps { page: StoryPage; pageNumber: number; language: ReadingLanguage; largeText: boolean; onSpeak: (text: string, language: string) => void; }
export function StorySpread({ page, pageNumber, language, largeText, onSpeak }: StorySpreadProps) {
  return <article className="reader-book grid md:grid-cols-2" aria-label={`Página ${pageNumber}: ${page.title}`}>
    <div className="aspect-square md:aspect-auto md:h-[455px]" key={page.image}><img className="story-image page-enter" src={page.image} alt={page.alt} width={1024} height={1024} /></div>
    <div className="story-panel md:h-[455px]" key={`${pageNumber}-${language}`}>
      <div className="mb-6 flex items-center gap-2 text-muted-foreground"><span className="h-px w-5 bg-story-accent" /><span className="text-xs">{page.title}</span></div>
      <div className="page-enter space-y-6">
        {language !== 'en' && <section lang="pt-BR"><div className="mb-2 flex items-center justify-between"><span className="language-label text-primary">Português</span><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" title="Ouvir em português" aria-label="Ouvir em português" onClick={() => onSpeak(page.pt, 'pt-BR')}><Volume2 /></Button></div><p className={cn('story-text', largeText && 'story-text-large')}>{page.pt}</p></section>}
        {language === 'both' && <div className="h-px bg-border/60" />}
        {language !== 'pt' && <section lang="en"><div className="mb-2 flex items-center justify-between"><span className="language-label text-story-accent">English</span><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" title="Listen in English" aria-label="Listen in English" onClick={() => onSpeak(page.en, 'en-US')}><Volume2 /></Button></div><p className={cn('story-text text-muted-foreground', largeText && 'story-text-large')}>{page.en}</p></section>}
      </div>
      <span className="mt-5 text-center text-xs text-muted-foreground md:absolute md:bottom-4 md:left-0 md:right-0">{String(pageNumber).padStart(2, '0')}</span>
    </div>
  </article>;
}
