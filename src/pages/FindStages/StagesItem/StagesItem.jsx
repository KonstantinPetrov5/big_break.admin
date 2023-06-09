import s from './StagesItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import Separator from '../../../components/ui/Separator/Separator.jsx'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'


const StagesItem = ({item, i, editHandler, deleteHandler}) => {


    const {id, title, description} = item

    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            { i!==0 && <Separator className={ s.separator }/> }
            <span>{ i+1 }</span>
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <p className={ s.title }>{ title }</p>
            <p className={ s.desc }>{ description }</p>
            <EditIcon className={ s.editIcon } onClick={ ()=>editHandler(id, 'stages')}/>
            <TrashIcon onClick={ ()=>deleteHandler(id, 'stages')}/>
        </li>

    )
}


export default StagesItem