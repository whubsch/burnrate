import { Button, ButtonGroup } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";

import { TimerDisplay } from "./TimerDisplay";
import { TimerIcon } from "./icons/TimerIcon";
import { CursorIcon } from "./icons/CursorIcon";

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
  return (
    <Card className="space-y-2 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Duration</h2>

        <ButtonGroup>
          <Button
            color={durationMode === "timer" ? "primary" : "default"}
            onPress={() => onChangeDurationMode("timer")}
          >
            <TimerIcon isSelected={durationMode === "timer"} />
          </Button>
          <Button
            color={durationMode === "manual" ? "primary" : "default"}
            onPress={() => onChangeDurationMode("manual")}
          >
            <CursorIcon isSelected={durationMode === "manual"} />
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
            <TimerDisplay timerDuration={timerDuration} />
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
