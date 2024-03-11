import { Col, Row } from "antd";
import "./footer.scss";
import { FaReact } from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoIosPhonePortrait } from "react-icons/io";

function Footer() {
    return (
        <footer>
            {/* <div>React test &copy;2024 by dongnguyen</div> */}
            <div className="social-marketing">
                <div className="container">
                    <Row style={{ margin: "0 -10px" }}>
                        <Col md={24} lg={8}>
                            <div className="social">
                                <a href="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/facebook-icon.png?1704690471681"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/instagram-icon.png?1704690471681"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/lazada-icon.png?1704690471681"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/shopee-icon.png?1704690471681"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/tiktok-icon.png?1704690471681"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Col>
                        <Col sm={24} md={24} lg={16}>
                            <div className="email-mkt">
                                <Row>
                                    <Col sm={24} md={12} lg={12}>
                                        <h4>
                                            Nhận thông tin khuyến mãi từ chúng tôi
                                        </h4>
                                    </Col>
                                    <Col sm={24} md={12} lg={12}>
                                        <div className="mail">
                                            <form action="">
                                                <input
                                                    type="text"
                                                    placeholder="Nhận email ưu đãi"
                                                />
                                                <button>Đăng kí</button>
                                            </form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="information">
                <div className="container-info">
                    <Row style={{ margin: "0 -10px" }}>
                        <Col span={6} style={{ padding: "0 10px" }}>
                            <a
                                href="#"
                                style={{ display: "block", marginBottom: "20px" }}
                            >
                                <FaReact
                                    className="rotate icon-react"
                                    width="64px"
                                />
                                <span>Bởi vì sách là sách thế giới</span>
                            </a>
                            <ul>
                                <li>
                                    <CiLocationOn color="green" />
                                    <p style={{ paddingLeft: "8px" }}>
                                        Số 59, Đỗ Quang, Trung Hoà, Cầu Giấy, Hà Nội.
                                    </p>
                                </li>
                                <li>
                                    <CiMail color="green" />
                                    <a href="mailto:info@nhanam.vn">
                                        info@nhanam.vn
                                    </a>
                                </li>
                                <li>
                                    <FiPhone color="green" />
                                    <a class="phone" href="tel:02435146876">
                                        02435146876
                                    </a>
                                </li>
                                <li>
                                    <IoIosPhonePortrait color="green" />
                                    <a class="phone" href="tel:0903244248">
                                        0903244248
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col span={6} style={{ padding: "0 10px" }}>
                            <h4 className="title-menu">Giới thiệu</h4>
                            <ul className="list-menu">
                                <li>
                                    <a href="#">Hệ thống hiệu sách</a>
                                </li>
                                <li>
                                    <a href="#">Hệ thống phát hành</a>
                                </li>
                                <li>
                                    <a href="#">Tuyển dụng</a>
                                </li>
                                <li>
                                    <a href="#">Liên hệ với chúng tôi</a>
                                </li>
                            </ul>
                        </Col>
                        <Col span={6} style={{ padding: "0 10px" }}>
                            <h4 className="title-menu">Chính sách</h4>
                            <ul className="list-menu">
                                <li>
                                    <a href="#">Chính sách bảo mật</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách đổi trả/hoàn tiền</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách thanh toán/ vận chuyển</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={24} lg={6}>
                            <h4 className="title-menu">PhưƠng thức thanh toán</h4>
                            <div className="payment">
                                <img
                                    src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/payment_method.png?1704690471681"
                                    alt=""
                                />
                            </div>
                            <div className="payment">
                                <img
                                    src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/bocongthuong.png?1704690471681"
                                    alt=""
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
