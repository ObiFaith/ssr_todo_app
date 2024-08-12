import { todos } from '@/data';
import type { Todo } from '@/store/todoSlice';
import type { NextApiRequest, NextApiResponse } from 'next';

let localTodos = [...todos];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Todo | { error: string }>
) {
	switch (req.method) {
		case 'GET': {
			const { id } = req.query;
			const todo = localTodos.find(todo => todo.id === id);
			if (todo) {
				res.status(200).json(todo);
			} else res.status(404).json({ error: 'Todo not found' });
			break;
		}
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
}
