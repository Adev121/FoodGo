import { createStore } from "redux";
import rootReducer from "./redux/reducer/main.js";


const store = createStore(rootReducer);

export default store;
