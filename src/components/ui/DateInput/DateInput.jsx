import './DateInput.css'
import 'react-day-picker/dist/style.css'
import {ru} from 'date-fns/locale'
import {DayPicker} from 'react-day-picker'


const DateInput = (value, onChange) => {

    // value = new Date(1679270400*1000)

    return (

        <DayPicker
            mode="single"
            selected={ value }
            onSelect={ onChange }
            locale={ru}
            defaultMonth={ value }
        />

    )
}


export default DateInput