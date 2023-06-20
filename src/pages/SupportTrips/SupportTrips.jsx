import s from './SupportTrips.module.sass'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import {useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import CallsItem from '../FindCalls/CallsItem/CallsItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx'
import TickerItem from '../../components/TickerItem/TickerItem.jsx'


const testData = [
    {
        id: 1,
        title: 'Путешествие мечты',
        photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
        image: tickerLogoTest,
        mapImg: testMainNews,
        videoLink: 'какая то ссылка на видео вк',
        description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
    },
    {
        id: 2,
        title: 'Путешествие мечты',
        photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
        image: tickerLogoTest,
        mapImg: testMainNews,
        videoLink: 'какая то ссылка на видео вк',
        description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
    },
    {
        id: 3,
        title: 'Путешествие мечты',
        photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
        image: tickerLogoTest,
        mapImg: testMainNews,
        videoLink: 'какая то ссылка на видео вк',
        description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
    },
]
// icon должен называться image, потому что в CallsItem он уже называется image
// следовательно сами картинки надо назвать как нить по другому, типо photos

// В асайде, в случае выбора "фото" появляется список с днд, пока он просто кинут на прямую, для примера
// потом есть 2 варианта, либо создать отдельный стейт, где будет храниться этот массив, отдельно, от editData
// либо хранить его прямо внутри editData, но сделать кастомную функцию dndHandlers

const switchData = [
    { label: 'Фото', value: 'img' },
    { label: 'Видео', value: 'video' },
]


const SupportTrips = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)

    const [switchPos, setSwitchPos] = useState(switchData[0].value)
    const [editData, setEditData] = useState({})
    const [isNew, setIsNew] = useState(true)


    const editHandler = id => {

    }

    const deleteHandler = id => {

    }


    return <>

        <h1>Путешествия с большой переменой</h1>

        <Button className={ s.btn } add>
            Добавить путешествиe
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => {
                    dndHandlers(e, list, setList)
                    saveNewPosition(e)
                }}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <CallsItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Редактирование'>
            <SwitchInput
                className={ s.switch }
                tabs={switchData}
                value={switchPos}
                name='bannerSwitch'
                onChange={ e => setSwitchPos(e.target.value) }
            />
            {
                switchPos==='video'
                ?
                <>
                    <h1>Загрузка видео</h1>
                    <TextInput placeholder='Вставьте ссылку на видео'/>
                </>
                :
                <>
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
                </>
            }
            <Separator className={ s.separator }/>
            <FileInput label='Загрузка карты'/>
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput label='Заголовок'/>
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


export default SupportTrips