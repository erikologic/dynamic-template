import { PieChart } from "@mui/x-charts";
import { getLatest } from "../helpers";
import { Type, type Static } from "@sinclair/typebox";

export const pieChartSchema = Type.Object({
  type: Type.Const("pie"),
  props: Type.Object({
    labels: Type.Array(Type.String()),
    fullPage: Type.Optional(Type.Boolean()),
  }),
});

type PieChartSchema = Static<typeof pieChartSchema>;

export function StraightAnglePieChart({
  labels,
  fullPage,
}: PieChartSchema["props"]) {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}`,
          startAngle: -90,
          endAngle: 90,
          data: labels.map((label) => ({ label, value: getLatest(label) })),
        },
      ]}
      height={fullPage ? 800 : 300}
    />
  );
}
