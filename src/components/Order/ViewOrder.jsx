import { Col, Divider, Empty, InputNumber, Row } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteCartListRequest,
    updateCartListRequest,
} from "../../redux/slicers/cart.slice";

const ViewOrder = (props) => {
    const carts = useSelector((state) => state.cart.cartList.data);
    const { userInfo } = useSelector((state) => state.auth);
    console.log("🚀 ~ ViewOrder ~ carts:", carts);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map((item) => {
                sum += item.quantity * item?.price;
            });
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts]);

    const handleOnChangeInput = (value, book) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(
                updateCartListRequest({
                    id: book.id,
                    data: {
                        quantity: parseInt(value) || 0,
                    },
                })
            );
        }
    };

    return (
        <Row gutter={[20, 20]}>
            <Col md={18} xs={24}>
                {carts?.map((book, index) => {
                    const currentBookPrice = book?.price ?? 0;
                    return (
                        <div className="order-book" key={`index-${index}`}>
                            <div className="book-content">
                                <img src={`${book?.thumbnail}`} alt="" />
                                <div className="title">{book?.mainText}</div>
                                <div className="price">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(currentBookPrice ?? 0)}
                                </div>
                            </div>
                            <div className="action">
                                <div className="quantity">
                                    <InputNumber
                                        onChange={(value) =>
                                            handleOnChangeInput(value, book)
                                        }
                                        value={book.quantity}
                                    />
                                </div>
                                <div className="sum">
                                    Tổng:{" "}
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(currentBookPrice * book.quantity ?? 0)}
                                </div>
                                <DeleteTwoTone
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        dispatch(
                                            deleteCartListRequest({
                                                id: book.id,
                                                userId: userInfo.data.id,
                                            })
                                        )
                                    }
                                    twoToneColor="#eb2f69"
                                />
                            </div>
                        </div>
                    );
                })}
                {carts.length === 0 && (
                    <div className="order-book-empty">
                        <Empty description={"Không có sản phẩm trong giỏ hàng"} />
                    </div>
                )}
            </Col>
            <Col md={6} xs={24}>
                <div className="order-sum">
                    <div className="calculate">
                        <span> Tạm tính</span>
                        <span>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice ?? 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <div className="calculate">
                        <span> Tổng tiền</span>
                        <span className="sum-final">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(totalPrice ?? 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <button
                        disabled={carts.length === 0}
                        onClick={() => props.setCurrentStep(1)}
                    >
                        Mua Hàng ({carts.length ?? 0})
                    </button>
                </div>
            </Col>
        </Row>
    );
};

export default ViewOrder;
