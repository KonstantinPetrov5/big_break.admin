import s from './TeachersDesc.module.sass'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'





const TeachersDesc = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [data, setData] = useState(null)

    useEffect(() => {
        axiosAuth('/teacher/description')
            .then(({ data }) => {
                const newData = {
                    description: data.description || '',
                    description_1: data.description_1 || '',
                    description_2: data.description_2 || '',
                    description_3: data.description_3 || '',
                    number_1: data.number_1 || '',
                    number_2: data.number_2 || '',
                    number_3: data.number_3 || ''
                }
                setData(newData)
            })
            .catch(() => toast.error('Произошла ошибка'))
            .finally(() => setIsLoading(false))
    }, [])


    const saveHandler = () => {
        setBtnLoading(true)
        axiosAuth
            .put('/teacher/description/update', data)
            .then(() => toast.success('Данные сохранены'))
            .catch(() => toast.error('Произошла ошибка'))
            .finally(() => setBtnLoading(false))
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return (

        <section className={ s.container }>

            <h1>Описание</h1>

            <TextAreaInput
                value={data.description}
                onChange={e=>setData({ ...data, description: e.target.value })}
                label='Description'
                minRows={3}
                className={ s.descInput }
            />

            <ul className={ s.list }>
                <li>
                    <TextInput
                        value={data.number_1 }
                        onChange={e=>setData({ ...data, number_1: e.target.value })}
                        label='Цифра'
                        className={ s.number }
                    />
                    <TextInput
                        value={data.description_1}
                        onChange={e=>setData({ ...data, description_1: e.target.value })}
                        label='Описание'
                    />
                </li>
                <li>
                    <TextInput
                        value={data.number_2 }
                        onChange={e=>setData({ ...data, number_2: e.target.value })}
                        label='Цифра'
                        className={ s.number }
                    />
                    <TextInput
                        value={data.description_2}
                        onChange={e=>setData({ ...data, description_2: e.target.value })}
                        label='Описание'
                    />
                </li>
                <li>
                    <TextInput
                        value={data.number_3 }
                        onChange={e=>setData({ ...data, number_3: e.target.value })}
                        label='Цифра'
                        className={ s.number }
                    />
                    <TextInput
                        value={data.description_3}
                        onChange={e=>setData({ ...data, description_3: e.target.value })}
                        label='Описание'
                    />
                </li>
            </ul>

            <Button
                save
                onClick={()=>saveHandler()}
                isLoading={btnLoading}
            >
                Сохранить
            </Button>

        </section>
    )
}


export default TeachersDesc