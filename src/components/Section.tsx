interface SectionProps {
  children: React.ReactNode;
  titleBg?: boolean;
  title?: string;
}
export function Section({ title, children, titleBg = true }: SectionProps) {
  return (
    <section className={`w-full px-4 xl:px-0 mt-2`}>
      {title ? (
        <div
          className={`w-full pl-3 py-1 border-l-4 border-customColors-red-500 ${
            titleBg ? "bg-neutral-900" : "md:hidden"
          }`}
        >
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      ) : null}

      <div className='w-full mt-2 flex flex-col'>{children}</div>
    </section>
  );
}
