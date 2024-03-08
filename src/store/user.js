import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id:"" ,//team id,
  shortName:"",
  competition:"",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserTeam(state,action) {
      state.id = action.payload.id;
      state.shortName = action.payload.shortName;
      localStorage.setItem("id",action.payload.id);
      localStorage.setItem("shortName",action.payload.shortName);

      if (action.payload.competition.length < 0 ) {
        state.competition = initialUserState.competition
      }
      state.competition = action.payload.competition;
      localStorage.setItem("competition",action.payload.competition);
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
