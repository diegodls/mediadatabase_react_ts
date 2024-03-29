import { LoadingIcon } from "../assets/svg/LoadingIcon";

interface LoadingProps {
  show?: boolean;
  blur?: boolean;
  backdrop?: boolean;
  onTop?: boolean;
  message?: string;
  stroke?: string;
  h_full?: boolean;
}

export function Loading({
  show = true,
  blur = true,
  backdrop = true,
  onTop = true,
  message,
  stroke = "#cfcfcf",
  h_full = false,
}: LoadingProps) {
  return (
    <div
      className={`w-full ${
        h_full ? "h-full" : "h-screen"
      } flex flex-col items-center justify-center overflow-hidden 
      ${!show && "hidden"}
      ${show ? "animate-fadeIn" : "animate-fadeOut"}
      ${backdrop && "bg-black/10"}
      ${blur && "backdrop-blur"}
      ${onTop && "absolute right-0 top-0 z-[99]"}
      `}
    >
      <div className='w-24 h-24'>
        <LoadingIcon width={100} height={100} stroke={stroke} />
      </div>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
