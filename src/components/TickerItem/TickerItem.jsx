import s from './TickerItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../utils/dndHandlers.js'
import {DnDIcon} from '../../../public/assets/jsxIcons/DnDIcon.jsx'
import {TrashIcon} from '../../../public/assets/jsxIcons/TrashIcon.jsx'



const TickerItem = ({item, i, deleteHandler}) => {


    const sortable = useSortable({ id: item.id })
    const {setNodeRef, listeners} = sortable


    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            <span>{ i+1 }</span>
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <TrashIcon onClick={ ()=>deleteHandler(item.id) }/>
            <img src={ item.image } alt='логотип'/>
        </li>

    )
}


export default TickerItem