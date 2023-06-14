import s from './AboutStories.module.sass'
import {useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import StoriesItem from './StoriesItem/StoriesItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'


const testData = [
    {
        id: 1,
        img: '',
        title: 'Галстян Диана',
        regalia: 'Победитель второго сезона',
        text: 'Иван является активным участником региональной команды сообщества «Большая перемена». Участвовал во Всероссийском фестивале «Большая перемена», Всероссийском марафоне «Знание», а также в фестивале детства и юности «Большая перемена», Всероссийском конкурсе «МедиаБУМ».',
        quote: 'Я считаю, что Россия - это действительно страна возможностей. Это факт. Сейчас любой школьник России имеет возможность продвигать свои инициативы и создавать различные проекты в юном возрасте, а самое главное, он может получить значительную поддержку от государства для реализации своих идей. В этом я лично убедился после участия в "Большой перемене", которая кардинально изменила мою жизнь в лучшую сторону!'
    },
    {
        id: 2,
        img: '',
        title: 'Курбатов Владислав',
        regalia: 'Победитель второго сезона',
        text: 'Иван является активным участником региональной команды сообщества «Большая перемена».',
        quote: 'Я считаю, что Россия - это действительно страна возможностей.'
    },
    {
        id: 3,
        img: '',
        title: 'Галстян Диана',
        regalia: 'Победитель второго сезона',
        text: 'Иван является активным участником региональной команды сообщества «Большая перемена». Участвовал во Всероссийском фестивале «Большая перемена», Всероссийском марафоне «Знание», а также в фестивале детства и юности «Большая перемена», Всероссийском конкурсе «МедиаБУМ».',
        quote: 'Я считаю, что Россия - это действительно страна возможностей. Это факт. Сейчас любой школьник России имеет возможность продвигать свои инициативы и создавать различные проекты в юном возрасте, а самое главное, он может получить значительную поддержку от государства для реализации своих идей. В этом я лично убедился после участия в "Большой перемене", которая кардинально изменила мою жизнь в лучшую сторону!'
    },
    {
        id: 4,
        img: '',
        title: 'Галстян Диана',
        regalia: 'Победитель второго сезона',
        text: 'Иван является активным участником региональной команды сообщества «Большая перемена». Участвовал во Всероссийском фестивале «Большая перемена», Всероссийском марафоне «Знание», а также в фестивале детства и юности «Большая перемена», Всероссийском конкурсе «МедиаБУМ».',
        quote: 'Я считаю, что Россия - это действительно страна возможностей. Это факт. Сейчас любой школьник России имеет возможность продвигать свои инициативы и создавать различные проекты в юном возрасте, а самое главное, он может получить значительную поддержку от государства для реализации своих идей. В этом я лично убедился после участия в "Большой перемене", которая кардинально изменила мою жизнь в лучшую сторону!'
    },
]


const AboutStories = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)


    return <>


        <h1>Истории успеха</h1>

        <Button
            add
            className={ s.btn }
            onClick={()=>setIsOpenAside(true)}
        >
            Добавить историю успеха
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <StoriesItem key={item.id} {...{item, i, setIsOpenAside}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>

        <Button className={ s.btn } save>Cохранить</Button>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить фото'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <h1>Изменить текст</h1>
            <TextInput label='Имя'/>
            <Separator className={ s.separator }/>
            <TextInput label='Регалии'/>
            <Separator className={ s.separator }/>
            <TextAreaInput label='Текст' minRows={3}/>
            <Separator className={ s.separator }/>
            <TextAreaInput label='Цитата' minRows={3}/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>


    </>
}


export default AboutStories