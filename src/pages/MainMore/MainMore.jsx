import s from './MainMore.module.sass'
import {useEffect, useState} from 'react'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import EditImage from '../../components/ui/EditImage/EditImage.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const MainMore = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [loadedImg, setLoadedImg] = useState('')

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [btn, setBtn] = useState('')
    const [img, setImg] = useState('')


    useEffect( () => {
        setLoadedImg('')
    }, [isOpenAside] )

    useEffect( () => {
        axiosAuth('/home/about')
            .then(({data})=> {
                setTitle(data.title || '')
                setDesc(data.description || '')
                setBtn(data.button || '')
                setImg(data.image || '')
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const submitHandler = () => {
        setBtnLoading(true)

        const queryData = {
            title: title || null,
            description: desc || null,
            button: btn || null,
            image: img || null
        }
        axiosAuth.put('/home/about', queryData)
            .then(()=>toast.success('Данные сохранены'))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoading(false))

    }

    const imgHandler = type => {
        if (type==='save') setImg(loadedImg)
        setIsOpenAside(false)
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container } >

            <h1>Подробнее о конкурсе</h1>

            <TextInput value={title} onChange={e=>setTitle(e.target.value)} label='Заголовок'/>

            <TextAreaInput
                className={ s.desc }
                value={desc}
                onChange={e=>setDesc(e.target.value)}
                label='Description'
                minRows={2}
            />

            <TextInput value={btn} onChange={e=>setBtn(e.target.value)} label='Кнопка'/>

            <h2 className={ s.LoadTitle }>Загрузка изображения</h2>

            <EditImage
                image={ img }
                className={ s.image }
                onEdit={()=>setIsOpenAside(true)}
                onRemove={ ()=>setImg('') }
            />

            <Button
                save
                isLoading={btnLoading}
                onClick={()=>submitHandler()}
            >
                Сохранить
            </Button>

        </section>

        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить фото'>
            <FileInput
                label='Загрузка изображения'
                value={ loadedImg }
                setValue={ setLoadedImg }
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save onClick={()=>imgHandler('save')}>Сохранить</Button>
                <Button typeUI='border' onClick={()=>imgHandler('cancel')}>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default MainMore