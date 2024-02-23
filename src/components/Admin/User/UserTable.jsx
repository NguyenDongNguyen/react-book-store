import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Popconfirm, message, notification } from "antd";
import InputSearch from "./InputSearch";
// import { callDeleteUser, callFetchListUser } from "../../../services/api";
import {
    CloudUploadOutlined,
    DeleteTwoTone,
    EditTwoTone,
    ExportOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
// import UserViewDetail from "./UserViewDetail";
// import UserModalCreate from "./UserModalCreate";
// import UserImport from "./data/UserImport";
import * as XLSX from "xlsx";
// import UserModalUpdate from "./UserModalUpdate";
import { useSelector } from "react-redux";

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");
    const [dataViewDetail, setDataViewDetail] = useState("");

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
            render: (text, record, index) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }}
                    >
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Tên hiển thị",
            dataIndex: "fullName",
            sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            sorter: true,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "createdAt",
            sorter: true,
        },
        {
            title: "Action",
            render: (text, record, index) => {
                return (
                    <>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xoá user"}
                            description={"Bạn có chắn muốn xoá user này ?"}
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Xác nhận"
                            cancelText="Huỷ"
                        >
                            <span style={{ cursor: "pointer", paddingRight: 12 }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                console.log(">>> check record: ", record);
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUser = async () => {
        // setIsLoading(true)
        // let query = `current=${current}&pageSize=${pageSize}`
        // if (filter) {
        //     query += filter
        // }
        // if (sortQuery) {
        //     query += sortQuery
        // }
        // const res = await callFetchListUser(query)
        // if (res && res.data) {
        //     setListUser(res.data.result)
        //     setTotal(res.data.meta.total)
        // }
        // setIsLoading(false)
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

    const handleDeleteUser = async (userId) => {
        // const res = await callDeleteUser(userId)
        // if (res && res.data) {
        //     message.success('Xoá user thành công')
        //     fetchUser()
        // } else {
        //     notification.error({
        //         message: 'Đã có lỗi xảy ra',
        //         description: res.message
        //     })
        // }
    };

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Table List Users</span>
                <span style={{ display: "flex", gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={handleExportData}
                    >
                        Export
                    </Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => setOpenModalImport(true)}
                    >
                        Import
                    </Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >
                        Thêm mới
                    </Button>

                    <Button
                        type="ghost"
                        onClick={() => {
                            setFilter("");
                            setSortQuery("");
                        }}
                    >
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        );
    };

    const handleSearch = (query) => {
        setCurrent(1);
        setFilter(query);
    };

    const handleExportData = () => {
        //https://stackoverflow.com/questions/70871254/how-can-i-export-a-json-object-to-excel-using-nextjs-react
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataSheet.xlsx");
        }
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch} />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className="def"
                        loading={isLoading}
                        columns={columns}
                        dataSource={listUser}
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

            {/* <UserModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchUser={fetchUser}
            /> */}

            {/* <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchUser={fetchUser}
            /> */}

            {/* <UserViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            /> */}

            {/* <UserModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchUser={fetchUser}
            /> */}
        </>
    );
};

export default UserTable;
