import {
    Row,
    Col,
    Rate,
    Divider,
    Button,
    Card,
    Space,
    notification,
    Form,
    Input,
    Image,
} from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalGallery from "./ModalGallery";
import {
    HeartFilled,
    HeartOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import BookLoader from "./BookLoader";
import { useDispatch, useSelector } from "react-redux";
// import { doAddBookAction } from '../../redux/order/orderSlice';
import { useLocation, useNavigate } from "react-router-dom";
import {
    addCartListRequest,
    updateCartListRequest,
} from "../../redux/slicers/cart.slice";
import {
    favoriteProductRequest,
    unFavoriteProductRequest,
} from "../../redux/slicers/favorite.slice";
import {
    getReviewListRequest,
    reviewProductRequest,
} from "../../redux/slicers/review.slice";
import { getOrderDetailRequest } from "../../redux/slicers/order.slice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import dayjs from "dayjs";
import moment from "moment";
import { getProductListRequest } from "../../redux/slicers/product.slice";
import convertSlug from "../ConvertSlug";

const ViewDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataBook = useSelector((state) => state.product.productDetail.data);
    const { productList } = useSelector((state) => state.product);
    console.log("🚀 ~ ViewDetail ~ productList:", productList);
    const { userInfo } = useSelector((state) => state.auth);
    const { cartList } = useSelector((state) => state.cart);
    const { reviewList } = useSelector((state) => state.review);
    const { orderDetail } = useSelector((state) => state.order);

    const [reviewForm] = Form.useForm();
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);

    const [currentQuantity, setCurrentQuantity] = useState(1);
    const refGallery = useRef(null);
    let { search } = useLocation();

    useEffect(() => {
        dispatch(getReviewListRequest({ productId: search.slice(4) }));
        dispatch(getOrderDetailRequest({ productId: search.slice(4) }));
        dispatch(getProductListRequest({ page: 1, limit: 7 }));
    }, [dataBook.id, dispatch, search]);

    useEffect(() => {
        let newImages = [];
        if (dataBook?.thumbnail) {
            newImages.push({
                original: dataBook.thumbnail,
                thumbnail: dataBook.thumbnail,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image",
            });
        }
        if (dataBook?.slider) {
            dataBook.slider.map((item) => {
                newImages.push({
                    original: item,
                    thumbnail: item,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image",
                });
            });
        }
        setImages(newImages);
    }, [dataBook.id]);

    const productRate = useMemo(() => {
        const totalRate = reviewList.data.reduce(
            (total, item) => total + item.rate,
            0
        );
        return reviewList.data.length ? totalRate / reviewList.data.length : 0;
    }, [reviewList.data]);
    console.log("🚀 ~ productRate ~ productRate:", productRate);

    const isFavorite = useMemo(() => {
        return dataBook.favorites?.some((item) => item.userId === userInfo.data.id);
    }, [dataBook, userInfo.data.id]);

    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    };

    const handleChangeButton = (type) => {
        if (type === "MINUS") {
            if (currentQuantity - 1 <= 0) {
                return;
            }
            setCurrentQuantity(currentQuantity - 1);
        }
        if (type === "PLUS") {
            if (currentQuantity === +dataBook.quantity) {
                return;
            }
            setCurrentQuantity(currentQuantity + 1);
        }
    };

    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value < +dataBook.quantity) {
                setCurrentQuantity(+value);
            }
        }
    };

    const handleAddToCart = (quantity, book) => {
        if (!userInfo.data.id) {
            navigate("/login");
            return;
        }
        let isExistIndex = cartList.data.findIndex((c) => c.productId === book.id);

        if (isExistIndex > -1) {
            dispatch(
                updateCartListRequest({
                    id: cartList.data[isExistIndex].id,
                    data: {
                        quantity: cartList.data[isExistIndex].quantity + quantity,
                    },
                })
            );
        } else {
            console.log(">> add");
            dispatch(
                addCartListRequest({
                    data: {
                        userId: userInfo.data.id,
                        productId: book.id,
                        quantity: quantity,
                    },
                })
            );
        }
    };

    const handleToggleFavorite = () => {
        if (!userInfo.data.id)
            return notification.error({
                message: "Bạn cần đăng nhập để thực hiện tính năng này",
            });
        if (isFavorite) {
            const favoriteData = dataBook?.favorites.find(
                (item) => item.userId === userInfo.data.id
            );
            if (favoriteData) {
                dispatch(unFavoriteProductRequest({ id: favoriteData.id }));
            }
        } else {
            dispatch(
                favoriteProductRequest({
                    data: {
                        userId: userInfo.data.id,
                        productId: dataBook.id,
                    },
                })
            );
        }
    };

    const handleReviewProduct = (values) => {
        dispatch(
            reviewProductRequest({
                data: {
                    ...values,
                    userId: userInfo.data.id,
                    productId: dataBook.id,
                },
            })
        );
    };

    const renderReviewForm = useMemo(() => {
        if (userInfo.data.id) {
            const isReviewed = reviewList.data.some(
                (item) => item.userId === userInfo.data.id
            );
            if (isReviewed) {
                return (
                    <div className="review-form-wrapper">
                        Bạn đã đánh giá sản phẩm này
                    </div>
                );
            }
            const isBuyer = orderDetail.data.some(
                (item) => item.order.userId === userInfo.data.id
            );
            console.log(">>> check isBuyer: ", isBuyer);
            if (isBuyer) {
                return (
                    <div className="review-form-wrapper">
                        <Form
                            form={reviewForm}
                            name="loginForm"
                            layout="vertical"
                            initialValues={{
                                rate: 0,
                                comment: "",
                            }}
                            onFinish={(values) => handleReviewProduct(values)}
                        >
                            <Form.Item
                                label="Đánh giá sao"
                                name="rate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhận xét là bắt buộc",
                                    },
                                    {
                                        min: 1,
                                        type: "number",
                                        message: "Đánh giá sao là bắt buộc",
                                    },
                                ]}
                            >
                                <Rate />
                            </Form.Item>
                            <Form.Item
                                label="Nhận xét"
                                name="comment"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhận xét là bắt buộc",
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Gửi
                            </Button>
                        </Form>
                    </div>
                );
            } else {
                return (
                    <div className="review-form-wrapper">
                        Vui lòng mua sản phẩm để có thể đánh giá
                    </div>
                );
            }
        }
        return <div className="review-form-wrapper">Bạn chưa đăng nhập</div>;
    }, [reviewList.data, userInfo.data]);

    const renderReviewList = useMemo(() => {
        return reviewList.data.map((item) => {
            return (
                <div key={item.id} style={{ marginTop: 8 }}>
                    <Space>
                        <h3>{item.user.fullName}</h3>
                        <p>{dayjs(item.createdAt).fromNow()}</p>
                    </Space>
                    <Rate
                        value={item.rate}
                        disabled
                        style={{ display: "block", fontSize: 12 }}
                    />
                    <p>{item.comment}</p>
                </div>
            );
        });
    }, [reviewList.data]);

    const introProduct = [
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/seo-2.png?v=1700487959943",
            title: "5 bí quyết dưỡng ẩm đắt giá - Chăm sóc da hiệu quả ngay trong mùa",
            date: "Thứ Hai, 20/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/seo-1.png?v=1700281321867",
            title: "Khám phá bí mật làm thịt lợn quay bì giòn tại gia",
            date: "Thứ Bảy, 18/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/nha-nam-website-3154da6f-42a3-4ff9-b4c5-f7b217989147.png?v=1699532816857",
            title: "Những cuốn sách dành cho người hướng nội",
            date: "Thứ Năm, 09/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/ban-do-cf.png?v=1698399264317",
            title: "Sự thật ám ảnh về loại cafe đắt nhất thế giới",
            date: "Thứ Sáu, 27/10/2023",
        },
    ];

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book.id}`);
    };

    return (
        <div style={{ background: "#efefef", padding: "20px 0" }}>
            <div
                className="view-detail-book"
                style={{
                    maxWidth: 1440,
                    margin: "0 auto",
                    minHeight: "calc(100vh - 150px)",
                }}
            >
                <div
                    style={{ padding: "20px", background: "#fff", borderRadius: 5 }}
                >
                    {dataBook && dataBook.id ? (
                        <Row gutter={[20, 20]}>
                            <Col md={10} sm={0} xs={0}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>} //right arrow === <> </>
                                    slideOnThumbnailOver={true} //onHover => auto scroll images
                                    onClick={() => handleOnClickImage()}
                                />
                            </Col>
                            <Col md={14} sm={24}>
                                <Col md={0} sm={24} xs={24}>
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false} //hide play button
                                        showFullscreenButton={false} //hide fullscreen button
                                        renderLeftNav={() => <></>} //left arrow === <> </>
                                        renderRightNav={() => <></>} //right arrow === <> </>
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className="author">
                                        Tác giả: <a href="#">{dataBook.author}</a>
                                    </div>
                                    <div className="title">{dataBook.mainText}</div>
                                    <div style={{ display: "flex" }}>
                                        <div className="rating">
                                            <Rate
                                                value={productRate}
                                                allowHalf
                                                disabled
                                                style={{
                                                    color: "#ffce3d",
                                                    fontSize: 12,
                                                }}
                                            />
                                            <span>{`(${
                                                productRate
                                                    ? `${productRate} / 5`
                                                    : "Chưa có đánh giá"
                                            })`}</span>
                                            <span className="sold">
                                                <Divider type="vertical" />
                                                Đã bán {dataBook.sold}
                                            </span>
                                        </div>
                                        <Space style={{ marginLeft: 46 }}>
                                            <Button
                                                size="large"
                                                type="text"
                                                danger={isFavorite}
                                                icon={
                                                    isFavorite ? (
                                                        <HeartFilled
                                                            style={{ fontSize: 24 }}
                                                        />
                                                    ) : (
                                                        <HeartOutlined
                                                            style={{
                                                                fontSize: 24,
                                                                color: "#414141",
                                                            }}
                                                        />
                                                    )
                                                }
                                                onClick={() =>
                                                    handleToggleFavorite()
                                                }
                                            ></Button>
                                            <p>
                                                {dataBook?.favorites?.length || 0}
                                                Lượt thích
                                            </p>
                                        </Space>
                                    </div>
                                    <div className="price">
                                        <span className="currency">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(dataBook.price)}
                                        </span>
                                    </div>
                                    <div className="delivery">
                                        <div>
                                            <span className="left-side">
                                                Vận chuyển
                                            </span>
                                            <span className="right-side">
                                                Miễn phí vận chuyển
                                            </span>
                                        </div>
                                    </div>
                                    <div className="quantity">
                                        <span className="left-side">Số lượng</span>
                                        <span className="right-side">
                                            <button
                                                onClick={() =>
                                                    handleChangeButton("MINUS")
                                                }
                                            >
                                                <MinusOutlined />
                                            </button>
                                            <input
                                                onChange={(e) =>
                                                    handleChangeInput(e.target.value)
                                                }
                                                value={currentQuantity}
                                            />
                                            <button
                                                onClick={() =>
                                                    handleChangeButton("PLUS")
                                                }
                                            >
                                                <PlusOutlined />
                                            </button>
                                        </span>
                                    </div>
                                    <div className="buy">
                                        <button
                                            className="cart"
                                            onClick={() =>
                                                handleAddToCart(
                                                    currentQuantity,
                                                    dataBook
                                                )
                                            }
                                        >
                                            <BsCartPlus className="icon-cart" />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                        <button
                                            className="now"
                                            onClick={() => {
                                                handleAddToCart(
                                                    currentQuantity,
                                                    dataBook
                                                );
                                                navigate("/order");
                                            }}
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                </Col>
                            </Col>

                            <Col xs={24} md={16}>
                                <div
                                    className="description"
                                    style={{ padding: "0 10px" }}
                                >
                                    <div className="title-tab">
                                        <h2>Mô tả sản phẩm</h2>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: dataBook?.content,
                                        }}
                                    ></div>
                                </div>
                                <Card
                                    size="small"
                                    title="Đánh giá"
                                    bordered={false}
                                    style={{ marginTop: 16 }}
                                >
                                    {renderReviewForm}
                                    {renderReviewList}
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <div className="book-info">
                                    <h2 className="title-tab">Thông tin chi tiết</h2>
                                    <ul class="book-info-detail">
                                        <li>
                                            <span>Tác giả</span>
                                            <span>{dataBook?.author}</span>
                                        </li>
                                        <li>
                                            <span>Dịch giả</span>
                                            <span
                                                style={{
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Nhà sách Việt Nam
                                            </span>
                                        </li>
                                        <li>
                                            <span>Nhà xuất bản</span>
                                            <span>Kim Đồng</span>
                                        </li>
                                        <li>
                                            <span>Kích thước</span>
                                            <span>Đang cập nhật</span>
                                        </li>
                                        <li>
                                            <span>Số trang</span>{" "}
                                            <span>Đang cập nhật</span>
                                        </li>
                                        <li>
                                            <span>Ngày phát hành</span>
                                            <span>
                                                {moment(dataBook?.createdAt).format(
                                                    "DD-MM-YYYY HH:mm:ss"
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="related-blogs">
                                    <h2 className="title-tab">Giới thiệu sách</h2>
                                    {introProduct.map((item) => (
                                        <div className="item">
                                            <div className="item-blog">
                                                <Row>
                                                    <Col span={10}>
                                                        <Image
                                                            height="100%"
                                                            width="100%"
                                                            src={item.image}
                                                        />
                                                    </Col>
                                                    <Col
                                                        span={14}
                                                        style={{
                                                            padding:
                                                                "10px 20px 15px",
                                                        }}
                                                    >
                                                        <h3>{item.title}</h3>
                                                        <span>{item.date}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="book-related">
                                    <div className="title-border">
                                        <h2>Có thể bạn cũng thích</h2>
                                    </div>
                                    <div className="slide-book">
                                        <Swiper
                                            modules={[
                                                Navigation,
                                                Pagination,
                                                Scrollbar,
                                                A11y,
                                            ]}
                                            spaceBetween={0}
                                            slidesPerView={5}
                                            navigation
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 1,
                                                },
                                                600: {
                                                    slidesPerView: 3,
                                                },
                                                950: {
                                                    slidesPerView: 5,
                                                },
                                            }}
                                            onSwiper={(swiper) =>
                                                console.log(swiper)
                                            }
                                            onSlideChange={() =>
                                                console.log("slide change")
                                            }
                                        >
                                            {productList?.data.map((item, index) => (
                                                <SwiperSlide>
                                                    <div
                                                        className="column"
                                                        key={`book-${index}`}
                                                        onClick={() =>
                                                            handleRedirectBook(item)
                                                        }
                                                    >
                                                        <div className="wrapper">
                                                            <div className="thumbnail">
                                                                <img
                                                                    src={
                                                                        item.thumbnail
                                                                    }
                                                                    alt="thumbnail book"
                                                                />
                                                            </div>
                                                            <div className="content">
                                                                <div
                                                                    className="text"
                                                                    title={
                                                                        item.mainText
                                                                    }
                                                                >
                                                                    {item.mainText}
                                                                </div>
                                                                <div className="price">
                                                                    {new Intl.NumberFormat(
                                                                        "vi-VN",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                "VND",
                                                                        }
                                                                    ).format(
                                                                        item?.price ??
                                                                            0
                                                                    )}
                                                                </div>
                                                                <div className="rating">
                                                                    <Rate
                                                                        value={5}
                                                                        disabled
                                                                        style={{
                                                                            color: "#ffce3d",
                                                                            fontSize: 10,
                                                                        }}
                                                                    />
                                                                    <span>
                                                                        Đã bán{" "}
                                                                        {item.sold}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                            ...
                                        </Swiper>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <BookLoader />
                    )}
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={"hardcode"}
            />
        </div>
    );
};

export default ViewDetail;
