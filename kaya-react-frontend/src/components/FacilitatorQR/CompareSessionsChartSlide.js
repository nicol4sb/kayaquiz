import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { fetchLastSessions } from "../../utils/api"; // Assuming this API fetches last sessions
import { colorMapping, sspLabelMapping } from "../../utils/constants";

function CompareSessionsChartSlide({ facilitatorId }) {
  const [session1Data, setSession1Data] = useState([]);
  const [session2Data, setSession2Data] = useState([]);
  const [session1Date, setSession1Date] = useState("N/A");
  const [session2Date, setSession2Date] = useState("N/A");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    console.log("facilitatorId:", facilitatorId); // Debugging log to verify facilitatorId

    const loadLastTwoSessions = async () => {
      try {
        if (facilitatorId) {
          // Fetch the last sessions
          const lastSessions = await fetchLastSessions(facilitatorId);

          if (lastSessions.length >= 2) {
            // Set the data for the two most recent sessions
            setSession1Data(lastSessions[0].data || []);
            setSession1Date(lastSessions[0].date || "N/A");

            setSession2Data(lastSessions[1].data || []);
            setSession2Date(lastSessions[1].date || "N/A");

            setIsDataLoaded(true);
          } else {
            console.warn("Not enough sessions to compare.");
          }
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    loadLastTwoSessions();
  }, [facilitatorId]);

  if (!isDataLoaded) {
    return <p>Loading session comparison...</p>;
  }

  return (
    <div className="slide">
      <h3>Comparison of Last Two Sessions</h3>
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        {/* Chart for session 1 */}
        <div>
          <h4>Session on {session1Date}</h4>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={session1Data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={(name) => sspLabelMapping[name] || name} />
              <YAxis allowDecimals={false} />
              <Tooltip labelFormatter={(label) => sspLabelMapping[label] || label} />
              <Legend />
              <Bar dataKey="participants" fill="#8884d8">
                {session1Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMapping[entry.name] || "#8884d8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart for session 2 */}
        <div>
          <h4>Session on {session2Date}</h4>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={session2Data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={(name) => sspLabelMapping[name] || name} />
              <YAxis allowDecimals={false} />
              <Tooltip labelFormatter={(label) => sspLabelMapping[label] || label} />
              <Legend />
              <Bar dataKey="participants" fill="#8884d8">
                {session2Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMapping[entry.name] || "#8884d8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CompareSessionsChartSlide;
