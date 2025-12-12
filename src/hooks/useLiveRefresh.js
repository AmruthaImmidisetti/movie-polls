// src/hooks/useLiveRefresh.js
import { useEffect } from 'react';
import { fetchPollsByIds } from '../api/pollsApi';
import { usePollStore } from '../store/usePollStore';

/**
 * useLiveRefresh(intervalMs)
 *
 * Periodically refreshes all currently visible polls.
 * Default interval: 7000 ms (7 seconds)
 */
export default function useLiveRefresh(intervalMs = 7000) {
  const polls = usePollStore((state) => state.polls);
  const updatePoll = usePollStore((state) => state.updatePoll);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // get IDs of all currently rendered polls
        const ids = polls.map((p) => p.id);
        if (ids.length === 0) return;

        // fetch updated copies from the mock API
        const freshPolls = await fetchPollsByIds(ids);

        // update each poll in Zustand store
        freshPolls.forEach((poll) => {
          updatePoll(poll.id, poll); // replace fields in local store with new ones
        });
      } catch (error) {
        console.warn('Live refresh failed:', error);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [polls, updatePoll, intervalMs]);
}
