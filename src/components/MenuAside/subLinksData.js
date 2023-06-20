export const subLinksData = [
    {
        id: '1',
        label: 'Главная',
        isGroup: false,
        list: [
            { id: '2', icon: 'banner',   link: 'main/banner',   label: 'Баннер' },
            { id: '3', icon: 'ticker',   link: 'main/ticker',   label: 'Бегущая строка' },
            { id: '4', icon: 'cup',      link: 'main/more',     label: 'Подробнее о конкурсе' },
            { id: '5', icon: 'news',     link: 'main/news',     label: 'Новости' },
            { id: '6', icon: 'partners', link: 'main/partners', label: 'Партнеры' },
        ]
    },
    {
        id: '7',
        label: 'О конкурсе',
        isGroup: true,
        list: [
            {
                id: '8',
                label: 'Найди себя',
                list: [
                    { id: '9',  icon: 'banner',              link: 'about/find/banner',      label: 'Баннер' },
                    { id: '10', icon: 'ticker',              link: 'about/find/ticker',      label: 'Бегущая строка' },
                    { id: '11', icon: 'members',             link: 'about/find/members',     label: 'Участники' },
                    { id: '12', icon: 'calls',               link: 'about/find/calls',       label: 'Вызовы' },
                    { id: '13', icon: 'stages',              link: 'about/find/stages',      label: 'Этапы конкурса' },
                    { id: '14', icon: 'gift',                link: 'about/find/gift',        label: 'Призовой фонд' },
                    { id: '15', icon: 'expertCouncil',       link: 'about/find/experts',     label: 'Экспертный совет' },
                    { id: '16', icon: 'supervisoryBoard',    link: 'about/find/observers',   label: 'Наблюдательный совет' },
                    { id: '17', icon: 'childrenDirectorate', link: 'about/find/directorate', label: 'Детская дирекция' },
                    { id: '18', icon: 'successStories',      link: 'about/find/stories',     label: 'Истории успеха' },
                    { id: '19', icon: 'photos',              link: 'about/find/photos',      label: 'Фотогалерея' },
                ]
            },
            {
                id: '20',
                label: 'Получи поддержку',
                list: [
                    { id: '21', icon: 'banner',              link: 'about/support/banner',   label: 'Баннер' },
                    { id: '22', icon: 'award',               link: 'about/support/grants',   label: 'Росмолодеж гранты' },
                    { id: '23', icon: 'handshake',           link: 'about/support/projects', label: 'Партнерские проекты' },
                    { id: '24', icon: 'select',              link: 'about/support/sta1',     label: 'СТА 1' },
                    { id: '25', icon: 'note',                link: 'about/support/music',    label: 'Большая перемена музыка' },
                    { id: '26', icon: 'globe',               link: 'about/support/trips',    label: 'Путешествия с большой переменой' },
                    { id: '27', icon: 'select',              link: 'about/support/sta2',     label: 'СТА 2' }
                ]
            },
            {
                id: '28',
                label: 'Найди наставника',
                list: [
                    { id: '29', icon: 'banner',              link: 'about/mentor/banner',    label: 'Баннер' },
                    { id: '30', icon: 'school',              link: 'about/mentor/school',    label: 'Измени свою школу' }
                ]
            }
        ]
    },
    {
        id: '31',
        label: 'Для педагогов',
        isGroup: false,
        list: [
            { id: '32', icon: 'banner', link: 'teachers/banner',  label: 'Баннер' },
            { id: '33', icon: 'desc',   link: 'teachers/desc',    label: 'Описание' },
            { id: '34', icon: 'keys',   link: 'teachers/club',    label: 'Как открыть клуб большой перемены' },
            { id: '35', icon: 'books',  link: 'teachers/room',    label: 'Учительская большой перемены' },
            { id: '36', icon: 'photos', link: 'teachers/gallery', label: 'Галерея' },
            { id: '37', icon: 'select', link: 'teachers/sta',     label: 'СТА' },
        ]
    }
]