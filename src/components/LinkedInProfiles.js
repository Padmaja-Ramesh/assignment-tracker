import React, { useState } from 'react';
import { getProfilesByLocation, getHiringProfiles } from '../api/mcpApi';

function LinkedInProfiles() {
  const [locationProfiles, setLocationProfiles] = useState([]);
  const [hiringProfiles, setHiringProfiles] = useState([]);
  const [location, setLocation] = useState('');

  const handleSearchByLocation = async () => {
    const results = await getProfilesByLocation(location);
    setLocationProfiles(results.profiles || []);
  };

  const handleGetHiring = async () => {
    const results = await getHiringProfiles();
    setHiringProfiles(results.profiles || []);
  };

  return (
    <div>
      <h3>LinkedIn Profile Tools (MCP API)</h3>

      <div>
        <h4>Search Profiles by Location</h4>
        <input
          type="text"
          placeholder="Enter Location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearchByLocation}>Search</button>

        {locationProfiles.length > 0 && (
          <ul>
            {locationProfiles.map((profile, idx) => (
              <li key={idx}>{profile.name} - {profile.headline}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4>Hiring Profiles (MCP)</h4>
        <button onClick={handleGetHiring}>Fetch Hiring Profiles</button>

        {hiringProfiles.length > 0 && (
          <ul>
            {hiringProfiles.map((profile, idx) => (
              <li key={idx}>{profile.name} - {profile.headline}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LinkedInProfiles;
