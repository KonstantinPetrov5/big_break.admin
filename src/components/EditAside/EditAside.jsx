import s from './EditAside.module.sass'
import {XIcon} from '../../../public/assets/jsxIcons/XIcon.jsx'
import {lockScrollHandler} from '../../utils/lockScroll.js'
import {useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {useClickOutside} from '../../hooks/useClickOutside.js'


const EditAside = ({ title, state, setState, children }) => {


    const asideRef = useRef(null)
    useClickOutside(asideRef.current, state, ()=>setState(false))


    return (

        <CSSTransition
            in={state}
            timeout={0}
            onEnter={ ()=>lockScrollHandler(true) }
            onExited={ ()=>lockScrollHandler(false) }
            classNames={{ enterDone: s.asideShow }}
        >
            <>

                <aside ref={asideRef} className={ s.container }>

                    <div className={ s.header }>
                        <h2>{ title }</h2>
                        <XIcon onClick={ ()=>setState(false) }/>
                    </div>

                    { children }

                </aside>

                <div className={ s.bg }/>

            </>
        </CSSTransition>

    )



}


export default EditAside