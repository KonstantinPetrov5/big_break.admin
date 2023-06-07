import s from './Button.module.sass'
import {PlusIcon} from '../../../../public/assets/jsxIcons/PlusIcon.jsx'
import {SaveIcon} from '../../../../public/assets/jsxIcons/SaveIcon.jsx'


// typeUI: false | 'border'


const Button = ({ children, className, typeUI, add, save, isLoading, isDisable, ...props }) => {


    return (

        <button
            {...props}
            className={ `${s.button} ${!!className ? className : ''}` }
            data-type={ typeUI }
            data-disable={ isDisable || isLoading }
        >
            {
                !isLoading
                ?
                <>
                    { add && <PlusIcon/> }
                    { save && <SaveIcon/> }
                    { children }
                </>
                :
                <span className={ s.loader }/>
            }

        </button>

    )
}


export default Button