import s from './TextAreaInput.module.sass'
import TextareaAutosize from 'react-textarea-autosize'


const TextAreaInput = ({ label, className, ...props }) => {


    return (

        <div className={ `${s.container} ${className || ''}` }>
            {
                !!label && <label>{ label }</label>
            }
            <TextareaAutosize { ...props }/>
        </div>

    )
}


export default TextAreaInput