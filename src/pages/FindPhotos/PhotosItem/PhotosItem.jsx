import s from './PhotosItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {PlayIcon} from '../../../../public/assets/jsxIcons/PlayIcon.jsx'



const PhotosItem = ({item, i, deleteHandler}) => {

    const {id, image, type, is_video} = item

    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            <span>{ i+1 }</span>
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <div className={ s.img }>
                { (type==='video' || is_video) && <PlayIcon/> }
                { !!image && <img src={image} alt='photo'/> }
            </div>
            <TrashIcon onClick={ ()=>deleteHandler(id) }/>
        </li>

    )
}


export default PhotosItem