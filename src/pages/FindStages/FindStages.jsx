import s from './FindStages.module.sass'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import StagesItem from './StagesItem/StagesItem.jsx'
import CategoryItem from './CategoryItem/CategoryItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import DateInput from '../../components/ui/DateInput/DateInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'
import {getUnixTime, startOfToday} from 'date-fns'



const defaultDataCategory = {
    title: '',
    color: '#4B21B1',
}
const defaultDataStages = {
    title: '',
    description: '',
    date_from: getUnixTime(startOfToday()),
    date_to: getUnixTime(startOfToday()),
}


const FindStages = () => {


    const [isOpenAsideStages, setIsOpenAsideStages] = useState(false)
    const [isOpenAsideCategory, setIsOpenAsideCategory] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [btnLoadSubtitle, setBtnLoadSubtitle] = useState(false)

    const [categoryList, setCategoryList] = useState([])
    const [activeTab, setActiveTab] = useState(null)
    const [stagesList, setStagesList] = useState([])
    const [description, setDescription] = useState('')

    const [editData, setEditData] = useState(defaultDataCategory)
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        if (activeTab) {
            const currentCategory = categoryList.find(obj=>obj.id===activeTab)
            setStagesList(currentCategory.items)
        }
    }, [activeTab] )

    useEffect( () => {
        const newList = categoryList.map( obj => {
            if (obj.id===activeTab) {
                return {...obj, items: stagesList}
            } else {
                return obj
            }
        } )
        setCategoryList(newList)
    }, [stagesList] )

    useEffect( () =>   {
        axiosAuth('/about/steps')
            .then( ({data}) => {
                setDescription(data.description)
                setCategoryList(data.items)
                setStagesList(data.items[0].items)
                setActiveTab(data.items[0].id)
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const saveDescHandler = () => {
        setBtnLoadSubtitle(true)
        axiosAuth.put('/about/steps/desc', { description })
            .then(()=> toast.success('Данные сохранены'))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setBtnLoadSubtitle(false))
    }

    const addHandler = type => {
        setIsNew(true)
        if (type==='category') {
            setEditData(defaultDataCategory)
            setIsOpenAsideCategory(true)
        }
        if (type==='stages') {
            setEditData(defaultDataStages)
            setIsOpenAsideStages(true)
        }
    }

    const editHandler = (id, type) => {
        setIsNew(false)
        if (type==='category') {
            setEditData(categoryList.find(obj=>obj.id===id))
            setIsOpenAsideCategory(true)
        }
        if (type==='stages') {
            setEditData(stagesList.find(obj=>obj.id===id))
            setIsOpenAsideStages(true)
        }
    }

    const saveHandler = type => {
        setBtnLoading(true)

        if (type==='category') {
            if (isNew) {
                const queryData = {
                    title: editData.title || null,
                    color: editData.color
                }
                axiosAuth.post('/about/steps/group/create', queryData)
                    .then( ({data}) => {
                        setCategoryList([ data, ...categoryList ])
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            } else {
                const queryData = {
                    id: editData.id,
                    title: editData.title || null,
                    color: editData.color
                }
                axiosAuth.put('/about/steps/group/update', queryData)
                    .then( () => {
                        const newList = categoryList.map( obj => obj.id===editData.id ? editData : obj )
                        setCategoryList(newList)
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            }
        }
        if (type==='stages') {
            if (isNew) {
                const queryData = {
                    title: editData.title || null,
                    description: editData.description || null,
                    date_from: editData.date_from,
                    date_to: editData.date_to,
                    group_id: activeTab
                }
                axiosAuth.post('/about/steps/item/create', queryData)
                    .then( ({data}) => {
                        setStagesList([ data, ...stagesList ])
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            } else {
                const queryData = {
                    id: editData.id,
                    title: editData.title || null,
                    description: editData.description || null,
                    date_from: editData.date_from,
                    date_to: editData.date_to,
                    group_id: activeTab
                }
                axiosAuth.put('/about/steps/item/update', queryData)
                    .then( () => {
                        const newList = stagesList.map( obj => obj.id===editData.id ? editData : obj )
                        setStagesList(newList)
                        toast.success('Данные сохранены')
                    })
                    .catch(()=>toast.error('Произошла ошибка'))
                    .finally(()=>setBtnLoading(false))
            }
        }

        setIsOpenAsideCategory(false)
        setIsOpenAsideStages(false)
    }

    const deleteHandler = (id, type) => {
        if (type==='category') {
            const isConfirm = window.confirm('Удалить категорию?')
            if (!isConfirm) return null
            axiosAuth.delete('/about/steps/group/delete', { data: { id } })
                .then(()=> {
                    setCategoryList(categoryList.filter(item => item.id!==id))
                    if (activeTab===id) {
                        setActiveTab(categoryList[0].id!==id ? categoryList[0].id : categoryList[1].id)
                    }
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
        }
        if (type==='stages') {
            const isConfirm = window.confirm('Удалить этап?')
            if (!isConfirm) return null
            axiosAuth.delete('/about/steps/item/delete', { data: { id } })
                .then(()=> {
                    const newList = stagesList.filter(item => item.id!==id)
                    setStagesList(newList)
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
        }
    }

    const saveNewPosition = (e, type) => {
        const id = e.active.id
        const new_position = e.over.data.current.sortable.index + 1
        if (type==='category') {
            axiosAuth.post('/about/steps/group/position', { id, new_position })
                .then( () => toast.success('Данные сохранены') )
                .catch(()=>toast.error('Произошла ошибка'))
        }
        if (type==='stages') {
            axiosAuth.post('/about/steps/item/position', { id, new_position })
                .then( () => toast.success('Данные сохранены') )
                .catch(()=>toast.error('Произошла ошибка'))
        }
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Этапы конкурса</h1>

        <TextAreaInput
            className={ s.subtitle }
            value={description}
            onChange={e=>setDescription(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />

        <Button className={ s.saveBtn } save isLoading={btnLoadSubtitle} onClick={()=>saveDescHandler()}>
            Сохранить
        </Button>

        <Button add className={ s.addCatBtn } onClick={()=>addHandler('category')}>
            Добавить Категорию
        </Button>

        <div className={ s.categoryContainer }>
            <DndContext
                onDragEnd={ e => {
                    dndHandlers(e, categoryList, setCategoryList)
                    saveNewPosition(e, 'category')
                }}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={categoryList} strategy={verticalListSortingStrategy}>
                    {
                        categoryList.map( ({ id, title }) =>
                            <CategoryItem key={id} {...{id, title, activeTab, setActiveTab, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </div>

        <Button add className={ s.addStageBtn } onClick={()=>addHandler('stages')}>
            Добавить этап
        </Button>

        <ul className={ s.stagesContainer }>
            <DndContext
                onDragEnd={ e => {
                    dndHandlers(e, stagesList, setStagesList)
                    saveNewPosition(e, 'stages')
                } }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={stagesList} strategy={verticalListSortingStrategy}>
                    {
                        stagesList.map( (item, i) =>
                            <StagesItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAsideCategory} setState={setIsOpenAsideCategory} title='Изменить название категории'>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Категория'
            />
            <Separator className={ s.separator }/>
            <h1>Изменить цвет</h1>
            <ColorSelect
                state={ editData.color }
                setState={ clr => setEditData({...editData, color: clr }) }
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading} onClick={()=>saveHandler('category') }>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAsideCategory(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>

        <EditAside state={isOpenAsideStages} setState={setIsOpenAsideStages} title='Изменить название этапа'>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Этап'
            />
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextAreaInput
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
                label={'Описание'}
            />
            <Separator className={ s.separator }/>
            <h1>Изменить дату</h1>
            <div className={ s.dateBox }>
                <div>
                    <h2>От</h2>
                    <DateInput
                        value={ editData.date_from }
                        onChange={ date => setEditData({...editData, date_from: date }) }
                    />
                </div>
                <div>
                    <h2>До</h2>
                    <DateInput
                        value={ editData.date_to }
                        onChange={ date => setEditData({...editData, date_to: date }) }
                    />
                </div>
            </div>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading} onClick={()=>saveHandler('stages') }>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAsideStages(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>

    </>
}


export default FindStages