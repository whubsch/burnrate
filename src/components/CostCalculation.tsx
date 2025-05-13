import { Button } from "@heroui/button";

import { CalculationResult } from "../types";

interface CostCalculationProps {
  result: CalculationResult | null;
}

export function CostCalculation({ result }: CostCalculationProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Cost</h2>

      <div className="p-4 border rounded bg-gray-50">
        <div className="text-2xl font-bold text-center mb-4">
          <Button disabled color="success" size="lg" variant="flat">
            ${result.totalCost.toLocaleString("en-US")}
          </Button>
        </div>

        {result.breakdown.length > 0 && (
          <div>
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
                    <td className="text-right p-2">{item.count}</td>
                    <td className="text-right p-2">${item.rate.toFixed(2)}</td>
                    <td className="text-right p-2">
                      ${item.subtotal.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
