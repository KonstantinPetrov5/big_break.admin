import s from './MainNews.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import {useEffect, useState} from 'react'
import NewsItem from './NewsItem/NewsItem.jsx'
// import {dndHandlers} from '../../utils/dndHandlers.js'
// import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
// import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
// import {DndContext} from '@dnd-kit/core'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import DateInput from '../../components/ui/DateInput/DateInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'
import {getUnixTime, startOfToday} from 'date-fns'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'


const defaultData = {
        image: '',
        title: '',
        description: '',
        date: getUnixTime(startOfToday())
    }


const MainNews = () => {

    const [list, setList] = useState([])
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [editData, setEditData] = useState({})
    const [isNew, setIsNew] = useState(true)
    // console.log('list: ', list)

    const [updateIsDisable, setUpdateIsDisable] = useState(false)

    useEffect( () => {
        axiosAuth('/news')
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
                title: editData.title || null,
                image: editData.image || null,
                date: editData.date || null,
                description: editData.description || null,
            }
            axiosAuth.post('/news/create', queryData)
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
                image: editData.image || null,
                date: editData.date,
                description: editData.description || null,
            }
            axiosAuth.put('/news/update', queryData)
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
        const isConfirm = window.confirm('Удалить новость?')
        if (!isConfirm) return null

        axiosAuth.delete('/news/delete', { data: { id } })
            .then(()=> {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            })
            .catch(()=>toast.error('Произошла ошибка'))
    }

    const updateNews = () => {
        setUpdateIsDisable(true)
        axiosAuth.get('/news/apiconnect').then(() => {
            toast.success('Запущен процесс синхронизации, примерное время ожидания 5 мин.')
        })
        .catch(()=>{
            toast.error('Произошла ошибка')
            setUpdateIsDisable(false)
        })
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Новости</h1>
            
            {/* <div className={ s.btnContainer }>
                <Button className={ s.btn } add onClick={ ()=>addHandler() }>Добавить</Button>
            </div> */}
            <Button typeUI='border' onClick={() => updateNews()} isDisable={updateIsDisable}>Обновить новости</Button>

            <ul className={ s.list }>
                {
                    list.map( (item, i) =>
                        <NewsItem key={item.id} {...{item, i, editHandler, deleteHandler }}/>
                    )
                }
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить фото'>
            <FileInput
                label='Загрузка изображения'
                value={ editData.image }
                setValue={ image => setEditData({...editData, image }) }
            />
            <Separator className={ s.separator }/>
            <h1>Наименование статьи</h1>
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Имя'
            />
            <Separator className={ s.separator }/>
            <h1>Описание статьи</h1>
            <TextAreaInput
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
                label='Описание'
                minRows={2}
            />
            <Separator className={ s.separator }/>
            <h1>Изменить дату</h1>
            <DateInput
                value={ editData.date }
                onChange={ date => setEditData({...editData, date }) }
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button
                    save
                    isLoading={btnLoading}
                    onClick={()=>saveHandler()}
                >
                    Сохранить</Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>


    </>
}


export default MainNews