import {
	icon_check,
	icon_delete,
	icon_delete_dark,
	icon_edit,
	icon_edit_dark,
} from '@/public';
import useTheme from '@/store/useTheme';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
/* import { deleteTodoAsync, toggleCompletedAsync } from '../redux/todoSlice'; */

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
	setInput: Dispatch<SetStateAction<string>>;
}) => {
	// const dispatch = useDispatch();
	const { isDarkMode } = useTheme();
	return (
		<div
			className={`sm:px-6 p-4 flex gap-3 sm:gap-6 items-center justify-between border-b ${
				isDarkMode
					? 'text-light-blue-200 border-dark-blue-500'
					: 'border-light-blue-300 text-light-blue-500'
			} ${className}`}
		>
			<div className="flex gap-3 max-sm:gap-2 items-center">
				<div
					/* onClick={() => dispatch(toggleCompletedAsync(id))} */
					className={`border rounded-full cursor-pointer text-center ${
						isDarkMode
							? 'border-dark-blue-500 hover:border-dark-blue-300'
							: 'border-light-blue-300'
					}
          ${completed ? 'accent-bg py-1 px-0.5' : 'p-2'}`}
				>
					{completed && <Image src={icon_check} alt="check icon" />}
				</div>
				<p className="max-sm:text-sm">{title}</p>
			</div>
			<div className="cursor-pointer items-center flex gap-2">
				<Image
					onClick={() => {
						setInput(title);
						/* dispatch(deleteTodoAsync(id)); */
					}}
					width={14}
					height={14}
					src={isDarkMode ? icon_edit_dark : icon_edit}
					alt="edit icon"
				/>
				<Image
					/* onClick={() => dispatch(deleteTodoAsync(id))} */
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
