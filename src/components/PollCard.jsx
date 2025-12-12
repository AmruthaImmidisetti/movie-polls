// src/components/PollCard.jsx
import React, { useState } from 'react';
import { usePollStore } from '../store/usePollStore';
import { submitVote } from '../api/pollsApi';
import toast from 'react-hot-toast';
import StarRating from './StarRating';

export default function PollCard({ poll }) {
  const updatePoll = usePollStore((s) => s.updatePoll);
  const setSelectedPoll = usePollStore((s) => s.setSelectedPoll);
  const [voting, setVoting] = useState(false);

  // -------------------------
  // HANDLE VOTE (optimistic)
  // -------------------------
  const handleVote = async (optionId) => {
  if (voting) return; // only block when API is in progress

  const previousOptionId = poll.userVote;

  // Save original for rollback
  const original = {
    ...poll,
    options: poll.options.map((o) => ({ ...o })),
    totalVotes: poll.totalVotes,
    userVote: poll.userVote,
  };

  // Create new options with updated votes
  const newOptions = poll.options.map((o) => {
    if (o.id === optionId) {
      return { ...o, votes: o.votes + 1 }; // new selection +1
    }
    if (o.id === previousOptionId) {
      return { ...o, votes: o.votes - 1 }; // old selection -1
    }
    return o;
  });

  // If user is changing vote, total votes stay same
  // If user is voting for first time, increase total
  const newTotalVotes =
    previousOptionId === null ? poll.totalVotes + 1 : poll.totalVotes;

  // Optimistic update
  updatePoll(poll.id, {
    options: newOptions,
    totalVotes: newTotalVotes,
    userVote: optionId,
  });

  setVoting(true);
  try {
    await submitVote(poll.id, optionId); 
    toast.success("Vote updated!");
  } catch (error) {
    // rollback
    updatePoll(poll.id, original);
    toast.error("Vote failed. Rolled back.");
  } finally {
    setVoting(false);
  }
};


  // open modal
  const openModal = () => {
    setSelectedPoll(poll);
  };

  return (
    <article
      className="p-4 rounded shadow-sm bg-white border"
      aria-labelledby={`poll-${poll.id}`}
    >
      <h3 id={`poll-${poll.id}`} className="font-semibold text-lg">
        {poll.title}
      </h3>

      <div className="text-sm text-gray-500">
        {poll.genre} • {poll.status}
      </div>

      {/* poll options */}
      <div className="mt-3 space-y-3">
        {poll.options.map((opt) => {
          const percentage = Math.round(
            (opt.votes / Math.max(1, poll.totalVotes)) * 100
          );
          const voted = poll.userVote === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={voting}
              className={`w-full p-2 rounded cursor-pointer text-left border ${
                voted ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{opt.label}</span>
                <span>
                  {opt.votes} • {percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                <div
                  className="h-2 rounded bg-blue-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* modal + rating section */}
      <div className="mt-4 flex justify-between items-center">
        <button onClick={openModal} className="text-sm underline">
          View Details
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm">Rating: {poll.rating}</span>

          <StarRating
            value={Math.round(poll.rating)}
            onChange={(r) => {
              // optimistic rating update
              const oldRating = poll.rating;
              const newRating = ((parseFloat(oldRating) || 0) + r) / 2;

              updatePoll(poll.id, { rating: newRating.toFixed(1) });
              // (You will add submitRating logic later if needed)
            }}
          />
        </div>
      </div>
    </article>
  );
}
