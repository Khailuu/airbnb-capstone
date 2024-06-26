import React from "react";
import { useState } from "react";
import { Button, Form, Input, Radio, Checkbox, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import { toast } from "react-toastify";
import { usePostPhong } from "../../../../hooks/api/quanLyPhongApi/usePostPhong";

export const ThemPhong = () => {
  const navigate = useNavigate();
  const [dataBox, setDataBox] = useState([
    "mayGiat",
    "tivi",
    "doXe",
    "hoBoi",
    "dieuHoa",
    "banLa",
    "banUi",
    "bep",
    "wifi",
  ]);
  const mutation = usePostPhong();
  const onFinishSign = (values) => {
    let newData = [];
    dataBox.forEach((item) => {
      newData[item] = true;
    });
    let dataSend = { ...values, ...newData };
    mutation.mutate(dataSend, {
      onSuccess: () => {
        toast.success("Thêm Phòng Mới Thành Công");
        navigate(PATH.quanlythongtinphong);
      },
      onError: () => {
        toast.error("Thêm Phòng Mới Thất Bại!");
      },
    });
  };
  const onChange = (checkedValues) => {
    setDataBox(checkedValues);
  };
  const renderSign = () => {
    return (
      <Form
        form={form}
        name="register"
        onFinish={onFinishSign}
        scrollToFirstError
      >
        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="khach"
          label="Số khách"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="phongNgu"
          label="Số phòng ngủ"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="giuong"
          label="Số giường"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="phongTam"
          label="Phòng tắm"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="giaTien"
          label="Giá tiền 1 đêm"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="maViTri"
          label="Mã vị trí"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="hinhAnh"
          label="Hình ảnh khách sạn (URL)"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="moTa"
          label="Mô tả về phòng thuê"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Checkbox.Group
          defaultValue={[
            "mayGiat",
            "tivi",
            "doXe",
            "hoBoi",
            "dieuHoa",
            "banLa",
            "banUi",
            "bep",
            "wifi",
          ]}
          style={{
            width: "100%",
          }}
          onChange={onChange}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="mayGiat">Máy giặt</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="banLa">Bàn là</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="banUi">Bàn ủi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="tivi">Ti vi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="dieuHoa">Điều hòa</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="bep">Bếp</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="doXe">Bãi đỗ xe</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="hoBoi">Hồ bơi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="wifi">Wi fi</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Form.Item>
          <Button className="mt-5" type="primary" htmlType="submit">
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const [form] = Form.useForm();
  return <>{renderSign()}</>;
};
