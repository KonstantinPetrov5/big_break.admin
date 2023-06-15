import s from './MainPartners.module.sass'
import {useEffect, useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import EditAside from '../../components/EditAside/EditAside.jsx'
import PartnersItem from './PartnersItem/PartnersItem.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import SelectInput from '../../components/ui/SelectInput/SelectInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const defaultData = {
    description: 'Организатор конкурса',
    image: ''
}

const options = [
    { value: '1', label: 'Организатор конкурса' },
    { value: '2', label: 'При поддержке' },
    { value: '3', label: 'Генеральный партнер' },
    { value: '4', label: 'Партнер' }
]


const MainPartners = () => {


    const [list, setList] = useState([])
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [editData, setEditData] = useState({})
    const [isNew, setIsNew] = useState(true)


    useEffect( () => {
        axiosAuth('/home/partners')
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
                description: editData.description,
                image: editData.image || null,
            }
            axiosAuth.post('/home/partners/create', queryData)
                .then(({data})=> {
                    setList([ data, ...list ])
                    toast.success('Данные сохранены')
                })
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoading(false))
        } else {
            const queryData = {
                id: editData.id,
                description: editData.description,
                image: editData.image || null,
            }
            axiosAuth.put('/home/partners/update', queryData)
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

        axiosAuth.delete('/home/partners/delete', { data: { id } })
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


        <section className={ s.container }>

            <h1>Партнеры</h1>

            <Button add onClick={ ()=>addHandler() }>Добавить партнера</Button>

            <ul className={ s.content }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, list, setList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={list} strategy={verticalListSortingStrategy}>
                        {
                            list.map( (item, i) =>
                                <PartnersItem key={item.id} {...{item, i, editHandler, deleteHandler }}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить партнера'>
            <FileInput
                label='Загрузка изображения'
                value={ editData.image }
                setValue={ image => setEditData({...editData, image }) }
            />
            <Separator className={ s.separator }/>
            <SelectInput
                options={options}
                value={ editData.description }
                onChange={ description => setEditData({...editData, description }) }
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


export default MainPartners