import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  idTeam:"" ,//team id,
  shortName:""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserTeam(state,action) {
      state.idTeam = action.payload.idTeam; //local storage update
      state.shortName = action.payload.shortName; //local storage update
      localStorage.setItem("idTeam",action.payload.idTeam);
      localStorage.setItem("shortName",action.payload.shortName);
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
