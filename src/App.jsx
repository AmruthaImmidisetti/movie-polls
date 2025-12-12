// src/App.jsx (debug helper)
import React, { useEffect } from 'react';
import PollList from './components/PollList';
import ResultsModal from './components/ResultsModal';
import { fetchPolls } from './api/pollsApi';
import useLiveRefresh from './hooks/useLiveRefresh';
import { Toaster } from 'react-hot-toast';
import { usePollStore } from './store/usePollStore';

// small helper to peek into the mock data generator if available
import { generateMockPolls } from './api/mockData';

export default function App() {
  const {
    page,
    pageSize,
    filters,
    query,
    setLoading,
    addPolls,
    setPolls,
    hasMore,
  } = usePollStore((s) => ({
    page: s.page,
    pageSize: s.pageSize,
    filters: s.filters,
    query: s.query,
    setLoading: s.setLoading,
    addPolls: s.addPolls,
    setPolls: s.setPolls,
    hasMore: s.hasMore,
  }));

  // only enable live refresh after we confirm basic fetching works
  useLiveRefresh(8000);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const { polls, hasMore: more } = await fetchPolls({
          page,
          pageSize,
          filters,
          query,
        });

        if (!mounted) return;

        if (page === 0) {
          setPolls(polls, more);
        } else {
          addPolls(polls, more);
        }
      } catch (err) {
        console.error('Failed to fetch polls', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, filters, query, setLoading, addPolls, setPolls]);

  // DEBUG helper to inspect store and mock data
  const debugLog = () => {
    try {
      const state = usePollStore.getState();
      console.group('DEBUG: Poll Store');
      console.log('page:', state.page);
      console.log('filters:', state.filters);
      console.log('query:', state.query);
      console.log('polls length:', state.polls.length);
      console.log('first poll (if exists):', state.polls[0] || '(none)');
      console.log('hasMore:', state.hasMore);
      console.groupEnd();

      // try to show how many mock polls exist on server memory
      try {
        const mock = generateMockPolls(0); // harmless call (returns [])
        console.log('generateMockPolls available (OK)');
      } catch (e) {
        console.warn('generateMockPolls not available to inspect here.');
      }
    } catch (e) {
      console.error('Failed to read store via usePollStore.getState()', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Movie Polls</h1>
          
        </div>
        
      </header>

      <main>
        <PollList />
        <ResultsModal />
      </main>
    </div>
  );
}
