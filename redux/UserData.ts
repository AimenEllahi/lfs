import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  user:any;
  loc_data:any;
  bookmark:object;
  favourites:any;
  current_locaton:object;
  user_object:any
}

const initialState: CounterState = {
    user:null,
    loc_data:null,
    bookmark:{},
    favourites:[],
    current_locaton:{},
    user_object:null

};

export const UserData = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    UserDetails: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
  },
    addbookmark: (state, action: PayloadAction<object>) => {
        state.bookmark = action.payload;
    },
    removebookmark: (state, action: PayloadAction<object>) => {
        state.bookmark = action.payload;
    },
    loc_data: (state, action: PayloadAction<object>) => {
        state.loc_data = action.payload;
    },
    loadfavourites: (state, action: PayloadAction<object>) => {
        state.favourites = action.payload;
    },
    current_locaton: (state, action: PayloadAction<object>) => {
        state.current_locaton = action.payload;
    },
    UserObject: (state, action: PayloadAction<object>) => {
        state.user_object = action.payload;
    }


  },
});

// Action creators are generated for each case reducer function
export const {
  UserDetails,
  addbookmark,
  removebookmark,
  loc_data,
  loadfavourites,
  current_locaton,
  UserObject
} = UserData.actions;

export default UserData.reducer;
