import React, { useEffect, useMemo, useState } from "react";
import {
    Table,
    Row,
    Col,
    Button,
    Popconfirm,
    message,
    notification,
    Select,
} from "antd";
// import { callFetchListOrder } from "../../../services/api";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
// import UserImport from "./data/UserImport";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrderRequest,
    updateOrderProductRequest,
} from "../../../redux/slicers/order.slice";
import {
    getStatusListRequest,
    updateStatusListRequest,
} from "../../../redux/slicers/status.slice";

// https://stackblitz.com/run?file=demo.tsx
const OrderTable = () => {
    const dispatch = useDispatch();
    const { allOrder } = useSelector((state) => state.order);
    const { statusList } = useSelector((state) => state.status);

    const [listOrder, setListOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [sortQuery, setSortQuery] = useState("&sort=-updatedAt");

    const renderCategoryOptions = useMemo(() => {
        return statusList.data.map((item) => {
            return (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            );
        });
    }, [statusList.data]);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Price",
            dataIndex: "totalPrice",
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(record.totalPrice ?? 0)}
                    </>
                );
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (_, item) =>
                `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            sorter: true,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            sorter: true,
            render: (text, record, index) => {
                return <>{moment(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>;
            },
        },
        {
            title: "Status",
            dataIndex: "state",
            render: (text, record, index) => {
                return (
                    <>
                        <Select
                            defaultValue={record.state.name}
                            onChange={(value) =>
                                dispatch(
                                    updateOrderProductRequest({
                                        id: record.id,
                                        data: {
                                            stateId: value,
                                        },
                                    })
                                )
                            }
                        >
                            {renderCategoryOptions}
                        </Select>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        fetchBook();
    }, [current, pageSize, sortQuery]);

    const fetchBook = async () => {
        setIsLoading(true);
        // let query = `current=${current}&pageSize=${pageSize}`
        // if (sortQuery) {
        //     query += sortQuery
        // }

        // const res = await callFetchListOrder(query)
        // if (res && res.data) {
        //     setListOrder(res.data.result)
        //     setTotal(res.data.meta.total)
        // }
        dispatch(getAllOrderRequest());
        dispatch(getStatusListRequest());
        setIsLoading(false);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }

        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }

        if (sorter && sorter.field) {
            const q =
                sorter.order === "ascend"
                    ? `&sort=${sorter.field}`
                    : `&sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "start" }}>
                <span>Table List Order</span>
            </div>
        );
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className="def"
                        loading={isLoading}
                        columns={columns}
                        dataSource={allOrder.data}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => {
                                return (
                                    <div>
                                        {" "}
                                        {range[0]}-{range[1]} trên {total} rows
                                    </div>
                                );
                            },
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default OrderTable;
