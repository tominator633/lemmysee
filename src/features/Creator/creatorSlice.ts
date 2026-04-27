import {createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';


/* Types */
export interface Creator {
    id: string;
    name: string;
    avatarImg: string | null;
    bannerImg: string | null;
    bio: string | null;
} 
export interface CreatorState {
    currentCreator: Creator | null;
}



/* Slice */
const initialState: CreatorState = {
    currentCreator: null,
};

export const creatorSlice = createSlice({
    name: "creator",
    initialState,
    reducers: {
        setCurrentCreator: (state, action: PayloadAction<Creator | null>) => {
                    state.currentCreator = action.payload;
        }
    }
});

/* Selectors */

export const selectCurrentCreator = (state: RootState): Creator | null => state.creator.currentCreator;

export const { setCurrentCreator } = creatorSlice.actions;

export default creatorSlice.reducer;