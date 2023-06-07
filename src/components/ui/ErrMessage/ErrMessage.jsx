import s from './ErrMessage.module.sass'


const ErrMessage = ({ err }) => {

    if (!err) return null
    return <p className={ s.err }>{ err }</p>
}


export default ErrMessage