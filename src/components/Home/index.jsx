import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination, Flex, Drawer } from 'antd';
import './home.scss';
import { getProductListRequest } from '../../redux/slicers/product.slice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryListRequest } from '../../redux/slicers/category.slice';
import { PRODUCT_LIMIT } from '../../constants/paging'
import { useNavigate, useOutletContext } from 'react-router-dom';

const Home = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useOutletContext()
    const [openViewSort, setOpenViewSort] = useState(false)
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState(['updatedAt', 'desc']);
    
    const { productList } = useSelector((state) => state.product)
    const { meta } = useSelector((state) => state.product.productList)
    const { categoryList } = useSelector((state) => state.category)


    useEffect(() => {
        dispatch(getProductListRequest({
            page: meta.page,
            limit: meta.limit,
            isShowMore: true,
            sort: sort[0],
            order: sort[1]
        }))
        dispatch(getCategoryListRequest())
    }, [])

    useEffect(() => {
        const searchBook = () => {
            dispatch(getProductListRequest({
                page: 1,
                limit: PRODUCT_LIMIT,
                categoryId: filter,
                sort: sort[0],
                order: sort[1],
                keyword: searchTerm
            }))
        }
        searchBook()
    }, [searchTerm])

    const handleChangeFilter = (changedValues, values) => {
        setFilter(values.category)
        dispatch(getProductListRequest({
            page: 1,
            limit: PRODUCT_LIMIT,
            categoryId: values.category,
            sort: sort[0],
            order: sort[1],
        }))
    }

    const handleChangeSort = (value) => {
        const convert = value.split(",")
        setSort(convert)
        dispatch(getProductListRequest({
            page: 1,
            limit: PRODUCT_LIMIT,
            categoryId: filter,
            sort: convert[0],
            order: convert[1]
        }))
    }

    const onFinish = (values) => {
        if (values?.range?.from >= 0 && values?.range?.to >= 0) {
            const from = values.range.from
            const to = values.range.to
            dispatch(getProductListRequest({
                page: 1,
                limit: PRODUCT_LIMIT,
                categoryId: filter,
                sort: sort[0],
                order: sort[1],
                from: from,
                to: to
            }))
        }
    }

    const handleShowMore = () => {
        dispatch(getProductListRequest({
            page: meta.page + 1,
            limit: PRODUCT_LIMIT,
            isShowMore: true,
            categoryId: filter,
            sort: sort[0],
            order: sort[1],
        }))
    }

    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book.id}`)
    }

    const onClose = () => {
        setOpenViewSort(false);
    }

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
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0}>
                        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                                <ReloadOutlined title="Reset" onClick={() => {
                                    form.resetFields()
                                    dispatch(getProductListRequest({null: null}))
                                }} />
                            </div>
                            <Divider />
                            <Form
                                onFinish={onFinish}
                                form={form}
                                onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                            >
                                <Form.Item
                                    name="category"
                                    label="Danh mục sản phẩm"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group >
                                        <Row>
                                            {categoryList.data.map((item, index) => {
                                                return (
                                                    <Col span={24} key={`index-${index}`} style={{ padding: '7px 0' }}>
                                                        <Checkbox value={item.id} >
                                                            {item.name}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Khoảng giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <Form.Item name={["range", 'from']}>
                                            <InputNumber
                                                name='from'
                                                min={0}
                                                placeholder="đ TỪ"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>
                                        <span >-</span>
                                        <Form.Item name={["range", 'to']}>
                                            <InputNumber
                                                name='to'
                                                min={0}
                                                placeholder="đ ĐẾN"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Button onClick={() => form.submit()}
                                            style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                                    </div>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Đánh giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col md={20} xs={24} >
                        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                            <Row>
                                <Tabs
                                    defaultActiveKey="sold,desc"
                                    items={items}
                                    onChange={(value) => handleChangeSort(value)}
                                    style={{ overflowX: "auto" }}
                                />
                            </Row>
                            <Row className='customize-filter' onClick={() => setOpenViewSort(true)}>
                                <span> <FilterTwoTone />
                                    <span style={{ fontWeight: 500 }}> Lọc </span>
                                </span>
                            </Row>
                            <Row className='customize-row'>
                                {productList.data.map((item, index) => {
                                        return (
                                            <div className="column" key={`book-${index}`} onClick={() => handleRedirectBook(item)}>
                                                <div className='wrapper'>
                                                    <div className='thumbnail'>
                                                        <img src={item.thumbnail} alt="thumbnail book" />
                                                    </div>
                                                    <div className='text' title={item.mainText}>{item.mainText}</div>
                                                    <div className='price'>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price ?? 0)}
                                                    </div>
                                                    <div className='rating'>
                                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                        <span>Đã bán {item.sold}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </Row>
                            <Divider />
                            {productList.data.length < meta.total &&
                                <Flex justify='center'>
                                    <Button onClick={handleShowMore}>
                                        Hiển thị thêm
                                    </Button>
                                </Flex>
                            }
                        </div>
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
                    onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
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
                                        <Col span={24} key={`index-${index}`} style={{ padding: '7px 0' }}>
                                            <Checkbox value={item.id} >
                                                {item.name}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="Khoảng giá"
                        labelCol={{ span: 24 }}
                    >
                        <Row gutter={[10, 10]} style={{ width: "100%" }}>
                            <Col xl={11} md={24}>
                                <Form.Item name={["range", 'from']}>
                                    <InputNumber
                                        name='from'
                                        min={0}
                                        placeholder="đ TỪ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={2} md={0}>
                                <div > - </div>
                            </Col>
                            <Col xl={11} md={24}>
                                <Form.Item name={["range", 'to']}>
                                    <InputNumber
                                        name='to'
                                        min={0}
                                        placeholder="đ ĐẾN"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div>
                            <Button onClick={() => form.submit()}
                                style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                        </div>
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="Đánh giá"
                        labelCol={{ span: 24 }}
                    >
                        <div>
                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                            <span className="ant-rate-text"></span>
                        </div>
                        <div>
                            <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                        <div>
                            <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                            <span className="ant-rate-text">trở lên</span>
                        </div>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default Home;