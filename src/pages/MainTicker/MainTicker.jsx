import s from './MainTicker.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import {useEffect, useState} from 'react'
import {DndContext} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TickerItem from '../../components/TickerItem/TickerItem.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const MainTicker = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [loadedImg, setLoadedImg] = useState('')

    useEffect( () => {
        setLoadedImg('')
    }, [isOpenAside] )

    useEffect( () => {
        axiosAuth('/runline?type=home')
            .then( ({data})=> setList(data.items) )
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const imgHandler = type => {
        if (type==='save') {
            if (!loadedImg) return toast.error('Изображение не загружено')
            setBtnLoading(true)
            axiosAuth.post('/runline/create', { type: 'home', image: loadedImg })
                .then( ({data}) => {
                    setList([{ id: data.id, image: data.image }, ...list])
                    toast.success('Данные сохранены')
                    setIsOpenAside(false)
                } )
                .catch(()=>toast.error('Произошла ошибка'))
                .finally(()=>setBtnLoading(false))
        } else {
            setIsOpenAside(false)
        }
    }

    const deleteTickerHandler = id => {
        const isConfirm = window.confirm('Удалить изображение?')
        if (!isConfirm) return
        axiosAuth.delete('runline/delete', { data: { id } })
            .then( () => {
                setList(list.filter(item => item.id!==id))
                toast.success('Данные сохранены')
            } )
            .catch(()=>toast.error('Произошла ошибка'))
    }


    const saveNewPosition = e => {
        const id = e.active.id
        const new_position = e.over.data.current.sortable.index + 1
        axiosAuth.post('/runline/position', { id, new_position })
            .then( () => toast.success('Данные сохранены') )
            .catch(()=>toast.error('Произошла ошибка'))
    }

    console.log('list: ', list)
    if (isLoading) return <h1>Загрузка...</h1>
    return <>


        <section className={ s.container }>

            <h1>Бегущая строка</h1>

            <Button add onClick={ ()=>setIsOpenAside(true) }>Добавить</Button>

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
                                <TickerItem key={item.id} {...{item, i, deleteTickerHandler}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>

        </section>

        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить логотип'>
            <FileInput
                label='Загрузка изображения'
                value={ loadedImg }
                setValue={ setLoadedImg }
            />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button
                    save
                    onClick={()=>imgHandler('save')}
                    isLoading={btnLoading}
                >
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>imgHandler('cancel')}>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default MainTicker
