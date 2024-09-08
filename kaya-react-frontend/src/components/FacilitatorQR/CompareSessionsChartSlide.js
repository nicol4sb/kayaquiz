import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { fetchSessionResults, fetchLastSessions } from "../../utils/api";
import { sspLabelMapping } from "../../utils/constants";  // Import both mappings

function SecondSessionQRCodeSlide({ facilitatorId }) {
  const [session1Data, setSession1Data] = useState([]);
  const [session2Data, setSession2Data] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [session1Date, setSession1Date] = useState("");
  const [session2Date, setSession2Date] = useState("");

  useEffect(() => {
    const fetchSessionsData = async () => {
      try {
        const lastTwoSessions = await fetchLastSessions(facilitatorId);
        if (lastTwoSessions.length >= 2) {
          const session1 = lastTwoSessions[0].session_id;
          const session2 = lastTwoSessions[1].session_id;

          setSession1Date(lastTwoSessions[0].date);
          setSession2Date(lastTwoSessions[1].date);

          const session1Results = await fetchSessionResults(session1);
          const session2Results = await fetchSessionResults(session2);

          setSession1Data(session1Results);
          setSession2Data(session2Results);
        } else {
          console.error("Not enough sessions found.");
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessionsData();
  }, [facilitatorId]);

  useEffect(() => {
    if (session1Data.length > 0 && session2Data.length > 0) {
      const merged = mergeSessionData(session1Data, session2Data);
      setMergedData(merged);
    }
  }, [session1Data, session2Data]);

  const mergeSessionData = (session1Data, session2Data) => {
    const mergedData = {};

    session1Data.forEach((item) => {
      if (item.name) {
        mergedData[item.name] = { name: item.name, session1: item.participants };
      }
    });

    session2Data.forEach((item) => {
      if (item.name) {
        if (mergedData[item.name]) {
          mergedData[item.name].session2 = item.participants;
        } else {
          mergedData[item.name] = { name: item.name, session2: item.participants };
        }
      }
    });

    return Object.values(mergedData);
  };

  return (
    <div className="slide">
      <h3>Comparison of Last Two Sessions</h3>
      {mergedData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={mergedData}
              margin={{ top: 40, right: 60, left: 120, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 24 }}
                padding={{ left: 20, right: 20 }}
                tickFormatter={(name) => sspLabelMapping[name] || name}  // Convert SSP to temperature
              />
              <YAxis
                allowDecimals={false}
                label={{
                  value: "Participants",
                  angle: -90,
                  position: "outsideLeft",
                  dx: -60,
                  fontSize: 24,
                }}
                tick={{ fontSize: 24 }}
              />
              <Tooltip
                contentStyle={{ fontSize: 18 }}
                labelFormatter={(label) => sspLabelMapping[label] || label}  // Convert SSP in tooltip
                formatter={(value) => `${value} Participants`}
              />
              <Bar dataKey="session1" fill="#8884d8" barSize={80}>
                <LabelList
                  dataKey="session1"
                  position="top"
                  fontSize={24}
                  formatter={(value) => `${value}`}
                />
              </Bar>
              <Bar dataKey="session2" fill="#82ca9d" barSize={80}>
                <LabelList
                  dataKey="session2"
                  position="top"
                  fontSize={24}
                  formatter={(value) => `${value}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="session-dates">
            <p>Last session: {session1Date}</p>
            <p>Previous session: {session2Date}</p>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default SecondSessionQRCodeSlide;
