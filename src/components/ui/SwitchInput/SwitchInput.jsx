import s from './SwitchInput.module.sass'


const SwitchInput = ({ tabs, ...props }) => {
    
    return (

        <div className={ `${s.container} ${props.className || ''}` }>
                {
                    tabs.map( ({ label, value }) =>
                        <label
                            key={ value }
                            className={ props.value === value ? s.checked : s.label }
                            htmlFor={ value }
                        >
                            { label }
                            <input
                                type='radio'
                                name={ props.name }
                                id={ value }
                                value={ value }
                                onChange={ props.onChange }
                            />
                        </label>
                    )
                }
            </div>

    )
}


export default SwitchInput