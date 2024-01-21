import './styles/reset.scss'
import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
// import ContactPage from './pages/contact';
import BookDetailPage from './pages/bookDetail';
// import AdminPage from './pages/admin';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RegisterPage from './pages/register';
import NotFound from './components/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';
// import LayoutAdmin from './components/Admin/LayoutAdmin';
// import ManageUser from './pages/manageUser';
// import ManageBookPage from './pages/manageBook';
// import OrderPage from './pages/order';
// import HistoryPage from './components/Order/History';
// import ManageOrderPage from './pages/manageOrder';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='layout-app'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}

export default function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      // {
      //   path: "contact",
      //   element: <ContactPage />,
      // },
      {
        path: "book/:slug",
        element: <BookDetailPage />,
      },
      // {
      //   path: "order",
      //   element: <OrderPage />,
      // },
      // {
      //   path: "history",
      //   element: <HistoryPage />,
      // },
    ],
    
  },
  // {
  //   path: "/admin",
  //   element: <LayoutAdmin />,
  //   errorElement: <NotFound />,
  //   children: [
  //     {
  //       index: true, element:
  //         <ProtectedRoute>
  //           <AdminPage />
  //         </ProtectedRoute>
  //     },
  //     {
  //       path: "user",
  //       element: <ManageUser />,
  //     },
  //     {
  //       path: "book",
  //       element: <ManageBookPage />,
  //     },
  //     {
  //       path: "order",
  //       element: <ManageOrderPage />,
  //     },
  //   ],
    
  // },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
