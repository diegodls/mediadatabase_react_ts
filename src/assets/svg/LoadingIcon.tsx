import { SVGProps } from "react";

export function LoadingIcon(props: SVGProps<SVGSVGElement>, stroke: string) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ margin: "auto", background: "none" }}
      width='200'
      height='200'
      display='block'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 100 100'
      {...props}
    >
      <path
        fill='none'
        stroke={stroke ? stroke : "#c00"}
        strokeDasharray='42.76482137044271 42.76482137044271'
        strokeLinecap='round'
        strokeWidth='6.4'
        d='M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z'
        style={{
          WebkitTransformOrigin: 50,
          msTransformOrigin: 50,
          transformOrigin: 50,
        }}
      >
        <animate
          attributeName='stroke-dashoffset'
          dur='2s'
          keyTimes='0;1'
          repeatCount='indefinite'
          values='0;256.58892822265625'
        ></animate>
      </path>
    </svg>
  );
}
