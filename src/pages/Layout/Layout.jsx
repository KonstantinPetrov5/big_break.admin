import s from './Layout.module.sass'
import {Outlet} from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import MenuAside from '../../components/MenuAside/MenuAside.jsx'
import {useCheckAuth} from '../../hooks/useCheckAuth.js'
import {useRedirect} from '../../hooks/useRedirect.js'


const Layout = () => {


    useCheckAuth()
    useRedirect()

    return <>

        <Header/>
        <main className={ s.main }>
            <MenuAside/>
            <div className={ s.wrapper }>
                <Outlet/>
            </div>
        </main>

    </>
}


export default Layout