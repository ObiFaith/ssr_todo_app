import Axios from './Axios';
import { RootState } from '.';
import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
	SerializedError,
} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
};
type TodosArray = Array<Todo>;
type AxiosMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

const makeRequest = async <T extends Todo | TodosArray>(
	method: AxiosMethods,
	url: string,
	body?: Todo
): Promise<T> => {
	try {
		const { data } = body
			? await Axios[method](url, body)
			: await Axios[method](url);
		return data as T;
	} catch (error) {
		console.error(`Error during ${method.toUpperCase()} method`, error);
		throw new Error('Request failed');
	}
};

const updateTodos = (_: any, action: PayloadAction<TodosArray>) =>
	action.payload;

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async (): Promise<TodosArray> =>
		await makeRequest<TodosArray>('get', '/todos')
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (id: string): Promise<TodosArray> =>
		await makeRequest<TodosArray>('delete', '/todos', { data: { id } })
);

export const clearCompletedAsync = createAsyncThunk(
	'todos/clearCompletedAsync',
	async () => await makeRequest('put', '/todos')
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (title: string): Promise<Todo> =>
		await makeRequest('post', '/todos', {
			id: nanoid(),
			title,
			completed: false,
		})
);

export const toggleCompletedAsync = createAsyncThunk(
	'todos/toggleCompletedAsync',
	async (id: string) => await makeRequest('patch', '/todos', { id })
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [] as TodosArray,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadTodosAsync.fulfilled, updateTodos)
			.addCase(deleteTodoAsync.fulfilled, updateTodos)
			.addCase(clearCompletedAsync.fulfilled, updateTodos)
			.addCase(toggleCompletedAsync.fulfilled, updateTodos)
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			});
	},
});

export default todoSlice.reducer;
export const getTodos = (state: RootState) => state.todos;
