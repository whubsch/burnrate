interface TimerIconProps {
  isSelected?: boolean;
  className?: string;
}

export function TimerIcon({
  isSelected = false,
  className = "",
}: TimerIconProps) {
  return (
    <svg
      className={`w-5 h-5 ${isSelected ? "stroke-white" : "stroke-black"} ${className}`}
      fill="none"
      height="800"
      viewBox="0 0 24 24"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.516 7A9 9 0 1 0 12 3v3m0 6L8 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
