import { Modal, Tabs } from "antd"
import { useState } from "react"
import UserInfo from "./UserInfo"
import ChangePassword from "./ChangePassword"

const ManageAccount = ({isModalOpen, setIsModalOpen}) => {

    const items = [
        {
            key: 'info',
            label: 'Cập nhật thông tin',
            children: <UserInfo />
        },
        {
            key: 'password',
            label: 'Đổi mật khẩu',
            children: <ChangePassword />
        },
    ]

    return (
        <Modal
            title='Quản lý tài khoản'
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            width={'60vw'}
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
            />
        </Modal>
    )
}

export default ManageAccount