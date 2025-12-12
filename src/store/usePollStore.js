// src/store/usePollStore.js
import { create } from 'zustand';

export const usePollStore = create((set, get) => ({
  // state
  polls: [],
  page: 0,
  pageSize: 20,
  hasMore: true,
  loading: false,
  filters: { genre: 'All', status: 'All' },
  query: '',
  selectedPoll: null, // poll object for modal

  // actions
  addPolls: (newPolls, hasMore) =>
    set((state) => ({ polls: [...state.polls, ...newPolls], hasMore })),

  setPolls: (polls, hasMore) => set({ polls, hasMore }),

  // Replace polls and reset page to 0 (use when filters/search change)
  resetAndSetPolls: (polls, hasMore) => set({ polls, page: 0, hasMore }),

  setPage: (p) => set({ page: p }),
  incPage: () => set((state) => ({ page: state.page + 1 })),

  setLoading: (v) => set({ loading: v }),

  // update a single poll by id — patch is a partial object with fields to update
  updatePoll: (id, patch) =>
    set((state) => ({
      polls: state.polls.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  // filters and search setters — reset pagination and polls when changed
  setFilters: (filters) => set({ filters, page: 0, polls: [] }),
  setQuery: (q) => set({ query: q, page: 0, polls: [] }),

  setSelectedPoll: (p) => set({ selectedPoll: p }),
}));
