import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, useLazyQuery } from '@apollo/client';

const PROFILE_QUERY = gql`
  query currentUser {
    me {
      _id
      email
    }
  }
`;

export const signupUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      // graphql register
      const response = await fetch(
        'https://mock-user-auth-server.herokuapp.com/api/v1/users',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        return { ...data, username: name, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (data, thunkAPI) => {
    try {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// export const fetchUserBytoken = createAsyncThunk(
//   'users/fetchUserByToken',
//   async ({ token }, thunkAPI) => {
//     try {
//       //graphql fetch user with token
//       // const response = await fetch(
//       //   'https://mock-user-auth-server.herokuapp.com/api/v1/users',
//       //   {
//       //     method: 'GET',
//       //     headers: {
//       //       Accept: 'application/json',
//       //       Authorization: token,
//       //       'Content-Type': 'application/json',
//       //     },
//       //   }
//       // );
//       const { data } = await useQuery(PROFILE_QUERY);
//       // let data = await response.json();
//       console.log('data', data);

//       if (response.status === 200) {
//         return { ...data };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    pirctureProfile: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    fetchUserBytoken: (state, { payload }) => {
      state.email = paylaod.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.pirctureProfile = payload.pirctureProfile;
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
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

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
