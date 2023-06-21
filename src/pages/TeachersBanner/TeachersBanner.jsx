import s from './TeachersBanner.module.sass'
import {useEffect, useState} from 'react'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx'
import EditImage from '../../components/ui/EditImage/EditImage.jsx'
import redBg from '../../../public/assets/images/redBg.png'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const switchData = [
    { label: 'Изображение', value: 'img' },
    { label: 'Фон', value: 'bg' },
]


const TeachersBanner = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [switchPos, setSwitchPos] = useState(switchData[0].value)
    const [loadedImg, setLoadedImg] = useState('')

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [button, setButton] = useState('')
    const [img, setImg] = useState('')
    const [bg, setBg] = useState('')

    useEffect( () => {
        setLoadedImg('')
    }, [isOpenAside] )

    useEffect( () => {
        axiosAuth('/banner?type=teacher')
            .then(({data})=> {
                setTitle(data.title || '')
                setDesc(data.description || '')
                setButton(data.button || '')
                setImg(data.cut_image || '')
                setBg(data.background_image || '')
                setSwitchPos(data.is_background ? 'bg' : 'img')
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const submitHandler = () => {
        setBtnLoading(true)
        
        const queryData = {
            type: 'teacher',
            title: title || null,
            description: desc || null,
            button: button || null,
            is_background: switchPos==='bg',
            cut_image: img || null,
            background_image: bg || null
        }
        axiosAuth.put('/banner/update', queryData)
            .then(()=>toast.success('Данные сохранены'))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoading(false))
    }

    const imgHandler = type => {
        if (type==='save') {
            switchPos==='img'
                ? setImg(loadedImg)
                : setBg(loadedImg)
        }
        setIsOpenAside(false)
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Баннер</h1>

            <TextInput value={title} onChange={e=>setTitle(e.target.value)} label='Заголовок'/>

            <TextAreaInput
                className={ s.desc }
                value={desc}
                onChange={e=>setDesc(e.target.value)}
                label='Description'
                minRows={2}
            />

            <TextInput value={button} onChange={e=>setButton(e.target.value)} label='Кнопка'/>

            <SwitchInput
                className={ s.switch }
                tabs={switchData}
                value={switchPos}
                name='bannerSwitch'
                onChange={ e => setSwitchPos(e.target.value) }
            />

            <EditImage
                image={ switchPos==='img' ? img : bg!=='' ? bg : redBg }
                className={ s.image }
                onEdit={ ()=>setIsOpenAside(true) }
                onRemove={ ()=>switchPos==='img' ? setImg('') : setBg('') }
            />

            <Button isLoading={btnLoading} save onClick={()=>submitHandler()}>
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


export default TeachersBanner