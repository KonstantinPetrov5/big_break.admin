import s from './CommunityTeams.module.sass'
import {useEffect, useState} from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import {TrashIcon} from '../../../public/assets/jsxIcons/TrashIcon.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import {EditIcon} from '../../../public/assets/jsxIcons/EditIcon.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx'
import {axiosAuth} from '../../utils/axiosInstance.js'
import toast from 'react-hot-toast'


const CommunityTeams = () => {


    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    const [mainList, setMainList] = useState([])
    const [propsList, setPropsList] = useState([])
    const [desc, setDesc] = useState('')
    const [editData, setEditData] = useState({ index: null, text: '', color: '#4B21B1' })



    useEffect( () => {
        axiosAuth('/community/region')
            .then( ({data}) => {
                setMainList(data.numbers)
                setPropsList(data.values)
                setDesc(data.desc || '')
            })
            .catch(()=>toast.error('Произошла ошибка'))
            .finally(()=>setIsLoading(false))
    }, [] )


    const submitHandler = () => {
        setBtnLoading(true)

        const queryData = {
            desc,
            numbers: mainList,
            values: propsList
        }

        axiosAuth.put('/community/region/update', queryData)
            .then( () => toast.success('Данные сохранены') )
            .catch( () => toast.error('Произошла ошибка') )
            .finally( () => setBtnLoading(false) )

    }

    const addItemHandler = type => {
        if (type==='main') {
            setMainList([...mainList, { number: '', text: '' }])
        } else {
            setPropsList([...propsList, { text: '', color: '#4B21B1' }])
        }
    }

    const delItemHandler = (i, type) => {
        const isConfirm = window.confirm('Удалить элемент?')
        if (!isConfirm) return null

        if (type==='main') {
            const newArr = mainList.filter( (_, index) => i!==index)
            setMainList(newArr)
        } else {
            const newArr = propsList.filter( (_, index) => i!==index)
            setPropsList(newArr)
        }
    }

    const mainListOnChange = (e, i, type) => {
        const value = e.target.value

        const newArr = mainList.map( (item, index) => {
            if (i===index) {
                if (type==='num') return { ...item, number: value }
                else  return { ...item, text: value }
            } else {
                return item
            }
        })

        setMainList(newArr)
    }

    const propsListOnChange = (e, i) => {
        const value = e.target.value

        const newArr = propsList.map( (item, index) => {
            if (i===index) {
                return { ...item, text: value }
            } else {
                return item
            }
        })

        setPropsList(newArr)
    }

    const propsEditHandler = i => {
        setEditData({ ...propsList[i], index: i })
        setIsOpenAside(true)
    }

    const saveAsideHandler = () => {
        const { index, text, color } = editData

        const newArr = propsList.map( (item, i) => {
            if (i===index) {
                return { text, color }
            } else {
                return item
            }
        })

        setPropsList(newArr)
        setIsOpenAside(false)
    }


    if (isLoading) return <h1>Загрузка...</h1>
    return <>

        <section className={ s.container }>

            <h1>Региональные команды</h1>

            <Button add onClick={ () => addItemHandler('main') }>
                Добавить
            </Button>

            <ul className={ s.mainList }>
                {
                    mainList.map( ( item, i ) =>
                        <li key={i}>
                            <TextInput
                                value={ item.number }
                                onChange={ e => mainListOnChange(e, i, 'num') }
                                label='Цифра'
                                className={ s.number }
                            />
                            <TextInput
                                value={ item.text }
                                onChange={ e => mainListOnChange(e, i, 'text') }
                                label='Описание'
                            />
                            <TrashIcon onClick={ () => delItemHandler(i, 'main') }/>
                        </li>
                    )
                }
            </ul>

            <Separator/>

            <TextAreaInput
                value={desc}
                onChange={ e => setDesc(e.target.value) }
                label='Текст'
                minRows={3}
                className={ s.descInput }
            />

            <Button add onClick={ () => addItemHandler('props') }>
                Добавить ценности
            </Button>

            <ul className={ s.propsList }>
                {
                    propsList.map( (item, i) =>
                        <li key={i}>
                            <span>{ i + 1 }</span>
                            <TextInput
                                value={ item.text }
                                onChange={ e => propsListOnChange(e, i)}
                            />
                            <EditIcon onClick={ () => propsEditHandler(i) }/>
                            <TrashIcon onClick={ () => delItemHandler(i, 'props') }/>
                        </li>
                    )
                }
            </ul>

            <Separator/>

            <Button
                className={ s.saveBtn }
                save
                isLoading={btnLoading}
                onClick={ () => submitHandler() }
            >
                Cохранить
            </Button>


        </section>

        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Редактирование'>

            <h2 className={ s.asideSubtitle }>Описание</h2>
            <TextInput
                value={ editData.text }
                onChange={ e => setEditData({...editData, text: e.target.value})}
            />

            <h2 className={ s.asideSubtitle }>Изменить цвет</h2>
            <ColorSelect
                state={ editData.color }
                setState={ color=>setEditData({...editData, color}) }
            />

            <Separator className={ s.asideSeparator }/>

            <div className={ s.buttons }>
                <Button save onClick={ () => saveAsideHandler() }>
                    Сохранить
                </Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>
                    Отменить
                </Button>
            </div>

        </EditAside>

    </>
}


export default CommunityTeams