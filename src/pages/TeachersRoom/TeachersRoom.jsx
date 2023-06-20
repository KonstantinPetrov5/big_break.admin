import s from './TeachersRoom.module.sass'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ClubItem from '../TeachersClub/ClubItem/ClubItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'


const testData = [
    { id: 0, description: 'Дополнительное образование и методические материалы', color: '#4B21B1' },
    { id: 1, description: 'Дополнительное образование и методические материалы', color: '#4B21B1' },
    { id: 2, description: 'Дополнительное образование и методические материалы', color: '#4B21B1' },
]


const TeachersRoom = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)


    const editHandler = id => {

    }

    const deleteHandler = id => {

    }


    return <>

        <section className={ s.container }>

            <h1>Учительская большой перемены</h1>

            <TextAreaInput label='Description' minRows={2}/>

            <TextInput label='Кнопка' className={ s.textInput }/>

            <Button save>Сохранить</Button>

            <Button add className={ s.addBtn }>Добавить</Button>

            <ul className={ s.list }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, list, setList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={list} strategy={verticalListSortingStrategy}>
                        {
                            list.map( (item, i) =>
                                <ClubItem key={item.id} {...{item, i, editHandler, deleteHandler}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Описание'>
            <TextInput label='Описание'/>
            <Separator className={ s.separator }/>
            <h2>Изменить цвет</h2>
            <ColorSelect/>
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


export default TeachersRoom