import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";

import MinusIcon from "../assets/minus.svg";
import PlusIcon from "../assets/plus.svg";
import { formatCurrency } from "../utils/format";

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
      <CardHeader className="justify-between px-4">
        <h3 className="text-lg font-semibold">
          {getSeniorityTitle(seniority)}
        </h3>
        <Chip variant="flat">{formatCurrency(hourlyRate)}/hr</Chip>
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
          <span className="text-2xl mx-4">{count}</span>
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
