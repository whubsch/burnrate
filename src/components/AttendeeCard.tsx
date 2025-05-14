import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

import MinusIcon from "../assets/minus.svg";
import PlusIcon from "../assets/plus.svg";

import { TrashIcon } from "./icons/TrashIcon";

interface AttendeeCardProps {
  seniority: string;
  count: number;
  hourlyRate: number;
  getSeniorityTitle: (level: string) => string;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export function AttendeeCard({
  seniority,
  count,
  hourlyRate,
  getSeniorityTitle,
  onDecrement,
  onIncrement,
  onRemove,
}: AttendeeCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-semibold text-primary-800">
            {getSeniorityTitle(seniority)}
          </h3>
          <p className="text-small text-default-500">${hourlyRate}/hr</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between">
          <Button
            isIconOnly
            color="default"
            isDisabled={count <= 1}
            variant="light"
            onPress={onDecrement}
          >
            <img alt="minus" className="w-4 h-4" src={MinusIcon} />
          </Button>
          <span className="text-lg font-bold mx-4">{count}</span>
          <Button
            isIconOnly
            color="default"
            variant="light"
            onPress={onIncrement}
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
          onPress={onRemove}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
