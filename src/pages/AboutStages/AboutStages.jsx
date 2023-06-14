import s from './AboutStages.module.sass'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import {useEffect, useState} from 'react'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import StagesItem from './StagesItem/StagesItem.jsx'
import CategoryItem from './CategoryItem/CategoryItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import DateInput from '../../components/ui/DateInput/DateInput.jsx'


const testData = [
    {
        id: 1,
        category: '5-7 Классы',
        color: '#4B21B1',
        stages: [
            {
                id: 1,
                icon: testMainNews,
                stage: 'Регистрация',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            },
            {
                id: 2,
                icon: '',
                stage: 'Онлайн-игра. Дистанционный этап',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            }
        ]
    },
    {
        id: 2,
        category: '8-10 классы',
        color: '#4B21B1',
        stages: [
            {
                id: 1,
                icon: testMainNews,
                stage: 'Онлайн-собеседование. Дистанционный этап',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            },
            {
                id: 2,
                icon: '',
                stage: '5-7 классы wef f weeeeee',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            }
        ]
    },
    {
        id: 3,
        category: 'Студенты СПО',
        color: '#4B21B1',
        stages: [
            {
                id: 1,
                icon: testMainNews,
                stage: '5-7 классы',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            },
            {
                id: 2,
                icon: '',
                stage: '5-7 классы wef f weeeeee',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            }
        ]
    },
    {
        id: 4,
        category: 'Иностранцы',
        color: '#4B21B1',
        stages: [
            {
                id: 1,
                icon: testMainNews,
                stage: '5-7 классы',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            },
            {
                id: 2,
                icon: '',
                stage: '5-7 классы wef f weeeeee',
                desc: 'Lorem ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum ipsum dolor sit Lorem ipsum dolor sit amet ipsum',
                dateFrom: 1679270400,
                dateTo: 1679270400
            }
        ]
    }
]


const AboutStages = () => {


    const [isOpenAsideStages, setIsOpenAsideStages] = useState(false)
    const [isOpenAsideCategory, setIsOpenAsideCategory] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [categoryList, setCategoryList] = useState(testData)
    const [activeTab, setActiveTab] = useState(categoryList[0].category)
    const [stagesList, setStagesList] = useState(categoryList.find(obj=>obj.category===activeTab).stages)
    const [subTitle, setSubTitle] = useState('')


    useEffect( () => {
        setStagesList(categoryList.find(obj=>obj.category===activeTab).stages)
    }, [activeTab] )

    useEffect( () => {
        const newList = categoryList.map( obj => {
            if (obj.category===activeTab) {
                return {...obj, stages: stagesList}
            } else {
                return obj
            }
        } )
        setCategoryList(newList)
    }, [stagesList] )


    return <>

        <h1>Этапы конкурса</h1>

        <TextAreaInput
            className={ s.subtitle }
            value={subTitle}
            onChange={e=>setSubTitle(e.target.value)}
            label='Подзаголовок'
            placeholder='Введите текст'
            minRows={6}
        />

        <Button add className={ s.addCatBtn }>Добавить Категорию</Button>

        <div className={ s.categoryContainer }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, categoryList, setCategoryList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={categoryList} strategy={verticalListSortingStrategy}>
                    {
                        categoryList.map( ({ id, category }) =>
                            <CategoryItem key={id} {...{id, category, activeTab, setActiveTab, setIsOpenAsideCategory}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </div>

        <Button add className={ s.addStageBtn }>Добавить этап</Button>

        <ul className={ s.stagesContainer }>
            <DndContext
                onDragEnd={ e => dndHandlers(e, stagesList, setStagesList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={stagesList} strategy={verticalListSortingStrategy}>
                    {
                        stagesList.map( (item, i) =>
                            <StagesItem key={item.id} {...{item, i, setIsOpenAsideStages}}/>
                        )
                    }
                </SortableContext>
            </DndContext>
        </ul>

        <Button className={ s.saveBtn } save>Сохранить</Button>


        <EditAside state={isOpenAsideStages} setState={setIsOpenAsideStages} title='Изменить название этапа'>
            <TextInput label={'Этап'}/>
            <Separator className={ s.separator }/>
            <h1>Изменить описание</h1>
            <TextInput label={'Описание'}/>
            <Separator className={ s.separator }/>
            <h1>Изменить дату</h1>
            <div className={ s.dateBox }>
                <div><h2>От</h2><DateInput/></div>
                <div><h2>До</h2><DateInput/></div>
            </div>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>


        <EditAside state={isOpenAsideCategory} setState={setIsOpenAsideCategory} title='Изменить название категории'>
            <TextInput label={'Категория'}/>
            <Separator className={ s.separator }/>
            <h1>Изменить цвет</h1>
            <ColorSelect/>
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save>Сохранить</Button>
                <Button typeUI='border'>Отменить</Button>
            </div>
        </EditAside>
    </>
}


export default AboutStages