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
import AboutBanner from '../pages/AboutBanner/AboutBanner.jsx'
import AboutTicker from '../pages/AboutTicker/AboutTicker.jsx'
import AboutMembers from '../pages/AboutMembers/AboutMembers.jsx'
import AboutCalls from '../pages/AboutCalls/AboutCalls.jsx'
import AboutStages from '../pages/AboutStages/AboutStages.jsx'
import AboutGift from '../pages/AboutGift/AboutGift.jsx'
import AboutExperts from '../pages/AboutExperts/AboutExperts.jsx'
import AboutObservers from '../pages/AboutObservers/AboutObservers.jsx'
import AboutDirectorate from '../pages/AboutDirectorate/AboutDirectorate.jsx'
import AboutStories from '../pages/AboutStories/AboutStories.jsx'
import AboutPhotos from '../pages/AboutPhotos/AboutPhotos.jsx'


export const Router = createBrowserRouter([{
	path: '/',
	element: <App/>,
	children: [

		{ path: '/', element: <AuthGuard route={<Layout/>}/>, children: [
			{ path: 'main/banner',       element: <MainBanner/>       },
			{ path: 'main/ticker',       element: <MainTicker/>       },
			{ path: 'main/more',         element: <MainMore/>         },
			{ path: 'main/news',         element: <MainNews/>         },
			{ path: 'main/partners',     element: <MainPartners/>     },
			{ path: 'about/banner',      element: <AboutBanner/>      },
			{ path: 'about/ticker',      element: <AboutTicker/>      },
			{ path: 'about/members',     element: <AboutMembers/>     },
			{ path: 'about/calls',       element: <AboutCalls/>       },
			{ path: 'about/stages',      element: <AboutStages/>      },
			{ path: 'about/gift',        element: <AboutGift/>        },
			{ path: 'about/experts',     element: <AboutExperts/>     },
			{ path: 'about/observers',   element: <AboutObservers/>   },
			{ path: 'about/directorate', element: <AboutDirectorate/> },
			{ path: 'about/stories',     element: <AboutStories/>     },
			{ path: 'about/photos',      element: <AboutPhotos/>      },
		]},

		{ path: 'login', element: <Login/> },

	]
}])