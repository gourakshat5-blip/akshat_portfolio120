// Video clips used by the cinematic house.
// Each room has ONE canonical background frame: the last frame of the clip that leads into it.
// That keeps a room looking identical whether you arrive, go back, or jump from the nav.
export const VIDEO = {
  hero: '/videos/hero.mp4',
  house:    '/videos/house-open.mp4',// looping backdrop on the "Enter the house" screen
  enter:    '/videos/house-entry.mp4',// plays when you enter; its last frame is Room 1
  forward: '/videos/room1-to-room2.mp4', // last frame = Room 2
  forward3: '/videos/room2-to-room3.mp4', // last frame = Room 3
  forward4: '/videos/room3-to-room4.mp4', // last frame = Room 4
}

export const POSTER = {
  hero: '/images/hero-poster.jpg',
  house: '/images/house-poster.jpg',
}

export const ROOM_FRAME = {
  1: VIDEO.enter,
  2: VIDEO.forward,
  3: VIDEO.forward3,
  4: VIDEO.forward4,
}

export const ROOM_TITLES = {
  1: 'About me',
  2: 'Skills',
  3: 'Projects and credentials',
  4: 'Connect',
}

// Phases that are moving between states (controls are locked while these run).
export const BUSY = ['entering', 'to2', 'to3', 'to4', 'back3', 'back2', 'back1', 'dip']

// Which room each moving phase settles into when its clip ends.
export const SETTLES_INTO = {
  entering: 1,
  to2: 2,
  to3: 3,
  to4: 4,
  back3: 3,
  back2: 2,
  back1: 1,
}
