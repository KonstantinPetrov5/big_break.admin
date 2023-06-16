import s from './AboutDirectorate.module.sass'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import DirectorateItem from './DirectorateItem/DirectorateItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultDataTitle = {
    title: ''
}
const defaultDataMember = {
    image: '',
    title: ''
}


const AboutDirectorate = () => {


    const [isOpenAsideTitle, setIsOpenAsideTitle] = useState(false)
    const [isOpenAsideMember, setIsOpenAsideMember] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [btnLoadSubtitle, setBtnLoadSubtitle] = useState(false)

    const [list, setList] = useState([])
    const [description, setDescription] = useState('')

    const [editData, setEditData] = useState(defaultDataMember)
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        axiosAuth('/about/directorate')
            .then( ({data}) => {
                setDescription(data.description)
                setList(data.items)
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const saveDescHandler = () => {
        setBtnLoadSubtitle(true)
        axiosAuth.put('/about/directorate/desc', { description })
            .then(()=>toast.success('Данные сохранены'))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoadSubtitle(false))
    }

    const addHandler = type => {
        setIsNew(true)
        if (type==='title') {
            setEditData(defaultDataTitle)
            setIsOpenAsideTitle(true)
        }
        if (type==='member') {
            setEditData(defaultDataMember)
            setIsOpenAsideMember(true)
        }
    }

    const editHandler = (id, type) => {
        setIsNew(false)
        if (type==='title') {
            setEditData(list.find(obj=>obj.id===id))
            setIsOpenAsideTitle(true)
        }
        if (type==='member') {
            // setEditData(stagesList.find(obj=>obj.id===id))
            setIsOpenAsideMember(true)
        }
    }

    const saveHandler = type => {
        setBtnLoading(true)

        if (type==='title') {
            if (isNew) {
                const queryData = {
                    title: editData.title || null,
                }
                axiosAuth.post('/about/directorate/group/create', queryData)
                    .then( ({data}) => {
                        setList([ data, ...list ])
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            } else {
                const queryData = {
                    id: editData.id,
                    title: editData.title || null,
                }
                axiosAuth.put('/about/directorate/group/update', queryData)
                    .then( () => {
                        const newList = list.map( obj => obj.id===editData.id ? editData : obj )
                        setList(newList)
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            }
        }
        if (type==='member') {
            if (isNew) {
                // const queryData = {
                //     title: editData.title || null,
                //     description: editData.description || null,
                //     date_from: editData.date_from,
                //     date_to: editData.date_to,
                //     group_id: activeTab
                // }
                // axiosAuth.post('/about/directorate/item/create', queryData)
                //     .then( ({data}) => {
                //         setStagesList([ data, ...stagesList ])
                //         toast.success('Данные сохранены')
                //     })
                //     .catch(()=>toast.error('Произошла ошибка'))
                //     .finally(()=>setBtnLoading(false))
            } else {
                // const queryData = {
                //     id: editData.id,
                //     title: editData.title || null,
                //     description: editData.description || null,
                //     date_from: editData.date_from,
                //     date_to: editData.date_to,
                //     group_id: activeTab
                // }
                // axiosAuth.put('/about/directorate/item/update', queryData)
                //     .then( () => {
                //         const newList = stagesList.map( obj => obj.id===editData.id ? editData : obj )
                //         setStagesList(newList)
                //         toast.success('Данные сохранены')
                //     })
                //     .catch(()=>toast.error('Произошла ошибка'))
                //     .finally(()=>setBtnLoading(false))
            }
        }

        setIsOpenAsideTitle(false)
        setIsOpenAsideMember(false)
    }

    const deleteHandler = (id, type) => {
        if (type==='title') {
            const isConfirm = window.confirm('Удалить категорию?')
            if (!isConfirm) return null
            axiosAuth.delete('/about/directorate/group/delete', { data: { id } })
                .then(()=> {
                    setList(list.filter(item => item.id!==id))
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
        }
        if (type==='member') {
            // const isConfirm = window.confirm('Удалить этап?')
            // if (!isConfirm) return null
            // axiosAuth.delete('/about/directorate/item/delete', { data: { id } })
            //     .then(()=> {
            //         const newList = stagesList.filter(item => item.id!==id)
            //         setStagesList(newList)
            //         toast.success('Данные сохранены')
            //     })
            //     .catch(()=>toast.error('Произошла ошибка'))
        }
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

        <h1>Детская дирекция</h1>

        <TextAreaInput
            className={ s.subtitleInput }
            value={description}
            onChange={e=>setDescription(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />


        <Button className={ s.btnSave } save isLoading={btnLoadSubtitle} onClick={()=>saveDescHandler()}>
            Сохранить
        </Button>


        <h2 className={ s.subTitle }>Направления участников</h2>

        <Button add className={ s.btn } onClick={()=>addHandler('title')}>
            Добавить Категорию
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <DirectorateItem key={item.id} {...{item, i, editHandler, deleteHandler, addHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAsideTitle} setState={setIsOpenAsideTitle} title='Изменить заголовок'>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Этап'
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading} onClick={()=>saveHandler('title') }>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAsideTitle(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>

        <EditAside state={isOpenAsideMember} setState={setIsOpenAsideMember} title='Изменить фото'>
            <FileInput
                label={ 'Загрузка изображения' }
                value={ editData.image }
                setValue={ image => setEditData({...editData, image }) }
            />
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Этап'
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading} onClick={()=>saveHandler('member') }>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAsideMember(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>


    </>
}


export default AboutDirectorate