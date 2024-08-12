import {
	icon_check,
	icon_delete,
	icon_delete_dark,
	icon_edit,
	icon_edit_dark,
} from '@/public';
import Image from 'next/image';
import useTheme from '@/store/useTheme';
import { useAppDispatch } from '@/store';
import { deleteTodoAsync, toggleCompletedAsync } from '@/store/todoSlice';
import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

const TodoItem = ({
	id,
	title,
	setInput,
	completed,
	className = '',
}: {
	id: string;
	title: string;
	className?: string;
	completed: boolean;
	setInput?: Dispatch<SetStateAction<string>>;
}) => {
	const dispatch = useAppDispatch();
	const { isDarkMode } = useTheme();

	return (
		<div
			className={`sm:px-6 p-4 flex gap-3 sm:gap-6 items-center justify-between border-b ${
				isDarkMode
					? 'text-light-blue-200 border-dark-blue-500'
					: 'border-light-blue-300 text-light-blue-500'
			} ${className}`}
		>
			<div className="flex gap-3 max-sm:gap-2 items-center w-full">
				<div
					onClick={() => dispatch(toggleCompletedAsync(id))}
					className={`border rounded-full cursor-pointer text-center ${
						isDarkMode
							? 'border-dark-blue-500 hover:border-dark-blue-300'
							: 'border-light-blue-300'
					}
          ${completed ? 'accent-bg py-1 px-0.5' : 'p-2'}`}
				>
					{completed && (
						<Image
							width={12}
							height={12}
							src={icon_check}
							alt="check icon"
						/>
					)}
				</div>
				<Link href={`/todos/${id}`} className="max-sm:text-sm w-full">
					{title}
				</Link>
			</div>
			<div className="cursor-pointer items-center flex gap-2">
				<Image
					onClick={() => {
						if (setInput) setInput(title);
						dispatch(deleteTodoAsync(id));
					}}
					width={14}
					height={14}
					src={isDarkMode ? icon_edit_dark : icon_edit}
					alt="edit icon"
				/>
				<Image
					onClick={() => dispatch(deleteTodoAsync(id))}
					width={14}
					height={14}
					src={isDarkMode ? icon_delete_dark : icon_delete}
					alt="delete icon"
				/>
			</div>
		</div>
	);
};

export default TodoItem;
