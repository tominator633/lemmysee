import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from "./router/router";



export default function App(): React.ReactElement {
  return (
    <RouterProvider router={appRouter} />
  );
}


