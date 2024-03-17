import "./styles/reset.scss";
import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useLocation,
    useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
// import ContactPage from './pages/contact';
import BookDetailPage from "./pages/bookDetail";
import DashboardPage from "./pages/manageDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import NotFound from "./components/NotFound";
import { useDispatch, useSelector } from "react-redux";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import ManageUser from "./pages/manageUser";
import ManageBookPage from "./pages/manageBook";
import OrderPage from "./pages/order";
import HistoryPage from "./components/History";
import ManageOrderPage from "./pages/manageOrder";
import { jwtDecode } from "jwt-decode";
import { getUserInfoRequest, logoutRequest } from "./redux/slicers/auth.slice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import ProductList from "./components/ProductList";
import { notification } from "antd";

dayjs.locale("vi");
dayjs.extend(relativeTime);

const Layout = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo.data.isDelete === true) {
            notification.error({ message: "Tài khoản của bạn đã bị khoá" });
            dispatch(logoutRequest());
            navigate("/login");
        }
    }, [userInfo.data.id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="layout-app">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const tokenData = jwtDecode(accessToken);
            dispatch(
                getUserInfoRequest({
                    id: tokenData.sub,
                })
            );
        }
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "product",
                    element: <ProductList />,
                },
                {
                    path: "book/:slug",
                    element: <BookDetailPage />,
                },
                {
                    path: "order",
                    element: <OrderPage />,
                },
                {
                    path: "history",
                    element: <HistoryPage />,
                },
            ],
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "user",
                    element: <ManageUser />,
                },
                {
                    path: "book",
                    element: <ManageBookPage />,
                },
                {
                    path: "order",
                    element: <ManageOrderPage />,
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
