import s from './NumberInput.module.sass'
import {NumericFormat} from 'react-number-format'


const NumberInput = ({ value, onChange, label, decimalScale=0, min, max }) => {


    const allowedHandler = ({ formattedValue, floatValue }) => {
        if (max) return formattedValue === "" || floatValue >= 0 && floatValue <= max
        if (min) return formattedValue === "" || floatValue >= min
        return true
    }


    return (

        <div className={ s.container }>

            {
                !!label
                && <label>{ label }</label>
            }

            <NumericFormat
                value={value}
                allowNegative={ false }
                decimalScale={ decimalScale }
                isAllowed={ allowedHandler }
                onValueChange={ ({ floatValue }) => onChange(floatValue || null) }
                onChange={()=>null} // reset formik onChange
            />

        </div>

    )
}


export default NumberInput