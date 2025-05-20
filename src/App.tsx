import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";

import { AttendeeSelector } from "./components/AttendeeSelector";
import { MeetingDuration } from "./components/MeetingDuration";
import { CostCalculation } from "./components/CostCalculation";
import { calculateMeetingCost } from "./utils/calculateMeetingCost";
import { MeetingAttendee, CalculationResult } from "./types";
import { salaryData } from "./data/salaryData";
import { CopyIcon } from "./components/icons/CopyIcon";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [attendees, setAttendees] = useState<MeetingAttendee[]>(() => {
    // Initialize attendees from URL params
    const initialAttendees: MeetingAttendee[] = [];

    salaryData.forEach((salary) => {
      // Extract grade number from the level (e.g., 'grade12' -> '12')
      const count = searchParams.get(salary.level);

      if (count) {
        const parsedCount = parseInt(count, 10);

        if (parsedCount > 0) {
          initialAttendees.push({
            seniority: salary.level,
            count: parsedCount,
          });
        }
      }
    });

    return initialAttendees;
  });
  const [selectedMode, setSelectedMode] = useState<"manual" | "timer">(() => {
    // Initialize mode from URL params
    const modeParam = searchParams.get("mode");

    return modeParam === "timer" ? "timer" : "manual";
  });
  const [manualDuration, setManualDuration] = useState<number>(() => {
    // Initialize manual duration from URL params
    const durationParam = searchParams.get("duration");

    return selectedMode === "manual" && durationParam
      ? parseFloat(durationParam)
      : 0;
  });

  const [timerDuration, setTimerDuration] = useState<number>(() => {
    // Initialize timer duration from URL params
    const durationParam = searchParams.get("duration");

    return selectedMode === "timer" && durationParam
      ? parseFloat(durationParam)
      : 0;
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  // Update URL when attendees change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    // Remove existing grade parameters
    salaryData.forEach((salary) => {
      newParams.delete(salary.level);
    });

    // Add current attendees to parameters
    attendees.forEach((attendee) => {
      newParams.set(attendee.seniority, attendee.count.toString());
    });

    // Only update if params have changed
    const paramsString = newParams.toString();

    if (paramsString !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  }, [attendees, setSearchParams]);

  // Update URL when duration changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    const currentDuration =
      selectedMode === "manual" ? manualDuration : timerDuration;

    if (currentDuration > 0) {
      newParams.set("duration", currentDuration.toString());
    } else {
      newParams.delete("duration");
    }

    // Only update if params have changed
    const paramsString = newParams.toString();

    if (paramsString !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  }, [manualDuration, timerDuration, selectedMode, setSearchParams]);

  // Update URL when mode changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedMode === "timer") {
      newParams.set("mode", "timer");
    } else {
      newParams.delete("mode");
    }

    // Only update if params have changed
    const paramsString = newParams.toString();

    if (paramsString !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  }, [selectedMode, setSearchParams]);

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
          <Button
            isIconOnly
            variant="bordered"
            onPress={() => {
              const currentUrl = window.location.href;

              navigator.clipboard.writeText(currentUrl);
            }}
          >
            <CopyIcon />
          </Button>
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
          <h3 className="text-sm text-default-400">
            Estimated cost will always be less than actual cost because it does
            not account for overtime, step level, bonus pay, or other factors.
            The data is based on Washington DC locality pay rates for 2025.
            Contribute to the project{" "}
            <a
              className="text-primary-500"
              href="https://github.com/whubsch/burnrate"
              rel="noreferrer"
              target="_blank"
            >
              on GitHub
            </a>
            .
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
