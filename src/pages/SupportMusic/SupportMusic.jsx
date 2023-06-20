import s from './SupportMusic.module.sass'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import EditImage from '../../components/ui/EditImage/EditImage.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'


const SupportMusic = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Большая перемена музыка</h1>

            <TextAreaInput label='Текст' minRows={3}/>

            <TextInput label='Кнопка' className={ s.btnText }/>

            <h2>Загрузка видео</h2>
            <TextInput placeholder='Вставьте ссылку на видео' className={ s.videoInput }/>

            <Button isLoading={btnLoading} save >
                Сохранить
            </Button>

        </section>

    </>
}


export default SupportMusic