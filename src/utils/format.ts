export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {},
): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
}

export function formatDuration(durationInHours: number) {
  const hours = Math.floor(durationInHours);
  const minutes = Math.floor((durationInHours % 1) * 60);
  const seconds = Math.floor((((durationInHours % 1) * 60) % 1) * 60);

  return {
    hours,
    minutes,
    seconds,
    formatted: `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
  };
}
