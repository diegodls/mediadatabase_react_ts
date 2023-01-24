export function Test() {
  const imageRandomMock =
    "https://images.unsplash.com/photo-1672420877594-99a77c4dff5c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NDQ5Nzk4MQ&ixlib=rb-4.0.3&q=80&w=800";

  const imageRandom = "https://source.unsplash.com/random/800x600";

  const actualImage = imageRandomMock;
  return (
    <div className='w-full flex flex-col items-center overflow-hidden'>
      <div className='overflow-hidden relative '>
        <img src={actualImage} alt='teste' className='w-[200px] h-[200px]' />
        <p className=''>
          Mussum Ipsum, cacilds vidis litro abertis. Posuere libero varius.
          Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Atirei
          o pau no gatis, per gatis num morreus. Copo furadis é disculpa de
          bebadis, arcu quam euismod magna. Si num tem leite então bota uma
          pinga aí cumpadi! Diuretics paradis num copo é motivis de denguis.
          Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu
          levo! Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
          Casamentiss faiz malandris se pirulitá. A ordem dos tratores não
          altera o pão duris. Nullam volutpat risus nec leo commodo, ut interdum
          diam laoreet. Sed non consequat odio. Per aumento de cachacis, eu
          reclamis. Nec orci ornare consequat. Praesent lacinia ultrices
          consectetur. Sed non ipsum felis.
        </p>
      </div>
      <div className='flex-1 relative overflow-auto bg-green-800'>
        <img src={actualImage} alt='teste' className='h-full' />
      </div>
    </div>
  );
}
