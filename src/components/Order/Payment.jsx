import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    message,
    notification,
} from "antd";
import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { deleteCartListRequest } from "../../redux/slicers/cart.slice";
import {
    getCityListRequest,
    getDistrictListRequest,
    getWardListRequest,
} from "../../redux/slicers/location.slice";
import { orderProductRequest } from "../../redux/slicers/order.slice";
import { PayPalButton } from "react-paypal-button-v2";

const Payment = (props) => {
    const { cityList, districtList, wardList } = useSelector(
        (state) => state.location
    );
    const carts = useSelector((state) => state.cart.cartList.data);
    const user = useSelector((state) => state.auth.userInfo.data);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [payment, setPayment] = useState("later_money");
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    let check = false;

    useEffect(() => {
        dispatch(getCityListRequest());
    }, []);

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map((item) => {
                sum += item.quantity * item.price;
            });
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts]);

    const renderCityOptions = useMemo(() => {
        return cityList.data.map((item) => {
            return (
                <Select.Option key={item.id} value={item.code}>
                    {item.name}
                </Select.Option>
            );
        });
    }, [cityList.data]);

    const renderDistrictOptions = useMemo(() => {
        return districtList.data.map((item) => {
            return (
                <Select.Option key={item.id} value={item.code}>
                    {item.name}
                </Select.Option>
            );
        });
    }, [districtList.data]);

    const renderWardListOptions = useMemo(() => {
        return wardList.data.map((item) => {
            return (
                <Select.Option key={item.id} value={item.code}>
                    {item.name}
                </Select.Option>
            );
        });
    }, [wardList.data]);

    const onFinish = async (values) => {
        console.log("check: ", check);
        console.log("test oke");
        setIsSubmit(true);
        const { cityCode, districtCode, wardCode } = values;
        const cityData = cityList.data.find((item) => item.code === cityCode);
        const districtData = districtList.data.find(
            (item) => item.code === districtCode
        );
        const wardData = wardList.data.find((item) => item.code === wardCode);
        dispatch(
            orderProductRequest({
                orderData: {
                    ...values,
                    cityName: cityData?.name,
                    districtName: districtData?.name,
                    wardName: wardData?.name,
                    totalPrice: totalPrice,
                    userId: user?.id,
                    stateId: 1,
                    isPaid: check === true ? true : false,
                },
                cartList: carts,
                callback: () => props.setCurrentStep(2),
            })
        );
        setIsSubmit(false);
    };

    const onSuccessPaypal = (details, data) => {
        console.log("details, data: ", details, data);
        check = true;
        if (check) {
            form.submit();
        }
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const addPaypalScript = async () => {
        console.log("okee");
        const data =
            "ATIrZmWNlfDpKScrFLnZ8SXfzjhmfJFR1PUPnoz_Fh4QWzVHg3Hx7jhRKpuhVgpwbVxWGz7wsLt9AwE6";
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=ATIrZmWNlfDpKScrFLnZ8SXfzjhmfJFR1PUPnoz_Fh4QWzVHg3Hx7jhRKpuhVgpwbVxWGz7wsLt9AwE6`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    return (
        <Row gutter={[20, 20]}>
            <Col md={16} xs={24}>
                {carts.map((book, index) => {
                    const currentBookPrice = book.price ?? 0;
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
                                    <InputNumber value={book.quantity} disabled />
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
                                            deleteCartListRequest({ id: book.id })
                                        )
                                    }
                                    twoToneColor="#eb2f69"
                                />
                            </div>
                        </div>
                    );
                })}
            </Col>
            <Col md={8} xs={24}>
                <div className="order-sum">
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Tên người nhận"
                            name="name"
                            initialValue={user.fullName}
                            rules={[
                                {
                                    required: true,
                                    message: "Tên người nhận là bắt buộc",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user.phone}
                            rules={[
                                {
                                    required: true,
                                    message: "Số điện thoại là bắt buộc",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Tỉnh/Thành"
                            name="cityCode"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: "Required!" }]}
                        >
                            <Select
                                onChange={(value) => {
                                    dispatch(
                                        getDistrictListRequest({
                                            cityCode: value,
                                        })
                                    );
                                    form.setFieldsValue({
                                        districtCode: undefined,
                                        wardCode: undefined,
                                    });
                                }}
                            >
                                {renderCityOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Quận/Huyện"
                            name="districtCode"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: "Required!" }]}
                        >
                            <Select
                                onChange={(value) => {
                                    dispatch(
                                        getWardListRequest({
                                            districtCode: value,
                                        })
                                    );
                                    form.setFieldsValue({
                                        wardCode: undefined,
                                    });
                                }}
                                disabled={!form.getFieldValue("cityCode")}
                            >
                                {renderDistrictOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Phường/Xã"
                            name="wardCode"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: "Required!" }]}
                        >
                            <Select disabled={!form.getFieldValue("districtCode")}>
                                {renderWardListOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Địa chỉ không được để trống",
                                },
                            ]}
                        >
                            <TextArea autoFocus rows={4} />
                        </Form.Item>
                    </Form>
                    <div className="info">
                        <div className="method">
                            <div style={{ paddingBottom: "10px" }}>
                                Hình thức thanh toán
                            </div>
                            {/* <Radio checked>Thanh toán khi nhận hàng</Radio> */}
                            <Radio.Group onChange={handlePayment} value={payment}>
                                <Radio value="later_money">
                                    Thanh toán tiền mặt khi nhận hàng
                                </Radio>
                                <Radio value="paypal">
                                    Thanh toán tiền bằng paypal
                                </Radio>
                            </Radio.Group>
                        </div>

                        <Divider style={{ margin: "5px 0" }} />
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
                        {payment === "paypal" && sdkReady ? (
                            <PayPalButton
                                amount={Math.floor(totalPrice / 24000)}
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={onSuccessPaypal}
                                onError={() => {
                                    alert("Erroe");
                                }}
                            />
                        ) : (
                            <button
                                onClick={() => form.submit()}
                                disabled={isSubmit}
                                style={{ width: "100%" }}
                            >
                                {isSubmit && (
                                    <span>
                                        <LoadingOutlined /> &nbsp;
                                    </span>
                                )}
                                Đặt Hàng ({carts.length ?? 0})
                            </button>
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default Payment;
