import './DateInput.css'
import 'react-day-picker/dist/style.css'
import {ru} from 'date-fns/locale'
import {DayPicker} from 'react-day-picker'
import {getUnixTime, startOfToday} from 'date-fns'


const DateInput = ({ value, onChange }) => {

    const currentValue = new Date(value*1000)

    return (

        <DayPicker
            mode="single"
            selected={ currentValue }
            onSelect={ date => onChange(getUnixTime(date)) }
            locale={ru}
            // defaultMonth={ currentValue }
        />

    )
}


export default DateInput