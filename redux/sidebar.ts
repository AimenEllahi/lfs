import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface CollapsedState {
    collapsed: boolean;
}

const initialState: CollapsedState = {
    collapsed: false,
};

export const Collapsed = createSlice({
    name: "collapsed",
    initialState,
    reducers: {
        collapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        }
    },
});

export const {
    collapsed
} = Collapsed.actions;

export default Collapsed.reducer;
