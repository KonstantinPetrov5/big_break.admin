import s from './MentorSchool.module.sass';
import { useState, useEffect } from 'react';
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
import SchoolItem from './SchoolItem/SchoolItem.jsx';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import EditAside from '../../components/EditAside/EditAside.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import TickerItemSecond from '../../components/TickerItem/TickerItemSecond.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

const defaultData = {
  title: '',
  description: '',
  subtitle: '',
  images: [],
};

const MentorSchool = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // tyt change
  const [btnLoading, setBtnLoading] = useState(false);

  const [btnLoadSubtitle, setBtnLoadSubtitle] = useState(false);

  const [list, setList] = useState([]);
  const [description, setDescription] = useState('');

  const [editData, setEditData] = useState(defaultData);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    axiosAuth('/mentor/school')
      .then(({ data }) => {
        setList(data.items);
        setDescription(data.description);
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  const editHandler = (id) => {
    setEditData(list.find((obj) => obj.id === id));
    setIsNew(false);
    setIsOpenAside(true);
  };

  const addHandler = () => {
    setEditData(defaultData);
    setIsNew(true);
    setIsOpenAside(true);
  };

  const saveDescHandler = () => {
    setBtnLoadSubtitle(true);
    axiosAuth
      .put('/mentor/school/desc', { description })
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setBtnLoadSubtitle(false));
  };

  const saveHandler = () => {
    setBtnLoading(true);

    if (isNew) {
      const queryData = {
        title: editData.title || null,
        description: editData.description || null,
        subtitle: editData.subtitle || null,
        images: editData.images || [],
      };
      axiosAuth
        .post('/mentor/school/create', queryData)
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
        subtitle: editData.subtitle || null,
        images: editData.images || [],
      };
      axiosAuth
        .put('/mentor/school/update', queryData)
        .then(() => {
          const newList = list.map((obj) =>
            obj.id === editData.id ? editData : obj
          );
          setList(newList);
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'))
        .finally(() => setBtnLoading(false));
    }
    setIsOpenAside(false);
  };

  const customDndHandlers = (e) => {
    const oldIndex = editData.images.findIndex(({ id }) => id === e.active.id);
    const newIndex = editData.images.findIndex(({ id }) => id === e.over.id);
    const newList = arrayMove(editData.images, oldIndex, newIndex);
    setEditData({ ...editData, images: newList });
  };

  const deleteTickerHandler = (id) => {
    const currentImage = editData.images.find((item) => item.id === id);

    const isLink = currentImage.image.startsWith('https://');

    if (isLink) {
      axiosAuth
        .delete('/mentor/school/image/delete', { data: { id } })
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

  const deleteHandler = (id) => {
    const isConfirm = window.confirm('Удалить вызов?');
    if (!isConfirm) return null;

    axiosAuth
      .delete('/mentor/school/delete', { data: { id } })
      .then(() => {
        setList(list.filter((item) => item.id !== id));
        toast.success('Данные сохранены');
      })
      .catch(() => toast.error('Произошла ошибка'));
  };

  const saveNewPosition = (e) => {
    const id = e.active.id;
    const new_position = e.over.data.current.sortable.index + 1;
    axiosAuth
      .post('/mentor/school/position', { id, new_position })
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'));
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <h1>Измени свою школу</h1>

      <TextAreaInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Заголовок"
        placeholder="Введите текст"
        minRows={2}
        className={s.descInput}
      />

      <Button
        save
        className={s.saveBtn}
        isLoading={btnLoadSubtitle}
        onClick={() => saveDescHandler()}
      >
        Сохранить
      </Button>

      <Button add className={s.addBtn} onClick={() => addHandler()}>
        Добавить
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
              <SchoolItem
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
        <Separator className={s.separator} />
        <h1>Изменить заголовок</h1>
        <TextInput
          label="Заголовок"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        />
        <Separator className={s.separator} />
        <h1>Изменить подзаголовок</h1>
        <TextInput
          label="Подзаголовок"
          value={editData.subtitle}
          onChange={(e) =>
            setEditData({ ...editData, subtitle: e.target.value })
          }
        />
        <Separator className={s.separator} />
        <h1>Изменить текст</h1>
        <TextAreaInput
          label="Текст"
          minRows={2}
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
        />
        <Separator className={s.separator} />
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

export default MentorSchool;
