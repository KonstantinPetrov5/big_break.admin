import s from './FileInput.module.sass'
import {useDropzone} from 'react-dropzone'
import toast from 'react-hot-toast'
import {UploadFileIcon} from '../../../../public/assets/jsxIcons/UploadFileIcon.jsx'
import Button from '../Button/Button.jsx'
import {useState} from 'react'


const FileInput = ({ label }) => {


    const [acceptImages, setAcceptImages] = useState('')


    const {getRootProps, getInputProps, open } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        multiple: false,
        noClick: true,
        noKeyboard: true,
        onDrop: files => onDropHandler(files),
    })
    
    

    const onDropHandler = files => {
        const file = files[0]
        getBase64(file)
            .then(res => setAcceptImages(res) )
            .catch(()=>toast.error('Произошла ошибка при загрузке изображения'))
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
        })
    }


    return <>

        <div {...getRootProps()}>

            <input {...getInputProps()} />

            { label && <h2 className={ s.label }>{ label }</h2> }

            <div className={ s.fileInput }>
                {
                    !acceptImages
                    ?
                    <>
                        <UploadFileIcon/>
                        <div>
                            <p>Перетащите изображение сюда</p>
                            <span>Не более 1 изображения</span>
                        </div>
                        <Button className={ s.button } onClick={ open }>Выбрать файл</Button>
                    </>
                    :
                    <>
                        <img className={ s.acceptImage } src={acceptImages} alt='Загруженное изображение'/>
                        <Button className={ s.button } onClick={ open }>Заменить файл</Button>
                    </>
                }

            </div>

        </div>

    </>

}


export default FileInput