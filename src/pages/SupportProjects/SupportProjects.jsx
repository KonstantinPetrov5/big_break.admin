import s from './SupportProjects.module.sass';
import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button/Button.jsx';
import { DndContext } from '@dnd-kit/core';
import { dndHandlers } from '../../utils/dndHandlers.js';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ExpertsItem from '../FindExperts/ExpertsItem/ExpertsItem.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';
import EditAside from '../../components/EditAside/EditAside.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import TickerItem from '../../components/TickerItem/TickerItem.jsx';

const defaultData = {
  title: '',
  description: '',
  subtitle: '',
  content: '',
  link: '',
};

const SupportProjects = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [list, setList] = useState([]);
  const [listImages, setListImages] = useState([]);

  const [editData, setEditData] = useState({});
  const [isNew, setIsNew] = useState(true);

  console.log(listImages);

  useEffect(() => {
    const extractedImages = list.map((item) => item.images);
    setListImages(extractedImages);
  }, [list]);

  useEffect(() => {
    axiosAuth('/support/projects')
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
    setIsNew(false);
    setIsOpenAside(true);
  };

  const saveHandler = () => {
    setBtnLoading(true);

    if (isNew) {
      const queryData = {
        title: editData.title || null,
        description: editData.description || null,
        subtitle: editData.subtitle || null,
        content: editData.content || null,
        link: editData.link || null,
        icon: editData.icon || null,
        images: listImages || null,
      };
      console.log(queryData);
      // axiosAuth
      //   .post('/support/projects/create', queryData)
      //   .then(({ data }) => {
      //     setList([data, ...list]);
      //     toast.success('Данные сохранены');
      //   })
      //   .catch(() => toast.error('Произошла ошибка'))
      //   .finally(() => setBtnLoading(false));
    } else {
      const queryData = {
        id: editData.id,
        title: editData.title || null,
        subtitle: editData.subtitle || null,
        content: editData.content || null,
        description: editData.description || null,
        images: listImages || null,
      };
      console.log(queryData);
      // axiosAuth
      //   .put('/support/projects/update', queryData)
      //   .then(() => {
      //     const newList = list.map((obj) =>
      //       obj.id === editData.id ? editData : obj
      //     );
      //     setList(newList);
      //     toast.success('Данные сохранены');
      //   })
      //   .catch(() => toast.error('Произошла ошибка'))
      //   .finally(() => setBtnLoading(false));
    }

    setIsOpenAside(false);
  };

  const deleteHandler = (id) => {
    const isConfirm = window.confirm('Удалить вызов?');
    if (!isConfirm) return null;

    axiosAuth
      .delete('/support/projects/delete', { data: { id } })
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
      .post('/support/projects/position', { id, new_position })
      .then(() => toast.success('Данные сохранены'))
      .catch(() => toast.error('Произошла ошибка'));
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <h1>Партнерские проекты</h1>

      <Button className={s.btn} add onClick={() => addHandler()}>
        Добавить проект
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
              <ExpertsItem
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
        title="Изменить логотип"
      >
        <FileInput
          label="Загрузка логотипа"
          value={editData.icon}
          setValue={(icon) => setEditData({ ...editData, icon })}
        />
        <Separator className={s.separator} />
        <FileInput label="Загрузка фото" />
        <DndContext
          onDragEnd={(e) => dndHandlers(e, listImages, setListImages)}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={listImages}
            strategy={verticalListSortingStrategy}
          >
            <ul className={s.list}>
              {[listImages].map((item, i) => (
                <TickerItem key={i} {...{ item, i, deleteHandler }} />
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
        <h1>Изменить описание компании</h1>
        <TextAreaInput
          label="Описание компании"
          minRows={2}
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
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
        <h1>Изменить описание</h1>
        <TextAreaInput
          label="Описание"
          minRows={2}
          value={editData.content}
          onChange={(e) =>
            setEditData({ ...editData, content: e.target.value })
          }
        />
        <Separator className={s.separator} />
        <h1>Укажите ссылку</h1>
        <TextAreaInput
          label="Ссылка"
          minRows={2}
          value={editData.link}
          onChange={(e) => setEditData({ ...editData, link: e.target.value })}
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

export default SupportProjects;
