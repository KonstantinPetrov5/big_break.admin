import s from './NumberInput.module.sass'
import ErrMessage from '../ErrMessage/ErrMessage.jsx'
import {NumericFormat} from 'react-number-format'


const NumberInput = ({ error, label, setFieldValue, decimalScale=0, min, max, ...props }) => {


    const currentErr = error?.[props.name]

    const allowedHandler = ({ formattedValue, floatValue }) => {
        if (max) return formattedValue === "" || floatValue >= 0 && floatValue <= max
        if (min) return formattedValue === "" || floatValue >= min
        return true
    }


    return (

        <div className={ s.container }>

            {
                !!label
                && <label htmlFor={ props.name }>{ label }</label>
            }

            <NumericFormat
                {...props}
                allowNegative={ false }
                decimalScale={ decimalScale }
                isAllowed={ allowedHandler }
                onValueChange={ ({ floatValue }) => setFieldValue(props.name, floatValue || null) }
                onChange={()=>null} // reset formik onChange
            />

            <ErrMessage err={ currentErr }/>

        </div>

    )
}


export default NumberInput