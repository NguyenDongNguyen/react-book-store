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
// import { callDeleteBook, callFetchListBook } from "../../../services/api";
import {
    CloudUploadOutlined,
    DeleteTwoTone,
    EditTwoTone,
    ExportOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
// import BookViewDetail from "./BookViewDetail";
// import BookModalCreate from "./BookModalCreate";
// import UserImport from "./data/UserImport";
import * as XLSX from "xlsx";
// import BookModalUpdate from "./BookModalUpdate";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProductRequest,
    getProductListRequest,
} from "../../../redux/slicers/product.slice";
import { ADMIN_TABLE_LIMIT } from "../../../constants/paging";
import BookModalCreate from "./BookModalCreate";
import BookViewDetail from "./BookViewDetail";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import BookModalUpdate from "./BookModalUpdate";

// https://stackblitz.com/run?file=demo.tsx
const BookTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productList } = useSelector((state) => state.product);

    const [filterParams, setFilterParams] = useState({
        categoryId: [],
        keyword: "",
        sort: "updatedAt",
        order: "desc",
    });
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("&sort=-updatedAt");

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            render: (text, record, index) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                        onClick={() => {
                            navigate(`?${record.id}`);
                            setOpenViewDetail(true);
                        }}
                    >
                        {record.id}
                    </a>
                );
            },
        },
        {
            title: "Tên sách",
            dataIndex: "mainText",
            sorter: true,
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            sorter: true,
            render: (text, record, index) => {
                return <>{record?.category?.name}</>;
            },
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            sorter: true,
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
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
                            title={"Xác nhận xoá book"}
                            description={"Bạn có chắn muốn xoá book này ?"}
                            onConfirm={() => handleDeleteBook(record.id)}
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
        fetchBook();
        // dispatch(getCategoryListRequest());
    }, []);

    const fetchBook = () => {
        dispatch(
            getProductListRequest({
                ...filterParams,
                page: 1,
                limit: ADMIN_TABLE_LIMIT,
            })
        );
    };

    const handleChangePage = (page) => {
        dispatch(
            getProductListRequest({
                ...filterParams,
                page: page,
                limit: ADMIN_TABLE_LIMIT,
            })
        );
    };

    const onChange = (pagination, filters, sorter, extra) => {
        if (sorter && sorter.field) {
            dispatch(
                getProductListRequest({
                    ...filterParams,
                    page: 1,
                    limit: ADMIN_TABLE_LIMIT,
                    sort: sorter.field,
                    order: sorter.order === "ascend" ? "asc" : "desc",
                })
            );
        }
    };

    const handleDeleteBook = async (bookId) => {
        // const res = await callDeleteBook(bookId)
        // if (res && res.data) {
        //     message.success('Xoá book thành công')
        //     fetchBook()
        // } else {
        //     notification.error({
        //         message: 'Đã có lỗi xảy ra',
        //         description: res.message
        //     })
        // }
        dispatch(deleteProductRequest({ id: bookId }));
        fetchBook();
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
                            fetchBook();
                        }}
                    >
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        );
    };

    const handleSearch = (query) => {
        dispatch(
            getProductListRequest({
                ...filterParams,
                page: 1,
                limit: ADMIN_TABLE_LIMIT,
                keyword: query,
            })
        );
    };

    const handleExportData = () => {
        //https://stackoverflow.com/questions/70871254/how-can-i-export-a-json-object-to-excel-using-nextjs-react
        if (productList.data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(productList.data);
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
                        loading={productList.loading}
                        columns={columns}
                        dataSource={productList.data}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row justify={"center"}>
                <Pagination
                    current={productList.meta.page}
                    pageSize={ADMIN_TABLE_LIMIT}
                    total={productList.meta.total}
                    onChange={(page) => handleChangePage(page)}
                    showTotal={(total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {productList.meta.total}{" "}
                                rows
                            </div>
                        );
                    }}
                    style={{ margin: "16px auto 0" }}
                />
            </Row>

            <BookModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchBook={fetchBook}
            />

            {/* <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchBook={fetchBook}
            /> */}

            <BookViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
            />

            <BookModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchBook={fetchBook}
            />
        </>
    );
};

export default BookTable;
