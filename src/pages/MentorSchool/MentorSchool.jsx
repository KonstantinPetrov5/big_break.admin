import s from './MentorSchool.module.sass'
import {useState} from 'react'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ExpertsItem from '../FindExperts/ExpertsItem/ExpertsItem.jsx'
import SchoolItem from './SchoolItem/SchoolItem.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import TickerItem from '../../components/TickerItem/TickerItem.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'


const testData = [
        {
            id: 1,
            title: '«Большая перемена» твоей жизни',
            description: '«Большая перемена. Музыка» – специальный проект «Большой перемены», в котором начинающие авторы, музыканты и вокалисты могут раскрыть свой потенциал.',
            photos: [ { image: testMainNews }, { image: testMainNews }, { image: testMainNews } ]
        },
        {
            id: 2,
            title: '«Большая перемена» твоей жизни',
            description: '«Большая перемена. Музыка» – специальный проект «Большой перемены», в котором начинающие авторы, музыканты и вокалисты могут раскрыть свой потенциал.',
            photos: [ { image: testMainNews } ]
        },
        {
            id: 3,
            title: '«Большая перемена» твоей жизни',
            description: '«Большая перемена. Музыка» – специальный проект «Большой перемены», в котором начинающие авторы, музыканты и вокалисты могут раскрыть свой потенциал.',
            photos: [ { image: testMainNews }, { image: testMainNews } ]
        },
    ]


const MentorSchool = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)


    const editHandler = id => {

    }

    const deleteHandler = id => {

    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Измени свою школу</h1>

        <TextAreaInput label='Description' minRows={2} className={ s.descInput }/>

        <Button save className={ s.saveBtn }>Сохранить</Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <SchoolItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Редактирование'>
            <FileInput label='Загрузка фото'/>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            list[0].photos.map( (item, i) =>
                                <TickerItem key={i} {...{item, i, deleteHandler}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput label='Заголовок'/>
            <Separator className={ s.separator }/>
            <h1>Изменить текст</h1>
            <TextAreaInput label='Текст' minRows={2}/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading}>
                    Сохранить
                </Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default MentorSchool