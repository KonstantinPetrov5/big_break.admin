import s from './SupportTrips.module.sass';
import testMainNews from '../../../public/assets/images/testMainNews.jpg';
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg';
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
import CallsItem from '../FindCalls/CallsItem/CallsItem.jsx';
import EditAside from '../../components/EditAside/EditAside.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';
import SwitchInput from '../../components/ui/SwitchInput/SwitchInput.jsx';
import TickerItem from '../../components/TickerItem/TickerItem.jsx';

const testData = [
  {
    id: 1,
    title: 'Путешествие мечты',
    photos: [
      { image: testMainNews },
      { image: testMainNews },
      { image: testMainNews },
    ],
    image: tickerLogoTest,
    mapImg: testMainNews,
    videoLink: 'какая то ссылка на видео вк',
    description:
      '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из',
  },
  {
    id: 2,
    title: 'Путешествие мечты',
    photos: [
      { image: testMainNews },
      { image: testMainNews },
      { image: testMainNews },
    ],
    image: tickerLogoTest,
    mapImg: testMainNews,
    videoLink: 'какая то ссылка на видео вк',
    description:
      '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из',
  },
  {
    id: 3,
    title: 'Путешествие мечты',
    photos: [
      { image: testMainNews },
      { image: testMainNews },
      { image: testMainNews },
    ],
    image: tickerLogoTest,
    mapImg: testMainNews,
    videoLink: 'какая то ссылка на видео вк',
    description:
      '100 руководителей и лидеров региональных лиг клубов «Большой перемены» из',
  },
];

const defaultData = {
  title: '',
  description: '',
  subtitle: '',
  content: '',
  link: '',
};

// icon должен называться image, потому что в CallsItem он уже называется image
// следовательно сами картинки надо назвать как нить по другому, типо photos

// В асайде, в случае выбора "фото" появляется список с днд, пока он просто кинут на прямую, для примера
// потом есть 2 варианта, либо создать отдельный стейт, где будет храниться этот массив, отдельно, от editData
// либо хранить его прямо внутри editData, но сделать кастомную функцию dndHandlers

const switchData = [
  { label: 'Фото', value: 'img' },
  { label: 'Видео', value: 'video' },
];

const SupportTrips = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [list, setList] = useState(testData);

  const [switchPos, setSwitchPos] = useState(switchData[0].value);
  const [editData, setEditData] = useState({});
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    // axiosAuth('/support/projects')
    //   .then(({ data }) => setList(data.items))
    //   .catch(() => toast.error('Произошла ошибка'))
    //   .finally(() => setIsLoading(false));
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
        images: [
          {
            image: editData.image || null,
          },
        ],
      };
      axiosAuth;
      // .post('/support/projects/create', queryData)
      // .then(({ data }) => {
      //   setList([data, ...list]);
      //   toast.success('Данные сохранены');
      // })
      // .catch(() => toast.error('Произошла ошибка'))
      // .finally(() => setBtnLoading(false));
    } else {
      const queryData = {
        id: editData.id,
        title: editData.title || null,
        subtitle: editData.subtitle || null,
        content: editData.content || null,
        description: editData.description || null,
        images: [
          {
            image: editData.image || null,
          },
        ],
      };
      //   axiosAuth
      //     .put('/support/projects/update', queryData)
      //     .then(() => {
      //       const newList = list.map((obj) =>
      //         obj.id === editData.id ? editData : obj
      //       );
      //       setList(newList);
      //       toast.success('Данные сохранены');
      //     })
      //     .catch(() => toast.error('Произошла ошибка'))
      //     .finally(() => setBtnLoading(false));
    }

    setIsOpenAside(false);
  };

  const deleteHandler = (id) => {
    const isConfirm = window.confirm('Удалить вызов?');
    if (!isConfirm) return null;

    // axiosAuth
    //   .delete('/support/projects/delete', { data: { id } })
    //   .then(() => {
    //     setList(list.filter((item) => item.id !== id));
    //     toast.success('Данные сохранены');
    //   })
    //   .catch(() => toast.error('Произошла ошибка'));
  };

  const saveNewPosition = (e) => {
    // const id = e.active.id;
    // const new_position = e.over.data.current.sortable.index + 1;
    // axiosAuth
    //   .post('/support/projects/position', { id, new_position })
    //   .then(() => toast.success('Данные сохранены'))
    //   .catch(() => toast.error('Произошла ошибка'));
  };

  if (isLoading) return <h1>Загрузка...</h1>

  return (
    <>
      <h1>Путешествия с большой переменой</h1>

      <Button className={s.btn} add onClick={() => setIsOpenAside(true)}>
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
              <CallsItem
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
              placeholder="Вставьте ссылку на видео"
              value={editData.video}
              onChange={(e) =>
                setEditData({ ...editData, video: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <FileInput
              label="Загрузка фото"
              value={editData.image}
              setValue={(image) => setEditData({ ...editData, image })}
            />
            <DndContext
              onDragEnd={(e) => dndHandlers(e, list, setList)}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                items={list}
                strategy={verticalListSortingStrategy}
              >
                <ul className={s.list}>
                  {list[0].photos.map((item, i) => (
                    <TickerItem key={i} {...{ item, i, deleteHandler }} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </>
        )}
        <Separator className={s.separator} />
        <FileInput label="Загрузка карты" />
        <Separator className={s.separator} />
        <h1>Изменить заголовок</h1>
        <TextInput
          label="Заголовок"
          value={editData.title}
          setValue={(title) => setEditData({ ...editData, title })}
        />
        <Separator className={s.separator} />
        <h1>Изменить описание</h1>
        <TextAreaInput
          label="Описание"
          minRows={2}
          value={editData.description}
          setValue={(description) => setEditData({ ...editData, description })}
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
