import s from './MenuAside.module.sass'
import {Link, NavLink, useLocation} from 'react-router-dom'
import {subLinksData} from './subLinksData.js'
import {useEffect, useRef, useState} from 'react'
import {ChevronUp} from '../../../public/assets/jsxIcons/ChevronUp.jsx'
import {HomeIcon} from '../../../public/assets/jsxIcons/HomeIcon.jsx'
import {CSSTransition} from 'react-transition-group'
import {useClickOutside} from '../../hooks/useClickOutside.js'
import {ExitIcon} from '../../../public/assets/jsxIcons/ExitIcon.jsx'
import {lockScrollHandler} from '../../utils/lockScroll.js'
import {burgerAtom} from '../../store/BurgerRecoil.js'
import {useRecoilState} from 'recoil'
import {logoutHandler} from '../../utils/logoutHandler.js'


const MenuAside = () => {


    const [openItem, setOpenItem] = useState(sessionStorage.getItem('openMenuItem') || '')
    
    const { pathname } = useLocation()

    const [menuIsOpen, setMenuIsOpen] = useRecoilState(burgerAtom)

    const asideRef = useRef(null)
    useClickOutside(asideRef.current, menuIsOpen, ()=>setMenuIsOpen(false))

    useEffect( () => {
        sessionStorage.setItem('openMenuItem', openItem)
        // сохраняем состояние меню
    }, [openItem] )

    useEffect( () => {
        if (menuIsOpen) setMenuIsOpen(false)
        // закрываем меню если изменился роут
    }, [pathname] )


    const openItemHandler = id => {
        const state = openItem!==id ? id : ''
        setOpenItem(state)
    }


    return (

        <CSSTransition
            in={menuIsOpen}
            timeout={0}
            onEnter={ ()=>lockScrollHandler(true) }
            onExited={ ()=>lockScrollHandler(false) }
            classNames={{ enterDone: s.asideShow }}
        >
            <>
                <aside ref={asideRef} className={ s.aside }>

                    <Link to={'/main/banner'} className={ s.toHome }><HomeIcon/>На главную</Link>

                    <div className={ s.subLinksBox }>
                        {
                            subLinksData.map( item =>
                                <nav key={item.id} data-open={item.id===openItem} >
                                    <div className={ s.labelBox } onClick={ () => openItemHandler(item.id) }>
                                        <p>{ item.label }</p>
                                        <ChevronUp/>
                                    </div>
                                    <div className={ s.subLinks }>
                                        <div>
                                            {
                                                item.list.map( ({id, icon, link, label}) =>
                                                    <NavLink key={id} to={link} className={ ({ isActive }) => isActive ? s.activeLink : '' }>
                                                        <img src={`/assets/icons/${icon}.svg`} alt={label}/>
                                                        { label }
                                                    </NavLink>
                                                )
                                            }
                                        </div>
                                    </div>
                                </nav>
                            )
                        }
                    </div>

                    <div className={ s.mobileItems }>
                        <p onClick={ logoutHandler }>
                            <ExitIcon className={ s.exitButton }/>
                            Выход
                        </p>
                    </div>

                </aside>

                <div className={ s.bgMenu }/>
            </>
        </CSSTransition>

    )
}


export default MenuAside