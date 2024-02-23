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
import { getProductSuggestRequest } from "../../redux/slicers/product.slice";
import { PRODUCT_LIMIT } from "../../constants/paging";
import SearchItem from "./SearchItem";
import { getCartListRequest } from "../../redux/slicers/cart.slice";
import { logoutRequest } from "../../redux/slicers/auth.slice";
const { Search } = Input;

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const [openDrawer, setOpenDrawer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { productSuggest } = useSelector((state) => state.product);
    const { cartList } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(
            getProductSuggestRequest({
                keyword: searchTerm,
            })
        );
    }, [searchTerm]);

    useEffect(() => {
        dispatch(
            getCartListRequest({
                userId: userInfo?.data?.id,
            })
        );
    }, [cartList.data.length, dispatch, userInfo?.data?.id]);

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
                <label
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(logoutRequest())}
                >
                    Đăng xuất
                </label>
            ),
            key: "logout",
        },
    ];
    if (userInfo?.data?.role === "ADMIN") {
        items.unshift({
            label: (
                <Link to="/admin" style={{ cursor: "pointer" }}>
                    Trang quản trị
                </Link>
            ),
            key: "admin",
        });
    }

    const contentPopover = () => {
        if (userInfo.data.id) {
            return (
                <div className="pop-cart-body">
                    <div className="pop-cart-content">
                        {cartList.data?.map((book, index) => {
                            return (
                                <div className="book" key={`book-${index}`}>
                                    <img src={book?.thumbnail} alt="images book" />
                                    <div>{book?.mainText}</div>
                                    <div className="price">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(book?.price ?? 0)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pop-cart-footer">
                        <button onClick={() => navigate("/order")}>
                            Xem giỏ hàng
                        </button>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
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
                                        productSuggest.data.length > 0
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
                                                {productSuggest.data.map(
                                                    (result) => (
                                                        <SearchItem
                                                            key={result.id}
                                                            data={result}
                                                        />
                                                    )
                                                )}
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
                                        count={
                                            userInfo.data.id
                                                ? cartList?.data.length
                                                : 0
                                        }
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
                                {!userInfo.data.id ? (
                                    <span onClick={() => navigate("/login")}>
                                        {" "}
                                        Tài Khoản
                                    </span>
                                ) : (
                                    <Dropdown menu={{ items }} trigger={["click"]}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                {/* <Avatar src={urlAvatar} /> */}
                                                {userInfo?.data?.fullName}
                                            </Space>
                                        </a>
                                    </Dropdown>
                                )}
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
                        dispatch(logoutRequest());
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
