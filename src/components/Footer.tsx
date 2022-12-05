export function Footer() {
  return (
    <footer className='w-full h-9 flex items-center justify-center mt-2 bg-zinc-800'>
      <strong className='cursor-default'>
        Feito com <div className='inline-block hover:animate-ping'>❤️</div> por{" "}
        <a
          href='https://github.com/diegodls'
          target='_blank'
          rel='external'
          className='hover:text-customColors-red-500 transition-all hover:animate-pulse cursor-pointer'
        >
          diegodls
        </a>
      </strong>
    </footer>
  );
}
