import s from './TextAreaInput.module.sass'
import TextareaAutosize from 'react-textarea-autosize'
import ErrMessage from '../ErrMessage/ErrMessage.jsx'


const TextAreaInput = ({ error, label, ...props }) => {


    const currentErr = error?.[props.name]


    return (

        <div className={ `${s.container} ${props.className || ''}` }>

            {
                !!label
                && <label htmlFor={ props.name }>{ label }</label>
            }

            <TextareaAutosize { ...props } data-error={ !!currentErr }/>

            <ErrMessage err={ currentErr }/>

        </div>

    )
}


export default TextAreaInput