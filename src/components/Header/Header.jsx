import s from './Header.module.sass'
import logo from '../../../public/assets/icons/Logo.svg'
import {useNavigate} from 'react-router-dom'
import {ExitIcon} from '../../../public/assets/jsxIcons/ExitIcon.jsx'
import {BurgerIcon} from '../../../public/assets/jsxIcons/BurgerIcon.jsx'
import {burgerAtom} from '../../store/BurgerRecoil.js'
import {useRecoilState} from 'recoil'
import {axiosAuth} from '../../utils/axiosInstance.js'
import {userAtom} from '../../store/UserRecoil.js'
import {logoutHandler} from '../../utils/logoutHandler.js'


const Header = () => {


    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useRecoilState(burgerAtom)

    const toggleMenu = () => setMenuIsOpen(p=>!p)

    return (

        <header className={ s.header }>
            <BurgerIcon className={ s.burgerIcon } onClick={toggleMenu}/>
            <img className={ s.logo } src={ logo } alt='логотип' onClick={ ()=>navigate('/main/banner') }/>
            <ExitIcon className={ s.exitButton } onClick={ logoutHandler }/>
        </header>

    )
}


export default Header