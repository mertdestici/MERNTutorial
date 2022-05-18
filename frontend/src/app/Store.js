import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import goalReducer from '../features/goals/GoalSlice';

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer
    },
})