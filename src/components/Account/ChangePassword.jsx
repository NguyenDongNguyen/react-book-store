import { Button, Col, Form, Input, Row, message, notification } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { callUpdatePassword } from "../../services/api";

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    // const {user} = useSelector(state => state.account)  

    // const onFinish = async (values) => {
    //     const { email, oldpass, newpass } = values
    //     setIsSubmit(true)
    //     const res = await callUpdatePassword(email, oldpass, newpass)
    //     if (res && res.data) {
    //         message.success('Cập nhật mật khẩu thành công')
    //         form.setFieldValue('oldpass', '')
    //         form.setFieldValue('newpass', '')
    //     } else {
    //         notification.error({
    //             message: 'Đã có lỗi xảy ra',
    //             description: res.message
    //         })
    //     }
    //     setIsSubmit(false)
    // }

    // useEffect(() => {
    //     if (user) {
    //         form.setFieldValue('email', user.email);
    //     }
    // }, []);

    return (
        <div style={{ minHeight: 400, marginLeft: 30}}>
            <Row>
                <Col sm={24} md={12}>
                    <Form
                        form={form}
                        name="changePassword"
                        layout="vertical"
                        // onFinish={(values) => onFinish(values)}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                        >
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
    )
}

export default ChangePassword