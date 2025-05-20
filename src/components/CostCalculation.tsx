import { useState } from "react";
import { Chip } from "@heroui/chip";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

import { CalculationResult } from "../types";
import { formatCurrency } from "../utils/format";

import { ReceiptIcon } from "./icons/ReceiptIcon";

interface CostCalculationProps {
  result: CalculationResult | null;
}

export function CostCalculation({ result }: CostCalculationProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalCost = result?.totalCost ?? 0;
  const breakdown = result?.breakdown ?? [];

  return (
    <Card className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Cost</h2>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            color={showBreakdown ? "primary" : "default"}
            isDisabled={totalCost === 0}
            onPress={() => setShowBreakdown(!showBreakdown)}
          >
            <ReceiptIcon isSelected={showBreakdown} />
          </Button>
        </div>
      </div>

      <div className="text-center mb-4">
        <Chip className="h-14" color="success" size="lg" variant="flat">
          <span className="text-2xl m-1 font-mono">
            {formatCurrency(totalCost)}
          </span>
        </Chip>
      </div>

      {showBreakdown && breakdown.length > 0 && (
        <div className="p-4 border rounded bg-default-50">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Seniority</th>
                <th className="text-right p-2">Count</th>
                <th className="text-right p-2">Rate ($/hr)</th>
                <th className="text-right p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.seniority}</td>
                  <td className="text-right p-2">
                    <span className="font-mono">{item.count}</span>
                  </td>
                  <td className="text-right p-2">
                    <span className="font-mono">
                      {formatCurrency(item.rate)}
                    </span>
                  </td>
                  <td className="text-right p-2">
                    <span className="font-mono">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
