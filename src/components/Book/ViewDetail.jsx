import { Row, Col, Rate, Divider, Button } from "antd";
import "./book.scss";
import ImageGallery from "react-image-gallery";
import { useEffect, useRef, useState } from "react";
import ModalGallery from "./ModalGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import BookLoader from "./BookLoader";
import { useDispatch, useSelector } from "react-redux";
// import { doAddBookAction } from '../../redux/order/orderSlice';
import { useNavigate } from "react-router-dom";
import {
    addCartListRequest,
    updateCartListRequest,
} from "../../redux/slicers/cart.slice";

const ViewDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataBook = useSelector((state) => state.product.productDetail.data);
    const { userInfo } = useSelector((state) => state.auth);
    const { cartList } = useSelector((state) => state.cart);

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);

    const [currentQuantity, setCurrentQuantity] = useState(1);
    const refGallery = useRef(null);

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
            console.log(">> update");
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
                                        Tác giả: <a href="#">{dataBook.author}</a>{" "}
                                    </div>
                                    <div className="title">{dataBook.mainText}</div>
                                    <div className="rating">
                                        <Rate
                                            value={5}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 12,
                                            }}
                                        />
                                        <span className="sold">
                                            <Divider type="vertical" />
                                            {dataBook.sold}
                                        </span>
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
