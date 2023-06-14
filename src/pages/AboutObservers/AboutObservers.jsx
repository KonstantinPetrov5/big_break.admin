import s from './AboutObservers.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState} from 'react'
import ExpertsItem from '../AboutExperts/ExpertsItem/ExpertsItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'


const testData = [
    {
        id: 1,
        img: '',
        title: 'Кравцов Сергей Сергеевич',
        desc: 'Министр просвещения Российской Федерации (Председатель экспертного Совета)'
    },
    {
        id: 2,
        img: '',
        title: 'Кравцов Сергей Сергеевич',
        desc: 'Министр просвещения Российской Федерации (Председатель экспертного Совета)'
    },
    {
        id: 3,
        img: '',
        title: 'Кравцов Сергей Сергеевич',
        desc: 'Министр просвещения Российской Федерации (Председатель экспертного Совета)'
    },
    {
        id: 4,
        img: '',
        title: 'Кравцов Сергей Сергеевич',
        desc: 'Министр просвещения Российской Федерации (Председатель экспертного Совета)'
    },
]


const AboutObservers = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)


    return <>

        <h1>Наблюдательный совет</h1>

        <Button
            className={ s.btn }
            add
            onClick={()=>setIsOpenAside(true)}
        >
            Добавить участника совета
        </Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <ExpertsItem key={item.id} {...{item, i, setIsOpenAside}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>

        <Button className={ s.btn } save>Cохранить</Button>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить фото'>
            <FileInput label='Загрузка изображения'/>
            <Separator className={ s.separator }/>
            <h1>Изменить имя</h1>
            <TextInput label='Имя'/>
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextInput label='Описание'/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default AboutObservers