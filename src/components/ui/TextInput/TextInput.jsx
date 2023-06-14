import s from './TextInput.module.sass'


const TextInput = ({ label, className, ...props }) => {


    return (


        <div className={ `${s.container} ${className || ''}` }>
            {
                !!label && <label>{ label }</label>
            }
            <input { ...props }/>
        </div>


    )
}


export default TextInput