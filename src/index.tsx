import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './routes';
import { defaultTheme, OrbitProvider } from '@kiwicom/orbit-components';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <OrbitProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </OrbitProvider>
  </React.StrictMode>
);
