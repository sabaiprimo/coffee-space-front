import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    searchTitle: '',
    searchFilter: '',
    sortByDate: false,
    sortByRating: false,
  },
  reducers: {
    // setUserProfile: (state, action) => {
    //   // console.log(action);
    //   const payload = action.payload.me;
    //   state._id = payload._id;
    //   state.email = payload.email;
    //   state.displayName = payload.displayName;
    //   state.firstName = payload.firstName;
    //   state.lastName = payload.lastName;
    //   state.pictureProfile = payload.pictureProfile;
    // },
    setSearchTitle: (state, { payload }) => {
      state.searchTitle = payload;
    },
    // clearState: (state) => {
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.isFetching = false;
    //   return state;
    // },
    // clearTempUploadProfile: (state) => {
    //   state.tempUploadProfile = '';
    // },
    // clearUserData: (state) => {
    //   state._id = '';
    //   state.email = '';
    //   state.displayName = '';
    //   state.firstName = '';
    //   state.lastName = '';
    //   state.pictureProfile = '';
    // },
  },
  // extraReducers: {
  //   [signupUser.fulfilled]: (state, { payload }) => {
  //     console.log('payload', payload);
  //     state.isFetching = false;
  //     state.isSuccess = true;
  //     state.email = payload.user.email;
  //     state.username = payload.user.name;
  //   },
  //   [signupUser.pending]: (state) => {
  //     state.isFetching = true;
  //   },
  //   [signupUser.rejected]: (state, { payload }) => {
  //     state.isFetching = false;
  //     state.isError = true;
  //     state.errorMessage = payload.message;
  //   },
  //   [loginUser.fulfilled]: (state, { payload }) => {
  //     // state.email = payload.email;
  //     // state.username = payload.name;
  //     state.isFetching = false;
  //     state.isSuccess = true;
  //     return state;
  //   },
  //   [loginUser.rejected]: (state, { payload }) => {
  //     // console.log('payload', payload);
  //     state.isFetching = false;
  //     state.isError = true;
  //     // state.errorMessage = payload.message;
  //   },
  //   [loginUser.pending]: (state) => {
  //     state.isFetching = true;
  //   },
  //   [fetchUserBytoken.pending]: (state) => {
  //     state.isFetching = true;
  //   },
  //   [fetchUserBytoken.fulfilled]: (state, { payload }) => {
  //     state.isFetching = false;
  //     state.isSuccess = true;

  //     state.email = payload.email;
  //     state.username = payload.name;
  //   },
  //   [fetchUserBytoken.rejected]: (state) => {
  //     console.log('fetchUserBytoken');
  //     state.isFetching = false;
  //     state.isError = true;
  //   },
  // },
});

export const { setSearchTitle } = recipeSlice.actions;

export const recipeSelector = (state) => state.recipe;
