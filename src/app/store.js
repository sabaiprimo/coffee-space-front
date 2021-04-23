import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import recipeReducer from '../features/recipe/recipeReducer';

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});
