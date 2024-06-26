import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
    Row,
    Col,
    Form,
    Checkbox,
    Divider,
    InputNumber,
    Button,
    Rate,
    Tabs,
    Pagination,
    Flex,
    Drawer,
    Spin,
} from "antd";
import "./productList.scss";
import { getProductListRequest } from "../../redux/slicers/product.slice";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryListRequest } from "../../redux/slicers/category.slice";
import { PRODUCT_LIMIT } from "../../constants/paging";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import qs from "qs";
import convertSlug from "../ConvertSlug";

const ProductList = () => {
    const { search } = useLocation();
    const searchParams = useMemo(() => {
        const params = qs.parse(search, { ignoreQueryPrefix: true });
        return {
            categoryId: params.categoryId
                ? params.categoryId.map((item) => parseInt(item))
                : [],
            sort: params.sort || "sold",
            order: params.order || "desc",
            from: params.from,
            to: params.to,
            keyword: params.keyword || "",
        };
    }, [search]);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openViewSort, setOpenViewSort] = useState(false);

    const { productList } = useSelector((state) => state.product);
    const { meta } = useSelector((state) => state.product.productList);
    const { categoryList } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(
            getProductListRequest({
                ...searchParams,
                sort: "sold",
                order: "desc",
                page: 1,
                limit: PRODUCT_LIMIT,
            })
        );
        dispatch(getCategoryListRequest());
    }, []);

    useEffect(() => {
        dispatch(
            getProductListRequest({
                ...searchParams,
                page: 1,
                limit: PRODUCT_LIMIT,
            })
        );
    }, [searchParams]);

    const handleChangeFilter = (values) => {
        const newFilterParams = { ...searchParams, categoryId: values };
        navigate(`/product/?${qs.stringify(newFilterParams)}`);
    };

    const handleChangeSort = (value) => {
        const convert = value.split(",");
        const newFilterParams = {
            ...searchParams,
            sort: convert[0],
            order: convert[1],
        };
        navigate(`/product/?${qs.stringify(newFilterParams)}`);
    };

    const onFinish = (values) => {
        if (values?.range?.from >= 0 && values?.range?.to >= 0) {
            const from = values.range.from;
            const to = values.range.to;
            const newFilterParams = { ...searchParams, from: from, to: to };
            navigate(`/product/?${qs.stringify(newFilterParams)}`);
        }
    };

    const handleShowMore = () => {
        dispatch(
            getProductListRequest({
                ...searchParams,
                page: meta.page + 1,
                limit: PRODUCT_LIMIT,
                isShowMore: true,
            })
        );
    };

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book.id}`);
    };

    const onClose = () => {
        setOpenViewSort(false);
    };

    const items = [
        {
            key: "sold,desc",
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: "updatedAt,desc",
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: "price,asc",
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: "price,desc",
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];
    return (
        <div style={{ background: "#efefef", padding: "20px 0" }}>
            <div
                className="homepage-container"
                style={{ maxWidth: 1300, margin: "0 auto" }}
            >
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0}>
                        <div
                            style={{
                                padding: "20px",
                                background: "#fff",
                                borderRadius: 5,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>
                                    {" "}
                                    <FilterTwoTone /> Bộ lọc tìm kiếm
                                </span>
                                <ReloadOutlined
                                    title="Reset"
                                    onClick={() => {
                                        form.resetFields();
                                        navigate(
                                            `/product/?${qs.stringify({
                                                ...searchParams,
                                                categoryId: [],
                                            })}`
                                        );
                                    }}
                                />
                            </div>
                            <Divider />
                            <Form onFinish={onFinish} form={form}>
                                <Checkbox.Group
                                    onChange={(values) => handleChangeFilter(values)}
                                    value={searchParams.categoryId}
                                >
                                    <Row>
                                        {categoryList.data.map((item, index) => {
                                            return (
                                                <Col
                                                    span={24}
                                                    key={`index-${index}`}
                                                    style={{ padding: "7px 0" }}
                                                >
                                                    <Checkbox value={item.id}>
                                                        {item.name}
                                                    </Checkbox>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Checkbox.Group>
                                <Divider />
                                <Form.Item
                                    label="Khoảng giá"
                                    labelCol={{ span: 24 }}
                                    style={{ width: "100%" }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <Form.Item
                                            name={["range", "from"]}
                                            style={{ maxWidth: "50%" }}
                                        >
                                            <InputNumber
                                                style={{ maxWidth: "100%" }}
                                                name="from"
                                                min={0}
                                                placeholder="đ TỪ"
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                        <span>-</span>
                                        <Form.Item
                                            name={["range", "to"]}
                                            style={{ maxWidth: "50%" }}
                                        >
                                            <InputNumber
                                                style={{ maxWidth: "100%" }}
                                                name="to"
                                                min={0}
                                                placeholder="đ ĐẾN"
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={() => form.submit()}
                                            style={{
                                                width: "100%",
                                                background: "#228b22",
                                            }}
                                            type="primary"
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                </Form.Item>
                                <Divider />
                                <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                                    <div>
                                        <Rate
                                            value={5}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 15,
                                            }}
                                        />
                                        <span className="ant-rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate
                                            value={4}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 15,
                                            }}
                                        />
                                        <span className="ant-rate-text">
                                            trở lên
                                        </span>
                                    </div>
                                    <div>
                                        <Rate
                                            value={3}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 15,
                                            }}
                                        />
                                        <span className="ant-rate-text">
                                            trở lên
                                        </span>
                                    </div>
                                    <div>
                                        <Rate
                                            value={2}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 15,
                                            }}
                                        />
                                        <span className="ant-rate-text">
                                            trở lên
                                        </span>
                                    </div>
                                    <div>
                                        <Rate
                                            value={1}
                                            disabled
                                            style={{
                                                color: "#ffce3d",
                                                fontSize: 15,
                                            }}
                                        />
                                        <span className="ant-rate-text">
                                            trở lên
                                        </span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col md={20} xs={24}>
                        <Spin spinning={productList.loading} tip="Loading...">
                            <div
                                style={{
                                    padding: "20px",
                                    background: "#fff",
                                    borderRadius: 5,
                                }}
                            >
                                <Row>
                                    <Tabs
                                        // defaultActiveKey="sold,desc"
                                        items={items}
                                        onChange={(value) => handleChangeSort(value)}
                                        activeKey={`${searchParams.sort},${searchParams.order}`}
                                        style={{ overflowX: "auto" }}
                                    />
                                </Row>
                                <Row
                                    className="customize-filter"
                                    onClick={() => setOpenViewSort(true)}
                                >
                                    <span>
                                        {" "}
                                        <FilterTwoTone />
                                        <span style={{ fontWeight: 500 }}>
                                            {" "}
                                            Lọc{" "}
                                        </span>
                                    </span>
                                </Row>
                                <Row className="customize-row">
                                    {productList.data.map((item, index) => {
                                        return (
                                            <div
                                                className="column"
                                                key={`book-${index}`}
                                                onClick={() =>
                                                    handleRedirectBook(item)
                                                }
                                            >
                                                <div className="wrapper">
                                                    <div className="thumbnail">
                                                        <img
                                                            src={item.thumbnail}
                                                            alt="thumbnail book"
                                                        />
                                                    </div>
                                                    <div
                                                        className="text"
                                                        title={item.mainText}
                                                    >
                                                        {item.mainText}
                                                    </div>
                                                    <div className="price">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(item?.price ?? 0)}
                                                    </div>
                                                    <div className="rating">
                                                        <Rate
                                                            value={5}
                                                            disabled
                                                            style={{
                                                                color: "#ffce3d",
                                                                fontSize: 10,
                                                            }}
                                                        />
                                                        <span>
                                                            Đã bán {item.sold}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Row>
                                <Divider />
                                {productList.data.length < meta.total && (
                                    <Flex justify="center">
                                        <Button onClick={handleShowMore}>
                                            Hiển thị thêm
                                        </Button>
                                    </Flex>
                                )}
                            </div>
                        </Spin>
                    </Col>
                </Row>
            </div>
            <Drawer
                title="Lọc sản phẩm"
                width={"100vw"}
                onClose={onClose}
                open={openViewSort}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                    onValuesChange={(changedValues, values) =>
                        handleChangeFilter(changedValues, values)
                    }
                >
                    <Form.Item
                        name="category"
                        label="Danh mục sản phẩm"
                        labelCol={{ span: 24 }}
                    >
                        <Checkbox.Group>
                            <Row>
                                {categoryList.data.map((item, index) => {
                                    return (
                                        <Col
                                            span={24}
                                            key={`index-${index}`}
                                            style={{ padding: "7px 0" }}
                                        >
                                            <Checkbox value={item.id}>
                                                {item.name}
                                            </Checkbox>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                        <Row gutter={[10, 10]} style={{ width: "100%" }}>
                            <Col xl={11} md={24}>
                                <Form.Item name={["range", "from"]}>
                                    <InputNumber
                                        name="from"
                                        min={0}
                                        placeholder="đ TỪ"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={2} md={0}>
                                <div> - </div>
                            </Col>
                            <Col xl={11} md={24}>
                                <Form.Item name={["range", "to"]}>
                                    <InputNumber
                                        name="to"
                                        min={0}
                                        placeholder="đ ĐẾN"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div>
                            <Button
                                onClick={() => form.submit()}
                                style={{ width: "100%" }}
                                type="primary"
                            >
                                Áp dụng
                            </Button>
                        </div>
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                        <div>
                            <Rate
                                value={5}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 15 }}
                            />
                            <span className="ant-rate-text"></span>
                        </div>
                        <div>
                            <Rate
                                value={4}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 15 }}
                            />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate
                                value={3}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 15 }}
                            />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate
                                value={2}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 15 }}
                            />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate
                                value={1}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 15 }}
                            />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default ProductList;
