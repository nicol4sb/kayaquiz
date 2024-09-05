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
import { colorMapping, sspLabelMapping } from "../../utils/constants";  // Import both mappings

function ChartSlide({ data }) {
  return (
    <div className="slide">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{ top: 40, right: 60, left: 120, bottom: 40 }}  
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 24 }}  
            padding={{ left: 20, right: 20 }}
            tickFormatter={(name) => sspLabelMapping[name] || name}  // Use the label mapping for XAxis
          />
          <YAxis
            allowDecimals={false}  // Ensure the Y-axis only shows integer values
            label={{
              value: "Participants",
              angle: -90,
              position: "outsideLeft",
              dx: -60,  // Push the Y-axis label even farther
              fontSize: 24,
            }}
            tick={{ fontSize: 24 }} 
          />
          <Tooltip
            contentStyle={{ fontSize: 18 }}  
            labelFormatter={(label) => sspLabelMapping[label] || label}  // Translate SSP key in tooltip header
            formatter={(value, name) => [value, "Participants"]}  // Correctly display "Participants" in tooltip
          />
          <Legend wrapperStyle={{ fontSize: 18 }} />
          <Bar dataKey="participants" isAnimationActive={false} barSize={80}> 
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMapping[entry.name] || "#8884d8"}  
              />
            ))}
            <LabelList
              dataKey="participants"
              position="top"
              fontSize={24}  
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
