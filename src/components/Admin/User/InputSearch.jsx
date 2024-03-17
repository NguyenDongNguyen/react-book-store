import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";

const AdvancedSearchForm = ({ handleFilter }) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input
                            id="keyword"
                            onChange={(e) => handleFilter("keyword", e.target.value)}
                            placeholder="Tên người dùng"
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`email`}
                        label={`Email`}
                    >
                        <Input
                            id="keyword"
                            onChange={(e) => handleFilter("keyword", e.target.value)}
                            placeholder="Email"
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input
                            id="keyword"
                            onChange={(e) => handleFilter("keyword", e.target.value)}
                            placeholder="Số điện thoại"
                        />
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
