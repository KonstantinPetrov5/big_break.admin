import s from './SupportProjects.module.sass';
import { useState } from 'react';
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
import tickerLogoTest from '../../../public/assets/images/tickerLogoTest.jpg';
import testMainNews from '../../../public/assets/images/testMainNews.jpg';
import { axiosAuth } from '../../utils/axiosInstance.js';
import toast from 'react-hot-toast';
import EditAside from '../../components/EditAside/EditAside.jsx';
import FileInput from '../../components/ui/FileInput/FileInput.jsx';
import Separator from '../../components/ui/Separator/Separator.jsx';
import TextInput from '../../components/ui/TextInput/TextInput.jsx';
import TextAreaInput from '../../components/ui/TextAreaInput/TextAreaInput.jsx';

const testData = [
  {
    id: 1,
    title: 'Амбассадорская программа ВК',
    image: testMainNews,
    icon: tickerLogoTest,
    descCompany: '',
    subtitle: '',
    description:
      'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие',
  },
  {
    id: 2,
    title: 'Амбассадорская программа ВК',
    image: testMainNews,
    icon: tickerLogoTest,
    descCompany: '',
    subtitle: '',
    description:
      'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие',
  },
  {
    id: 3,
    title: 'Амбассадорская программа ВК',
    image: testMainNews,
    icon: tickerLogoTest,
    descCompany: '',
    subtitle: '',
    description:
      'Здесь ты можешь получить поддержку для реализации своих идей. Ведущие',
  },
];

const defaultData = {
    title: '',
    description: '',
    image: '',
}



const SupportProjects = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [list, setList] = useState(testData);

  const [editData, setEditData] = useState({});
  const [isNew, setIsNew] = useState(true);


  const addHandler = () => {
    setEditData(defaultData)
    setIsNew(true)
    setIsOpenAside(true)
}

  const editHandler = id => {
    setEditData(list.find(obj=>obj.id===id))
    setIsNew(false)
    setIsOpenAside(true)
}
  const deleteHandler = id => {
    const isConfirm = window.confirm('Удалить вызов?')
    if (!isConfirm) return null

    // axiosAuth.delete('/about/challenges/delete', { data: { id } })
    //     .then(()=> {
    //         setList(list.filter(item => item.id!==id))
    //         toast.success('Данные сохранены')
    //     })
    //     .catch(()=>toast.error('Произошла ошибка'))
}

const saveHandler = () => {
    setBtnLoadMember(true)

    if (isNew) {
        const queryData = {
            title: editData.title || null,
            description: editData.description || null,
            image: editData.image || null,
        }
        // axiosAuth.post('/about/challenges/create', queryData)
        //     .then(({data})=> {
        //         setList([ data, ...list ])
        //         toast.success('Данные сохранены')
        //     })
        //     .catch(()=>toast.error('Произошла ошибка'))
        //     .finally(()=>setBtnLoadMember(false))
    } else {
        const queryData = {
            id: editData.id,
            title: editData.title || null,
            description: editData.description || null,
            image: editData.image || null,
        }
        // axiosAuth.put('/about/challenges/update', queryData)
        //     .then(()=> {
        //         const newList = list.map( obj => obj.id===editData.id ? editData : obj )
        //         setList(newList)
        //         toast.success('Данные сохранены')
        //     })
        //     .catch(()=>toast.error('Произошла ошибка'))
        //     .finally(()=>setBtnLoadMember(false))
    }

    setIsOpenAside(false)
}

const saveNewPosition = e => {
    const id = e.active.id
    const new_position = e.over.data.current.sortable.index + 1
    // axiosAuth.post('about/challenges/position', { id, new_position })
    //     .then( () => toast.success('Данные сохранены') )
    //     .catch(()=>toast.error('Произошла ошибка'))
}

  if (isLoading) return <h1>Загрузка...</h1>;
  return (
    <>
      <h1>Партнерские проекты</h1>

      <Button className={s.btn} add onClick={() => setIsOpenAside(true)}>
        Добавить проект
      </Button>

      <ul className={s.list}>
        <DndContext
          onDragEnd={(e) => dndHandlers(e, list, setList)}
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
        <FileInput label="Загрузка логотипа" />
        <Separator className={s.separator} />
        <FileInput label="Загрузка фото" />
        <Separator className={s.separator} />
        <h1>Изменить заголовок</h1>
        <TextInput label="Заголовок" />
        <Separator className={s.separator} />
        <h1>Изменить описание компании</h1>
        <TextAreaInput label="Описание компании" minRows={2} />
        <Separator className={s.separator} />
        <h1>Изменить подзаголовок</h1>
        <TextInput label="Подзаголовок" />
        <Separator className={s.separator} />
        <h1>Изменить описание</h1>
        <TextAreaInput label="Описание" minRows={2} />
        <Separator className={s.separator} />
        <div className={s.buttons}>
          <Button save isLoading={btnLoading} onClick={()=>addHandler()}>
            Сохранить
          </Button>
          <Button typeUI="border">Отменить</Button>
        </div>
      </EditAside>
    </>
  );
};

export default SupportProjects;
