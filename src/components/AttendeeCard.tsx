import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";

import { formatCurrency } from "../utils/format";

import { TrashIcon } from "./icons/TrashIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { MinusIcon } from "./icons/MinusIcon";

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
            variant="flat"
            onPress={onDecrement}
          >
            <MinusIcon className="w-6 h-6" />
          </Button>
          <span className="text-2xl mx-4">{count}</span>
          <Button
            isIconOnly
            color="default"
            variant="flat"
            onPress={onIncrement}
          >
            <PlusIcon className="w-6 h-6" />
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
          <TrashIcon className="w-6 h-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
