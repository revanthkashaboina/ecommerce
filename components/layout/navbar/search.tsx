// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { createUrl } from 'lib/utils';

// export default function Search() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [searchValue, setSearchValue] = useState('');

//   useEffect(() => {
//     setSearchValue(searchParams?.get('q') || '');
//   }, [searchParams, setSearchValue]);

//   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const val = e.target as HTMLFormElement;
//     const search = val.search as HTMLInputElement;
//     const newParams = new URLSearchParams(searchParams.toString());

//     if (search.value) {
//       newParams.set('q', search.value);
//     } else {
//       newParams.delete('q');
//     }

//     router.push(createUrl('/search', newParams));
//   }

//   return (
//     <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
//       <input
//         type="text"
//         name="search"
//         placeholder="Search for products..."
//         autoComplete="off"
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
//       />
//       <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
//         <MagnifyingGlassIcon className="h-4" />
//       </div>
//     </form>
//   );
// }

//============================================================================================================
import React, { useState, useEffect, useRef } from 'react';
import Typesense from 'typesense';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = async (query) => {
    setSearchTerm(query);

    const client = new Typesense.Client({
      nodes: [
        {
          host: '95.216.171.30',
          port: 8108,
          protocol: 'http'
        }
      ],
      apiKey: 'exceloid-test'
    });

    try {
      const response = await client.collections('Products').documents().search({
        q: query,
        query_by: 'title',
        per_page: 5
      });

      if (query === '') {
        setSuggestions([]);
      } else {
        const hits = response.hits;
        if (hits.length === 0) {
          setSuggestions([{ title: 'Products not found', imageUrl: '' }]);
        } else {
          setSuggestions(
            hits.map((hit) => ({
              title: hit.document.title,
              imageUrl: hit.document.featuredImage.url
            }))
          );
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    if (suggestion.title !== 'Products not found') {
      handleSearch(suggestion.title);
    }
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        style={{
          height: '30px',
          width: '300px',
          margin: '10px',
          borderRadius: '20px',
          padding: '5px'
        }}
      />

      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            right: '0',
            zIndex: '1',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            borderRadius: '20px'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {suggestion.imageUrl && (
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    style={{
                      width: '30px',
                      height: '30px',
                      marginRight: '8px',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <span>{suggestion.title}</span>
              </div>
              {index < suggestions.length - 1 && (
                <div style={{ borderBottom: '1px solid #ccc' }}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

//=============================================================================================================>>>>>
// import Autocomplete from '../../products/Autocomplete';
// import 'instantsearch.css/themes/satellite.css';
// // import { ThreeItemGridItem } from 'components/products';
// import {
//   InstantSearch,
//   SearchBox,
//   Configure,
//   Hits,
//   Pagination,
//   InfiniteHits,
//   connectAutoComplete
// } from 'react-instantsearch-dom';
// // import TypesenseSearch from "../../products/index"
// // import Hitcomponent from '../../products/index';

// const CustomAutocomplete = connectAutoComplete(Autocomplete);

// import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
// const TYPESENSE_SERVER_CONFIG = {
//   apiKey: 'exceloid-test',
//   nodes: [
//     {
//       host: '95.216.171.30',
//       port: 8108,
//       protocol: 'http',
//     },
//   ],
// };

// const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
//   server: TYPESENSE_SERVER_CONFIG,
//   additionalSearchParameters: {
//     query_by: 'title,description',
//     num_typos: 1,
//     typo_tokens_threshold: 1,
//   },
// });

// export default function Search() {

//   return (
//     <div>
//       <InstantSearch indexName="Products" searchClient={typesenseInstantsearchAdapter.searchClient}>
//         <CustomAutocomplete />
//         {/* <Hits hitComponent={({ hit }: { hit: any }) => <ThreeItemGridItem item={hit} size="half" priority={true} />} />
//         <Configure hitsPerPage={100} /> */}
//       </InstantSearch>
//     </div>
//   );
// }
