import { Image } from "antd";
import { WrapperSliderStyle, HeaderSlider, TimeSlider } from "./style";
import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";
import slider3 from "../../assets/slider3.webp";

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const arrImages = [
        {
            image: slider1,
            content:
                "Tin bản quyền: Until August - Tác phẩm chưa xuất bản của tác giả Trăm năm cô đơn",
            time: "Thứ Năm, 29/02/2024",
        },
        {
            image: slider2,
            content:
                "Tọa đàm ra mắt tác phẩm Địa lý hành chính và tập quán của người Việt",
            time: "Thứ Hai, 29/01/2024",
        },
        {
            image: slider3,
            content:
                "Hội sách kết hợp hoạt động văn hoá thu hút độc giả trước thềm Tết Nguyên Đán",
            time: "Thứ Năm, 18/01/2024",
        },
    ];

    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((item) => {
                return (
                    <>
                        <Image
                            // style={{ objectFit: "cover" }}
                            key={item.image}
                            src={item.image}
                            alt="slider"
                            preview={false}
                            width="100%"
                            height="510px"
                        />
                        <div
                            style={{
                                padding: "10px 20px 15px",
                                background: "#fff",
                                height: "80px",
                            }}
                        >
                            <HeaderSlider>{item.content}</HeaderSlider>
                            <TimeSlider>{item.time}</TimeSlider>
                        </div>
                    </>
                );
            })}
        </WrapperSliderStyle>
    );
};

export default SliderComponent;
