
import { applyMiddleware, createStore } from 'redux'
import thunk from 'react-redux'
import rootReducer from './reducer/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store;