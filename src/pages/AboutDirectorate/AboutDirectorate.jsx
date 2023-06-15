import s from './AboutDirectorate.module.sass'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import DirectorateItem from './DirectorateItem/DirectorateItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'


const testData = [
    {
        id: 1,
        title: 'Работа с региональными командами',
        members: [
            { id: 1, img: '', name: 'Кравцов Сергей Сергеевич' },
            { id: 2, img: '', name: 'Кравцов Сергей Сергеевич' },
            { id: 3, img: '', name: 'Кравцов Сергей Сергеевич' },
            { id: 4, img: '', name: 'Кравцов Сергей Сергеевич' },
            { id: 5, img: '', name: 'Кравцов Сергей Сергеевич' }
        ]
    },
    {
        id: 2,
        title: 'Образовательное сообщество',
        members: [
            { id: 1, img: '', name: 'Кравцов Сергей Сергеевич' },
            { id: 2, img: '', name: 'Кравцов Сергей Сергеевич' },
        ]
    },
]


const AboutDirectorate = () => {


    const [isOpenAsideTitle, setIsOpenAsideTitle] = useState(false)
    const [isOpenAsideMember, setIsOpenAsideMember] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)
    const [subTitle, setSubTitle] = useState('')


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <h1>Детская дирекция</h1>

        <TextAreaInput
            className={ s.subtitleInput }
            value={subTitle}
            onChange={e=>setSubTitle(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />

        <h2 className={ s.subTitle }>Направления участников</h2>

        <Button add className={ s.btn }>Добавить Категорию</Button>

        <ul className={ s.list }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    {
                        list.map( (item, i) =>
                            <DirectorateItem key={item.id} {...{item, i, setIsOpenAsideTitle, setIsOpenAsideMember}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>

        <Button save className={ s.btn }>Сохранить</Button>


        <EditAside state={isOpenAsideTitle} setState={setIsOpenAsideTitle} title='Изменить заголовок'>
            <TextInput label={'Заголовок'}/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>

        <EditAside state={isOpenAsideMember} setState={setIsOpenAsideMember} title='Изменить фото'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <h1>Изменить заголовок</h1>
            <TextInput label={'Заголовок'}/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>


    </>
}


export default AboutDirectorate