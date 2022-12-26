interface SectionProps {
  children: React.ReactNode;
  titleBg?: boolean;
  title?: string;
}
export function Section({ title, children, titleBg = true }: SectionProps) {
  return (
    <section className='w-full mt-2 px-4'>
      {title ? (
        <div
          className={`w-full pl-1 py-1 border-l-4 border-customColors-red-500 ${
            titleBg ? "bg-neutral-900" : "md:hidden"
          }`}
        >
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      ) : null}

      <div className='w-full mt-2 flex flex-col gap-4'>{children}</div>
    </section>
  );
}
