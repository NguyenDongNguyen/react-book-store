import Slider from "react-slick";
import "./home.scss";
import { Col, Image, Rate, Row } from "antd";
import SliderComponent from "../SliderComponent/SliderComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductListRequest } from "../../redux/slicers/product.slice";
import { RightCircleOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import convertSlug from "../ConvertSlug";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productList } = useSelector((state) => state.product);
    console.log("🚀 ~ Home ~ productList:", productList);

    useEffect(() => {
        dispatch(getProductListRequest({ page: 1, sort: "sold", order: "desc" }));
    }, []);

    const listAuthor = [
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/du-6-au-8-avril-on-pourra-rencontrer-caryl-ferey-a-quais-du-polar-plus-jamais-seul-est-en-lice-pour-le-prix-polar-en-serie-photo-d-archives-pierre-augros-1522611099.jpeg?v=1705585948700",
            name: "Caryl Férey",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/a001157172-23.jpeg?v=1705927222763",
            name: "Urakami Tetsuya",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/lightman.jpeg?v=1705296925087",
            name: "Alan Lightman",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/perec.jpg?v=1705299179727",
            name: "Georges Perec",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/0000000343090-p0-v2-s591x700.jpeg?v=1705927357883",
            name: "Richard Paul Evans",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-a86f7d62-120e-45a6-b0fb-a956b2bc4a18.jpg?v=1705287402150",
            name: "Marnie Old",
        },
        {
            avatar: "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-d9986189-2932-4f1f-b277-d9c1bfff2bf5.jpg?v=1705287049677",
            name: "James Maclaine",
        },
    ];

    const introProduct = [
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/seo-2.png?v=1700487959943",
            title: "5 bí quyết dưỡng ẩm đắt giá - Chăm sóc da hiệu quả ngay trong mùa",
            date: "Thứ Hai, 20/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/seo-1.png?v=1700281321867",
            title: "Khám phá bí mật làm thịt lợn quay bì giòn tại gia",
            date: "Thứ Bảy, 18/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/nha-nam-website-3154da6f-42a3-4ff9-b4c5-f7b217989147.png?v=1699532816857",
            title: "Những cuốn sách dành cho người hướng nội",
            date: "Thứ Năm, 09/11/2023",
        },
        {
            image: "https://bizweb.dktcdn.net/100/363/455/articles/ban-do-cf.png?v=1698399264317",
            title: "Sự thật ám ảnh về loại cafe đắt nhất thế giới",
            date: "Thứ Sáu, 27/10/2023",
        },
    ];

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book.id}`);
    };

    return (
        <div
            className="container"
            style={{
                height: "100%",
            }}
        >
            <div className="banner">
                <Row>
                    <Col
                        md={24}
                        lg={16}
                        style={{
                            paddingRight: "20px",
                            maxHeight: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <div className="slider">
                            <SliderComponent />
                        </div>
                    </Col>
                    <Col md={24} lg={8} style={{ paddingRight: "20px" }}>
                        <Row>
                            {introProduct.map((item) => (
                                // <Col md={12} lg={24}>
                                <div className="item">
                                    <div className="item-blog">
                                        <Row>
                                            <Col span={10}>
                                                <Image
                                                    height="100%"
                                                    width="100%"
                                                    src={item.image}
                                                />
                                            </Col>
                                            <Col
                                                span={14}
                                                style={{
                                                    padding: "10px 20px 15px",
                                                }}
                                            >
                                                <h3>{item.title}</h3>
                                                <span>{item.date}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                // </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>

            <div style={{ padding: "30px 80px" }}>
                <div className="section-author">
                    <div className="title-author">
                        <h2>Các tác giả</h2>
                    </div>
                    <div className="slide-author">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={0}
                            slidesPerView={5}
                            navigation
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 3,
                                },
                                950: {
                                    slidesPerView: 5,
                                },
                            }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log("slide change")}
                        >
                            {listAuthor.map((author) => (
                                <SwiperSlide>
                                    <div className="item-author">
                                        <Image
                                            preview={false}
                                            style={{ borderRadius: "50%" }}
                                            width="150px"
                                            height="150px"
                                            src={author.avatar}
                                        />
                                        <h3>{author.name}</h3>
                                    </div>
                                </SwiperSlide>
                            ))}
                            ...
                        </Swiper>
                    </div>
                </div>

                <div className="book-related">
                    <div className="title-border">
                        <h2>Sản phẩm bán chạy</h2>
                        <Link class="link-more" title="xem thêm" to="/product">
                            Xem thêm{" "}
                            <RightCircleOutlined style={{ paddingLeft: "10px" }} />
                        </Link>
                    </div>
                    <div className="slide-book">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={0}
                            slidesPerView={5}
                            navigation
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 3,
                                },
                                950: {
                                    slidesPerView: 5,
                                },
                            }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log("slide change")}
                        >
                            {productList?.data.map((item, index) => (
                                <SwiperSlide>
                                    <div
                                        className="column"
                                        key={`book-${index}`}
                                        onClick={() => handleRedirectBook(item)}
                                    >
                                        <div className="wrapper">
                                            <div className="thumbnail">
                                                <img
                                                    src={item.thumbnail}
                                                    alt="thumbnail book"
                                                />
                                            </div>
                                            <div className="content">
                                                <div
                                                    className="text"
                                                    title={item.mainText}
                                                >
                                                    {item.mainText}
                                                </div>
                                                <div className="price">
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(item?.price ?? 0)}
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
                                                    <span>Đã bán {item.sold}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            ...
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
