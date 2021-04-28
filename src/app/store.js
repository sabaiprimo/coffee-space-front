import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import  from '../features/recipe/recipeReducer';
// import commentReducer from '../features/comment/commentReducer';
// import loginReducer from '../features/login/loginReducer';
// import UserSlice from '../features/user/UserSlice';
import { userSlice } from '../features/user/UserSlice';
import { recipeSlice } from '../features/recipe/RecipeSlice';

export const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    user: userSlice.reducer,
  },
});
