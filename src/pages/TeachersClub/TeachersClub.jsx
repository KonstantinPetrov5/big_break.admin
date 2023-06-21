import s from './TeachersClub.module.sass'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ClubItem from './ClubItem/ClubItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultData = {
    title: '',
    description: '',
    color: '#4B21B1'
}


const TeachersClub = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState([])
    const [description, setDescription] = useState('')
    const [text, setText] = useState('')

    const [editData, setEditData] = useState(defaultData)
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        axiosAuth('/teacher/blocks?type=club')
            .then( ({data}) => {
                setText(data.text || '')
                setDescription(data.description || '')
                setList(data.items)
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )

    const saveDescHandler = () => {
        setBtnLoading(true)
        const queryData = {
            type: 'club',
            text,
            description,
        }
        axiosAuth.put('/teacher/blocks/desc', queryData)
            .then(()=>toast.success('Данные сохранены'))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoading(false))
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
        setBtnLoading(true)

        if (isNew) {
            const queryData = {
                category: 'club',
                title: editData.title || null,
                description: editData.description || null,
                color: editData.color,
            }
            axiosAuth.post('/teacher/blocks/create', queryData)
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
                color: editData.color,
            }
            axiosAuth.put('/teacher/blocks/update', queryData)
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
        const isConfirm = window.confirm('Удалить шаг?')
        if (!isConfirm) return null
        axiosAuth.delete('/teacher/blocks/delete', { data: { id } })
            .then(()=> {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
    }

    const saveNewPosition = e => {
        const id = e.active.id
        const new_position = e.over.data.current.sortable.index + 1
        axiosAuth.post('teacher/blocks/position', { id, new_position })
            .then( () => toast.success('Данные сохранены') )
            .catch(()=>toast.error('Произошла ошибка'))
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Как открыть клуб большой перемены</h1>

            <TextAreaInput
                value={description}
                onChange={e=>setDescription(e.target.value)}
                label='Description'
                minRows={2}
            />

            <TextInput
                value={text}
                onChange={e=>setText(e.target.value)}
                label='Текст'
                className={ s.textInput }
            />

            <Button
                save
                isLoading={btnLoading}
                onClick={()=>saveDescHandler()}
            >
                Сохранить
            </Button>

            <Button
                add
                className={ s.addBtn }
                onClick={()=>addHandler()}
            >
                Добавить
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
                                <ClubItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Описание'>
            <TextInput
                label='Описание'
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
            />
            <Separator className={ s.separator }/>
            <TextInput
                label='Скрытое описание'
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
            />
            <Separator className={ s.separator }/>
            <h2>Изменить цвет</h2>
            <ColorSelect
                state={ editData.color }
                setState={ color=>setEditData({...editData, color}) }
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading} onClick={()=>saveHandler()}>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>

    </>

}


export default TeachersClub