import { Button, Input, Form, Divider, Row, Col, message, notification } from "antd";
import "./login.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest } from "../../redux/slicers/auth.slice";

function LoginPage() {
    const [loginForm] = Form.useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (loginData.error) {
            loginForm.setFields([
                {
                    name: "email",
                    errors: [" "],
                },
                {
                    name: "password",
                    errors: [loginData.error],
                },
            ]);
        }
    }, [loginData.error]);

    const handleLogin = (values) => {
        dispatch(
            loginRequest({
                data: values,
                callback: (role) => {
                    role === "ADMIN" ? navigate("/admin") : navigate("/");
                },
            })
        );
    };

    return (
        <Row className="login-container">
            <Col xs={24} md={10} className="login-page">
                <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
                <Divider />
                <Form
                    form={loginForm}
                    name="login"
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    onFinish={(values) => handleLogin(values)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                whitespace: true,
                                message: "Email is required!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loginData.loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <p className="text text-normal">
                        Bạn chưa có tài khoản ?
                        <span>
                            <Link to="/register"> Đăng Ký </Link>
                        </span>
                    </p>
                </Form>
            </Col>
        </Row>
    );
}

export default LoginPage;
