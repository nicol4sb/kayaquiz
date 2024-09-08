import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchSessionResults, fetchLastSessions } from "../../utils/api";

function CompareSessionsChartSlide({ facilitatorId }) {
  const [session1Data, setSession1Data] = useState([]);
  const [session2Data, setSession2Data] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  // Fetch the two most recent session data
  useEffect(() => {
    const fetchSessionsData = async () => {
      try {
        const lastTwoSessions = await fetchLastSessions(facilitatorId);
        if (lastTwoSessions.length >= 2) {
          const session1 = lastTwoSessions[0].session_id;
          const session2 = lastTwoSessions[1].session_id;

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

  // Merge session data when session1Data and session2Data are loaded
  useEffect(() => {
    if (session1Data.length > 0 && session2Data.length > 0) {
      const merged = mergeSessionData(session1Data, session2Data);
      setMergedData(merged);
    }
  }, [session1Data, session2Data]);

  // Function to merge session data
  const mergeSessionData = (session1Data, session2Data) => {
    const mergedData = {};

    // Map session 1 data
    session1Data.forEach((item) => {
      if (item.name) {
        mergedData[item.name] = { name: item.name, session1: item.participants };
      }
    });

    // Map session 2 data
    session2Data.forEach((item) => {
      if (item.name) {
        if (mergedData[item.name]) {
          mergedData[item.name].session2 = item.participants;
        } else {
          mergedData[item.name] = { name: item.name, session2: item.participants };
        }
      }
    });

    return Object.values(mergedData); // Convert the merged object into an array for Recharts
  };

  return (
    <div className="slide">
      <h3>Comparison of Last Two Sessions</h3>
      {mergedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="session1" fill="#8884d8" />
            <Bar dataKey="session2" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default CompareSessionsChartSlide;
