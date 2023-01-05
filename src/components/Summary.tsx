import { Section } from "./Section";

interface SummaryProps {
  title?: string;
  overview?: string;
}

export function Summary({ title, overview }: SummaryProps) {
  return (
    <>
      <Section title='Sinopse'>
        <p
          aria-label={`Resumo do filme: ${title}: ${overview}`}
          title={overview}
          className='mt-2'
        >
          {overview}
        </p>
      </Section>
    </>
  );
}
