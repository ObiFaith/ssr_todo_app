import Link from 'next/link';
import useTheme from '@/store/useTheme';
import { useRouter } from 'next/router';
import { useAppDispatch, wrapper } from '@/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { Todo } from '@/store/todoSlice';
import { getTodos, loadTodoAsync } from '@/store/todoSlice';
import { GetServerSideProps } from 'next';

const Todo = ({ initialTodo }: { initialTodo: Todo | null }) => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const todos = useSelector(getTodos);
	const [title, setTitle] = useState('');
	const [todo, setTodo] = useState<Todo | null>(initialTodo);
	const { isDarkMode } = useTheme();

	useEffect(() => {
    console.log(initialTodo)
		if (!initialTodo) dispatch(loadTodoAsync(id as string));
		else setTitle(initialTodo.title);
	}, [dispatch, id, initialTodo]);

	useEffect(() => {
		if (typeof id === 'string' && todos.length > 0) {
			const foundTodo = todos.find(todo => todo.id === id);
			setTodo(foundTodo || null);

			if (foundTodo) setTitle(foundTodo.title);
		}
	}, [id, todos]);

	return typeof id === 'string' ? (
		<div
			className={`grid shadow-md min-h-screen items-center justify-items-center ${
				isDarkMode
					? 'text-light-blue-100 bg-dark-blue-200'
					: 'text-light-blue-500'
			}`}
		>
			{!todo ? (
				<div className="text-center">
					<span className=" text-3xl">Todo not found</span>
					<br />
					<Link
						className="underline underline-offset-2 text-blue-primary"
						href="/"
					>
						Click to go back
					</Link>
				</div>
			) : (
				<div className="grid gap-6 justify-items-center text-center">
					<div>
						<p className="text-blue-primary">Your todo title</p>
						<h1 className="text-xl text-balance">{title}</h1>
					</div>
					<Link
						className="underline underline-offset-2 text-blue-primary"
						href="/"
					>
						Click to go back
					</Link>
				</div>
			)}
		</div>
	) : (
		<div className="grid shadow-md min-h-screen items-center justify-items-center text-3xl">
			Error: Invalid ID
		</div>
	);
};

export default Todo;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps(store => async context => {
		const id = context.params?.id as string;
		await store.dispatch(loadTodoAsync(id));
		const todos = store.getState().todos;
		const todo = todos.find(todo => todo.id === id) || null;
		return {
			props: {
				initialTodo: todo,
			},
		};
	});
