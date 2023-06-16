import s from './AboutExperts.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useEffect, useState} from 'react'
import ExpertsItem from './ExpertsItem/ExpertsItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultData = {
    title: '',
    description: '',
    image: ''
}


const AboutExperts = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState([])

    const [editData, setEditData] = useState({})
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        axiosAuth('/committees?category=expert')
            .then(({data})=> setList(data.items))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )

    const addHandler = () => {
        setEditData(defaultData)
        setIsNew(true)
        setIsOpenAside(true)
    }

    const editHandler = id => {
        setEditData(list.find(obj=>obj.id===id))
        setIsNew(false)
        setIsOpenAside(true)
    }

    const saveHandler = () => {
        setBtnLoading(true)

        if (isNew) {
            const queryData = {
                category: 'expert',
                title: editData.title || null,
                description: editData.description || null,
                image: editData.image || null,
            }
            axiosAuth.post('/committees/create', queryData)
                .then(({data})=> {
                    setList([ data, ...list ])
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoading(false))
        } else {
            const queryData = {
                id: editData.id,
                title: editData.title || null,
                description: editData.description || null,
                image: editData.image || null,
            }
            axiosAuth.put('/committees/update', queryData)
                .then(()=> {
                    const newList = list.map( obj => obj.id===editData.id ? editData : obj )
                    setList(newList)
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoading(false))
        }

        setIsOpenAside(false)
    }

    const deleteHandler = id => {
        const isConfirm = window.confirm('Удалить партнера?')
        if (!isConfirm) return null

        axiosAuth.delete('/committees/delete', { data: { id } })
            .then(()=> {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
    }

    const saveNewPosition = e => {
        const id = e.active.id
        const new_position = e.over.data.current.sortable.index + 1
        axiosAuth.post('/committees/position', { id, new_position })
            .then( () => toast.success('Данные сохранены') )
            .catch(()=>toast.error('Произошла ошибка'))
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Экспертный совет</h1>

        <Button
            className={ s.btn }
            add
            onClick={ ()=>addHandler() }
        >
            Добавить участника совета
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => {
                    dndHandlers(e, list, setList)
                    saveNewPosition(e)
                } }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <ExpertsItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить фото'>
            <FileInput
                label='Загрузка изображения'
                value={ editData.image }
                setValue={ image => setEditData({...editData, image }) }
            />
            <Separator className={ s.separator }/>
            <h1>Изменить имя</h1>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Имя'
            />
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextInput
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
                label='Описание'
            />
            <div className={ s.buttons }>
                <Button
                    save
                    isLoading={btnLoading}
                    onClick={()=>saveHandler()}
                >
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default AboutExperts