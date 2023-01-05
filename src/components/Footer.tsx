export function Footer() {
  return (
    <footer className='w-full mt-2 bg-zinc-800'>
      <div className='w-full h-10 flex items-center justify-center '>
        <strong className='cursor-default'>
          Feito com <div className='inline-block hover:animate-ping'>❤️</div>{" "}
          por{" "}
          <a
            href='https://github.com/diegodls'
            target='_blank'
            rel='external'
            className='hover:text-customColors-red-500 transition-all hover:animate-pulse cursor-pointer'
          >
            diegodls
          </a>
        </strong>
      </div>
    </footer>
  );
}
