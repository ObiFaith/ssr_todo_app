import { nanoid } from 'nanoid';

export const todos = [
	{
		id: nanoid(),
		title: 'Create custom api for my todo project',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'Go through Three.jS video on freecodecamp channel on YouTube',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'Learn about RTK query and Zustand for State Management',
		completed: false,
	},
];