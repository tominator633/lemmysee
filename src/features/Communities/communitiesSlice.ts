import {  createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { type Community, type CommunitiesState} from "./communitiesTypes";

const initialState: CommunitiesState = {
    swiperCommunities: [],
    currentCommunity: {},
};

export const communitiesSlice = createSlice({
    name: "communities",
    initialState,
    reducers: {
        addCommunity: (state, action: PayloadAction<Community>) => {
            if (!state.swiperCommunities.some(community => community.id === action.payload.id)) {
                state.swiperCommunities.push(action.payload);
            }
        },
        deleteCommunity: (state, action: PayloadAction<{ id: string }>) => {
            const newArr = state.swiperCommunities.filter(item => item.id !== action.payload.id);
            state.swiperCommunities = newArr;
        },
        setCurrentCommunity: (state, action: PayloadAction<Community | Record<string, never>>) => {
            state.currentCommunity = action.payload;
        }
    }
});

/* Selectors */
export const selectSwiperCommunities = (state: RootState): Community[] => state.communities.swiperCommunities;
export const selectCurrentCommunity = (state: RootState): Community | Record<string, never> => state.communities.currentCommunity;

export const { addCommunity, deleteCommunity, setCurrentCommunity } = communitiesSlice.actions;

export default communitiesSlice.reducer;