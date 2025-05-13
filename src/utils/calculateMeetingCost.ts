import { salaryData } from "../data/salaryData";
import { CalculationResult, MeetingData } from "../types";

export function calculateMeetingCost(
  meetingData: MeetingData,
): CalculationResult {
  const { duration, attendees } = meetingData;

  let totalCost = 0;
  const breakdown = attendees.map((attendee) => {
    const seniorityData = salaryData.find(
      (s) => s.level === attendee.seniority,
    );
    const rate = seniorityData?.hourlyRate || 0;
    const subtotal = rate * attendee.count * duration;

    totalCost += subtotal;

    return {
      seniority: seniorityData?.title || attendee.seniority,
      count: attendee.count,
      rate,
      subtotal,
    };
  });

  return {
    totalCost,
    breakdown,
  };
}
