import { Chip } from "@heroui/chip";

import { formatDuration } from "../utils/format";

export function TimerDisplay({ timerDuration }: { timerDuration: number }) {
  const { formatted } = formatDuration(timerDuration);

  return (
    <div className="flex items-center justify-center gap-2">
      <Chip className="font-mono text-2xl h-12 text-center" variant="bordered">
        {formatted}
      </Chip>
    </div>
  );
}
