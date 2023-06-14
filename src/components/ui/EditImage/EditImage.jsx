import s from './EditImage.module.sass'
import {TrashIcon} from '../../../../public/assets/jsxIcons/TrashIcon.jsx'
import {EditIcon} from '../../../../public/assets/jsxIcons/EditIcon.jsx'
import {AddIcon} from '../../../../public/assets/jsxIcons/AddIcon.jsx'


const EditImage = ({ image, onEdit, onRemove, className }) => {


    return (

        <div className={ `${s.container} ${className || ''}` }>

            <div className={ s.image } data-empty={!image} onClick={onEdit}>
                <AddIcon/>
                {
                    !!image
                    && <img src={image} alt="загруженое изображение"/>
                }
            </div>

            <div className={ s.icons }>
                <EditIcon onClick={onEdit}/>
                <TrashIcon onClick={onRemove} />
            </div>

        </div>

    )
}


export default EditImage