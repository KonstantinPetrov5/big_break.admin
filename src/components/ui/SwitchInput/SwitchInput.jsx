import s from './SwitchInput.module.sass'


const SwitchInput = ({ tabs, name, className, value, onChange }) => {
    
    return (

        <div className={ `${s.container} ${className || ''}` }>
            {
                tabs.map( tab =>
                    <label key={ tab.value } className={ value === tab.value ? s.checked : s.label }>
                        { tab.label }
                        <input
                            type='radio'
                            id={ tab.value }
                            value={ tab.value }
                            name={name}
                            onChange={ onChange }
                        />
                    </label>
                )
            }
        </div>

    )
}


export default SwitchInput