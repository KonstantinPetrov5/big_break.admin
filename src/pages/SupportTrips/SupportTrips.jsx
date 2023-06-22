import s from './SupportTrips.module.sass';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button/Button.jsx';
import { DndContext } from '@dnd-kit/core';
import { dndHandlers } from '../../utils/dndHandlers.js';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CallsItem from '../FindCalls/CallsItem/CallsItem.jsx';
import EditAside from '../../components/EditAside/EditAside.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx';
import TickerItemSecond from '../../components/TickerItem/TickerItemSecond.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import TripsItem from './TripsItem/TripsItem.jsx';

const defaultData = {
  title: '',
  description: '',
  video: '',
  is_video: false,
  images: [],
  icon: '',
  map: '',
};

const switchData = [
  { label: 'Фото', value: 'img' },
  { label: 'Видео', value: 'video' },
];

const SupportTrips = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [list, setList] = useState([]);

  const [switchPos, setSwitchPos] = useState(switchData[0].value);
  const [editData, setEditData] = useState(defaultData);
  const [isNew, setIsNew] = useState(true);
console.log( editData.video )
  useEffect(() => {
    axiosAuth('/support/travel')
      .then(({ data }) => setList(data.items))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axiosAuth('/support/travel')
      .then(({ data }) => setList(data.items))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  const addHandler = () => {
    setEditData(defaultData);
    setIsNew(true);
    setIsOpenAside(true);
  };

  const editHandler = (id) => {
    setEditData(list.find((obj) => obj.id === id));
    setSwitchPos(list.find((obj) => obj.id === id).is_video ? 'video' : 'img');
    setIsNew(false);
    setIsOpenAside(true);
  };
  console.log(editData)
  const saveHandler = () => {
    setBtnLoading(true);

    if (isNew) {
      const queryData = {
        title: editData.title || null,
        description: editData.description || null,
        video: editData.video || null,
        is_video: switchPos === 'video',
        images: editData.images || [],
        icon: editData.icon || null,
        map: editData.map || null,
      };
      axiosAuth
        .post('/support/travel/create', queryData)
        .then(({ data }) => {
          setList([data, ...list]);
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'))
        .finally(() => setBtnLoading(false));
    } else {
      const queryData = {
        id: editData.id,
        title: editData.title || null,
        description: editData.description || null,
        video: editData.video || null,
        is_video: switchPos === 'video',
        images: editData.images || [],
        icon: editData.icon || null,
        map: editData.map || null,
      };
      axiosAuth
        .put('/support/travel/update', queryData)
        .then(() => {
          const newList = list.map((obj) =>
            obj.id === editData.id
              ? { ...editData, is_video: switchPos === 'video' }
              : obj
          );
          setList(newList);
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'))
        .finally(() => setBtnLoading(false));
    }

    setIsOpenAside(false);
  };

  const deleteHandler = (id) => {
    const isConfirm = window.confirm('Удалить путешествие?');
    if (!isConfirm) return null;

    axiosAuth
      .delete('/support/travel/delete', { data: { id } })
      .then(() => {
        setList(list.filter((item) => item.id !== id));
        toast.success('Данные сохранены');
      })
      .catch(() => toast.error('Произошла ошибка'));
  };

  const deleteTickerHandler = (id) => {
    const currentImage = editData.images.find((item) => item.id === id);

    const isLink = currentImage.image.startsWith('https://');

    if (isLink) {
      axiosAuth
        .delete('/support/travel/image/delete', { data: { id } })
        .then(() => {
          const images = editData.images.filter((item) => item.id !== id);
          setEditData({ ...editData, images });
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'));
    } else {
      const images = editData.images.filter((item) => item.id !== id);
      setEditData({ ...editData, images });
      toast.success('Данные сохранены');
    }
  };

  const customDndHandlers = (e) => {
    const oldIndex = editData.images.findIndex(({ id }) => id === e.active.id);
    const newIndex = editData.images.findIndex(({ id }) => id === e.over.id);
    const newList = arrayMove(editData.images, oldIndex, newIndex);
    setEditData({ ...editData, images: newList });
  };

  const saveNewPosition = (e) => {
    const id = e.active.id;
    const new_position = e.over.data.current.sortable.index + 1;
    axiosAuth
      .post('/support/travel/position', { id, new_position })
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'));
  };

  const customDndHandler = (e) => {
    // const oldIndex = list.findIndex( ({id}) => id===e.active.id)
    // const newIndex = list.findIndex( ({id}) => id===e.over.id)
    // const newList = arrayMove(list, oldIndex, newIndex)
    // setList(newList)
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <h1>Путешествия с большой переменой</h1>

      <Button className={s.btn} add onClick={() => addHandler()}>
        Добавить путешествиe
      </Button>

      <ul className={s.list}>
        <DndContext
          onDragEnd={(e) => {
            dndHandlers(e, list, setList);
            saveNewPosition(e);
          }}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={list} strategy={verticalListSortingStrategy}>
            {list.map((item, i) => (
              <TripsItem
                key={item.id}
                {...{ item, i, editHandler, deleteHandler }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>

      <EditAside
        state={isOpenAside}
        setState={setIsOpenAside}
        title="Редактирование"
      >
        <SwitchInput
          className={s.switch}
          tabs={switchData}
          value={switchPos}
          name="bannerSwitch"
          onChange={(e) => setSwitchPos(e.target.value)}
        />
        {switchPos === 'video' ? (
          <>
            <h1>Загрузка видео</h1>
            <TextInput
              value={editData.video}
              onChange={(e) =>
                setEditData({ ...editData, video: e.target.value })
              }
              placeholder="Вставьте ссылку на видео"
            />
          </>
        ) : (
          <>
            <FileInput
              label="Загрузка фото"
              setValue={(image) =>
                setEditData({
                  ...editData,
                  images: [{ id: nanoid(), image }, ...editData.images],
                })
              }
            />
            <DndContext
              onDragEnd={(e) => customDndHandlers(e)}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                items={editData.images}
                strategy={verticalListSortingStrategy}
              >
                <ul className={s.list}>
                  {editData.images.map((item, i) => (
                    <TickerItemSecond
                      key={item.id}
                      {...{ item, i, deleteTickerHandler }}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </>
        )}
        <Separator className={s.separator} />
        <FileInput
          label="Загрузка карты"
          value={editData.map}
          setValue={(map) => setEditData({ ...editData, map })}
        />
        <Separator className={s.separator} />
        <FileInput
          label="Загрузка иконки"
          value={editData.icon}
          setValue={(icon) => setEditData({ ...editData, icon })}
        />
        <Separator className={s.separator} />
        <h1>Изменить заголовок</h1>
        <TextInput
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          label="Заголовок"
        />
        <Separator className={s.separator} />
        <h1>Изменить описание</h1>
        <TextAreaInput
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          label="Описание"
          minRows={2}
        />
        <div className={s.buttons}>
          <Button save isLoading={btnLoading} onClick={() => saveHandler()}>
            Сохранить
          </Button>
          <Button typeUI="border" onClick={() => setIsOpenAside(false)}>
            Отменить
          </Button>
        </div>
      </EditAside>
    </>
  );
};

export default SupportTrips;
