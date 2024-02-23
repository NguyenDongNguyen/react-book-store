import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Col,
    Form,
    Input,
    Row,
    Upload,
    message,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoRequest } from "../../redux/slicers/auth.slice";

const UserInfo = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    // const {user, tempAvatar} = useSelector(state => state.account)
    // const [userAvatar, setUserAvatar] = useState(user.avatar ?? '')
    const [isSubmmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (userInfo.data) {
            form.setFieldsValue({
                id: userInfo.data.id,
                email: userInfo.data.email,
                fullName: userInfo.data.fullName,
                phone: userInfo.data.phone,
            });
        }
    }, []);

    // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${tempAvatar || user?.avatar}`

    // const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    //     const res = await callUpdateAvatar(file)
    //     if (res && res.data) {
    //         const newAvatar = res.data.fileUploaded
    //         dispatch(doUploadAvatarAction({ avatar: newAvatar }))
    //         setUserAvatar(newAvatar)
    //         onSuccess('ok')
    //     } else {
    //         onError('Đã có lỗi khi upload file')
    //     }
    // }

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUpLoadList: false,
        // customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status === "uploading") {
            }
            if (info.file.status === "done") {
                message.success("Upload file thành công");
            } else if (info.file.status === "error") {
                message.success("Upload file thất bại");
            }
        },
    };

    const onFinish = async (values) => {
        const { id, fullName, phone } = values;
        setIsSubmit(true);
        dispatch(
            updateUserInfoRequest({
                id: id,
                data: {
                    fullName,
                    phone,
                },
            })
        );
        setIsSubmit(false);
    };

    return (
        <div style={{ minHeight: 400 }}>
            <Row>
                <Col sm={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                size={{
                                    xs: 32,
                                    sm: 64,
                                    md: 80,
                                    lg: 128,
                                    xl: 160,
                                    xxl: 200,
                                }}
                                icon={<AntDesignOutlined />}
                                // src={urlAvatar}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} md={12}>
                    <Form
                        form={form}
                        name="updateInfo"
                        layout="vertical"
                        onFinish={(values) => onFinish(values)}
                    >
                        <Form.Item label="Id" name="id" hidden>
                            <Input placeholder="Email" disabled />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Email" disabled />
                        </Form.Item>
                        <Form.Item
                            label="Tên hiển thị"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Name is required!",
                                },
                            ]}
                        >
                            <Input placeholder="Content" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Phone is required!",
                                },
                            ]}
                        >
                            <Input placeholder="Content" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSubmmit}>
                            Cập nhật
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default UserInfo;
