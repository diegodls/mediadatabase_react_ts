import { LoadingIcon } from "../assets/svg/LoadingIcon";

interface LoadingProps {
  show?: boolean;
  blur?: boolean;
  backdrop?: boolean;
  onTop?: boolean;
}

export function Loading({
  show = true,
  blur = true,
  backdrop = true,
  onTop = true,
}: LoadingProps) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center
      ${!show && "hidden"}
      ${show ? "animate-fadeIn" : "animate-fadeOut"}
      ${backdrop && "bg-black/10"}
      ${blur && "backdrop-blur"}
      ${onTop && "absolute right-0 top-0"}`}
    >
      <div className='w-24 h-24'>
        <LoadingIcon width={100} height={100} />
      </div>
      <p>Loading</p>
    </div>
  );
}
