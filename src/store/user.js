import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  strTeam:"" //team name,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserTeam(state,action) {
      state.strTeam = action.payload.strTeam; //local storage update
      localStorage.setItem("strTeam",action.payload.strTeam);
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
