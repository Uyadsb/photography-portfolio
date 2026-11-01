// ─────────────────────────────────────────────────────────────────────────────
// ALL PROJECTS LIVE HERE. The homepage, project pages and prev/next navigation
// are generated from this array. The four entries below are EXAMPLES with
// placeholder images, not real portfolio work — replace or delete them.
//
// To add a project:
//   1. Create public/images/<slug>/ and add cover.webp + photo-01.webp, …
//   2. Add an object below. List photos with photo(slug, n, width, height, alt);
//      width/height are the real pixel size of the file (prevents layout shift
//      and drives the editorial gallery layout: wide photos go full-width,
//      tall photos are paired).
// ─────────────────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;

const photo = (slug, n, width, height, alt) => ({
  src: `${base}images/${slug}/photo-${String(n).padStart(2, '0')}.webp`,
  width,
  height,
  alt,
});

export const projects = [
  {
    id: 'ctf-competition',
    slug: 'ctf-competition',
    title: 'CTF Competition',
    category: 'Technology',
    date: '2026-10-31',
    location: 'Algeria',
    description:
      'A visual story documenting a cybersecurity competition: focused teams, late-night screens and the tension of the final scoreboard.',
    cover: `${base}images/ctf-competition/cover.webp`,
    coverAlt: 'Competitors working at their laptops during a cybersecurity competition',
    images: [
      photo('ctf-competition', 1, 1800, 1200, 'Wide view of the competition hall with teams at long tables'),
      photo('ctf-competition', 2, 1200, 1500, 'A competitor concentrating on a laptop screen'),
      photo('ctf-competition', 3, 1200, 1500, 'Two teammates discussing a challenge'),
      photo('ctf-competition', 4, 1800, 1200, 'The scoreboard projected at the front of the room'),
      photo('ctf-competition', 5, 1200, 1800, 'A close portrait of a participant in the glow of a monitor'),
      photo('ctf-competition', 6, 1800, 1200, 'Winners celebrating at the end of the competition'),
    ],
  },
  {
    id: 'tech-conference',
    slug: 'tech-conference',
    title: 'Tech Conference',
    category: 'Conference',
    date: '2026-05-16',
    location: 'Algeria',
    description:
      'Speakers, audiences and the conversations between sessions at a one-day technology conference.',
    cover: `${base}images/tech-conference/cover.webp`,
    coverAlt: 'A speaker addressing a full conference audience',
    images: [
      photo('tech-conference', 1, 1800, 1200, 'The main stage seen from the back of the auditorium'),
      photo('tech-conference', 2, 1800, 1200, 'Attendees queuing at the registration desk'),
      photo('tech-conference', 3, 1200, 1500, 'A speaker mid-gesture on stage'),
      photo('tech-conference', 4, 1200, 1500, 'Two attendees talking in the hallway between sessions'),
      photo('tech-conference', 5, 1800, 1200, 'An audience listening during a keynote'),
      photo('tech-conference', 6, 1200, 1800, 'A detail of name badges and notebooks on a table'),
    ],
  },
  {
    id: 'cultural-night',
    slug: 'cultural-night',
    title: 'Cultural Night',
    category: 'Culture',
    date: '2026-03-07',
    location: 'Algeria',
    description:
      'An evening of music, performance and community, photographed in warm, low light.',
    cover: `${base}images/cultural-night/cover.webp`,
    coverAlt: 'Performers on a softly lit stage during a cultural evening',
    images: [
      photo('cultural-night', 1, 1200, 1500, 'A musician portrait in warm stage light'),
      photo('cultural-night', 2, 1800, 1200, 'The full stage during the opening performance'),
      photo('cultural-night', 3, 1200, 1800, 'A dancer in motion'),
      photo('cultural-night', 4, 1800, 1200, 'The audience applauding'),
      photo('cultural-night', 5, 1200, 1500, 'Backstage preparations before the show'),
      photo('cultural-night', 6, 1800, 1200, 'Guests gathering after the performance'),
    ],
  },
  {
    id: 'hackathon',
    slug: 'hackathon',
    title: 'Hackathon',
    category: 'Technology',
    date: '2025-12-12',
    location: 'Algeria',
    description:
      'Twenty-four hours of building, from the first brainstorm to the final demos.',
    cover: `${base}images/hackathon/cover.webp`,
    coverAlt: 'Teams collaborating around tables during a hackathon',
    images: [
      photo('hackathon', 1, 1800, 1200, 'Teams gathered around tables at the start of the hackathon'),
      photo('hackathon', 2, 1200, 1500, 'A developer sketching an idea on a whiteboard'),
      photo('hackathon', 3, 1800, 1200, 'A team demonstrating their project to judges'),
      photo('hackathon', 4, 1200, 1500, 'A participant resting between work sessions'),
      photo('hackathon', 5, 1200, 1500, 'Hands on a keyboard, close up'),
      photo('hackathon', 6, 1800, 1200, 'Participants posing together at the closing ceremony'),
    ],
  },
];

export const getProjectIndex = (slug) => projects.findIndex((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(iso));

export const getYear = (iso) => new Date(iso).getFullYear();
