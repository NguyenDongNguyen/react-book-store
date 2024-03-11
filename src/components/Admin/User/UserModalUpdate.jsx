import { Divider, Modal, Form, Input, notification, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoRequest } from "../../../redux/slicers/auth.slice";
// import { callUpdateUser } from '../../../services/api';

function UserModalUpdate({
    openModalUpdate,
    setOpenModalUpdate,
    dataUpdate,
    setDataUpdate,
    fetchUser,
}) {
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();

    // gán biến form cho modal để có thể submit đc data của form
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate]);

    const onFinish = async (values) => {
        const { id, fullName, phone } = values;
        setIsSubmit(true);
        dispatch(
            updateUserInfoRequest({
                id,
                data: {
                    fullName,
                    phone,
                },
            })
        );
        setOpenModalUpdate(false);
        fetchUser();
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Cập nhật người dùng"
                open={openModalUpdate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => setOpenModalUpdate(false)}
                okText={"Lưu"}
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
                    // initialValues={dataUpdate}
                >
                    <Form.Item
                        hidden
                        label="Id"
                        name="id"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Title is required!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Fullname is required!",
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
                        <Input placeholder="Email" disabled />
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
}

export default UserModalUpdate;
