// src/components/ResultsModal.jsx
import React from 'react';
import { usePollStore } from '../store/usePollStore';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsModal() {
  const selectedPoll = usePollStore((s) => s.selectedPoll);
  const setSelectedPoll = usePollStore((s) => s.setSelectedPoll);

  if (!selectedPoll) return null;

  // Color palette — pick any colors you like here.
  // If there are more options than colors, the colors repeat.
  const palette = [
    '#2563EB', // blue-600
    '#10B981', // green-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#06B6D4', // cyan-500
    '#F97316', // orange-500
  ];

  const labels = selectedPoll.options.map((o) => o.label);
  const values = selectedPoll.options.map((o) => o.votes);

  const backgroundColor = values.map((_, i) => palette[i % palette.length]);
  const borderColor = backgroundColor.map((c) => c);

  const totalVotes = selectedPoll.totalVotes || values.reduce((a, b) => a + b, 0);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,            // allow explicit width/height
    maintainAspectRatio: false,   // make height/width props effective
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const pct = totalVotes ? ((value / totalVotes) * 100).toFixed(1) : '0.0';
            return `${label}: ${value} • ${pct}%`;
          },
        },
      },
    },
    cutout: '50%', // doughnut thickness (50% inner radius)
  };

  const close = () => setSelectedPoll(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedPoll.title} results`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={close}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">{selectedPoll.title} — Results</h2>
          <button
            onClick={close}
            aria-label="Close dialog"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center">
          {/* Chart container with fixed size */}
          <div style={{ width: 420, height: 420 }} className="relative">
            <Doughnut data={data} options={options} width={420} height={420} />
          </div>

          <div className="mt-4 w-full text-sm text-gray-700">
            <div>Total votes: {totalVotes}</div>
            <div>Genre: {selectedPoll.genre}</div>
            <div>Status: {selectedPoll.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
