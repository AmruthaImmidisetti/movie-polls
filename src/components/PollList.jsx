// src/components/PollList.jsx
import React, { useCallback } from 'react';
import { usePollStore } from '../store/usePollStore';
import PollCard from './PollCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

export default function PollList() {
  // use separate selectors (don't return a new object each render)
  const polls = usePollStore((s) => s.polls);
  const page = usePollStore((s) => s.page);
  const incPage = usePollStore((s) => s.incPage);
  const hasMore = usePollStore((s) => s.hasMore);
  const loading = usePollStore((s) => s.loading);

  const loadMore = useCallback(() => {
    incPage();
  }, [incPage]);

  const loaderRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-4 items-stretch">
  <SearchBar />
  <FilterDropdown type="genre" />
  <FilterDropdown type="status" />
    </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {polls.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No polls found.
          </div>
        ) : (
          polls.map((p) => <PollCard key={p.id} poll={p} />)
        )}
      </div>

      <div ref={loaderRef} className="py-6 text-center">
        {loading ? (
          <div className="text-sm text-gray-600">Loading...</div>
        ) : hasMore ? (
          <div className="text-sm text-gray-500">Scroll to load more</div>
        ) : (
          <div className="text-sm text-gray-500">No more polls</div>
        )}
      </div>
    </div>
  );
}
