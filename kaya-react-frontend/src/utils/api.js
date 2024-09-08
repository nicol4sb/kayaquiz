export async function fetchFacilitator(facilitatorId, location) {
  if (location.state?.facilitatorName) {
    return location.state.facilitatorName;
  }

  const response = await fetch(`/api/facilitator/${facilitatorId}`);
  const data = await response.json();
  return data.name || "Unknown Facilitator";
}

const formatDateToLocal = (dateString) => {
  console.log("Original date string:", dateString); // Debug log for the original string

  try {
    // Create a new Date object assuming the dateString is in UTC
    const utcDate = new Date(dateString + " UTC"); // Append 'UTC' to ensure the string is parsed as UTC time

    if (isNaN(utcDate.getTime())) {
      // If the date is invalid, throw an error
      throw new Error("Invalid Date Format");
    }

    console.log("Parsed date object:", utcDate); // Debug log for the parsed UTC date object

    // Convert the date to the local time string
    const localDate = utcDate.toLocaleString();
    console.log("Local date string:", localDate); // Debug log for the local date string

    return localDate; // Return the local time as a string
  } catch (error) {
    console.error("Error parsing date:", error); // Log any errors
    return "Invalid date"; // Return an error message if something goes wrong
  }
};

export async function fetchLastSessions(facilitatorId) {
  const response = await fetch(
    `/api/lastSessions?facilitatorId=${facilitatorId}`
  );
  const sessions = await response.json();

  return Array.isArray(sessions)
    ? sessions.map((session) => ({
        ...session,
        date: formatDateToLocal(session.date), // Use formatDateToLocal to convert date
      }))
    : [];
}

export async function fetchSessionResults(sessionId) {
  const response = await fetch(`/api/sessionResults?sessionId=${sessionId}`);
  const data = await response.json();
  return data.map((item) => ({
    name: item.text, // Assuming `text` refers to SSP, you can modify accordingly
    participants: item.value,
  }));
}
