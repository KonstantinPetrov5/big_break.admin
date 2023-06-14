import s from './AboutCalls.module.sass'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import MembersItem from '../AboutMembers/MembersItem/MembersItem.jsx'
import CallsItem from './CallsItem/CallsItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'


const testData = [
    {
        id: 1,
        icon: testMainNews,
        title: 'Создавай будущее!',
        desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
    },
    {
        id: 2,
        icon: '',
        title: 'Создавай будущее! Создавай будущее!',
        desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
    },
    {
        id: 3,
        icon: testMainNews,
        title: 'Создавай',
        desc: 'Lorem ipsum dolor sit amet ',
    },
    {
        id: 4,
        icon: '',
        title: 'Создавайбудущее!',
        desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
    },
    {
        id: 5,
        icon: testMainNews,
        title: 'Создавай будущее!',
        desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
    }
]


const AboutCalls = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)
    const [subTitle, setSubTitle] = useState('')


    return <>

        <h1>Вызовы</h1>

        <TextAreaInput
            className={ s.subtitle }
            value={subTitle}
            onChange={e=>setSubTitle(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />

        <Button className={ s.btn } add>Добавить вызов</Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <CallsItem key={item.id} {...{item, i, setIsOpenAside}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>

        <Button className={ s.btn } save>Cохранить</Button>

        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить иконку'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput label={'Заголовок'}/>
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextInput label={'Описание'}/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default AboutCalls