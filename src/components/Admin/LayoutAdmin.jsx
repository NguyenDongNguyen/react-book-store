import "./layout.scss";
import React, { useEffect, useState } from "react";
import {
    AppstoreOutlined,
    DollarCircleOutlined,
    ExceptionOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UserOutlined,
    DownOutlined,
    HeartTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, message } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotPermitted from "../NotPermitted/NotPermitted";
import { logoutRequest } from "../../redux/slicers/auth.slice";
import Loading from "../Loading";
const { Header, Sider, Content, Footer } = Layout;

const items = [
    {
        key: "dashboard",
        icon: <AppstoreOutlined />,
        label: <Link to="/admin">Dashboard</Link>,
    },
    {
        icon: <UserOutlined />,
        label: "Manage Users",
        children: [
            {
                key: "crud",
                icon: <TeamOutlined />,
                label: <Link to="/admin/user">CRUD</Link>,
            },
            {
                key: "file1",
                icon: <TeamOutlined />,
                label: "Files1",
            },
        ],
    },
    {
        key: "book",
        icon: <ExceptionOutlined />,
        label: <Link to="/admin/book">Manage Books</Link>,
    },
    {
        key: "order",
        icon: <DollarCircleOutlined />,
        label: <Link to="/admin/order">Manage Orders</Link>,
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const { userInfo } = useSelector((state) => state.auth);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (window.location.pathname.includes("/book")) {
            setActiveMenu("book");
        }
        if (window.location.pathname.includes("/user")) {
            setActiveMenu("crud");
        }
        if (window.location.pathname.includes("/order")) {
            setActiveMenu("order");
        }
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemsDropdown = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: "account",
        },
        {
            label: <Link to="/">Trang chủ</Link>,
            key: "home",
        },
        {
            label: (
                <label
                    onClick={() => {
                        dispatch(logoutRequest());
                        navigate("/");
                    }}
                >
                    Đăng xuất
                </label>
            ),
            key: "logout",
        },
    ];

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && userInfo.loading) {
        console.log("aloooooo");
        return <Loading />;
    } else if (userInfo.data.role !== "ADMIN") {
        return <NotPermitted />;
    }

    return (
        <Layout className="layout-admin" style={{ minHeight: "100vh" }}>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 32, margin: 16, textAlign: "center" }}>
                    Admin
                </div>
                <Menu
                    // defaultSelectedKeys={[activeMenu]}
                    selectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout className="page-layout">
                <Header
                    className="admin-header"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown
                        menu={{
                            items: itemsDropdown,
                        }}
                        trigger={["click"]}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {userInfo?.data?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content className="admin-content">
                    <Outlet />
                </Content>
                <Footer className="admin-footer">
                    <span>
                        &copy; 2024. Made with <HeartTwoTone />
                    </span>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;
