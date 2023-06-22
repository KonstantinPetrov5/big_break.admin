import s from './TeachersGallery.module.sass';
import { useEffect, useState } from 'react';
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
import CategoryItem from '../FindStages/CategoryItem/CategoryItem.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import PhotosItem from '../FindPhotos/PhotosItem/PhotosItem.jsx';
import EditAside from '../../components/EditAside/EditAside.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';

const defaultDataCategory = {
  title: '',
};
const defaultDataPhotos = {
  image: '',
  video: '',
};

const TeachersGallery = () => {
  const [isOpenAsidePhoto, setIsOpenAsidePhoto] = useState(false);
  const [isOpenAsideCategory, setIsOpenAsideCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const [photoList, setPhotoList] = useState([]);

  const [editData, setEditData] = useState([]);

  const [isNew, setIsNew] = useState(true);
  const [activeTab, setActiveTab] = useState(null);

  const [type, setType] = useState('');
  console.log(photoList);

  useEffect(() => {
    if (activeTab !== null) {
      const currentCategory = categoryList.find((obj) => obj.id === activeTab);
      setPhotoList(currentCategory.items);
    }
  }, [activeTab]);

  useEffect(() => {
    const newList = categoryList.map((obj) => {
      if (obj.id === activeTab) {
        return { ...obj, items: photoList };
      } else {
        return obj;
      }
    });
    setCategoryList(newList);
  }, [photoList]); 

  useEffect(() => {
    axiosAuth('/teacher/gallery')
      .then(({ data }) => {
        setCategoryList(data.items);
        setPhotoList(data.items);
        setActiveTab(data.items[0].id);
      })
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setIsLoading(false));
  }, []);

  const addHandler = (type) => {
    setIsNew(true);
    if (type === 'category') {
      setEditData(defaultDataCategory);
      setIsOpenAsideCategory(true);
    }
    if (type === 'photo') {
      setEditData(defaultDataPhotos);
      setIsOpenAsidePhoto(true);
      setType('photo');
    }
    if (type === 'video') {
      setEditData(defaultDataPhotos);
      setIsOpenAsidePhoto(true);
      setType('video');
    }
  };

  const editHandler = (id, type) => {
    setIsNew(false);
    if (type === 'category') {
      setEditData(categoryList.find((obj) => obj.id === id));
      setIsOpenAsideCategory(true);
    }
    if (type === 'photo') {
      setEditData(stagesList.find((obj) => obj.id === id));
      setEditData(defaultDataPhotos);
    }
    if (type === 'video') {
      setEditData(stagesList.find((obj) => obj.id === id));
      setEditData(defaultDataPhotos);
    }
  };

  const saveHandler = (type) => {
    setBtnLoading(true);

    if (type === 'category') {
      if (isNew) {
        const queryData = {
          title: editData.title || null,
        };
        axiosAuth
          .post('/teacher/gallery/group/create', queryData)
          .then(({ data }) => {
            setCategoryList([data, ...categoryList]);
            toast.success('Данные сохранены');
          })
          .catch(() => toast.error('Произошла ошибка'))
          .finally(() => setBtnLoading(false));
      } else {
        const queryData = {
          id: editData.id,
          title: editData.title || null,
        };
        axiosAuth
          .put('/teacher/gallery/group/update', queryData)
          .then(() => {
            const newList = categoryList.map((obj) =>
              obj.id === editData.id ? editData : obj
            );
            setCategoryList(newList);
            toast.success('Данные сохранены');
          })
          .catch(() => toast.error('Произошла ошибка'))
          .finally(() => setBtnLoading(false));
      }
    }
    if (type === 'photo') {
      if (isNew) {
        const queryData = {
          group_id: activeTab,
          video: editData.video || null,
          image: editData.image || null,
        };
        axiosAuth
          .post('/teacher/gallery/item/create', queryData)
          .then(({ data }) => {
            setPhotoList([data, ...stagesList]);
            toast.success('Данные сохранены');
          })
          .catch(() => toast.error('Произошла ошибка'))
          .finally(() => setBtnLoading(false));
      } else {
        const queryData = {
          group_id: activeTab,
          video: editData.video || null,
          image: editData.image || null,
        };
        axiosAuth
          .put('/teacher/gallery/item/update', queryData)
          .then(() => {
            const newList = stagesList.map((obj) =>
              obj.id === editData.id ? editData : obj
            );
            setPhotoList(newList);
            toast.success('Данные сохранены');
          })
          .catch(() => toast.error('Произошла ошибка'))
          .finally(() => setBtnLoading(false));
      }
    }

    setIsOpenAsideCategory(false);
    setIsOpenAsidePhoto(false);
  };

  const deleteHandler = (id, type) => {
    if (type === 'category') {
      const isConfirm = window.confirm('Удалить категорию?');
      if (!isConfirm) return null;
      axiosAuth
        .delete('/teacher/gallery/group/delete', { data: { id } })
        .then(() => {
          setCategoryList(categoryList.filter((item) => item.id !== id));
          if (activeTab === id) {
            setActiveTab(
              categoryList[0].id !== id
                ? categoryList[0].id
                : categoryList[1].id
            );
          }
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'));
    }
    if (type === 'photo') {
      const isConfirm = window.confirm('Удалить фото?');
      if (!isConfirm) return null;
      axiosAuth
        .delete('/teacher/gallery/item/delete', { data: { id } })
        .then(() => {
          const newList = stagesList.filter((item) => item.id !== id);
          setPhotoList(newList);
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'));
    }
    if (type === 'video') {
      const isConfirm = window.confirm('Удалить видео?');
      if (!isConfirm) return null;
      axiosAuth
        .delete('/teacher/gallery/item/delete', { data: { id } })
        .then(() => {
          const newList = stagesList.filter((item) => item.id !== id);
          setPhotoList(newList);
          toast.success('Данные сохранены');
        })
        .catch(() => toast.error('Произошла ошибка'));
    }
  };

  const saveNewPosition = (e, type) => {
    const id = e.active.id;
    const new_position = e.over.data.current.sortable.index + 1;
    if (type === 'category') {
      axiosAuth
        .post('/teacher/gallery/group/position', { id, new_position })
        .then(() => toast.success('Данные сохранены'))
        .catch(() => toast.error('Произошла ошибка'));
    }
    if (type === 'photo') {
      axiosAuth
        .post('/teacher/gallery/item/position', { id, new_position })
        .then(() => toast.success('Данные сохранены'))
        .catch(() => toast.error('Произошла ошибка'));
    }
    if (type === 'video') {
      axiosAuth
        .post('/teacher/gallery/item/position', { id, new_position })
        .then(() => toast.success('Данные сохранены'))
        .catch(() => toast.error('Произошла ошибка'));
    }
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <section className={s.container}>
        <h1>Галерея</h1>

        <Button add onClick={() => addHandler('category')}>
          Добавить Категорию
        </Button>

        <div className={s.categoryContainer}>
          <DndContext
            onDragEnd={(e) => {
              dndHandlers(e, categoryList, setCategoryList);
              saveNewPosition(e, 'category');
            }}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={categoryList}
              strategy={verticalListSortingStrategy}
            >
              {categoryList.map(({ id, title }) => (
                <CategoryItem
                  key={id}
                  {...{
                    id,
                    title,
                    activeTab,
                    setActiveTab,
                    editHandler,
                    deleteHandler,
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className={s.addBtns}>
          <Button add onClick={() => addHandler('photo')}>
            <span>Добавить фото</span>
            <span>Фото</span>
          </Button>
          <Button add onClick={() => addHandler('video')}>
            <span>Добавить видео</span>
            <span>Видео</span>
          </Button>
        </div>

        <DndContext
          onDragEnd={(e) => {
            dndHandlers(e, photoList, setPhotoList);
            saveNewPosition(e);
          }}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={photoList}
            strategy={verticalListSortingStrategy}
          >
            <ul className={s.list}>
              {photoList.map((item, i) => (
                <PhotosItem key={item.id} {...{ item, i, deleteHandler }} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </section>

      <EditAside
        state={isOpenAsideCategory}
        setState={setIsOpenAsideCategory}
        title="Изменить название категории"
      >
        <TextInput
          label="Категория"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        />
        <Separator className={s.separator} />
        <div className={s.buttons}>
          <Button
            save
            isLoading={btnLoading}
            onClick={() => saveHandler('category')}
          >
            Сохранить
          </Button>
          <Button typeUI="border" onClick={() => setIsOpenAsideCategory(false)}>
            Отменить
          </Button>
        </div>
      </EditAside>

      <EditAside
        state={isOpenAsidePhoto}
        setState={setIsOpenAsidePhoto}
        title={type === 'photo' ? 'Добавить фото' : 'Добавить видео'}
      >
        <FileInput
          label={type === 'photo' ? 'Загрузка изображения' : 'Загрузка превью'}
          value={editData.image}
          setValue={(image) => setEditData({ ...editData, image })}
        />
        {type === 'video' && (
          <>
            <Separator className={s.separator} />
            <h2 className={s.videoTitle}>Загрузка видео</h2>
            <TextInput
              placeholder="Вставьте ссылку на видео"
              value={editData.video}
              onChange={(e) =>
                setEditData({ ...editData, video: e.target.value })
              }
            />
          </>
        )}
        <Separator className={s.separator} />
        <div className={s.buttons}>
          <Button
            save
            isLoading={btnLoading}
            onClick={() => saveHandler('photo')}
          >
            Сохранить
          </Button>
          <Button typeUI="border" onClick={() => setIsOpenAsidePhoto(false)}>
            Отменить
          </Button>
        </div>
      </EditAside>
    </>
  );
};

export default TeachersGallery;
