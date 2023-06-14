import s from './StoriesItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import Separator from '../../../components/ui/Separator/Separator.jsx'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'


const StoriesItem = ({item, i, setIsOpenAside}) => {


    const {id, img, title, desc} = item

    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    const deleteHandler = () => {
        console.log('delete: ', id)
    }

    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            { i!==0 && <Separator className={ s.separator }/> }
            <span>{ i+1 }</span>
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <div className={ s.img }>
                { img && <img src={img} alt='photo'/> }
            </div>
            <p className={ s.title }>{ title }</p>
            <EditIcon className={ s.editIcon } onClick={()=>setIsOpenAside(true)}/>
            <TrashIcon onClick={ ()=>deleteHandler() }/>
        </li>

    )
}


export default StoriesItem