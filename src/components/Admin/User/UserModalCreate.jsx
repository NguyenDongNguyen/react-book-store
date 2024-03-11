import { Divider, Modal, Form, Input, notification, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../../../redux/slicers/auth.slice";

const UserModalCreate = ({ openModalCreate, setOpenModalCreate, fetchUser }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { createUserData } = useSelector((state) => state.auth);

    // gán biến form cho modal để có thể submit đc data của form
    const [form] = Form.useForm();

    useEffect(() => {
        if (createUserData.error) {
            form.setFields([
                {
                    name: "email",
                    errors: [createUserData.error],
                },
            ]);
        }
    }, [createUserData.error]);

    const onFinish = async (values) => {
        const { fullName, password, email, phone } = values;
        setIsSubmit(true);
        dispatch(
            createUserRequest({
                data: {
                    ...values,
                },
            })
        );
        form.resetFields();
        setOpenModalCreate(false);
        fetchUser();
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModalCreate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Huỷ"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    onFinish={onFinish}
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
                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;
