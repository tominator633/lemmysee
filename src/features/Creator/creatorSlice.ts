import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiPersonResponse, Person, PersonAggregates } from "./creatorApiTypes";
import type { RootState } from '../../app/store';


/* Types */
export interface Creator {
    id: string;
    name: string;
    displayName: string | null;
    iconImg: string | null;
    bannerImg: string | null;
    description: string | null;
    isBanned: boolean;
    timePublished: string;
    counts: {
        posts: number;
        comments: number;
    },
}

export interface CreatorState {
    currentCreator: Creator | null;
    isGetCreatorLoading: boolean;
    hasGetCreatorError: boolean;
}



//const baseUrl = "https://lemmy.ml/api/v3";
const baseUrl = "https://lemmy.world/api/v3";


/* Thunk */
export const getCreator = createAsyncThunk<
    Creator,
    string,
    { rejectValue: string }
>(
    "creator/getCreator",
    async (creatorId: string, thunkAPI) => {
        try {
            const searchEndpoint = `/user?person_id=${creatorId}`;
            const response = await fetch(baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiPersonResponse = await response.json();
            const person: Person = jsonResponse.person_view.person;
            const counts: PersonAggregates = jsonResponse.person_view.counts;
            const creator: Creator = {
                id: String(person.id),
                name: person.name,
                displayName: person.display_name ?? null,
                iconImg: person.avatar ?? null,
                bannerImg: person.banner ?? null,
                description: person.bio ?? null,
                isBanned: person.banned,
                timePublished: person.published,
                counts: {
                    posts: counts.post_count,
                    comments: counts.comment_count,     
                },
            } as Creator;

            console.log(creator);
            return creator;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */
const initialState: CreatorState = {
    currentCreator: null,
    isGetCreatorLoading: false,
    hasGetCreatorError: false
};

export const creatorSlice = createSlice({
    name: "communities",
    initialState,
    reducers: {
        setCurrentCreator: (state, action: PayloadAction<Creator | null>) => {
                    state.currentCreator = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCreator.pending, (state) => {
                state.isGetCreatorLoading = true;
                state.hasGetCreatorError = false;
            })
            .addCase(getCreator.rejected, (state) => {
                state.isGetCreatorLoading = false;
                state.hasGetCreatorError = true;
                state.currentCreator = null;
            })
            .addCase(getCreator.fulfilled, (state, action: PayloadAction<Creator>) => {
                state.isGetCreatorLoading = false;
                state.hasGetCreatorError = false;
                state.currentCreator = action.payload;
            });
    }
});

/* Selectors */
export const selectCurrentCreator = (state: RootState): Creator | null => state.creator.currentCreator;
export const selectIsGetCreatorLoading = (state: RootState): boolean => state.creator.isGetCreatorLoading;
export const selectHasGetCreatorError = (state: RootState): boolean => state.creator.hasGetCreatorError;

export const { setCurrentCreator } = creatorSlice.actions;

export default creatorSlice.reducer;