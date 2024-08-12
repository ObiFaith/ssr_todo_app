import Axios from './Axios';
import { RootState } from '.';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

type TodosArray = Array<Todo>;
type DeleteTodoBody = { id: string };
type AxiosMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

const makeRequest = async <T extends Todo | TodosArray>(
	method: AxiosMethods,
	url: string,
	body?: Todo | DeleteTodoBody
): Promise<T> => {
	try {
		const { data } =
			method === 'delete'
				? await Axios.delete(url, { data: body })
				: body
				? await Axios[method](url, body)
				: await Axios[method](url);
		return data as T;
	} catch (error) {
		console.error(`Error during ${method.toUpperCase()} method`, error);
		throw new Error('Request failed');
	}
};

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (id: string): Promise<TodosArray> =>
		await makeRequest<TodosArray>('delete', `/todos`, { id })
);

export const loadTodoAsync = createAsyncThunk(
	'todos/loadTodoAsync',
	async (id: string): Promise<Todo> =>
		await makeRequest<Todo>('get', `/todos/${id}`)
);

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async (): Promise<TodosArray> =>
		await makeRequest<TodosArray>('get', '/todos')
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
	async (id: string) => await makeRequest<Todo>('patch', '/todos', { id })
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [] as TodosArray,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadTodoAsync.fulfilled, (state, action) =>
				state.filter(todo => todo.id === action.payload.id)
			)
			.addCase(loadTodosAsync.fulfilled, (_, action) => action.payload)
			.addCase(deleteTodoAsync.fulfilled, (_, action) => action.payload)
			.addCase(clearCompletedAsync.fulfilled, (_, action) => {
				if (Array.isArray(action.payload)) {
					return action.payload;
				}
			})
			.addCase(toggleCompletedAsync.fulfilled, (state, action) => {
				const updatedTodo = action.payload;
				const index = state.findIndex(
					todo => todo.id === updatedTodo.id
				);
				if (index !== -1) {
					state[index] = updatedTodo;
				}
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			});
	},
});

export default todoSlice.reducer;
export const getTodos = (state: RootState) => state.todos;
