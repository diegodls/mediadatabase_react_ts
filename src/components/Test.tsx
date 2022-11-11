export function Test() {
  const imageError =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";
  return (
    <div className='bg-red-500 w-screen h-screen flex items-center justify-center p-11'>
      <div
        className={`max-h-[500px] flex items-center justify-center overflow-hidden bg-green-500`}
      >
        <img
          className='min-w-full min-h-full select-none relative z-10'
          src={imageError}
          alt={`Carregando...`}
          title={`Carregando...`}
        />
      </div>
    </div>
  );
}
