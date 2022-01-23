// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore } from "redux";
// 引入为Setting组件服务的reducer
import settingReducer from "./setting_reducer"


export default const store = createStore(settingReducer)