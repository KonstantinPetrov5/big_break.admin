import s from './AboutPhotos.module.sass'
import {useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import PhotosItem from './PhotosItem/PhotosItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'


const testData = [
    { id: 1, img: '', link: '' },
    { id: 2, img: '', link: '' },
    { id: 3, img: '', link: '' },
    { id: 4, img: '', link: '' },
]


const AboutPhotos = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [list, setList] = useState(testData)


    return (

        <div className={ s.container }>


            <h1>Истории успеха</h1>

            <div className={ s.addBtns }>
                <Button add onClick={()=>setIsOpenAside(true)}>
                    <span>Добавить фото</span>
                    <span>Фото</span>
                </Button>
                <Button add onClick={()=>setIsOpenAside(true)}>
                    <span>Добавить видео</span>
                    <span>Видео</span>
                </Button>
            </div>

            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            list.map( (item, i) =>
                                <PhotosItem key={item.id} {...{item, i}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>

            <Button className={ s.btnSave } save>Cохранить</Button>


            {/*<EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить фото'>*/}
            {/*    <FileInput label='Загрузка изображения' />*/}
            {/*    <Separator className={ s.separator }/>*/}
            {/*    <div className={ s.buttons }>*/}
            {/*        <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>*/}
            {/*        <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>*/}
            {/*    </div>*/}
            {/*</EditAside>*/}

            <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить видео'>
                <FileInput label='Загрузка превью' />
                <Separator className={ s.separator }/>
                <h2>Загрузка видео</h2>
                <div className={ s.linkBox }>
                    <TextInput placeholder='Вставьте ссылку на видео'/>
                    <Button className={ s.addLink } typeUI='border'>Добавить</Button>
                </div>
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>
                    <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
                </div>
            </EditAside>

        </div>

    )

}


export default AboutPhotos