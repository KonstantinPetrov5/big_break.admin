import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {Router} from './router/router.jsx'
import './styles/reset.css'
import './styles/_variables.css'
import './styles/global.sass'
import 'font-proxima-nova/style.css'
import {RecoilRoot} from 'recoil'
import RecoilNexus from 'recoil-nexus'


ReactDOM.createRoot(document.getElementById('root')).render(

    <RecoilRoot>
        <RecoilNexus/>
        <RouterProvider router={Router}/>
    </RecoilRoot>


)
