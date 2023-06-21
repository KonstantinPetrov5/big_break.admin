import s from './SupportGrants.module.sass';
import { useEffect, useState } from 'react';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import { DndContext } from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { dndHandlers } from '../../utils/dndHandlers.js';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TickerItem from '../../components/TickerItem/TickerItem.jsx';
import EditAside from '../../components/EditAside/EditAside.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import ColorSelect from '../../components/ui/ColorSelect/ColorSelect.jsx';
import { EditIcon } from '../../../public/assets/jsxIcons/EditIcon.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';

const defaultData = {
  id: '1',
  description: 'test',
  tooltip: 'ttte',
  color: '#4B21B1',
};

const SupportGrants = () => {
  const [isOpenAsidePhoto, setIsOpenAsidePhoto] = useState(false);
  const [isOpenAsideDesc, setIsOpenAsideDesc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [photoList, setPhotoList] = useState([]);
  const [textList, setTextList] = useState([]);

  const [btnLoadSubtitle, setBtnLoadSubtitle] = useState(false);
  const [description, setDescription] = useState('');
  const [text1, setTest1] = useState('');
  const [text2, setTest2] = useState('');
  const [editData, setEditData] = useState(defaultData);
  const [loadedImg, setLoadedImg] = useState('');

  useEffect(() => {
    setLoadedImg('');
  }, [isOpenAsidePhoto]);

  useEffect(() => {
    axiosAuth('/support/grants')
      .then(({ data }) => {
        setDescription(data.description);
        setTest1(data.text_1);
        setTest2(data.text_2);
        setPhotoList(data.images);
        setTextList(data.items);
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  const saveDescHandler = () => {
    setBtnLoadSubtitle(true);
    const queryData = {
      description: description || null,
      text_1: text1 || null,
      text_2: text2 || null,
    };
    axiosAuth
      .put('/support/grants/desc', queryData)
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setBtnLoadSubtitle(false));
  };

  const imgHandlerPhoto = (type) => {
    if (type === 'save') {
      if (!loadedImg) return toast.error('Изображение не загружено');
      setBtnLoading(true);
      axiosAuth
        .post('/support/grants/images/create', { image: loadedImg })
        .then(({ data }) => {
          setPhotoList([{ id: data.id, image: data.image }, ...photoList]);
          toast.success('Данные сохранены');
          setIsOpenAsidePhoto(false);
        })
        .catch(() => toast.error('Произошла ошибка'))
        .finally(() => setBtnLoading(false));
    } else {
      setIsOpenAsidePhoto(false);
    }
  };

  const deleteHandler = (id) => {
    const isConfirm = window.confirm('Удалить изображение?');
    if (!isConfirm) return;
    axiosAuth
      .delete('/support/grants/images/delete', { data: { id } })
      .then(() => {
        setPhotoList(photoList.filter((item) => item.id !== id));
        toast.success('Данные сохранены');
      })
      .catch(() => toast.error('Произошла ошибка'));
  };

  const saveNewPositionPhoto = (e) => {
    const id = e.active.id;
    const new_position = e.over.data.current.sortable.index + 1;
    axiosAuth
      .post('/support/grants/images/position', { id, new_position })
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'));
  };

  const editHandler = (id) => {
    setEditData(textList.find((obj) => obj.id === id));

    setIsOpenAsideDesc(true);
  };

  const saveHandler = () => {
    setBtnLoadSubtitle(true);

    const newItem = {
      description: editData.description || null,
      tooltip: editData.tooltip || null,
      color: editData.color || '#4B21B1',
    };

    const updatedItems = textList.map((item) =>
      item.id === editData.id ? newItem : item
    );

    const queryData = {
      items: updatedItems,
    };

    console.log(queryData);
    axiosAuth
      .put('/support/grants/items', queryData)
      .then(() => {
        const newList = textList.map((obj) =>
          obj.id === editData.id ? editData : obj
        );
        setTextList(newList);
        toast.success('Данные сохранены');
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setBtnLoadSubtitle(false)),
      setIsOpenAsideDesc(false);
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <section className={s.container}>
        <h1>Росмолодежь. гранты</h1>

        <TextAreaInput
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Подзаголовок"
          placeholder="Введите текст"
        />

        <TextAreaInput
          label="1. Текст"
          minRows={2}
          className={s.textInput}
          value={text1}
          onChange={(e) => setTest1(e.target.value)}
          placeholder="Введите текст"
        />

        <TextAreaInput
          label="2. Текст"
          minRows={2}
          value={text2}
          onChange={(e) => setTest2(e.target.value)}
          placeholder="Введите текст"
        />

        <Button
          add
          onClick={() => setIsOpenAsidePhoto(true)}
          className={s.addBtn}
        >
          Добавить фото
        </Button>

        <DndContext
          onDragEnd={(e) => {
            dndHandlers(e, photoList, setPhotoList);
            saveNewPositionPhoto(e);
          }}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={photoList}
            strategy={verticalListSortingStrategy}
          >
            <ul className={s.list}>
              {photoList.map((item, i) => (
                <TickerItem key={item.id} {...{ item, i, deleteHandler }} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        <ul className={s.list}>
          {textList.map((item, i) => (
            <li key={item.id} className={s.item}>
              <span>{i + 1}</span>
              <p className={s.title}>{item.description}</p>
              <EditIcon onClick={() => editHandler(item.id)} />{' '}
            </li>
          ))}
        </ul>

        <Button
          save
          isLoading={btnLoadSubtitle}
          onClick={() => saveDescHandler()}
        >
          Сохранить
        </Button>

        <EditAside
          state={isOpenAsidePhoto}
          setState={setIsOpenAsidePhoto}
          title="Добавить логотип"
        >
          <FileInput
            label="Загрузка изображения"
            value={loadedImg}
            setValue={setLoadedImg}
          />
          <Separator className={s.separator} />
          <div className={s.buttons}>
            <Button
              save
              isLoading={btnLoading}
              onClick={() => imgHandlerPhoto('save')}
            >
              Сохранить
            </Button>
            <Button typeUI="border" onClick={() => imgHandlerPhoto('cancel')}>
              Отменить
            </Button>
          </div>
        </EditAside>

        <EditAside
          state={isOpenAsideDesc}
          setState={setIsOpenAsideDesc}
          title="Добавить логотип"
        >
          <TextInput
            label="1. Описание"
            className={s.descAside}
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          {editData.id > 1 ? null : (
            <TextInput
              label="1.2 Скрытое описание"
              value={editData.tooltip}
              onChange={(e) =>
                setEditData({ ...editData, tooltip: e.target.value })
              }
            />
          )}
          <h2 style={{ marginTop: 30 }}>Изменить цвет</h2>
          <ColorSelect
            state={editData.color}
            setState={(clr) => setEditData({ ...editData, color: clr })}
          />
          <Separator className={s.separator} />
          <div className={s.buttons}>
            <Button save isLoading={btnLoading} onClick={() => saveHandler()}>
              Сохранить
            </Button>
            <Button typeUI="border" onClick={() => setIsOpenAsideDesc(false)}>
              Отменить
            </Button>
          </div>
        </EditAside>
      </section>
    </>
  );
};

export default SupportGrants;
