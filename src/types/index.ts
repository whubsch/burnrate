export interface MeetingAttendee {
  seniority: string;
  count: number;
}

export interface MeetingData {
  duration: number;
  attendees: MeetingAttendee[];
}

export interface CalculationResult {
  totalCost: number;
  breakdown: {
    seniority: string;
    count: number;
    rate: number;
    subtotal: number;
  }[];
}
