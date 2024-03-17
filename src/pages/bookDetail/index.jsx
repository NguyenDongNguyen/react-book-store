import { Link, useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailRequest } from "../../redux/slicers/product.slice";
import { Breadcrumb, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import qs from "qs";

function BookPage() {
    let location = useLocation();

    const dispatch = useDispatch();
    const { productDetail } = useSelector((state) => state.product);

    // const [dataBook, setDataBook] = useState('')

    let params = new URLSearchParams(location.search);
    const id = params.get("id"); // book id

    useEffect(() => {
        fetchBook(id);
    }, [id]);

    const fetchBook = (id) => {
        dispatch(getProductDetailRequest({ id: id }));
    };

    return (
        <>
            <Breadcrumb
                style={{ padding: "10px 0", maxWidth: "1300px", margin: "0 auto" }}
                items={[
                    {
                        title: (
                            <Link to={"/product"}>
                                <Space>
                                    <HomeOutlined />
                                    <span>Kho Sách</span>
                                </Space>
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <Link
                                to={`/product/?${qs.stringify({
                                    "categoryId[]":
                                        productDetail?.data?.category?.id,
                                })}`}
                            >
                                <Space>
                                    <span>
                                        {productDetail?.data?.category?.name}
                                    </span>
                                </Space>
                            </Link>
                        ),
                    },
                    {
                        title: "Sách hiểu về trái tim",
                    },
                ]}
            />
            <ViewDetail />
        </>
    );
}

export default BookPage;
