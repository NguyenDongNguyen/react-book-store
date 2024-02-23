import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserInfoRequest,
    updateUserInfoRequest,
} from "../../redux/slicers/auth.slice";
const bcrypt = require("bcryptjs");

const ChangePassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    // lấy thông tin user khi lần đầu tiên đăng nhập vào
    useEffect(() => {
        dispatch(getUserInfoRequest({ id: userInfo.data.id }));
    }, []);

    const onFinish = async (values) => {
        const { id, oldpass, newpass } = values;
        setIsSubmit(true);
        const comparePassword = bcrypt.compareSync(oldpass, userInfo.data.password);
        if (comparePassword) {
            dispatch(
                updateUserInfoRequest({
                    id: id,
                    data: {
                        password: newpass,
                    },
                })
            );
            form.setFieldValue("oldpass", "");
            form.setFieldValue("newpass", "");
        } else {
            form.setFields([
                {
                    name: "oldpass",
                    errors: ["Password is incorrect"],
                },
            ]);
        }
        setIsSubmit(false);
    };

    useEffect(() => {
        if (userInfo.data) {
            form.setFieldsValue({
                id: userInfo.data.id,
                email: userInfo.data.email,
            });
        }
    }, []);

    return (
        <div style={{ minHeight: 400, marginLeft: 30 }}>
            <Row>
                <Col sm={24} md={12}>
                    <Form
                        form={form}
                        name="changePassword"
                        layout="vertical"
                        onFinish={(values) => onFinish(values)}
                    >
                        <Form.Item label="Id" name="id" hidden>
                            <Input placeholder="Id" disabled />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Email" disabled />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="oldpass"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Password is required!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="newpass"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Password is required!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Xác nhận
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ChangePassword;
