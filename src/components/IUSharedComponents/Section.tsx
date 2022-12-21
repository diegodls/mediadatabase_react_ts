interface SectionProps {
  children: React.ReactElement;
}
export function Section({ children }: SectionProps) {
  return (
    <section className='w-full'>
      <div className='mx-5 flex flex-col gap-4'>{children}</div>
    </section>
  );
}
