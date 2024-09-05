export async function fetchFacilitator(facilitatorId, location) {
  if (location.state?.facilitatorName) {
    return location.state.facilitatorName;
  }

  const response = await fetch(`/api/facilitator/${facilitatorId}`);
  const data = await response.json();
  return data.name || "Unknown Facilitator";
}

export async function fetchLastSessions(facilitatorId) {
  const response = await fetch(`/api/lastSessions?facilitatorId=${facilitatorId}`);
  const sessions = await response.json();
  return Array.isArray(sessions) ? sessions.map((session) => ({
    ...session,
    date: new Date(session.date).toLocaleString(), // Convert to local time
  })) : [];
}

export async function fetchSessionResults(sessionId) {
  const response = await fetch(`/api/sessionResults?sessionId=${sessionId}`);
  const data = await response.json();
  return data.map((item) => ({
    name: item.text, // Assuming `text` refers to SSP, you can modify accordingly
    participants: item.value,
  }));
}
