import React, { useState, useEffect } from 'react';
import './GroupSearch.css'
import { useSignals } from '@preact/signals-react/runtime';
import { jwtToken } from '../components/AuSignal';

function GroupSearch() {
  useSignals();
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [involvedGroups, setInvolvedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Hae kaikki ryhmät
    const fetchGroups = async () => {
      const response = await fetch('http://localhost:3001/user_group/all', {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });
      const data = await response.json();
      setDisplayedGroups(data.groups);
    };

    // Hae ryhmät, joissa käyttäjä on mukana
    const fetchInvolvedGroups = async () => {
      const response = await fetch('http://localhost:3001/group_request/user_involved_groups', {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });
      const data = await response.json();
      setInvolvedGroups(data.involvedGroups.map(group => group.group_id));
    };

    fetchGroups();
    fetchInvolvedGroups();
  }, []);

  useEffect(() => {
    const filteredGroups = displayedGroups.filter(group =>
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedGroups(filteredGroups);
  }, [searchTerm]);

  const handleJoinRequest = async (groupId) => {
    // join request logic
  };

  return (
    <div className="group-list">
      <form>
        <input type="text" placeholder="Search groups" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      {displayedGroups.map((group) => (
        <div className="group-list-item" key={group.group_id}>
          <h2>{group.group_name}</h2>
          <p>Description: {group.description}</p>
          {jwtToken.value && !involvedGroups.includes(group.group_id) && 
            <button onClick={() => handleJoinRequest(group.group_id)}>Send join request</button>
          }
        </div>
      ))}
    </div>
  );
}

export default GroupSearch;