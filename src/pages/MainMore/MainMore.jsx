import s from './MainMore.module.sass'
import {useState} from 'react'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import EditImage from '../../components/ui/EditImage/EditImage.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'
import {useFormik} from 'formik'
import {MainMoreValidation} from './validationSchema.js'
import {MainMoreDefaultValue} from './data.js'
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg'


const MainMore = () => {

    const [initialValues, setInitialValues] = useState(MainMoreDefaultValue)
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)


    const { getFieldProps, setFieldValue, errors, handleSubmit } = useFormik({
        initialValues,
        // enableReinitialize: true,
        validationSchema: MainMoreValidation,
        validateOnBlur: false,
        onSubmit: data => console.log('onSubmit: ', data)
    })

    return <>

        <form className={ s.container } onSubmit={ handleSubmit }>

            <h1>Подробнее о конкурсе</h1>

            <TextInput {...getFieldProps('title')} label='Заголовок'/>

            <TextAreaInput {...getFieldProps('desc')} className={ s.desc } label='Description' minRows={2}/>

            <TextInput {...getFieldProps('button')} label='Кнопка'/>

            <h2 className={ s.LoadTitle }>Загрузка изображения</h2>

            <EditImage
                image={tickerLogoTest}
                className={ s.image }
                onEdit={()=>setIsOpenAside(true)}
            />

            <Button save>Сохранить</Button>

        </form>

        <EditAside state={isOpenAside} setState={setIsOpenAside} title='Добавить фото'>
            <FileInput label='Загрузка изображения' />
            <Separator className={ s.separator }/>
            <div className={ s.buttons }>
                <Button save onClick={()=>setIsOpenAside(false)}>Сохранить</Button>
                <Button typeUI='border' onClick={()=>setIsOpenAside(false)}>Отменить</Button>
            </div>
        </EditAside>

    </>
}


export default MainMore