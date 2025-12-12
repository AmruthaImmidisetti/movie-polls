// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { usePollStore } from '../store/usePollStore';
import { fetchPolls } from '../api/pollsApi';

/**
 * Simple debounce hook (no external dependency).
 */
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const setQuery = usePollStore((s) => s.setQuery);
  const debouncedText = useDebouncedValue(text, 300);

  // update global query when debounced text changes
  useEffect(() => {
    setQuery(debouncedText);
  }, [debouncedText, setQuery]);

  // fetch suggestions when user types
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const q = text.trim();
        if (!q) {
          if (mounted) setSuggestions([]);
          return;
        }
        // small suggestion fetch: page 0, pageSize 50
        const { polls } = await fetchPolls({ page: 0, pageSize: 50, query: q });
        if (!mounted) return;
        setSuggestions(polls.slice(0, 8).map((p) => ({ id: p.id, title: p.title })));
      } catch (err) {
        // ignore suggestion errors
        if (mounted) setSuggestions([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [text]);

  // when user picks a suggestion, set the input text and global query
  const choose = (title) => {
    setText(title);
    setSuggestions([]);
    setQuery(title);
    // keep focus on input
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1" role="search" aria-label="Search polls">
      <label htmlFor="search" className="sr-only">Search polls</label>
      <input
        id="search"
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Search movie polls..."
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-expanded={suggestions.length > 0}
      />

      {suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          className="absolute left-0 right-0 bg-white shadow mt-1 max-h-48 overflow-auto z-20"
          role="listbox"
        >
          {suggestions.map((s) => (
            <li key={s.id} role="option" aria-selected="false">
              <button
                className="w-full text-left p-2 hover:bg-gray-100"
                onClick={() => choose(s.title)}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
