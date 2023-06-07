import s from './Separator.module.sass'


const Separator = props => {


    return (

        <div {...props} className={ `${s.separator} ${props.className || ''}` }/>

    )
}


export default Separator