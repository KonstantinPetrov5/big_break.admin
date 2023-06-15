import s from './NewsItem.module.sass'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {formatUnixDate} from '../../../utils/formatUnixDate.js'
import Separator from '../../../components/ui/Separator/Separator.jsx'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'


const NewsItem = ({item, i, editHandler, deleteHandler}) => {

    const {id, image, title, date} = item

    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    return (
        
            <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
                { i!==0 && <Separator className={ s.separator }/> }
                <span>{ i+1 }</span>
                <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
                <img src={ image } alt='логотип'/>
                <p className={ s.title }>{ title }</p>
                <p className={ s.date }>{ formatUnixDate(date) }</p>
                <EditIcon className={ s.editIcon } onClick={()=>editHandler(id)}/>
                <TrashIcon onClick={ ()=>deleteHandler(id) }/>
            </li>

    )

}


export default NewsItem