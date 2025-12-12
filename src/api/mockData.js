// src/api/mockData.js
// Simple mock poll generator that assigns the same option set per genre.
// No external libs required.

const GENRES = ['Action','Comedy','Romance','Sci-Fi','Horror','Drama','Documentary'];

const GENRE_OPTIONS = {
  Action: [
    'Storyline',
    'Fight Scenes',
    'Acting',
    'Visual Effects'
  ],
  Comedy: [
    'Dialogues',
    'Comic Timing',
    'Situations',
    'Lead Performance'
  ],
  Romance: [
    'Chemistry',
    'Songs',
    'Story',
    'Climax'
  ],
  'Sci-Fi': [
    'Concept',
    'Visual Effects',
    'Technology Portrayal',
    'Story Depth'
  ],
  Horror: [
    'Scare Factor',
    'Sound Design',
    'Story',
    'Visuals'
  ],
  Drama: [
    'Acting',
    'Story',
    'Screenplay',
    'Music'
  ],
  Documentary: [
    'Information Depth',
    'Cinematography',
    'Research Quality',
    'Narration'
  ],
};

function randInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeTitle(i, genre){
  // A readable title — you can replace this with a fixed list of movie names if you prefer
  const base = [
    'Legacy',
    'Echoes',
    'Midnight',
    'Awakening',
    'Frontier',
    'Catalyst',
    'Resonance',
    'Pulse',
    'Odyssey',
    'Horizon'
  ];
  return `${randChoice(base)} ${i}`;
}

/**
 * generateMockPolls(n)
 * Each poll receives the same set of options for its genre (the 4 options defined above).
 */
export function generateMockPolls(n = 200) {
  const polls = [];
  for (let i = 0; i < n; i++) {
    const genre = GENRES[randInt(0, GENRES.length - 1)];
    const optionLabels = GENRE_OPTIONS[genre] || ['Option A','Option B','Option C','Option D'];

    // create options (each poll uses the same labels for its genre)
    const options = optionLabels.map((label, idx) => ({
      id: `opt-${i}-${idx}`,
      label,
      votes: randInt(0, 500)
    }));

    const totalVotes = options.reduce((a, b) => a + b.votes, 0);

    polls.push({
      id: `poll-${i}`,
      title: makeTitle(i+1, genre),
      genre,
      status: (Math.random() < 0.85) ? 'Active' : 'Closed', // mostly Active
      options,
      totalVotes,
      userVote: null,
      rating: (Math.random() * 4 + 1).toFixed(1), // 1.0 - 5.0
    });
  }
  return polls;
}
