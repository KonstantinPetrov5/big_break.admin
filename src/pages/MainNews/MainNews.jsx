import s from './MainNews.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import {useState} from 'react'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import NewsItem from './NewsItem/NewsItem.jsx'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {DndContext} from '@dnd-kit/core'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import DateInput from '../../components/ui/DateInput/DateInput.jsx'


const testData = [
    {
        id: 1,
        image: testMainNews,
        title: 'Григорий Гуров и Наталия Мандрова обсудили с педагогами-наставниками «Большой перемены» развитие «Движения первых»',
        date: 1679270400,
    },
    {
        id: 2,
        image: testMainNews,
        title: 'Григорий Гуров и Наталия Мандрова обсудили с педагогами-наставниками «Большой перемены» развитие «Движения первых»',
        date: 1679270400,
    },
    {
        id: 3,
        image: testMainNews,
        title: 'Григорий Гуров и Наталия Мандрова обсудили с педагогами-наставниками «Большой перемены» развитие «Движения первых»',
        date: 1679270400,
    },
    {
        id: 4,
        image: testMainNews,
        title: 'Григорий Гуров и Наталия Мандрова обсудили с педагогами-наставниками «Большой перемены» развитие «Движения первых»',
        date: 1679270400,
    },
    {
        id: 5,
        image: testMainNews,
        title: 'Григорий Гуров и Наталия Мандрова обсудили с педагогами-наставниками «Большой перемены» развитие «Движения первых»',
        date: 1679270400,
    }
]


const MainNews = () => {

    const [list, setList] = useState(testData)
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)


    return <>

        <section className={ s.container }>

            <h1>Новости</h1>

            <Button className={ s.btn } add onClick={ ()=>setIsOpenAside(true) }>Добавить</Button>


            <ul className={ s.list }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, list, setList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={list} strategy={verticalListSortingStrategy}>
                        {
                            list.map( (item, i) =>
                                <NewsItem key={item.id} {...{item, i, setIsOpenAside}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить фото'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <h1>Наименование статьи</h1>
            <TextInput label='Имя'/>
            <Separator className={ s.separator }/>
            <h1>Описание статьи</h1>
            <TextAreaInput minRows={2} label='Описание'/>
            <Separator className={ s.separator }/>
            <h1>Изменить дату</h1>
            <DateInput/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>


    </>
}


export default MainNews