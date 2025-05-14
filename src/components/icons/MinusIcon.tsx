interface MinusIconProps {
  className?: string;
  color?: string;
}

export function MinusIcon({ className = "", color = "#000" }: MinusIconProps) {
  return (
    <svg
      className={className}
      height="800"
      viewBox="0 -12 32 32"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 0H4a4 4 0 1 0 0 8h24a4 4 0 1 0 0-8"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
}
