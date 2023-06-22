import {createBrowserRouter} from 'react-router-dom'
import App from '../App.jsx'
import Layout from '../pages/Layout/Layout.jsx'
import Login from '../pages/Login/Login.jsx'
import {AuthGuard} from './AuthGuard.jsx'
import MainBanner from '../pages/MainBanner/MainBanner.jsx'
import MainTicker from '../pages/MainTicker/MainTicker.jsx'
import MainMore from '../pages/MainMore/MainMore.jsx'
import MainNews from '../pages/MainNews/MainNews.jsx'
import MainPartners from '../pages/MainPartners/MainPartners.jsx'
import FindBanner from '../pages/FindBanner/FindBanner.jsx'
import FindTicker from '../pages/FindTicker/FindTicker.jsx'
import FindMembers from '../pages/FindMembers/FindMembers.jsx'
import FindCalls from '../pages/FindCalls/FindCalls.jsx'
import FindStages from '../pages/FindStages/FindStages.jsx'
import FindGift from '../pages/FindGift/FindGift.jsx'
import FindExperts from '../pages/FindExperts/FindExperts.jsx'
import FindObservers from '../pages/FindObservers/FindObservers.jsx'
import FindDirectorate from '../pages/FindDirectorate/FindDirectorate.jsx'
import FindStories from '../pages/FindStories/FindStories.jsx'
import FindPhotos from '../pages/FindPhotos/FindPhotos.jsx'
import TeachersBanner from '../pages/TeachersBanner/TeachersBanner.jsx'
import TeachersDesc from '../pages/TeachersDesc/TeachersDesc.jsx'
import TeachersClub from '../pages/TeachersClub/TeachersClub.jsx'
import TeachersRoom from '../pages/TeachersRoom/TeachersRoom.jsx'
import TeachersGallery from '../pages/TeachersGallery/TeachersGallery.jsx'
import TeachersSta from '../pages/TeachersSta/TeachersSta.jsx'
import SupportBanner from '../pages/SupportBanner/SupportBanner.jsx'
import SupportGrants from '../pages/SupportGrants/SupportGrants.jsx'
import SupportProjects from '../pages/SupportProjects/SupportProjects.jsx'
import SupportSta1 from '../pages/SupportSta1/SupportSta1.jsx'
import SupportMusic from '../pages/SupportMusic/SupportMusic.jsx'
import SupportTrips from '../pages/SupportTrips/SupportTrips.jsx'
import SupportSta2 from '../pages/SupportSta2/SupportSta2.jsx'
import MentorBanner from '../pages/MentorBanner/MentorBanner.jsx'
import MentorSchool from '../pages/MentorSchool/MentorSchool.jsx'


export const Router = createBrowserRouter([{
	path: '/',
	element: <App/>,
	children: [

		{ path: '/', element: <AuthGuard route={<Layout/>}/>, children: [
			{ path: 'main/banner',            element: <MainBanner/>      },
			{ path: 'main/ticker',            element: <MainTicker/>      },
			{ path: 'main/more',              element: <MainMore/>        },
			{ path: 'main/news',              element: <MainNews/>        },
			{ path: 'main/partners',          element: <MainPartners/>    },

			{ path: 'about/find/banner',      element: <FindBanner/>      },
			{ path: 'about/find/ticker',      element: <FindTicker/>      },
			{ path: 'about/find/members',     element: <FindMembers/>     },
			{ path: 'about/find/calls',       element: <FindCalls/>       },
			{ path: 'about/find/stages',      element: <FindStages/>      },
			{ path: 'about/find/gift',        element: <FindGift/>        },
			{ path: 'about/find/experts',     element: <FindExperts/>     },
			{ path: 'about/find/observers',   element: <FindObservers/>   },
			{ path: 'about/find/directorate', element: <FindDirectorate/> },
			{ path: 'about/find/stories',     element: <FindStories/>     },
			{ path: 'about/find/photos',      element: <FindPhotos/>      },

			{ path: 'about/support/banner',   element: <SupportBanner/>   },
			{ path: 'about/support/grants',   element: <SupportGrants/>   }, 
			{ path: 'about/support/projects', element: <SupportProjects/> },	// halfready
			{ path: 'about/support/sta1',     element: <SupportSta1/>     },	
			{ path: 'about/support/music',    element: <SupportMusic/>    }, 
			{ path: 'about/support/trips',    element: <SupportTrips/>    }, // halfready The selected id is invalid
			{ path: 'about/support/sta2',     element: <SupportSta2/>     }, 

			{ path: 'about/mentor/banner',    element: <MentorBanner/>    },
			{ path: 'about/mentor/school',    element: <MentorSchool/>    }, // halfready id по порядку идту в картинках

			{ path: 'teachers/banner',        element: <TeachersBanner/>  }, 
			{ path: 'teachers/desc',          element: <TeachersDesc/>    },
			{ path: 'teachers/club',          element: <TeachersClub/>    },
			{ path: 'teachers/room',          element: <TeachersRoom/>    }, 
			{ path: 'teachers/gallery',       element: <TeachersGallery/> }, // halfready
			{ path: 'teachers/sta',           element: <TeachersSta/>     },
		]},

		{ path: 'login', element: <Login/> },

	]
}])