import { todos } from '@/data';
import type { Todo } from '@/store/todoSlice';
import type { NextApiRequest, NextApiResponse } from 'next';

let localTodos = [...todos];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Todo | Todo[] | { error: string }>
) {
	switch (req.method) {
		case 'GET': {
			res.status(200).json(localTodos);
			break;
		}
		case 'POST': {
			try {
				const todo: Todo = req.body;
				localTodos.push(todo);
				res.status(201).json(todo);
			} catch (error) {
				console.error('Error adding todo:', error);
				res.status(500).json({ error: 'Server error' });
			}
			break;
		}
		case 'DELETE': {
			try {
				const { id } = req.body;
				localTodos = localTodos.filter(todo => todo.id !== id);
				res.status(200).json(localTodos);
			} catch (error) {
				console.error('Error deleting todo:', error);
				res.status(500).json({ error: 'Server error' });
			}
			break;
		}
		case 'PUT': {
			try {
				localTodos = localTodos.filter(todo => !todo.completed);
				res.status(200).json(localTodos);
			} catch (error) {
				console.error('Error clearing completed todo(s):', error);
				res.status(500).json({ error: 'Server error' });
			}
			break;
		}
		case 'PATCH': {
			const { id } = req.body;
			try {
				const todoIndex = localTodos.findIndex(todo => todo.id === id);
				if (todoIndex !== -1) {
					localTodos[todoIndex].completed =
						!localTodos[todoIndex].completed;
					res.status(200).json(localTodos);
				} else {
					res.status(404).json({ error: 'Todo not found' });
				}
			} catch (error) {
				console.error(`Error updating todo with id: ${id}:`, error);
				res.status(500).json({ error: 'Server error' });
			}
			break;
		}
		default:
			res.setHeader('Allow', ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
}
