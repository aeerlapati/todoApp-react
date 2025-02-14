import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Welcome,{postsLoader} from './routes/Welcome.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import NewPost, {submitPosts} from './routes/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path:'/', 
    element:<RootLayout />, 
    children: [
        {path:'/', 
        element:<Welcome />, 
        loader: postsLoader
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
