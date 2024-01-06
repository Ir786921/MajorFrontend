import { configureStore } from "@reduxjs/toolkit";
import UserResponseSlice from "./UserResponseSlice";

const Store = configureStore({
    reducer:{
        userResponse:UserResponseSlice,
    }
});
export default Store;