import { Input } from "@heroui/input";

interface MeetingDurationProps {
  duration: number;
  onUpdate: (duration: number) => void;
}

export function MeetingDuration({ duration, onUpdate }: MeetingDurationProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Duration</h2>
      <div className="flex items-center gap-2">
        <Input
          className="w-32"
          endContent={<div className="pointer-events-none">hr</div>}
          label="Hours"
          min={0.25}
          step={0.25}
          type="number"
          value={duration.toString()}
          onChange={(e) => {
            const value = parseFloat(e.target.value);

            if (!isNaN(value) && value >= 0) {
              onUpdate(value);
            }
          }}
        />
      </div>
      <div className="text-sm text-gray-500">
        Enter meeting duration in hours (e.g. 1.5 for 90 minutes)
      </div>
    </div>
  );
}
