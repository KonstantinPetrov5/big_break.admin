import s from './TextInput.module.sass'
import ErrMessage from '../ErrMessage/ErrMessage.jsx'


const TextInput = ({ error, label, ...props }) => {


    const currentErr = error?.[props.name]


    return (

        <div className={ s.container }>

            {
                !!label
                && <label htmlFor={ props.name }>{ label }</label>
            }

            <input { ...props } data-error={ !!currentErr }/>

            <ErrMessage err={ currentErr }/>

        </div>

    )
}


export default TextInput