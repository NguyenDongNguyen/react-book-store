import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from "moment";
//FORMAT_DATE_DISPLAY = 'DD-MM-YYYY HH:mm:ss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import { useLocation } from "react-router-dom";

const BookViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail } = props;

    const dispatch = useDispatch();
    const { productDetail } = useSelector((state) => state.product);

    let { search } = useLocation();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        dispatch(getProductDetailRequest({ id: search.slice(1) }));
    }, [dispatch, search]);

    useEffect(() => {
        if (productDetail.data) {
            let imgThumbnail = {},
                imgSlider = [];
            if (productDetail.data?.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: productDetail.data.thumbnail,
                    status: "done",
                    url: productDetail.data.thumbnail,
                };
            }
            if (
                productDetail.data?.slider &&
                productDetail.data?.slider.length > 0
            ) {
                productDetail.data.slider.map((item) => {
                    imgSlider.push({
                        uid: uuidv4(),
                        name: item,
                        status: "done",
                        url: item,
                    });
                });
            }
            setFileList([...imgSlider, imgThumbnail]);
        }
    }, [productDetail.data]);

    const onClose = () => {
        setOpenViewDetail(false);
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions title="Thông tin Book" bordered column={2}>
                    <Descriptions.Item label="Id">
                        {productDetail?.data?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên sách">
                        {productDetail?.data?.mainText}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tác giả">
                        {productDetail?.data?.author}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(productDetail?.data?.price ?? 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng">
                        {productDetail?.data?.quantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="Đã bán">
                        {productDetail?.data?.sold}
                    </Descriptions.Item>

                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge
                            status="processing"
                            text={productDetail?.data?.category?.name}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(productDetail?.data?.createdAt).format(
                            "DD-MM-YYYY HH:mm:ss"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(productDetail?.data?.updatedAt).format(
                            "DD-MM-YYYY HH:mm:ss"
                        )}
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left"> Ảnh Books </Divider>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={{ showRemoveIcon: false }}
                ></Upload>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
            </Drawer>
        </>
    );
};
export default BookViewDetail;
