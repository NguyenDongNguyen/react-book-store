import { Row, Col, Table, Tag, Button } from "antd";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { getFavoriteListRequest } from "../../redux/slicers/favorite.slice";
import convertSlug from "../ConvertSlug";
import { useNavigate } from "react-router-dom";

const ProductFavorite = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favoriteList } = useSelector((state) => state.favorite);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo.data.id) {
            fetchFavorite();
        }
    }, []);

    const fetchFavorite = async () => {
        dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
    };

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book.id}`);
    };

    const columns = [
        {
            title: "STT",
            render: (text, object, index) => index + 1,
        },
        {
            title: "Hình ảnh",
            dataIndex: "product",
            render: (text, record, index) => {
                return (
                    <>
                        <img
                            onClick={() => handleRedirectBook(record.product)}
                            style={{ maxWidth: "100px", cursor: "pointer" }}
                            src={record.product.thumbnail}
                            alt="image"
                        />
                    </>
                );
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "product",
            render: (text, record, index) => {
                return <>{record.product.mainText}</>;
            },
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "product",
            render: (text, record, index) => {
                return <>{record.product.price}</>;
            },
        },
    ];

    return (
        <div>
            <div
                className="history-container"
                style={{ maxWidth: 1440, margin: "0 auto" }}
            >
                {userInfo.data.id ? (
                    <div className="history-list">
                        <Row gutter={[20, 20]}>
                            <Col span={24}>
                                <Table
                                    className="def"
                                    rowKey="_id"
                                    loading={favoriteList.loading}
                                    columns={columns}
                                    dataSource={favoriteList.data}
                                    pagination={false}
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

export default ProductFavorite;
