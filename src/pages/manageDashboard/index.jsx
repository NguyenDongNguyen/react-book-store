import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Card, Col, Row, Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserListRequest } from "../../redux/slicers/auth.slice";
import { getAllOrderRequest } from "../../redux/slicers/order.slice";

const ManageDashboardPage = () => {
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.auth);
    const { allOrder } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(
            getUserListRequest({
                page: "",
                limit: "",
            })
        );
        dispatch(getAllOrderRequest());
    }, []);

    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <div style={{ margin: 15 }}>
            <Row gutter={[40, 40]}>
                <Col span={10}>
                    <Card title="" bordered={false}>
                        <Statistic
                            title="Tổng Users"
                            value={userList.data.length}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="" bordered={false}>
                        <Statistic
                            title="Tổng đơn hàng"
                            value={allOrder.data.length}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ManageDashboardPage;
