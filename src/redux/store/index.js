import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from '../reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const middleWares = [thunk];
const enhancer = applyMiddleware(...middleWares);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    enhancer
)

let persistor = persistStore(store);

export {
    store,
    persistor,
};
