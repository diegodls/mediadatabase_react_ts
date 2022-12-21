interface SectionTitleProps {
  title: string;
}
export function SectionTitle({ title }: SectionTitleProps) {
  return <strong className='text-xl'>{title}</strong>;
}
