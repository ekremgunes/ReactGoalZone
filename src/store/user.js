import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  strTeam:"" //team name
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    select(state,action) {
      state.strTeam = action.payload.strTeam;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
