interface PlusIconProps {
  className?: string;
  color?: string;
}

export function PlusIcon({ className = "", color = "#000" }: PlusIconProps) {
  return (
    <svg
      className={className}
      height="800"
      viewBox="0 0 32 32"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 12h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
}
