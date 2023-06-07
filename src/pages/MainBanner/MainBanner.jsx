import s from './MainBanner.module.sass'
import {useFormik} from 'formik'
import {useState} from 'react'
import {BannerSwitchData, MainBannerDefaultValue} from './data.js'
import {MainBannerValidation} from './validationSchema.js'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx'
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import EditImage from '../../components/ui/EditImage/EditImage.jsx'
import EditAside from '../../components/EditAside/EditAside.jsx'
import FileInput from '../../components/ui/FileInput/FileInput.jsx'
import Separator from '../../components/ui/Separator/Separator.jsx'

import tickerLogoTest from '/public/assets/images/tickerLogoTest.jpg'


const MainBanner = () => {


    const [initialValues, setInitialValues] = useState(MainBannerDefaultValue)

    const [isOpenAside, setIsOpenAside] = useState(false)
    const [switchPos, setSwitchPos] = useState(BannerSwitchData[0].value)
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const { getFieldProps, setFieldValue, errors, handleSubmit } = useFormik({
        initialValues,
        // enableReinitialize: true,
        validationSchema: MainBannerValidation,
        validateOnBlur: false,
        onSubmit: data => console.log('onSubmit: ', data)
    })


    return <>

        <form className={ s.container } onSubmit={ handleSubmit }>

            <h1>Баннер</h1>

            <TextInput {...getFieldProps('title')} label='Заголовок'/>

            <TextAreaInput {...getFieldProps('desc')} className={ s.desc } label='Description' minRows={2}/>

            <TextInput {...getFieldProps('button')} label='Кнопка'/>

            <SwitchInput
                className={ s.switch }
                tabs={BannerSwitchData}
                value={switchPos}
                name='bannerSwitch'
                onChange={ e => setSwitchPos(e.target.value) }
            />

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


export default MainBanner