import "./order.scss";
import { Breadcrumb, Button, Result, Space, Steps } from "antd";
import { useState } from "react";
import ViewOrder from "../../components/Order/ViewOrder";
import Payment from "../../components/Order/Payment";
import { HomeOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const OrderPage = (props) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div style={{ background: "#efefef", padding: "20px 0" }}>
            <div
                className="order-container"
                style={{ maxWidth: 1440, margin: "0 auto" }}
            >
                <Breadcrumb
                    style={{ paddingBottom: "10px" }}
                    items={[
                        {
                            title: (
                                <Link to={"/"}>
                                    <Space>
                                        <HomeOutlined />
                                        <span>Trang chủ</span>
                                    </Space>
                                </Link>
                            ),
                        },
                        {
                            title: "Giỏ hàng",
                        },
                    ]}
                />
                <div className="order-steps">
                    <Steps
                        size="small"
                        current={currentStep}
                        status={"finish"}
                        items={[
                            {
                                title: "Đơn hàng",
                            },
                            {
                                title: "Đặt hàng",
                            },
                            {
                                title: "Thanh toán",
                            },
                        ]}
                    />
                </div>
                {currentStep === 0 && <ViewOrder setCurrentStep={setCurrentStep} />}
                {currentStep === 1 && <Payment setCurrentStep={setCurrentStep} />}
                {currentStep === 2 && (
                    <Result
                        icon={<SmileOutlined />}
                        title="Đơn hàng đã được đặt thành công"
                        extra={
                            <Button
                                type="primary"
                                onClick={() => navigate("/history")}
                            >
                                Xem lịch sử
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default OrderPage;
