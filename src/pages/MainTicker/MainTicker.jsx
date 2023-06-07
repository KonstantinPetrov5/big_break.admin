import s from './MainTicker.module.sass'
import Button from '../../components/ui/Button/Button.jsx'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'
import {useState} from 'react'
import {DndContext} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import TickerItem from './TickerItem/TickerItem.jsx'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'


const testData = [
    { id: 1, src: tickerLogoTest },
    { id: 2, src: tickerLogoTest },
    { id: 3, src: tickerLogoTest },
    { id: 4, src: tickerLogoTest },
    { id: 5, src: tickerLogoTest },
    { id: 6, src: tickerLogoTest },
    { id: 7, src: tickerLogoTest },
]


const MainTicker = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [list, setList] = useState(testData)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)


    return (


        <section className={ s.container }>

            <h1>Бегущая строка</h1>

            <Button add onClick={ ()=>setIsOpenAside(true) }>Добавить</Button>

            <DndContext
                onDragEnd={ e => dndHandlers(e, list, setList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={list} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            list.map( (item, i) =>
                                <TickerItem key={item.id} {...{item, i}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>

            <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить логотип'>
                <FileInput label='Загрузка изображения' />
                <Separator className={ s.separator }/>
                <div className={ s.buttons }>
                    <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>
                    <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
                </div>
            </EditAside>

        </section>


    )
}


export default MainTicker
