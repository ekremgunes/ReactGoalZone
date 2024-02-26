import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id:"" ,//team id,
  shortName:""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserTeam(state,action) {
      state.id = action.payload.id; //local storage update
      state.shortName = action.payload.shortName; //local storage update
      localStorage.setItem("id",action.payload.id);
      localStorage.setItem("shortName",action.payload.shortName);
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
