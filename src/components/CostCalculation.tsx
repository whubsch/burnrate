import { useState } from "react";
import { Chip } from "@heroui/chip";
import { Card } from "@heroui/card";
import { Switch } from "@heroui/switch";

import { CalculationResult } from "../types";
import { formatCurrency } from "../utils/format";

interface CostCalculationProps {
  result: CalculationResult | null;
}

export function CostCalculation({ result }: CostCalculationProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!result) {
    return null;
  }

  return (
    <Card className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Cost</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Show Breakdown</span>
          <Switch isSelected={showBreakdown} onValueChange={setShowBreakdown} />
        </div>
      </div>

      <div className="text-center mb-4">
        <Chip className="h-14" color="success" size="lg" variant="flat">
          <span className="text-2xl m-1">
            {formatCurrency(result.totalCost)}
          </span>
        </Chip>
      </div>

      {showBreakdown && result.breakdown.length > 0 && (
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
              {result.breakdown.map((item, index) => (
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
