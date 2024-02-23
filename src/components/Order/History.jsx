import { Row, Col, Table, Tag } from "antd";
import { useEffect, useState } from "react";
// import { callFetchHistory } from "../../services/api";
import ReactJson from "react-json-view";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrderListRequest } from "../../redux/slicers/order.slice";

const HistoryPage = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector((state) => state.order);
    console.log("🚀 ~ HistoryPage ~ orderList:", orderList);
    const { userInfo } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [historyList, setHistoryList] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoading(true);
        dispatch(getOrderListRequest({ userId: userInfo.data.id }));
        setIsLoading(false);
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
            title: "Trạng thái",
            render: (text, record, index) => {
                return (
                    <>
                        <Tag color="green">Thành công</Tag>
                    </>
                );
            },
        },
        {
            title: "Chi tiết",
            dataIndex: "orderDetails",
            render: (text, record, index) => {
                return (
                    <>
                        <ReactJson
                            src={record.orderDetails}
                            name={"Chi tiết đơn mua"}
                            collapsed={true}
                            enableClipboard={false}
                            displayDataTypes={false}
                            displayObjectSize={false}
                        />
                    </>
                );
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
                <div className="history-list">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Table
                                className="def"
                                rowKey="_id"
                                loading={isLoading}
                                columns={columns}
                                dataSource={orderList.data}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
