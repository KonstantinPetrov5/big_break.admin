import s from './CallsItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import Separator from '../../../components/ui/Separator/Separator.jsx'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'


const CallsItem = ({item, i, setIsOpenAside}) => {


    const {id, icon, title, desc, color} = item

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
            <div className={ s.icon }>
                { icon && <img src={icon} alt='icon'/> }
            </div>
            <div className={ s.color } data-color={color}></div>
            <p className={ s.title }>{ title }</p>
            <p className={ s.desc }>{ desc }</p>
            <EditIcon className={ s.editIcon } onClick={()=>setIsOpenAside(true)}/>
            <TrashIcon onClick={ ()=>deleteHandler() }/>
        </li>

    )
}


export default CallsItem