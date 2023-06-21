import s from './SupportMusic.module.sass';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import { useEffect, useState } from 'react';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';

const SupportMusic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [description, setDescription] = useState('');
  const [button, setButton] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    axiosAuth('/support/music')
      .then(({ data }) => {
        setDescription(data.description || '');
        setVideo(data.video || '');
        setButton(data.button || '');
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  const submitHandler = () => {
    setBtnLoading(true);

    const queryData = {
      description: description || null,
      video: video || null,
      button: button || null,
    };

    axiosAuth
      .put('/support/music/update', queryData)
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setBtnLoading(false));
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <section className={s.container}>
        <h1>Большая перемена музыка</h1>

        <TextAreaInput
          label="Текст"
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextInput
          label="Кнопка"
          className={s.btnText}
          value={button}
          onChange={(e) => setButton(e.target.value)}
        />

        <h2>Загрузка видео</h2>
        <TextInput
          placeholder="Вставьте ссылку на видео"
          className={s.videoInput}
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />

        <Button isLoading={btnLoading} save onClick={() => submitHandler()}>
          Сохранить
        </Button>
      </section>
    </>
  );
};

export default SupportMusic;
