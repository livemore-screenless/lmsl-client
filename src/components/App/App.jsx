import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//head + foot
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import SubNav from '../SubNav/SubNav';


//pages
import AboutPage from '../AboutPage/AboutPage';
import ArchivedPrompts from '../ArchivedPrompts/ArchivedPrompts';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import MyVideos from '../MyVideos/MyVideos';
import RegisterPage from '../RegisterPage/RegisterPage';
import ReviewSubmissions from '../ReviewSubmissions/ReviewSubmissions';
import PromptEdit from '../PromptEdit/PromptEdit';
import PromptPage from '../PromptPage/PromptPage';
import PromptVideos from '../PromptVideos/PromptVideos';
import VideoItem from '../VideoItem/VideoItem';
import AddPrompts from '../AddPrompts/AddPrompts';


import WebcamUpload from '../VideoUpload/WebcamUpload';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserUploadPage from '../VideoUpload/UserUploadPage';

//style
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <SubNav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/prompt-page"
          >
            <PromptPage />
          </ProtectedRoute>


          <ProtectedRoute
            exact
            path="/prompt-edit"
          >
            <PromptEdit />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact
            path="/edit-page"
          >
            <AddPrompts />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/prompt-videos/:id"
          >
            <PromptVideos />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/prompt-videos/:id/:videoId"
          >
            <VideoItem />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/prompt-page" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/prompt-page" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
              <LandingPage /> 
          </Route>

          <Route
            exact
            path="/prompt-page"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/prompt-page" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/my-videos"
          >
            <MyVideos />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/user-upload/:id"
            >

            <UserUploadPage />
          </ProtectedRoute>

          
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/review-submissions"
          >
            {!user.admin  ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/my-videos" />
              :
              // Otherwise, show the registration page
              <ReviewSubmissions />
            }
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/archive"
          >
            {!user.admin  ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/my-videos" />
              :
              // Otherwise, show the registration page
              <ArchivedPrompts />
            }
          </ProtectedRoute>


          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
