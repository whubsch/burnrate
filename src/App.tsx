import { useState, useEffect, useCallback } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import { AttendeeSelector } from "./components/AttendeeSelector";
import { MeetingDuration } from "./components/MeetingDuration";
import { CostCalculation } from "./components/CostCalculation";
import { calculateMeetingCost } from "./utils/calculateMeetingCost";
import { MeetingAttendee, CalculationResult } from "./types";

function App() {
  const [attendees, setAttendees] = useState<MeetingAttendee[]>([]);
  const [manualDuration, setManualDuration] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<"manual" | "timer">("timer");
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  // Timer effect to update duration
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning && selectedMode === "timer") {
      intervalId = setInterval(() => {
        setTimerDuration((prevDuration) => {
          const newDuration = Number(
            (prevDuration + (3600 * 2) ** -1).toFixed(8),
          );

          return newDuration;
        });
      }, 500); // 600ms = 0.01 hours
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning, selectedMode]);

  // Calculation effect
  useEffect(() => {
    const currentDuration =
      selectedMode === "manual" ? manualDuration : timerDuration;

    if (attendees.length > 0 && currentDuration > 0) {
      const result = calculateMeetingCost({
        attendees,
        duration: currentDuration,
      });

      setCalculationResult(result);
    } else {
      setCalculationResult(null);
    }
  }, [attendees, manualDuration, timerDuration, selectedMode]);

  // Handler to start/pause timer
  const toggleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, []);

  // Handler to reset timer
  const resetTimer = useCallback(() => {
    setTimerDuration(0);
    setIsTimerRunning(false);
  }, []);

  return (
    <>
      <Navbar>
        <NavbarBrand className="gap-2">
          <img
            alt="BurnRate Logo"
            className="h-5 w-5"
            src="/burnrate/logo.png"
          />
          <span className="text-2xl font-semibold">BurnRate</span>
        </NavbarBrand>
        <NavbarContent justify="end">
          <h3 className="text-lg text-default-500">
            Calculate the cost of a US Government meeting
          </h3>
        </NavbarContent>
      </Navbar>
      <div className="mx-auto p-4 max-w-3xl space-y-4 h-screen w-screen m-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="col-span-1 row-span-2">
            <AttendeeSelector attendees={attendees} onUpdate={setAttendees} />
          </div>

          <div className="col-span-2 row-start-1">
            <MeetingDuration
              durationMode={selectedMode}
              isTimerRunning={isTimerRunning}
              manualDuration={manualDuration}
              timerDuration={timerDuration}
              onChangeDurationMode={setSelectedMode}
              onResetTimer={resetTimer}
              onToggleTimer={toggleTimer}
              onUpdateManualDuration={setManualDuration}
            />
          </div>

          <div className="col-span-2 row-start-2 mb-4">
            <CostCalculation result={calculationResult} />
          </div>
          <h3 className="text-md text-default-400">
            Estimated cost will always be less than actual cost because it does
            not account for overtime, step level, bonus pay, or other factors.
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
