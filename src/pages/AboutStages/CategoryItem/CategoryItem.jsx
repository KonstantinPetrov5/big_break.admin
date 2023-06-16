import s from './CategoryItem.module.sass'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {useSortable} from '@dnd-kit/sortable'


const CategoryItem = ({id, title, activeTab, setActiveTab, editHandler, deleteHandler}) => {


    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    return (

        <label
            key={ id }
            className={ s.label }
            data-checked={ activeTab === id }
            style={ dndStyleContainer(sortable) }
            ref={ setNodeRef }
        >
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <p>{ title }</p>
            <EditIcon className={ s.editIcon } onClick={ ()=>editHandler(id, 'category')}/>
            <TrashIcon onClick={ ()=>deleteHandler(id, 'category')}/>
            <input
                type='radio'
                id={ id }
                value={ id }
                name='stagesList'
                onChange={ e => setActiveTab(Number(e.target.value)) }
            />
        </label>

    )
}


export default CategoryItem