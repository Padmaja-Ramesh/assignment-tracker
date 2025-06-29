const MCP_API_BASE_URL = process.env.REACT_APP_MCP_API_URL;
const MCP_API_TOKEN = process.env.REACT_APP_MCP_API_TOKEN;

export async function getProfilesByLocation(location) {
  try {
    const response = await fetch(`${MCP_API_BASE_URL}/get-profiles-by-location`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MCP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profiles by location:', error);
    return [];
  }
}

export async function getHiringProfiles() {
  try {
    const response = await fetch(`${MCP_API_BASE_URL}/get-hiring-profiles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MCP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching hiring profiles:', error);
    return [];
  }
}
