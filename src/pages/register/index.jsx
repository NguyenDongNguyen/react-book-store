import { Button, Input, Form, Divider, Row, Col, message, notification } from "antd";
import "./register.scss";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../redux/slicers/auth.slice";
import { useEffect } from "react";

function RegisterPage() {
    const [registerForm] = Form.useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registerData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (registerData.error) {
            registerForm.setFields([
                {
                    name: "email",
                    errors: [registerData.error],
                },
            ]);
        }
    }, [registerData.error]);

    const handleRegister = (values) => {
        const { fullName, email, password, phone } = values;
        dispatch(
            registerRequest({
                data: {
                    fullName: fullName,
                    email: email,
                    password: password,
                    phone: phone,
                    role: "user",
                    birthday: null,
                },
                callback: () => navigate("/login"),
            })
        );
    };

    return (
        <Row className="register-container">
            <Col xs={24} md={10} className="register-page">
                <h1 style={{ textAlign: "center" }}>Đăng Ký Người Dùng Mới</h1>
                <Divider />
                <Form
                    form={registerForm}
                    name="register"
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    onFinish={(values) => handleRegister(values)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Title is required!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
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
                    <Form.Item
                        label="Confirm password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu là bắt buộc",
                            },
                            (params) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        params.getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Mật khẩu xác nhận không khớp")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: "[0-9]{3}[0-9]{3}[0-9]{4}",
                                whitespace: true,
                                message: "Phone is required!",
                            },
                        ]}
                    >
                        <Input placeholder="Phone number" />
                    </Form.Item>
                    <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={registerData.loading}
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <p className="text text-normal">
                        Bạn đã có tài khoản ?
                        <span>
                            <Link to="/login"> Đăng Nhập </Link>
                        </span>
                    </p>
                </Form>
            </Col>
        </Row>
    );
}

export default RegisterPage;
