import React, { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import {
    Divider,
    Badge,
    Drawer,
    message,
    Avatar,
    Popover,
    Dropdown,
    Space,
    Input,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import "./header.scss";
import { Link } from "react-router-dom";
import "../../styles/global.scss";
import ManageAccount from "../Account/ManageAccount";
import HeadlessTippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import { getProductListRequest } from "../../redux/slicers/product.slice";
import { PRODUCT_LIMIT } from "../../constants/paging";
import SearchItem from "./SearchItem";
import { getCartListRequest } from "../../redux/slicers/cart.slice";
const { Search } = Input;

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const [openDrawer, setOpenDrawer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { productList } = useSelector((state) => state.product);
    const { cartList } = useSelector((state) => state.cart);
    console.log("🚀 ~ Header ~ cartList:", cartList);

    useEffect(() => {
        dispatch(
            getProductListRequest({
                keyword: searchTerm,
                sort: "sold",
                order: "desc",
                page: 1,
                limit: PRODUCT_LIMIT,
            })
        );
    }, [searchTerm]);

    useEffect(() => {
        dispatch(
            getCartListRequest({
                userId: 1,
            })
        );
    }, []);

    const handleLogout = async () => {};

    let items = [
        {
            label: (
                <label
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsModalOpen(true)}
                >
                    Quản lý tài khoản
                </label>
            ),
            key: "account",
        },
        {
            label: (
                <label
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/history")}
                >
                    Lịch sử mua hàng
                </label>
            ),
            key: "history",
        },
        {
            label: (
                <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
                    Đăng xuất
                </label>
            ),
            key: "logout",
        },
    ];

    const contentPopover = () => {
        return (
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {cartList.data?.map((book, index) => {
                        return (
                            <div className="book" key={`book-${index}`}>
                                <img
                                    src={book.product.thumbnail}
                                    alt="images book"
                                />
                                <div>{book.product.mainText}</div>
                                <div className="price">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(book?.product.price ?? 0)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="pop-cart-footer">
                    <button onClick={() => navigate("/order")}>Xem giỏ hàng</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div
                            className="page-header__toggle"
                            onClick={() => {
                                setOpenDrawer(true);
                            }}
                        >
                            ☰
                        </div>
                        <div className="page-header__logo">
                            <span className="logo" onClick={() => navigate("/")}>
                                <FaReact className="rotate icon-react" /> Book Store
                                {/* <VscSearchFuzzy className="icon-search" /> */}
                            </span>
                            <div style={{ width: "100%", position: "relative" }}>
                                <HeadlessTippy
                                    interactive
                                    visible={
                                        showResult &&
                                        searchTerm &&
                                        productList.data.length > 0
                                    }
                                    render={(attrs) => (
                                        <div
                                            className="search-result"
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <div className="wrapper">
                                                <h4 className="search-title">
                                                    Books
                                                </h4>
                                                {productList.data.map((result) => (
                                                    <SearchItem
                                                        key={result.id}
                                                        data={result}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    onClickOutside={() => setShowResult(false)}
                                >
                                    {/* <Search
                                        placeholder="input search loading with enterButton"
                                        enterButton
                                        color="#61dafb"
                                        allowClear
                                    /> */}
                                    <input
                                        className="input-search"
                                        type={"text"}
                                        placeholder="Bạn tìm gì hôm nay"
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        onFocus={() => setShowResult(true)}
                                    />
                                </HeadlessTippy>
                            </div>
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    className="popover-carts"
                                    placement="topRight"
                                    rootClassName="popover-carts"
                                    title={"Sản phẩm mới thêm"}
                                    content={contentPopover}
                                    arrow={true}
                                >
                                    <Badge
                                        count={cartList?.data.length ?? 0}
                                        size={"small"}
                                        showZero
                                    >
                                        <FiShoppingCart className="icon-cart" />
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item mobile">
                                <Divider type="vertical" />
                            </li>
                            <li className="navigation__item mobile">
                                <Dropdown menu={{ items }} trigger={["click"]}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {/* <Avatar src={urlAvatar} />  */}
                                            Đông Nguyên
                                        </Space>
                                    </a>
                                </Dropdown>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Trang quản trị</p>
                <Divider />

                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setOpenDrawer(false);
                    }}
                >
                    Quản lý tài khoản
                </p>
                <Divider />

                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate("/history");
                        setOpenDrawer(false);
                    }}
                >
                    Lịch sử mua hàng
                </p>
                <Divider />

                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        handleLogout();
                        setOpenDrawer(false);
                    }}
                >
                    Đăng xuất
                </p>
                <Divider />
            </Drawer>
            <ManageAccount
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};

export default Header;
