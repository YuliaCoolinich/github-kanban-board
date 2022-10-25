import { configureStore  } from "@reduxjs/toolkit";
import rootReduser from "./rootReducer";

const store = configureStore({
    reducer: rootReduser
});

export default store;