interface PlusIconProps {
  className?: string;
  color?: string;
}

export function PlusIcon({ className = "", color = "#000" }: PlusIconProps) {
  return (
    <svg
      className={className}
      fill={color}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}
