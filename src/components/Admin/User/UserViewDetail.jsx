import { Badge, Drawer } from "antd";
import { Descriptions } from "antd";
import moment from "moment";

const UserViewDetail = ({
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
}) => {
    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    };

    return (
        <>
            <Drawer
                title="Basic Drawer"
                width={"50vw"}
                placement="right"
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions title="User Info" bordered column={2}>
                    <Descriptions.Item label="Id">
                        {dataViewDetail?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">
                        {dataViewDetail?.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {dataViewDetail?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {dataViewDetail?.phone}
                    </Descriptions.Item>

                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format(
                            "DD-MM-YYYY HH:mm:ss"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format(
                            "DD-MM-YYYY HH:mm:ss"
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};

export default UserViewDetail;
