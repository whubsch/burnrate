import { Button, ButtonGroup } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";

interface MeetingDurationProps {
  manualDuration: number;
  timerDuration: number;
  onUpdateManualDuration: (duration: number) => void;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  durationMode: "manual" | "timer";
  onChangeDurationMode: (mode: "manual" | "timer") => void;
}

export function MeetingDuration({
  manualDuration,
  timerDuration,
  onUpdateManualDuration,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  durationMode,
  onChangeDurationMode,
}: MeetingDurationProps) {
  // Convert timerDuration to hours, minutes, seconds
  const hours = Math.floor(timerDuration);
  const minutes = Math.floor((timerDuration % 1) * 60);
  const seconds = Math.floor((((timerDuration % 1) * 60) % 1) * 60);

  return (
    <Card className="space-y-2 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Duration</h2>

        <ButtonGroup>
          <Button
            color={durationMode === "timer" ? "primary" : "default"}
            onPress={() => onChangeDurationMode("timer")}
          >
            <svg
              className={`w-5 h-5 ${durationMode === "timer" ? "stroke-white" : "stroke-black"}`}
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
          </Button>
          <Button
            color={durationMode === "manual" ? "primary" : "default"}
            onPress={() => onChangeDurationMode("manual")}
          >
            <svg
              className={`w-5 h-5 ${durationMode === "manual" ? "stroke-white" : "stroke-black"}`}
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
          </Button>
        </ButtonGroup>
      </div>

      {durationMode === "manual" ? (
        <div className="flex items-center justify-center gap-2 min-h-28">
          <Input
            className="w-32"
            endContent={<div className="pointer-events-none">hr</div>}
            label="Hours"
            min={0.25}
            step={0.25}
            type="number"
            value={manualDuration.toString()}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              if (!isNaN(value) && value >= 0) {
                onUpdateManualDuration(value);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 min-h-28">
          <div className="flex items-center justify-center gap-2">
            <Chip
              className="font-mono text-2xl h-12 text-center"
              variant="bordered"
            >
              {hours ? (
                <>
                  {hours.toString().padStart(2, "0")}
                  <span className="text-lg">:</span>
                </>
              ) : null}
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Chip>
          </div>

          <div className="flex gap-2">
            <Button
              className="min-w-24"
              color={isTimerRunning ? "danger" : "primary"}
              onPress={onToggleTimer}
            >
              {isTimerRunning
                ? "Pause"
                : timerDuration === 0
                  ? "Start"
                  : "Resume"}
            </Button>

            <Button
              className="min-w-24"
              color="default"
              isDisabled={timerDuration === 0 || isTimerRunning}
              variant="flat"
              onPress={onResetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        {durationMode === "manual"
          ? "Enter meeting duration in hours (e.g. 1.5 for 90 minutes)"
          : "Start the timer to track meeting duration automatically"}
      </div>
    </Card>
  );
}
