import s from './TickerItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'



const TickerItem = ({item, i}) => {


    const sortable = useSortable({ id: item.id })
    const {setNodeRef, listeners} = sortable


    const deleteHandler = () => {
        console.log('delete: ', item.id)
    }


    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            <span>{ i+1 }</span>
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <TrashIcon onClick={ ()=>deleteHandler() }/>
            <img src={ item.src } alt='логотип'/>
        </li>

    )
}


export default TickerItem