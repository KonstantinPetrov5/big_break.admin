import s from './DirectorateItem.module.sass'
import {useSortable} from '@dnd-kit/sortable'
import {dndStyleContainer, dndStyleItem} from '../../../utils/dndHandlers.js'
import Separator from '../../../components/ui/Separator/Separator.jsx'
import {DnDIcon} from '../../../../public/assets/jsxIcons/DnDIcon.jsx'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {ChevronRight} from '../../../../public/assets/jsxIcons/ChevronRight.jsx'
import {useState} from 'react'
import Button from '../../../components/ui/Button/Button.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'


const DirectorateItem = ({item, i, editHandler, deleteHandler, addHandler, setGroupId}) => {


    const {id, title, items} = item

    const sortable = useSortable({ id })
    const {setNodeRef, listeners} = sortable
    
    const [isOpen, setIsOpen] = useState(false)


    return (

        <li className={ s.item } style={ dndStyleContainer(sortable) } ref={ setNodeRef }>
            <div className={ s.top }>
                <div>
                    { i!==0 && <Separator className={ s.separator }/> }
                    <span>{ i+1 }</span>
                    <DnDIcon {...listeners} style={ dndStyleItem(sortable) }/>
                </div>
                <p className={ s.itemTitle }>{ title }</p>
                <div>
                    <EditIcon onClick={()=>editHandler(id, 'title')}/>
                    <TrashIcon onClick={()=>deleteHandler(id, 'title')}/>
                    <ChevronRight
                        className={ s.arrow }
                        data-active={ isOpen }
                        onClick={ ()=>setIsOpen(p=>!p) }
                    />
                </div>
            </div>
            <div className={ s.bottom } data-open={ isOpen }>
                <div>
                    <div>
                        <Separator className={ s.separator }/>
                        <ul className={ s.membersList }>
                            {
                                items.map( item =>
                                    <li key={item.id} className={ s.memberItem }>
                                        <div className={ s.img }>
                                            { !!item.image && <img src={item.image} alt='photo'/> }
                                        </div>
                                        <p className={ s.title }>{ item.title }</p>
                                        <EditIcon onClick={ ()=> { editHandler(item.id, 'member'); setGroupId(id) }}/>
                                        <TrashIcon onClick={()=> { deleteHandler(item.id, 'member'); setGroupId(id) }}/>
                                    </li>
                                )
                            }
                        </ul>
                        <Button add onClick={()=> {addHandler('member'); setGroupId(id)}}>ДОБАВИТЬ</Button>
                    </div>
                </div>
            </div>
        </li>

    )
}


export default DirectorateItem