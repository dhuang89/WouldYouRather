import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Reducer from './Reducer'
import Middleware from './Middleware'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const appStore = createStore(Reducer, Middleware)

ReactDOM.render(
    <Provider store={appStore}>
        <App/>
    </Provider>, document.getElementById('root'));
