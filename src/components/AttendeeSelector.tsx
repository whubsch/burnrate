import { useState } from "react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";

import { MeetingAttendee } from "../types";
import { salaryData } from "../data/salaryData";
import { formatCurrency } from "../utils/format";

import { AttendeeCard } from "./AttendeeCard";
import { UserIcon } from "./icons/UserIcon";

interface AttendeeSelectorProps {
  attendees: MeetingAttendee[];
  onUpdate: (attendees: MeetingAttendee[]) => void;
}

export function AttendeeSelector({
  attendees,
  onUpdate,
}: AttendeeSelectorProps) {
  const [selectedSeniority, setSelectedSeniority] = useState<string | null>(
    null,
  );
  const [attendeeCount, setAttendeeCount] = useState(1);

  const addAttendees = () => {
    if (!selectedSeniority) return;

    const existingIndex = attendees.findIndex(
      (a) => a.seniority === selectedSeniority,
    );

    if (existingIndex >= 0) {
      const updatedAttendees = [...attendees];

      updatedAttendees[existingIndex] = {
        ...updatedAttendees[existingIndex],
        count: updatedAttendees[existingIndex].count + attendeeCount,
      };
      onUpdate(updatedAttendees);
    } else {
      onUpdate([
        ...attendees,
        {
          seniority: selectedSeniority,
          count: attendeeCount,
        },
      ]);
    }

    setAttendeeCount(1);
  };

  const updateAttendeeCount = (seniority: string, count: number) => {
    const updatedAttendees = [...attendees];
    const index = updatedAttendees.findIndex((a) => a.seniority === seniority);

    if (count <= 0) {
      if (index >= 0) {
        updatedAttendees.splice(index, 1);
      }
    } else if (index >= 0) {
      updatedAttendees[index].count = count;
    }

    onUpdate(updatedAttendees);
  };

  const incrementAttendeeCount = (seniority: string) => {
    const index = attendees.findIndex((a) => a.seniority === seniority);

    if (index >= 0) {
      const updatedAttendees = [...attendees];

      updatedAttendees[index] = {
        ...updatedAttendees[index],
        count: updatedAttendees[index].count + 1,
      };
      onUpdate(updatedAttendees);
    }
  };

  const decrementAttendeeCount = (seniority: string) => {
    const index = attendees.findIndex((a) => a.seniority === seniority);

    if (index >= 0) {
      const updatedAttendees = [...attendees];
      const newCount = Math.max(0, updatedAttendees[index].count - 1);

      if (newCount === 0) {
        updatedAttendees.splice(index, 1);
      } else {
        updatedAttendees[index] = {
          ...updatedAttendees[index],
          count: newCount,
        };
      }

      onUpdate(updatedAttendees);
    }
  };

  const getSeniorityTitle = (level: string | null) => {
    if (!level) return "Select Seniority";

    return salaryData.find((s) => s.level === level)?.title || level;
  };

  return (
    <Card className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Attendees</h2>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Select
          className="w-64"
          label="Seniority"
          selectedKeys={selectedSeniority ? [selectedSeniority] : []}
          size="sm"
          onSelectionChange={(keys) =>
            setSelectedSeniority(Array.from(keys)[0] as string)
          }
        >
          {salaryData.map((salary) => (
            <SelectItem
              key={salary.level}
              endContent={
                <Chip size="sm" variant="faded">
                  {formatCurrency(salary.hourlyRate)}/hr
                </Chip>
              }
              textValue={salary.title}
              // value={salary.level}
            >
              {salary.title}
            </SelectItem>
          ))}
        </Select>

        <Input
          className="w-24 h-12"
          label="Count"
          min={1}
          size="sm"
          type="number"
          value={attendeeCount.toString()}
          onChange={(e) => setAttendeeCount(parseInt(e.target.value) || 1)}
        />

        <Button
          color="primary"
          isDisabled={!selectedSeniority}
          startContent={<UserIcon className="h-6 w-6 " />}
          onPress={addAttendees}
        >
          Add
        </Button>
      </div>
      {attendees.length === 0 && (
        <span className="text-default-500 text-sm">
          Add attendees to calculate cost
        </span>
      )}
      {attendees.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded bg-default-50">
          {attendees.map((attendee) => {
            const salaryInfo = salaryData.find(
              (s) => s.level === attendee.seniority,
            );

            return (
              <AttendeeCard
                key={attendee.seniority}
                count={attendee.count}
                getSeniorityTitle={getSeniorityTitle}
                hourlyRate={salaryInfo?.hourlyRate || 0}
                seniority={attendee.seniority}
                onDecrement={() => decrementAttendeeCount(attendee.seniority)}
                onIncrement={() => incrementAttendeeCount(attendee.seniority)}
                onRemove={() => updateAttendeeCount(attendee.seniority, 0)}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
}
