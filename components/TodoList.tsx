import { Dispatch, SetStateAction } from 'react';
import TodoItem from './TodoItem';
import useTheme from '@/store/useTheme';

const TodoList = ({
	todos,
	setInput,
}: {
	todos?: Array<{
		id: any;
		title: string;
		completed: boolean;
	}>;
	setInput: Dispatch<SetStateAction<string>>;
}) => {
	const { isDarkMode } = useTheme();
	return (
		<div
		className={`sm:rounded-b-none transition-all rounded-md ${
				isDarkMode ? 'bg-dark-blue-200' : 'bg-white'
			}`}
		>
			{todos?.map((todo, index) => (
				<TodoItem setInput={setInput} key={index} {...todo} />
			))}
		</div>
	);
};

export default TodoList;
