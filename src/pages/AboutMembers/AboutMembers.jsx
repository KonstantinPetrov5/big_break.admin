import s from './AboutMembers.module.sass'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import MembersItem from './MembersItem/MembersItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultData = {
    title: '',
    description: '',
    image: '',
    color: '#4B21B1',
}


const AboutMembers = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoadSubtitle, setBtnLoadSubtitle] = useState(false)
    const [btnLoadMember, setBtnLoadMember] = useState(false)

    const [list, setList] = useState([])
    const [description, setDescription] = useState('')

    const [editData, setEditData] = useState(defaultData)
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        axiosAuth('/about/participants')
            .then( ({data}) => {
                setDescription(data.description)
                setList(data.items)
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const saveDescHandler = () => {
        axiosAuth.put('/about/participants/desc', { description })
            .then(()=> {
                const newList = list.map( obj => obj.id===editData.id ? editData : obj )
                setList(newList)
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoadSubtitle(false))
    }

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
        setBtnLoadMember(true)

        if (isNew) {
            const queryData = {
                title: editData.title || null,
                description: editData.description || null,
                image: editData.image || null,
                color: editData.color
            }
            axiosAuth.post('/about/participants/create', queryData)
                .then(({data})=> {
                    setList([ data, ...list ])
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoadMember(false))
        } else {
            const queryData = {
                id: editData.id,
                title: editData.title || null,
                description: editData.description || null,
                image: editData.image || null,
                color: editData.color
            }
            axiosAuth.put('/about/participants/update', queryData)
                .then(()=> {
                    const newList = list.map( obj => obj.id===editData.id ? editData : obj )
                    setList(newList)
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoadMember(false))
        }

        setIsOpenAside(false)
    }

    const deleteHandler = id => {
        const isConfirm = window.confirm('Удалить участника?')
        if (!isConfirm) return null

        axiosAuth.delete('/about/participants/delete', { data: { id } })
            .then(()=> {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
    }

    const saveNewPosition = e => {
        // const id = e.active.id
        // const new_position = e.over.data.current.sortable.index + 1
        // axiosAuth.post('home/partners/position', { id, new_position })
        //     .then( () => toast.success('Данные сохранены') )
        //     .catch(()=>toast.error('Произошла ошибка'))
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Участники</h1>

        <TextAreaInput
            className={ s.subtitle }
            value={description }
            onChange={e=>setDescription(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />

        <Button
            className={ s.btnSave }
            isLoading={btnLoadSubtitle}
            onClick={()=>saveDescHandler()}
            save
        >
            Cохранить
        </Button>

        <Button className={ s.btn } add onClick={()=>addHandler()}>
            Добавить участников
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <MembersItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить иконку'>
            <FileInput
                label='Загрузка изображения'
                value={ editData.image }
                setValue={ image => setEditData({...editData, image }) }
            />
            <Separator className={ s.separator }/>
            <h1>Изменить цвет</h1>
            <ColorSelect
                state={ editData.color }
                setState={ clr => setEditData({...editData, color: clr }) }
            />
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Заголовок'
            />
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextInput
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
                label='Описание'
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoadMember} onClick={()=>saveHandler()}>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>

    </>
}


export default AboutMembers