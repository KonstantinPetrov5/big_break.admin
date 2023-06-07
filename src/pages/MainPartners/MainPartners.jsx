import s from './MainPartners.module.sass'
import {useState} from 'react'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import EditAside from '../../components/EditAside/EditAside.jsx'
import PartnersItem from './PartnersItem/PartnersItem.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import SelectInput from '../../components/ui/SelectInput/SelectInput.jsx'


const testData = [
    {
        id: 11,
        image: testMainNews,
        title: 'Организатор конкурса',
    },
    {
        id: 12,
        image: testMainNews,
        title: 'Организатор конкурса',
    },
    {
        id: 13,
        image: testMainNews,
        title: 'Организатор конкурса',
    },
    {
        id: 14,
        image: testMainNews,
        title: 'Организатор конкурса',
    }
]

const options = [
    { value: '1', label: 'Организатор конкурса' },
    { value: '2', label: 'При поддержке' },
    { value: '3', label: 'Генеральный партнер' },
    { value: '4', label: 'Партнер' }
]


const MainPartners = () => {


    const [list, setList] = useState(testData)
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)


    return <>


        <section className={ s.container }>

            <h1>Новости</h1>

            <Button add onClick={ ()=>setIsOpenAside(true) }>Добавить партнера</Button>

            <ul className={ s.content }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, list, setList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={list} strategy={verticalListSortingStrategy}>
                        {
                            list.map( (item, i) =>
                                <PartnersItem key={item.id} {...{item, i, setIsOpenAside}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </ul>

        </section>


        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить партнера'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <SelectInput options={options} value='1' />
            <div className={ s.buttons }>
                <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default MainPartners