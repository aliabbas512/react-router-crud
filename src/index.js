import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import ErrorPage from './error';
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, {action as editAction} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Main from "./routes/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage/>,
        loader: rootLoader,
        action: rootAction,
        children: [
          {
            errorElement: <ErrorPage/>,
            children: [
              { index: true, element: <Main/> },
              {
                path: "contacts/:contactId",
                element: <Contact/>,
                loader: contactLoader,
                action: contactAction,
              },
              {
                path: "contacts/:contactId/edit",
                element: <EditContact/>,
                loader: contactLoader,
                action: editAction,
              },
              {
                path: "contact/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>
              },
            ],
          },
        ],
      },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
