import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isTabsVisible: true
}

export const chartSlice = createSlice({
    name: 'chart', initialState,
    reducers: {
        setIsTabsVisible( state, action) {
            state.isTabsVisible = action.payload
        }
    }
})

export const { setIsTabsVisible } = chartSlice.actions
export default chartSlice.reducer
