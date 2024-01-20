import { Button, Input, Form, Divider, Row, Col, message, notification} from "antd";
import './login.scss'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function LoginPage() {
    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)

    const dispatch = useDispatch()

    return (
        <Row className="login-container">
            <Col xs={24} md={10} className="login-page"  >
                <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
                <Divider />
                <Form
                    name="login"
                    layout="vertical" 
                    labelCol={{ span: 6 }}
                    style={{maxWidth: 600, margin: '0 auto'}}
                    // onFinish={(values) => handleLogin(values)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="username"
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
                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Login
                        </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <p className="text text-normal">Bạn chưa có tài khoản ?
                        <span>
                            <Link to='/register'> Đăng Ký </Link>
                        </span>
                    </p>
                </Form>
            </Col>
        </Row>
    );
}

export default LoginPage;