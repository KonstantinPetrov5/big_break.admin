import s from './SupportProjects.module.sass'
import {useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ExpertsItem from '../FindExperts/ExpertsItem/ExpertsItem.jsx'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'


const testData = [
    {
        id: 1,
        title: 'Амбассадорская программа ВК',
        image: testMainNews,
        icon: tickerLogoTest,
        descCompany: '',
        subtitle: '',
        description: 'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие'
    },
    {
        id: 2,
        title: 'Амбассадорская программа ВК',
        image: testMainNews,
        icon: tickerLogoTest,
        descCompany: '',
        subtitle: '',
        description: 'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие'
    },
    {
        id: 3,
        title: 'Амбассадорская программа ВК',
        image: testMainNews,
        icon: tickerLogoTest,
        descCompany: '',
        subtitle: '',
        description: 'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие'
    }
]



const SupportProjects = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)

    const [editData, setEditData] = useState({})
    const [isNew, setIsNew] = useState(true)


    const editHandler = id => {

    }

    const deleteHandler = id => {

    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Партнерские проекты</h1>

        <Button className={ s.btn } add>
            Добавить проект
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
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


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить логотип'>
            <FileInput label='Загрузка логотипа'/>
            <Separator className={ s.separator }/>
            <FileInput label='Загрузка фото'/>
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput label='Заголовок'/>
            <Separator className={ s.separator }/>
            <h1>Изменить описание компании</h1>
            <TextAreaInput label='Описание компании' minRows={2}/>
            <Separator className={ s.separator }/>
            <h1>Изменить подзаголовок</h1>
            <TextInput label='Подзаголовок'/>
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextAreaInput label='Описание' minRows={2}/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading}>
                    Сохранить
                </Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default SupportProjects