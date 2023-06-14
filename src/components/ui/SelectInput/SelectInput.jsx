import './SelectInput.sass'
import Select from 'react-select'


const SelectInput = ({ options, value, onChange, label }) => {


    return (

        <div className='selectInput__container'>

            {
                !!label
                && <label>{ label }</label>
            }

            <Select
                options={ options }
                value={ options.find(item => item.value===value) }
                onChange={ ({v}) => onChange(v) }
                unstyled
                classNamePrefix='select'
                isSearchable={false}
            />


        </div>


    )
}


export default SelectInput