import "./history.scss";
import { Row, Col, Table, Tag, Button } from "antd";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteOrderProductRequest,
    getOrderListRequest,
    updateOrderProductRequest,
} from "../../redux/slicers/order.slice";
import Loading from "../Loading";

const HistoryPage = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector((state) => state.order);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo.data.id) {
            fetchHistory();
        }
    }, [userInfo.loading]);

    const fetchHistory = async () => {
        dispatch(getOrderListRequest({ userId: userInfo.data.id }));
    };

    const columns = [
        {
            title: "STT",
            render: (text, object, index) => index + 1,
        },
        {
            title: "Thời gian",
            dataIndex: "createdAt",
            render: (text, record, index) => {
                return <>{moment(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>;
            },
        },
        {
            title: "Tổng số tiền",
            dataIndex: "totalPrice",
            render: (text, record, index) => {
                return (
                    <>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(record?.totalPrice ?? 0)}
                    </>
                );
            },
        },
        {
            title: "Tình trạng",
            render: (text, record, index) => {
                return (
                    <>
                        {record?.isPaid === true ? (
                            <Tag color="green">Đã thanh toán</Tag>
                        ) : (
                            <Tag color="red">Chưa thanh toán</Tag>
                        )}
                    </>
                );
            },
        },
        {
            title: "Trạng thái",
            render: (text, record, index) => {
                return (
                    <>
                        {record?.state?.id === 1 ? (
                            <Tag color="red">{record?.state?.name}</Tag>
                        ) : (
                            <Tag color="green">{record?.state?.name}</Tag>
                        )}
                    </>
                );
            },
        },
        {
            title: "Địa chỉ giao hàng",
            dataIndex: "address",
            key: "address",
            render: (_, item) =>
                `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
        },
        {
            title: "",
            dataIndex: "",
            render: (text, record, index) => {
                return (
                    <>
                        {record.stateId === 1 && record.isPaid === false ? (
                            <Button
                                danger
                                onClick={() =>
                                    dispatch(
                                        deleteOrderProductRequest({
                                            id: record.id,
                                            orderDetailData: record.orderDetails,
                                            userId: userInfo.data.id,
                                        })
                                    )
                                }
                            >
                                Huỷ đơn hàng
                            </Button>
                        ) : (
                            <Button danger disabled>
                                Huỷ đơn hàng
                            </Button>
                        )}
                    </>
                );
            },
        },
    ];

    const columnDetails = [
        {
            title: "STT",
            render: (text, object, index) => index + 1,
        },
        {
            title: "Hình ảnh",
            dataIndex: "thumbnail",
            render: (text, record, index) => {
                return (
                    <>
                        <img
                            // onClick={() => handleRedirectBook(record.orderDetails)}
                            style={{ maxWidth: "80px", cursor: "pointer" }}
                            src={record.thumbnail}
                            alt="image"
                        />
                    </>
                );
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "mainText",
            render: (text, record, index) => {
                return <>{record.mainText}</>;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            render: (text, record, index) => {
                return <>{record.quantity}</>;
            },
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "price",
            render: (text, record, index) => {
                return <>{record.price}</>;
            },
        },
    ];

    return (
        <div style={{ padding: "20px 0" }}>
            <div
                className="history-container"
                style={{ maxWidth: 1440, margin: "0 auto" }}
            >
                <h3>Lịch sử đặt hàng: </h3>
                {userInfo.data.id ? (
                    <div className="history-list">
                        <Row gutter={[20, 20]}>
                            <Col span={24}>
                                <Table
                                    className="def"
                                    rowKey="_id"
                                    loading={orderList.loading}
                                    columns={columns}
                                    dataSource={orderList.data}
                                    pagination={false}
                                    expandable={{
                                        expandedRowRender: (record) => (
                                            // <ul>
                                            //     {record.orderDetails.map((item) => (
                                            //         <li key={item.id}>
                                            //             {item.productName}
                                            //             {` - ${item.price}`}
                                            //             {` - ${item.quantity}`}
                                            //             {` - ${
                                            //                 item.price *
                                            //                 item.quantity
                                            //             }`}
                                            //         </li>
                                            //     ))}
                                            // </ul>
                                            <Table
                                                rowKey="_id"
                                                loading={orderList.loading}
                                                columns={columnDetails}
                                                dataSource={record.orderDetails}
                                                pagination={false}
                                            />
                                        ),
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
