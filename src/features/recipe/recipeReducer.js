import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    value: 0,
    title: '',
    desciption: '',
    preparationTime: '',
    totalTime: '',
    totalTime: '',
    serving: '',
    roastLevel: '',
    level: '',
    ingredient: '',
    equipment: '',
    directions: '',
    images: '',
    currentDirectionStep: 1,
  },
  reducers: {
    incrementStep: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentDirectionStep += 1;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.desciption = action.payload;
    },
    setPreparationTime: (state, action) => {
      state.preparationTime = action.payload;
    },
    setTotalTime: (state, action) => {
      state.totalTime = action.payload;
    },
    setServing: (state, action) => {
      state.serving = action.payload;
    },
    setRoastlevel: (state, action) => {
      state.roastLevel = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    setEquipment: (state, action) => {
      state.equipment = action.payload;
    },
    setDirection: (state, action) => {
      state.directions = action.payload;
    },
  },
});

export const {
  incrementStep,
  setTitle,
  setDescription,
  setPreparationTime,
  setTotalTime,
  setServing,
  setRoastlevel,
  setLevel,
  setIngredient,
  setEquipment,
  setDirection,
} = recipeSlice.actions;

export const selectStep = (state) => state.recipe.currentDirectionStep;

export default recipeSlice.reducer;
