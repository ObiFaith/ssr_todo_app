import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
	configureStore({
		reducer: {
			todos: todoReducer,
		},
	});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);

export default makeStore;
