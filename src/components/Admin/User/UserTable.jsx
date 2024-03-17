import React, { useEffect, useState } from "react";
import {
    Table,
    Row,
    Col,
    Button,
    Popconfirm,
    message,
    notification,
    Pagination,
} from "antd";
import InputSearch from "./InputSearch";
import {
    CloudUploadOutlined,
    DeleteTwoTone,
    EditTwoTone,
    ExportOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import UserViewDetail from "./UserViewDetail";
import UserModalCreate from "./UserModalCreate";
// import UserImport from "./data/UserImport";
import * as XLSX from "xlsx";
import moment from "moment";
import { ADMIN_TABLE_LIMIT } from "../../../constants/paging";
import UserModalUpdate from "./UserModalUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    deleteUserRequest,
    getUserListRequest,
} from "../../../redux/slicers/auth.slice";

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userList } = useSelector((state) => state.auth);
    const { userInfo } = useSelector((state) => state.auth);
    console.log("🚀 ~ UserTable ~ userInfo:", userInfo);

    const [filterParams, setFilterParams] = useState({
        categoryId: [],
        keyword: "",
        sort: "updatedAt",
        order: "asc",
    });

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
            dataIndex: "id",
            render: (text, record, index) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }}
                    >
                        {record.id}
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
            dataIndex: "updatedAt",
            sorter: true,
            render: (text, record, index) => {
                return <>{moment(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>;
            },
        },
        {
            title: "Action",
            render: (text, record, index) => {
                return (
                    <>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận khoá user"}
                            description={"Bạn có chắn muốn khoá user này ?"}
                            onConfirm={() => handleDeleteUser(record.id)}
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
    }, []);

    const fetchUser = async () => {
        setIsLoading(true);
        dispatch(
            getUserListRequest({
                ...filterParams,
                page: 1,
                limit: ADMIN_TABLE_LIMIT,
            })
        );
        setIsLoading(false);
    };

    const handleChangePage = (page) => {
        dispatch(
            getUserListRequest({
                ...filterParams,
                page: page,
                limit: ADMIN_TABLE_LIMIT,
            })
        );
    };

    const onChange = (pagination, filters, sorter, extra) => {
        if (sorter && sorter.field) {
            dispatch(
                getUserListRequest({
                    ...filterParams,
                    page: 1,
                    limit: ADMIN_TABLE_LIMIT,
                    sort: sorter.field,
                    order: sorter.order === "ascend" ? "asc" : "desc",
                })
            );
        }
    };

    const handleDeleteUser = async (userId) => {
        if (userInfo.data.id === userId) {
            message.error("Không thể thực hiện thao tác này");
            return;
        }
        dispatch(deleteUserRequest({ id: userId }));
        fetchUser();
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
                            fetchUser();
                        }}
                    >
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        );
    };

    const handleFilter = (key, values) => {
        setFilterParams({
            ...filterParams,
            [key]: values,
        });
        dispatch(
            getUserListRequest({
                ...filterParams,
                page: 1,
                limit: ADMIN_TABLE_LIMIT,
                [key]: values,
            })
        );
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
                    <InputSearch handleFilter={handleFilter} />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        className="def"
                        loading={userList.loading}
                        columns={columns}
                        dataSource={userList.data}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row justify={"center"}>
                <Pagination
                    current={userList.meta.page}
                    pageSize={ADMIN_TABLE_LIMIT}
                    total={userList.meta.total}
                    onChange={(page) => handleChangePage(page)}
                    showTotal={(total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {userList.meta.total} rows
                            </div>
                        );
                    }}
                    style={{ margin: "16px auto 0" }}
                />
            </Row>

            <UserModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchUser={fetchUser}
            />

            {/* <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchUser={fetchUser}
            /> */}

            <UserViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />

            <UserModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchUser={fetchUser}
            />
        </>
    );
};

export default UserTable;
