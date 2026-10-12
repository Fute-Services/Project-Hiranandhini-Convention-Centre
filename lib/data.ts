export const FILM_SRC = '/walkthrough.mp4'

export type Cat = { id: string; label: string; icon?: string }
export type Space = { id: string; cat: string; name: string; floor: string; x: number; y: number; shots: string[]; desc: string }

export const IMG: Record<string, string> = {"cam-03-waiting-lounge": "/images/img01.jpg", "cam-05-conference-hall": "/images/img02.jpg", "cam-07-salon": "/images/img03.jpg", "cam-10-yoga": "/images/img04.jpg", "cam-11-indoor-games": "/images/img05.jpg", "cam-13-badminton-court": "/images/img06.jpg", "cam-15-padel-court": "/images/img07.jpg", "cam-17-business-centre": "/images/img08.jpg", "cam1": "/images/img09.jpg", "cam10": "/images/img10.jpg", "cam11": "/images/img11.jpg", "cam12": "/images/img12.jpg", "cam13": "/images/img13.jpg", "cam14": "/images/img14.jpg", "cam15": "/images/img15.jpg", "cam16": "/images/img16.jpg", "cam17": "/images/img17.jpg", "cam2": "/images/img18.jpg", "cam3": "/images/img19.jpg", "cam5": "/images/img20.jpg", "cam6": "/images/img21.jpg", "cam7": "/images/img22.jpg", "cam8": "/images/img23.jpg", "cam9": "/images/img24.jpg"};

export const CATS: Cat[] = [
  { id: 'all',      label: 'All spaces' },
  { id: 'arrival',  label: 'Arrival',           icon: 'M5 21V10a7 7 0 0 1 14 0v11M3 21h18M9 21v-6a3 3 0 0 1 6 0v6' },
  { id: 'events',   label: 'Events & Business', icon: 'M3 4h18M5 4v10h14V4M12 14v4M8 21l4-3 4 3' },
  { id: 'dining',   label: 'Dining',            icon: 'M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 2.5-3 5s1 4 3 4V3zM17 12v9' },
  { id: 'sports',   label: 'Sports',            icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6c3 2.6 3 10.2 0 12.8M18.4 5.6c-3 2.6-3 10.2 0 12.8' },
  { id: 'wellness', label: 'Wellness',          icon: 'M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0' }
];

export const SPACES: Space[] = [
  { id: 'arrival', cat: 'arrival', name: 'Grand Arrival', floor: 'Forecourt', x: 50, y: 67, shots: ['cam9', 'cam2'],
    desc: 'A fountain forecourt and a columned porte-cochère lead to the main entrance, with the copper dome rising above.' },
  { id: 'lobby', cat: 'arrival', name: 'Reception & Lobby', floor: 'Ground floor', x: 50, y: 53, shots: ['cam10', 'cam17'],
    desc: 'A double-height lobby framed by sweeping arches, with a gallery above and patterned stone underfoot.' },
  { id: 'lounge', cat: 'arrival', name: 'Waiting Lounge', floor: 'Ground floor', x: 42, y: 54, shots: ['cam-03-waiting-lounge'],
    desc: 'Soft seating beside tall arched windows, a quiet place to pause before a meeting or an event.' },
  { id: 'hall', cat: 'events', name: 'Convention Hall', floor: 'Ground floor', x: 66, y: 15, shots: ['cam12'],
    desc: 'The main hall for conventions, weddings and banquets, lit by crystal chandeliers. It has its own pre-function area and kitchen.' },
  { id: 'conference', cat: 'events', name: 'Conference Halls 1 & 2', floor: 'First floor', x: 64.5, y: 38, shots: ['cam-05-conference-hall'],
    desc: 'Boardroom-style halls with warm timber ceilings and a presentation wall at the head of the table.' },
  { id: 'business', cat: 'events', name: 'Business Centre', floor: 'First floor', x: 71.5, y: 31, shots: ['cam-17-business-centre'],
    desc: 'Open workstations and enclosed meeting rooms for guests who need to work between sessions.' },
  { id: 'restaurant', cat: 'dining', name: 'Restaurant & Bar', floor: 'Ground floor', x: 58, y: 48, shots: ['cam15'],
    desc: 'All-day dining with a bar, arched windows and a timber-slat ceiling.' },
  { id: 'cafe', cat: 'dining', name: 'Café & Library Lounge', floor: 'Ground floor', x: 36, y: 45, shots: ['cam5', 'cam6'],
    desc: 'A café that opens into a book-lined lounge, made for slow mornings and informal meetings.' },
  { id: 'terrace', cat: 'dining', name: 'Terrace Restaurant', floor: 'Second floor', x: 36, y: 12, shots: ['cam14', 'cam16'],
    desc: 'Open-air dining under string lights on the roof terrace, beside the illuminated dome.' },
  { id: 'badminton', cat: 'sports', name: 'Badminton Courts', floor: 'Ground floor', x: 33, y: 26, shots: ['cam-13-badminton-court'],
    desc: 'Two indoor courts under a high coffered ceiling, with seating along the side.' },
  { id: 'squash', cat: 'sports', name: 'Squash Courts', floor: 'Ground floor', x: 39, y: 21, shots: ['cam11'],
    desc: 'Two glass-backed squash courts.' },
  { id: 'padel', cat: 'sports', name: 'Padel Court', floor: 'Ground floor', x: 32, y: 36, shots: ['cam-15-padel-court'],
    desc: 'An indoor padel court enclosed in glass.' },
  { id: 'games', cat: 'sports', name: 'Indoor Games & E-Gaming', floor: 'First floor', x: 44, y: 41, shots: ['cam-11-indoor-games'],
    desc: 'Table games and an e-gaming zone in a relaxed lounge setting.' },
  { id: 'gym', cat: 'sports', name: 'Gymnasium', floor: 'Second floor', x: 59, y: 26, shots: ['cam13'],
    desc: 'Cardio and strength equipment laid out along an arched colonnade.' },
  { id: 'pool', cat: 'wellness', name: 'Swimming Pool', floor: 'Outdoor', x: 49.5, y: 19, shots: ['cam3'],
    desc: 'A half-Olympic pool with a kids’ pool and jacuzzi, lined with loungers and palms.' },
  { id: 'spa', cat: 'wellness', name: 'Salon & Spa', floor: 'Second floor', x: 66, y: 27, shots: ['cam-07-salon', 'cam7'],
    desc: 'A salon with his-and-hers spa suites for massage, steam and sauna.' },
  { id: 'yoga', cat: 'wellness', name: 'Yoga & Meditation', floor: 'First floor', x: 57, y: 37, shots: ['cam-10-yoga'],
    desc: 'A calm studio for yoga, meditation, dance and music under a draped ceiling.' }
];
