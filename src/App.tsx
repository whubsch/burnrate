import { useState, useEffect } from "react";

import { AttendeeSelector } from "./components/AttendeeSelector";
import { MeetingDuration } from "./components/MeetingDuration";
import { CostCalculation } from "./components/CostCalculation";
import { calculateMeetingCost } from "./utils/calculateMeetingCost";
import { MeetingAttendee, CalculationResult } from "./types";

function App() {
  const [attendees, setAttendees] = useState<MeetingAttendee[]>([]);
  const [duration, setDuration] = useState<number>(1);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  useEffect(() => {
    // Recalculate whenever inputs change
    if (attendees.length > 0 && duration > 0) {
      const result = calculateMeetingCost({ attendees, duration });

      setCalculationResult(result);
    } else {
      setCalculationResult(null);
    }
  }, [attendees, duration]);

  return (
    <div className="mx-auto p-4 max-w-3xl space-y-4 h-screen">
      <h1 className="text-2xl font-bold">BurnRate</h1>
      <h3 className="text-lg text-default-500">
        Calculate the cost of a US Government meeting based on attendees and
        duration
      </h3>
      <h3 className="text-md text-default-400">
        Estimated cost will always be less than actual cost because it does not
        factor in overtime, step level, or bonus pay.
      </h3>

      <div className="space-y-8">
        <AttendeeSelector attendees={attendees} onUpdate={setAttendees} />

        <MeetingDuration duration={duration} onUpdate={setDuration} />

        <CostCalculation result={calculationResult} />
      </div>
    </div>
  );
}

export default App;
