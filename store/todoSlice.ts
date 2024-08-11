import { RootState } from '@reduxjs/toolkit/query';
import Axios from './Axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TodosArray = Array<{
	id: number;
	title: string;
	completed: boolean;
}>;
type AxiosMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

const makeRequest = async (
	method: AxiosMethods,
	url: string,
	body = undefined
) => {
	try {
		const { data } = await Axios[method](url, body);
		return data;
	} catch (error) {
		console.error(`Error during ${method.toUpperCase()} method`, error);
	}
};

const updateTodos = (_: any, action: PayloadAction<TodosArray>) =>
	action.payload;
const handleActionError = (_: any, action: PayloadAction<TodosArray>) =>
	console.error(`Error during ${action.type.split('/')[1]}`, action.payload);

export const loadTodosAsync = createAsyncThunk(
	'todos/loadTodosAsync',
	async () => await makeRequest('get', '/todos')
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [] as TodosArray,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadTodosAsync.fulfilled, updateTodos)
			.addCase(loadTodosAsync.rejected, handleActionError);
	},
});

export default todoSlice.reducer;
export const getTodos = (state: RootState) => state.todos;
