import s from './SupportGrants.module.sass'
import {useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import TickerItem from '../../components/TickerItem/TickerItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import {EditIcon} from '../../../public/assets/jsxIcons/EditIcon.jsx'


const testDataPhoto = [
    { id: 1, image: tickerLogoTest },
    { id: 2, image: tickerLogoTest },
    { id: 3, image: tickerLogoTest }
]

const testDataDesc = [
    { id: 1, text: 'текст' },
    { id: 2, text: 'текст' },
    { id: 3, text: 'текст' }
]


const SupportGrants = () => {


    const [isOpenAsidePhoto, setIsOpenAsidePhoto] = useState(false)
    const [isOpenAsideDesc, setIsOpenAsideDesc] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [photoList, setPhotoList] = useState(testDataPhoto)


    const deleteHandler = id => {

    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Росмолодежь. гранты</h1>

            <TextAreaInput label='Description' minRows={2}/>

            <TextAreaInput label='1. Текст' minRows={2} className={ s.textInput }/>

            <TextAreaInput label='2. Текст' minRows={2}/>

            <Button add onClick={()=>setIsOpenAsidePhoto(true)} className={ s.addBtn }>
                Добавить фото
            </Button>

            <DndContext
                onDragEnd={ e => {
                    // dndHandlers(e, list, setList)
                    // saveNewPosition(e)
                } }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={photoList} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            photoList.map( (item, i) =>
                                <TickerItem key={item.id} {...{item, i, deleteHandler}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>

            <ul className={ s.list }>
                {
                    testDataDesc.map( (item, i) =>
                        <li key={item.id} className={ s.item }>
                                <span>{ i+1 }</span>
                                <p className={ s.title }>{ item.text }</p>
                                <EditIcon/>
                        </li>
                    )
                }
            </ul>

            <Button save>Сохранить</Button>


            <EditAside state={isOpenAsidePhoto} setState={setIsOpenAsidePhoto} title='Добавить логотип'>
                <FileInput label='Загрузка изображения'/>
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button save isLoading={btnLoading}>
                        Сохранить
                    </Button>
                    <Button typeUI='border'>Отменить</Button>
                </div>
            </EditAside>

            <EditAside state={isOpenAsideDesc} setState={setIsOpenAsideDesc} title='Добавить логотип'>
                <TextInput label='1. Описание' className={ s.descAside }/>
                <TextInput label='1.2 Скрытое описание'/> {/*Скрытое описание показываем, только на первой карточке*/}
                <h2 className={ s.colorLabel }>Изменить цвет</h2>
                <ColorSelect/>
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button save isLoading={btnLoading}>
                        Сохранить
                    </Button>
                    <Button typeUI='border'>Отменить</Button>
                </div>
            </EditAside>


        </section>

    </>

}


export default SupportGrants