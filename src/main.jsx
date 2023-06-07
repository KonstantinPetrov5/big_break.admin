import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {Router} from './router/router.jsx'
import './styles/reset.css'
import './styles/_variables.css'
import './styles/global.sass'
import 'font-proxima-nova/style.css'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import { persistor, store } from './store/store'


ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={Router}/>
        </PersistGate>
    </Provider>

)
