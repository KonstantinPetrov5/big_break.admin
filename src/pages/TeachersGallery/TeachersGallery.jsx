import s from './TeachersGallery.module.sass'
import {useEffect, useState} from 'react'
import testMainNews from '../../../public/assets/images/testMainNews.jpg'
import {DndContext} from '@dnd-kit/core'
import {dndHandlers} from '../../utils/dndHandlers.js'
import {restrictToParentElement, restrictToVerticalAxis} from '@dnd-kit/modifiers'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import CategoryItem from '../FindStages/CategoryItem/CategoryItem.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import PhotosItem from '../FindPhotos/PhotosItem/PhotosItem.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const testData = [
    {
        id: 0,
        title: 'Мрия 2021',
        items: [
            { id: 1, image: testMainNews, video: 'wefwefwe' },
            { id: 2, image: testMainNews, video: '' },
        ]
    },
    {
        id: 3,
        title: 'Сенеж',
        items: [
            { id: 4, image: testMainNews, video: 'wefwefwe' },
            { id: 5, image: testMainNews, video: '' },
            { id: 6, image: testMainNews, video: '' },
        ]
    },
]

const defaultDataCategory = {
    title: '',
}
const defaultDataPhotos = {
    image: '',
    video: ''
}

// пример для этой страницы можно взять из компонентов FindStages - логика категорий и FindPhotos - логика с фото/видео
const TeachersGallery = () => {


    const [isOpenAsidePhoto, setIsOpenAsidePhoto] = useState(false)
    const [isOpenAsideCategory, setIsOpenAsideCategory] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const [categoryList, setCategoryList] = useState(testData)
    const [photoList, setPhotoList] = useState([])
    const [activeTab, setActiveTab] = useState(categoryList[0].id) // потом поставить null, и подставить первый при получении данных

    const [editData, setEditData] = useState(defaultDataCategory)
    const [isNew, setIsNew] = useState(true)
    const [type, setType] = useState('photo') // video


    useEffect( () => {
        if (activeTab!==null) {
            const currentCategory = categoryList.find(obj=>obj.id===activeTab)
            setPhotoList(currentCategory.items)
        }
    }, [activeTab] ) // при выборе таба подставляет нужный photoList

    useEffect( () => {
        const newList = categoryList.map( obj => {
            if (obj.id===activeTab) {
                return {...obj, items: photoList}
            } else {
                return obj
            }
        } )
        setCategoryList(newList)
    }, [photoList] ) // при изменении photoList меняет исходный categoryList

    useEffect( () =>   {
        axiosAuth('/about/steps')
            .then( ({data}) => {
                // setDescription(data.description)
                // setCategoryList(data.items)
                // setStagesList(data.items[0].items)
                // setActiveTab(data.items[0].id)
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )



    const editHandler = (id, type) => {
        // setIsNew(false)
        // if (type==='category') {
        //     setEditData(categoryList.find(obj=>obj.id===id))
        //     setIsOpenAsideCategory(true)
        // }
        // if (type==='stages') {
        //     setEditData(stagesList.find(obj=>obj.id===id))
        //     setIsOpenAsideStages(true)
        // }
    }

    const deleteHandler = (id, type) => {
        // if (type==='category') {
        //     const isConfirm = window.confirm('Удалить категорию?')
        //     if (!isConfirm) return null
        //     axiosAuth.delete('/about/steps/group/delete', { data: { id } })
        //         .then(()=> {
        //             setCategoryList(categoryList.filter(item => item.id!==id))
        //             if (activeTab===id) {
        //                 setActiveTab(categoryList[0].id!==id ? categoryList[0].id : categoryList[1].id)
        //             }
        //             toast.success('Данные сохранены')
        //         })
        //         .catch(()=>toast.error('Произошла ошибка'))
        // }
        // if (type==='stages') {
        //     const isConfirm = window.confirm('Удалить этап?')
        //     if (!isConfirm) return null
        //     axiosAuth.delete('/about/steps/item/delete', { data: { id } })
        //         .then(()=> {
        //             const newList = stagesList.filter(item => item.id!==id)
        //             setStagesList(newList)
        //             toast.success('Данные сохранены')
        //         })
        //         .catch(()=>toast.error('Произошла ошибка'))
        // }
    }



    if (isLoading) return <h1>Загрузка...</h1>
    return <>
        <section className={ s.container }>

            <h1>Галерея</h1>

            <Button add>
                Добавить Категорию
            </Button>

            <div className={ s.categoryContainer }>
                <DndContext
                    onDragEnd={ e => dndHandlers(e, categoryList, setCategoryList) }
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={categoryList} strategy={verticalListSortingStrategy}>
                        {
                            categoryList.map( ({ id, title }) =>
                                <CategoryItem key={id} {...{id, title, activeTab, setActiveTab, editHandler, deleteHandler}}/>
                            )
                        }
                    </SortableContext>
                </DndContext>
            </div>

            <div className={ s.addBtns }>
                <Button add>
                    <span>Добавить фото</span>
                    <span>Фото</span>
                </Button>
                <Button add>
                    <span>Добавить видео</span>
                    <span>Видео</span>
                </Button>
            </div>

            <DndContext
                onDragEnd={ e => dndHandlers(e, photoList, setPhotoList) }
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext items={photoList} strategy={verticalListSortingStrategy}>
                    <ul className={ s.list }>
                        {
                            photoList.map( (item, i) =>
                                <PhotosItem key={item.id} {...{item, i, deleteHandler}}/>
                            )
                        }
                    </ul>
                </SortableContext>
            </DndContext>

        </section>

        <EditAside state={isOpenAsideCategory} setState={setIsOpenAsideCategory} title='Изменить название категории'>
            <TextInput label='Категория' />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading}>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAsideCategory(false)}>
                    Отменить
                </Button>
            </div>
        </EditAside>

        <EditAside state={isOpenAsidePhoto} setState={setIsOpenAsidePhoto} title={ type==='photo' ? 'Добавить фото' : 'Добавить видео' }>
            <FileInput label={ type==='photo' ? 'Загрузка изображения' : 'Загрузка превью' }/>
            {
                type==='video'
                &&
                <>
                    <Separator className={ s.separator }/>
                    <h2 className={ s.videoTitle }>Загрузка видео</h2>
                    <TextInput placeholder='Вставьте ссылку на видео'/>
                </>
            }
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save isLoading={btnLoading}>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>
    </>
}


export default TeachersGallery