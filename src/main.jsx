import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error/ErrorPage.jsx'
import RTE from './components/RTE.jsx'
import BlogForm from './components/blogform/BlogForm.jsx'
import SignupPage from './pages/Signup.jsx'
import LoginPage from './pages/Login.jsx'
import AddPostPage from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        )

      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        )
      },
      {
        path: "/allposts",
        element: (
          <Protected authentication>
            <AllPost />
          </Protected>
        )

      },
      {
        path: "/addpost",
        element: (
          <Protected authentication>
            <AddPostPage />
          </Protected>)
      },
      {
        path: "/editpost/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>)
      }, {
        path: "post/:slug",
        element: (
          <Protected authentication>
            <Post />
          </Protected>)
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
