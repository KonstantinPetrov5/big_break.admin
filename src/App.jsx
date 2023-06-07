import {Outlet, ScrollRestoration} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'


const App = () => {


    return <>

        <ScrollRestoration/>
        <Toaster position="top-right"/>

        <Outlet/>

    </>


}

export default App
