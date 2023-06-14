import s from './CategoryItem.module.sass'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {useSortable} from '@dnd-kit/sortable'


const CategoryItem = ({id, category, activeTab, setActiveTab, setIsOpenAsideCategory}) => {


    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable


    return (

        <label
            key={ id }
            className={ s.label }
            data-checked={ activeTab === category }
            style={ dndStyleContainer(sortable) }
            ref={ setNodeRef }
        >
            <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
            <p>{ category }</p>
            <EditIcon className={ s.editIcon } onClick={ ()=>setIsOpenAsideCategory(true)}/>
            <TrashIcon />
            <input
                type='radio'
                id={ category }
                value={ category }
                name='stagesList'
                onChange={ e => setActiveTab(e.target.value)}
            />
        </label>

    )
}


export default CategoryItem