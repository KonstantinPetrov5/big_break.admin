import s from './FindPhotos.module.sass'
import {useEffect, useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import PhotosItem from './PhotosItem/PhotosItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultData = {
    image: '',
    video: ''
}


const FindPhotos = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState([])

    const [editData, setEditData] = useState({})
    const [type, setType] = useState('photo') // video


    useEffect( () => {
        axiosAuth('/about/gallery')
            .then(({data})=> setList(data.items))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const addPhotoHandler = () => {
        setEditData(defaultData)
        setType('photo')
        setIsOpenAside(true)
    }

    const addVideoHandler = () => {
        setEditData(defaultData)
        setType('video')
        setIsOpenAside(true)
    }

    const saveHandler = () => {
        setBtnLoading(true)

        const queryData = {
            type,
            image: editData.image || null,
            video: editData.video || null,
        }

        axiosAuth.post('/about/gallery/create', queryData)
            .then(({data})=> {
                setList([ data, ...list ])
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoading(false))

        setIsOpenAside(false)
    }

    const deleteHandler = id => {
        const isConfirm = window.confirm('Удалить?')
        if (!isConfirm) return null

        axiosAuth.delete('/about/gallery/delete', { data: { id } })
            .then(()=> {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
    }

    const saveNewPosition = e => {
        const id = e.active.id
        const new_position = e.over.data.current.sortable.index + 1
        axiosAuth.post('/about/gallery/position', { id, new_position })
            .then( () => toast.success('Данные сохранены') )
            .catch(()=>toast.error('Произошла ошибка'))
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return (

        <section className={ s.container }>

            <h1>Фотогалерея</h1>

            <div className={ s.addBtns }>
                <Button add onClick={()=>addPhotoHandler()}>
                    <span>Добавить фото</span>
                    <span>Фото</span>
                </Button>
                <Button add onClick={()=>addVideoHandler()}>
                    <span>Добавить видео</span>
                    <span>Видео</span>
                </Button>
            </div>

            <DndContext
                onDragEnd={ e => {
                    dndHandlers(e, list, setList)
                    saveNewPosition(e)
                } }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            list.map( (item, i) =>
                                <PhotosItem key={item.id} {...{item, i, deleteHandler}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>


            <EditAside state={isOpenAside} setState={setIsOpenAside} title={ type==='photo' ? 'Добавить фото' : 'Добавить видео' }>
                <FileInput
                    label={ type==='photo' ? 'Загрузка изображения' : 'Загрузка превью' }
                    value={ editData.image }
                    setValue={ image => setEditData({...editData, image }) }
                />
                {
                    type==='video'
                    &&
                    <>
                        <Separator className={ s.separator }/>
                        <h2 className={ s.videoTitle }>Загрузка видео</h2>
                        <TextInput
                            placeholder='Вставьте ссылку на видео'
                            value={ editData.video }
                            onChange={ e => setEditData({...editData, video: e.target.value }) }
                        />
                    </>
                }
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button
                        save
                        onClick={()=>saveHandler()}
                        isLoading={btnLoading}
                    >
                        Сохранить
                    </Button>
                    <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
                </div>
            </EditAside>

        </section>

    )

}


export default FindPhotos