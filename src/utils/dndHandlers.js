import {arrayMove} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'


export const dndHandlers = (e, list, setList) => {
    const oldIndex = list.findIndex( ({id}) => id===e.active.id)
    const newIndex = list.findIndex( ({id}) => id===e.over.id)
    const newList = arrayMove(list, oldIndex, newIndex)
    setList(newList)
}

export const dndStyle = ({ transform, transition, isDragging }) => (
    {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
    }
)

export const dndStyleContainer = ({ transform, transition, isDragging }) => (
    {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
    }
)

export const dndStyleItem = ({ isDragging }) => (
    {
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none'
    }
)