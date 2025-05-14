import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

import { MeetingAttendee } from "../types";
import { salaryData } from "../data/salaryData";
import TrashIcon from "../assets/trash.svg";
import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";

interface AttendeeSelectorProps {
  attendees: MeetingAttendee[];
  onUpdate: (attendees: MeetingAttendee[]) => void;
}

export function AttendeeSelector({
  attendees,
  onUpdate,
}: AttendeeSelectorProps) {
  const [selectedSeniority, setSelectedSeniority] = useState(
    salaryData[0].level,
  );
  const [attendeeCount, setAttendeeCount] = useState(1);

  const addAttendees = () => {
    // Check if there's already an entry with the same seniority
    const existingIndex = attendees.findIndex(
      (a) => a.seniority === selectedSeniority,
    );

    if (existingIndex >= 0) {
      // Update existing entry
      const updatedAttendees = [...attendees];

      updatedAttendees[existingIndex] = {
        ...updatedAttendees[existingIndex],
        count: updatedAttendees[existingIndex].count + attendeeCount,
      };
      onUpdate(updatedAttendees);
    } else {
      // Add new entry
      onUpdate([
        ...attendees,
        {
          seniority: selectedSeniority,
          count: attendeeCount,
        },
      ]);
    }

    // Reset count to 1
    setAttendeeCount(1);
  };

  const updateAttendeeCount = (seniority: string, count: number) => {
    const updatedAttendees = [...attendees];
    const index = updatedAttendees.findIndex((a) => a.seniority === seniority);

    if (count <= 0) {
      // Remove the entry if count is 0 or negative
      if (index >= 0) {
        updatedAttendees.splice(index, 1);
      }
    } else if (index >= 0) {
      // Update existing entry
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

  const getSeniorityTitle = (level: string) => {
    return salaryData.find((s) => s.level === level)?.title || level;
  };

  return (
    <Card className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Attendees</h2>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Dropdown>
          <DropdownTrigger>
            <Button size="lg" variant="bordered">
              {getSeniorityTitle(selectedSeniority)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Seniority Levels"
            selectedKeys={[selectedSeniority]}
            selectionMode="single"
            onAction={(key) => setSelectedSeniority(key as string)}
          >
            {salaryData.map((salary) => (
              <DropdownItem key={salary.level} textValue={salary.title}>
                {salary.title} (${salary.hourlyRate}/hr)
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Input
          className="w-24 h-12"
          label="Count"
          min={1}
          size="sm"
          type="number"
          value={attendeeCount.toString()}
          onChange={(e) => setAttendeeCount(parseInt(e.target.value) || 1)}
        />

        <Button color="primary" onPress={addAttendees}>
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
              <Card key={attendee.seniority} className="w-full">
                <CardHeader className="justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-primary-800">
                      {getSeniorityTitle(attendee.seniority)}
                    </h3>
                    <p className="text-small text-default-500">
                      ${salaryInfo?.hourlyRate}/hr
                    </p>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <Button
                      isIconOnly
                      color="default"
                      isDisabled={attendee.count <= 1}
                      variant="light"
                      onPress={() => decrementAttendeeCount(attendee.seniority)}
                    >
                      <img alt="minus" className="w-4 h-4" src={MinusIcon} />
                    </Button>
                    <span className="text-lg font-bold mx-4">
                      {attendee.count}
                    </span>
                    <Button
                      isIconOnly
                      color="default"
                      variant="light"
                      onPress={() => incrementAttendeeCount(attendee.seniority)}
                    >
                      <img alt="plus" className="w-4 h-4" src={PlusIcon} />
                    </Button>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    color="danger"
                    size="sm"
                    variant="flat"
                    onPress={() => updateAttendeeCount(attendee.seniority, 0)}
                  >
                    <img
                      alt="trash"
                      className="w-6 h-6 fill-red-500"
                      src={TrashIcon}
                    />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );
}
