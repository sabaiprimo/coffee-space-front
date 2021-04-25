import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import recipeReducer from '../features/recipe/recipeReducer';
import commentReducer from '../features/comment/commentReducer';
// import loginReducer from '../features/login/loginReducer';
// import UserSlice from '../features/user/UserSlice';
import { userSlice } from '../features/user/UserSlice';

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    comment: commentReducer,
    user: userSlice.reducer,
  },
});
