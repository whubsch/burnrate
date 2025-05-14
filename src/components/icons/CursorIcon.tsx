interface CursorIconProps {
  isSelected?: boolean;
  className?: string;
}

export function CursorIcon({
  isSelected = false,
  className = "",
}: CursorIconProps) {
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
        d="M12 7v10m0-10a4 4 0 0 0-4-4H7m5 4a4 4 0 0 1 4-4h1m-5 14a4 4 0 0 1-4 4H7m5-4a4 4 0 0 0 4 4h1m-8-9h6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
