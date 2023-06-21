import s from './SupportTrips.module.sass'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import {useEffect, useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import CallsItem from '../FindCalls/CallsItem/CallsItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx'
import TickerItem from '../../components/TickerItem/TickerItem.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


// const testData = [
//     {
//         id: 1,
//         title: 'Путешествие мечты',
//         photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
//         image: tickerLogoTest,
//         mapImg: testMainNews,
//         videoLink: 'какая то ссылка на видео вк',
//         description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
//     },
//     {
//         id: 2,
//         title: 'Путешествие мечты',
//         photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
//         image: tickerLogoTest,
//         mapImg: testMainNews,
//         videoLink: 'какая то ссылка на видео вк',
//         description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
//     },
//     {
//         id: 3,
//         title: 'Путешествие мечты',
//         photos: [{ image: testMainNews }, { image: testMainNews }, { image: testMainNews }],
//         image: tickerLogoTest,
//         mapImg: testMainNews,
//         videoLink: 'какая то ссылка на видео вк',
//         description: '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из'
//     },
// ]
// icon должен называться image, потому что в CallsItem он уже называется image
// следовательно сами картинки надо назвать как нить по другому, типо photos

// В асайде, в случае выбора "фото" появляется список с днд, пока он просто кинут на прямую, для примера
// потом есть 2 варианта, либо создать отдельный стейт, где будет храниться этот массив, отдельно, от editData
// либо хранить его прямо внутри editData, но сделать кастомную функцию dndHandlers

const defaultData = {
    title: '',
    description: '',
    video: '',
    is_video: false,
    images: [],
    icon: '',
    map: ''
}

const switchData = [
    { label: 'Фото', value: 'img' },
    { label: 'Видео', value: 'video' },
]


const SupportTrips = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState([])

    const [switchPos, setSwitchPos] = useState(switchData[0].value)
    const [editData, setEditData] = useState(defaultData)
    const [isNew, setIsNew] = useState(true)


    useEffect( () =>   {
        axiosAuth('/support/travel')
            .then( ({data}) => setList(data.items))
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )

    const addHandler = () => {
        setEditData(defaultData)
        setIsNew(true)
        setIsOpenAside(true)
    }


    const editHandler = id => {

    }

    const deleteHandler = id => {

    }

    const customDndHandler = e => {
        // const oldIndex = list.findIndex( ({id}) => id===e.active.id)
        // const newIndex = list.findIndex( ({id}) => id===e.over.id)
        // const newList = arrayMove(list, oldIndex, newIndex)
        // setList(newList)
    }


    return <>

        <h1>Путешествия с большой переменой</h1>

        <Button className={ s.btn } add onClick={()=>addHandler()}>
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
                        <TextInput
                            value={ editData.video }
                            onChange={ e => setEditData({...editData, video: e.target.value }) }
                            placeholder='Вставьте ссылку на видео'
                        />
                    </>
                    :
                    <>
                        <FileInput
                            label='Загрузка фото'
                            setValue={ image => setEditData({...editData, images: [{ image }, ...editData.images] }) }
                        />
                        <DndContext
                            onDragEnd={ e => customDndHandler(e) }
                            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                        >
                            <SortableContext items={editData.images} strategy={verticalListSortingStrategy}>
                                <ul className={ s.list }>
                                    {
                                        editData.images.map( (item, i) =>
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
            <TextInput
                value={ editData.title }
                onChange={ e => setEditData({...editData, title: e.target.value }) }
                label='Заголовок'
            />
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextAreaInput
                value={ editData.description }
                onChange={ e => setEditData({...editData, description: e.target.value }) }
                label='Описание'
                minRows={2}
            />
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