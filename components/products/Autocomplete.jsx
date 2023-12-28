'use client';
import React, { useState } from 'react';
import { SearchBox } from 'react-instantsearch-dom';

const Autocomplete = ({ hits, currentRefinement, refine }) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    refine(suggestion);
  };

  const filteredHits = hits.filter((hit) => hit.title !== selectedSuggestion);
  const showAutocomplete = currentRefinement && filteredHits.length > 0;

  // Limit the number of suggestions to 8
  const limitedHits = filteredHits.slice(0, 8);

  return (
    <div style={{ position: 'relative', width: '500px' }}>
      <SearchBox autoFocus style={{ marginBottom: '10px' }} />
      {showAutocomplete && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff',
            zIndex: '1'
          }}
        >
          {limitedHits.map((hit) => (
            <div
              key={hit.objectID}
              onClick={() => handleSuggestionClick(hit.title)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                fontSize: '14px'
              }}
            >
              {hit.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
