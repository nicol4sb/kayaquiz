export async function fetchFacilitator(facilitatorId, location) {
  if (location.state?.facilitatorName) {
    return location.state.facilitatorName;
  }

  const response = await fetch(`/api/facilitator/${facilitatorId}`);
  const data = await response.json();
  return data.name || "Unknown Facilitator";
}

// Function to convert the UTC session date string (DD/MM/YYYY HH:mm:ss) to local time
// Function to convert the UTC session date string to local time
const formatDateToLocal = (dateString) => {
  console.log("Original date string:", dateString); // Debug log for the original string

  try {
    // Check if the dateString is in a valid format
    const utcDate = new Date(dateString); // Create the date object from the string

    if (isNaN(utcDate.getTime())) {
      // If the date is invalid, log and return an error message
      console.error("Invalid date string:", dateString);
      return "Invalid date";
    }

    const localDate = utcDate.toLocaleString(); // Convert to local time string
    console.log("Local date string:", localDate); // Debug log for the local date string

    return localDate; // Return the local time as a string
  } catch (error) {
    console.error("Error parsing date:", error); // Log any errors
    return "Invalid date"; // Return an error message if something goes wrong
  }
};


export async function fetchLastSessions(facilitatorId) {
  const response = await fetch(`/api/lastSessions?facilitatorId=${facilitatorId}`);
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
