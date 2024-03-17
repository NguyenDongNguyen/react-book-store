import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";

const AdvancedSearchForm = ({ handleFilter }) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { categoryList } = useSelector((state) => state.category);

    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    useEffect(() => {
        dispatch(getCategoryListRequest());
    }, []);

    const renderCategoryOptions = useMemo(() => {
        return categoryList.data.map((item) => {
            return (
                <Select.Option key={item.id} value={item.code}>
                    {item.name}
                </Select.Option>
            );
        });
    }, [categoryList.data]);

    return (
        <Form form={form} name="advanced_search" style={formStyle}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`mainText`}
                        label={`Tên sách`}
                    >
                        <Input
                            id="keyword"
                            onChange={(e) => handleFilter("keyword", e.target.value)}
                            placeholder="Tên sản phẩm"
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`category`}
                        label={`Thể loại`}
                    >
                        <Select
                            id="categoryId"
                            mode="multiple"
                            allowClear
                            onChange={(values) => handleFilter("categoryId", values)}
                            placeholder="Thể loại"
                            style={{ width: "100%" }}
                        >
                            {renderCategoryOptions}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

// https://stackblitz.com/run?file=demo.tsx
// https://ant.design/components/form
const InputSearch = ({ handleFilter }) => {
    return (
        <div>
            <AdvancedSearchForm handleFilter={handleFilter} />
        </div>
    );
};

export default InputSearch;
