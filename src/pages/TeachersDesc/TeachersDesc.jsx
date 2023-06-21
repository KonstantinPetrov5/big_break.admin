import s from './TeachersDesc.module.sass'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'


const testData = {
    desc: '',
    list: [
        {id: 1, number: '123', desc: 'Год создания первого клуба'},
        {id: 2, number: '32', desc: 'Год создания первого клуба'},
        {id: 3, number: '223', desc: 'Год создания первого клуба'},
    ]
}


const TeachersDesc = () => {


    const [isLoading, setIsLoading] = useState(false)


    if (isLoading) return <h1>Загрузка...</h1>
    return (

        <section className={ s.container }>

            <h1>Описание</h1>

            <TextAreaInput
                label='Description'
                minRows={3}
                className={ s.descInput }
            />

            <Button add>Добавить</Button>

            <ul className={ s.list }>
                {
                    testData.list.map( ({id}) =>
                        <li key={id}>
                            <TextInput className={ s.number } label='Цифра'/>
                            <TextInput label='Описание'/>
                        </li>
                    )
                }

            </ul>

            <Button save>Сохранить</Button>

        </section>
    )
}


export default TeachersDesc