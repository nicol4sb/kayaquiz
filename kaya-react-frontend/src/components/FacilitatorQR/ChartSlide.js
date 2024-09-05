import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { colorMapping } from "../../utils/constants";

// Label mapping to translate SSP keys to temperature values
const sspLabelMapping = {
  "SSP119": "1.5°C",
  "SSP126": "2°C",
  "SSP245": "3°C",
  "SSP370": "4°C",
  "SSP585": "5°C",
};

function ChartSlide({ data }) {
  return (
    <div className="slide">
      <ResponsiveContainer width="100%" height={500}> {/* Increased height */}
        <BarChart
          data={data}
          margin={{ top: 40, right: 60, left: 80, bottom: 40 }}  // Increased left margin
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 24 }}  // Increased font size
            padding={{ left: 20, right: 20 }}
            tickFormatter={(name) => sspLabelMapping[name] || name}
          />
          <YAxis
            label={{
              value: "Participants",
              angle: -90,
              position: "outsideLeft",  // Move the label outside the chart area
              dx: -20,  // Adjust horizontal offset to move the label further left
              fontSize: 24,  // Increased font size
            }}
            tick={{ fontSize: 24 }}  // Increased font size for Y-axis ticks
          />
          <Tooltip
            contentStyle={{ fontSize: 18 }}  // Increased tooltip font size
            formatter={(value, name) => [value, sspLabelMapping[name] || name]}  // Translate SSP to temperature
          />
          <Legend wrapperStyle={{ fontSize: 18 }} />  {/* Increased legend font size */}
          <Bar dataKey="participants" isAnimationActive={false} barSize={80}>  {/* Increased bar size */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMapping[entry.name] || "#8884d8"}
              />
            ))}
            <LabelList
              dataKey="participants"
              position="top"
              fontSize={24}  // Increased label font size
              formatter={(value) =>
                `${(
                  (value /
                    data.reduce((acc, cur) => acc + cur.participants, 0)) *
                  100
                ).toFixed(2)}%`
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartSlide;
