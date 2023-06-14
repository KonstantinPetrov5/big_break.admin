import s from './AboutGift.module.sass'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import GiftItem from './GiftItem/GiftItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'


const testData = [
    { id: 1, title: 'Призовой фонд', desc: '660 финалистов получат путевки в МДЦ «Артек»' },
    { id: 2, title: 'Призовой фонд для учеников 5-7 классов Призовой фонд для учеников 5-7 классов', desc: '660 финалистов получат путевки в МДЦ «Артек»' },
    { id: 3, title: 'Призовой фонд для учеников 5-7 классов', desc: '660 финалистов получат путевки в МДЦ «Артек»' },
    { id: 4, title: 'Призовой фонд для учеников 5-7 классов', desc: '660 финалистов получат путевки в МДЦ «Артек»' },
]


const AboutGift = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)
    const [subTitle, setSubTitle] = useState('')


    return (

        <div className={ s.container }>

            <h1>Этапы конкурса</h1>

            <TextAreaInput
                className={ s.subtitle }
                value={subTitle}
                onChange={e=>setSubTitle(e.target.value)}
                label='Подзаголовок'
                placeholder='Введите текст'
                minRows={6}
            />

            <Button add onClick={()=>setIsOpenAside(true)}>Добавить Категорию</Button>

            <ul className={ s.list }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, list, setList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={list} strategy={verticalListSortingStrategy}>
                        {
                            list.map( (item, i) =>
                                <GiftItem key={item.id} {...{item, i, setIsOpenAside}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

            <Button save>Сохранить</Button>


            <EditAside state={isOpenAside} setState={setIsOpenAside} title='Изменить название категории'>
                <TextInput label={'Категория'}/>
                <Separator className={ s.separator }/>
                <h1>Изменить цвет</h1>
                <TextAreaInput/>
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button save>Сохранить</Button>
                    <Button typeUI='border'>Отменить</Button>
                </div>
            </EditAside>

        </div>

    )

}


export default AboutGift