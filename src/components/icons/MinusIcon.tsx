interface MinusIconProps {
  className?: string;
  color?: string;
}

export function MinusIcon({ className = "", color = "#000" }: MinusIconProps) {
  return (
    <svg
      className={className}
      fill={color}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
    >
      <path d="M200-440v-80h560v80H200Z" />
    </svg>
  );
}
