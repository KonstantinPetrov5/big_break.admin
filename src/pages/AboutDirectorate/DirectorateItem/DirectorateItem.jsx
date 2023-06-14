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


const DirectorateItem = ({item, i, setIsOpenAsideTitle, setIsOpenAsideMember}) => {


    const {id, title, members} = item

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
                    <EditIcon onClick={()=>setIsOpenAsideTitle(true)}/>
                    <TrashIcon/>
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
                                members.map( ({ id, name, img }) =>
                                    <li key={id} className={ s.memberItem }>
                                        <div className={ s.img }>
                                            { !!img && <img src={img} alt='photo'/> }
                                        </div>
                                        <p className={ s.title }>{ name }</p>
                                        <EditIcon onClick={()=>setIsOpenAsideMember(true)}/>
                                        <TrashIcon />
                                    </li>
                                )
                            }
                        </ul>
                        <Button add>ДОБАВИТЬ</Button>
                    </div>
                </div>
            </div>
        </li>

    )
}


export default DirectorateItem