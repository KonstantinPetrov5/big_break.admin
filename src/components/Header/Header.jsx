import s from './Header.module.sass'
import logo from '../../../public/assets/icons/Logo.svg'
import defaultAvatar from '../../../public/assets/images/defaultAvatar.jpeg'
import {useNavigate} from 'react-router-dom'
import {ExitIcon} from '../../../public/assets/jsxIcons/ExitIcon.jsx'
import {BurgerIcon} from '../../../public/assets/jsxIcons/BurgerIcon.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {setMenu} from '../../store/menuSlice.js'


const Header = () => {


    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { menuIsOpen } = useSelector( state => state.menu )

    
    const toggleMenu = () => dispatch(setMenu(!menuIsOpen))


    return (

        <header className={ s.header }>
            <BurgerIcon className={ s.burgerIcon } onClick={toggleMenu}/>
            <img className={ s.logo } src={ logo } alt='логотип' onClick={ ()=>navigate('/') }/>
            <ExitIcon className={ s.exitButton } onClick={ ()=>console.log('exitHandler') }/>
            <img className={ s.avatar } src={ defaultAvatar } alt='аватар'/>
        </header>

    )
}


export default Header