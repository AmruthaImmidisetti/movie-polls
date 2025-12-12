// src/api/pollsApi.js
import { generateMockPolls } from './mockData';

// generate server-side data once
const ALL_POLLS = generateMockPolls(2000);

/**
 * fetchPolls({ page, pageSize, filters, query })
 * returns { polls: [...], hasMore: boolean }
 * supports simple filtering by genre/status and text search (title).
 */
export async function fetchPolls({ page = 0, pageSize = 20, filters = {}, query = '' } = {}) {
  // simulate latency
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));

  let list = ALL_POLLS.slice();

  // apply filters
  if (filters.genre && filters.genre !== 'All') {
    list = list.filter((p) => p.genre === filters.genre);
  }
  if (filters.status && filters.status !== 'All') {
    list = list.filter((p) => p.status === filters.status);
  }

  // apply simple search
  if (query && query.trim()) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q));
  }

  const start = page * pageSize;
  const pageItems = list.slice(start, start + pageSize);
  return {
    polls: pageItems,
    hasMore: start + pageSize < list.length,
  };
}

/**
 * submitVote(pollId, optionId)
 * increments vote for the option, simulates a small failure probability for rollback testing
 */
export async function submitVote(pollId, optionId) {
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
  // random fail 7% for rollback testing:
  if (Math.random() < 0.07) throw new Error('Simulated network error');

  const poll = ALL_POLLS.find((p) => p.id === pollId);
  if (!poll) throw new Error('Poll not found');

  // If user already had a vote recorded on the server, decrement it
  const previous = poll.userVote;
  if (previous && previous !== optionId) {
    const prevOpt = poll.options.find((o) => o.id === previous);
    if (prevOpt) prevOpt.votes = Math.max(0, prevOpt.votes - 1);
    // totalVotes stays the same when switching
  }

  // increment the new selection (always increment if different or if no previous)
  const opt = poll.options.find((o) => o.id === optionId);
  if (!opt) throw new Error('Option not found');
  // If previous was null (first vote), increment totalVotes, else total stays same
  if (!previous) poll.totalVotes = (poll.totalVotes || 0) + 1;
  opt.votes += 1;

  // set userVote to the new option
  poll.userVote = optionId;

  return { success: true, poll };
}


/**
 * fetchPollsByIds(ids) - useful for live refresh of visible polls
 */
export async function fetchPollsByIds(ids = []) {
  await new Promise((r) => setTimeout(r, 150 + Math.random() * 200));
  return ids.map((id) => ALL_POLLS.find((p) => p.id === id)).filter(Boolean);
}

/**
 * submitRating(pollId, rating) - naive average update
 */
export async function submitRating(pollId, rating) {
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));
  const poll = ALL_POLLS.find((p) => p.id === pollId);
  if (!poll) throw new Error('Poll not found');

  const prevAvg = parseFloat(poll.rating) || 0;
  // naive combine: weighting previous average by 10 and new rating as 1
  const newAvg = ((prevAvg * 10) + rating) / 11;
  poll.rating = newAvg.toFixed(1);

  return { success: true, rating: poll.rating };
}
