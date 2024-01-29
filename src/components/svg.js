

// export const SrcSvg = () => <svg className="w-6 h-6 m-1 text-gray-600 hover:cursor-move" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
// <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
// </svg>

// export const DstSvg = () => <svg className="w-6 h-6 m-1 text-gray-600 hover:cursor-move" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
// <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12Zm0 0v6M4.5 7A2.5 2.5 0 0 1 7 4.5"/>
// </svg>

export function SrcSvg() {
  return (
    <svg
      className="w-full h-full text-gray-800 hover:cursor-move"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75z" />
      <path d="M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0112 5c.78 0 1.5.108 2.161.306" />
    </svg>
  );
}
// export function DstSvg() {
//   return (
//     <svg
//       className="w-8 h-8 text-gray-600 hover:cursor-move"
//       viewBox="0 0 24 24"
//     >
//       <path d="M20.16 12.73A6.27 6.27 0 0019.09 3c-2.01-1.33-4.7-1.34-6.73-.03-1.76 1.13-2.73 2.89-2.9 4.71-.13 1.32-.63 2.55-1.55 3.47l-.03.03c-1.16 1.16-1.16 2.93-.07 4.01l.99.99a2.794 2.794 0 003.95 0c.97-.97 2.25-1.5 3.64-1.65 1.37-.15 2.71-.75 3.77-1.8m-13.9 7.13c.27.56.18 1.24-.29 1.7a1.49 1.49 0 01-2.55-.98 1.49 1.49 0 01-.98-2.55c.46-.46 1.15-.56 1.7-.29l2.48-2.43c.14.19.3.41.48.59l.99.99c.21.2.41.37.67.52l-2.5 2.45z" />
//     </svg>
//   );
// }

export function DstSvg() {
  return (
    <svg
      className="w-full h-full text-gray-500 hover:cursor-move"
      viewBox="0 0 24 24"
    >
      <path d="M15.71 4c.83 0 1.62.22 2.29.66 1.14.74 1.84 1.87 2 3.18a4.37 4.37 0 01-1.25 3.47c-.7.69-1.59 1.13-2.57 1.23-1.91.2-3.59.96-4.84 2.23a.809.809 0 01-1.13 0l-.99-.99a.743.743 0 01-.22-.53c0-.25.11-.47.32-.68 1.21-1.22 1.95-2.84 2.13-4.7.13-1.33.84-2.47 2-3.22.66-.43 1.44-.65 2.26-.65m0-2c-1.17 0-2.34.32-3.35.97-1.76 1.13-2.73 2.89-2.9 4.71-.13 1.32-.63 2.55-1.55 3.47l-.03.03c-1.16 1.16-1.16 2.93-.07 4.01l.99.99c.55.55 1.26.82 1.97.82s1.43-.27 1.98-.82c.97-.97 2.25-1.5 3.64-1.65 1.37-.15 2.71-.75 3.77-1.8A6.27 6.27 0 0019.09 3c-1.01-.67-2.19-1-3.38-1M6.26 19.86c.27.56.18 1.24-.29 1.7a1.49 1.49 0 01-2.55-.98 1.49 1.49 0 01-.98-2.55c.46-.46 1.15-.56 1.7-.29l2.48-2.43c.14.19.3.41.48.59l.99.99c.21.2.41.37.67.52l-2.5 2.45z" />
    </svg>
  );
}

export const ArrowUp = () => <svg className="w-full h-full text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
</svg>;

export const ArrowDown = () => <svg className="w-full h-full text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
</svg>;