import s from './Layout.module.sass'
import {Outlet} from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import MenuAside from '../../components/MenuAside/MenuAside.jsx'


const Layout = () => {


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