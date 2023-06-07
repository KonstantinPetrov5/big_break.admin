import './SelectInput.sass'
import Select from 'react-select'
import ErrMessage from '../ErrMessage/ErrMessage.jsx'


const SelectInput = ({ options, setFieldValue, label, error, ...props }) => {

    const currentErr = error?.[props.name]

    return (

        <div className='selectInput__container'>

            {
                !!label
                && <label htmlFor={ props.name }>{ label }</label>
            }

            <Select
                {...props}
                options={ options }
                value={ options.find(item => item.value===props.value) }
                onChange={ ({value}) => setFieldValue(props.name, value) }
                unstyled
                classNamePrefix='select'
                isSearchable={false}
            />

            <ErrMessage err={ currentErr }/>

        </div>


    )
}


export default SelectInput