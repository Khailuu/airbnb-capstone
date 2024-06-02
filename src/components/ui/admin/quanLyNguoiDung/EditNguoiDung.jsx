import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { quanLyUserServices } from "../../../../services/QuanLyUser";
import moment from 'moment';
import { useEditNguoiDung } from "../../../../hooks/api/quanLyNguoiDungApi/useEditNguoiDung";
import { PATH } from "../../../../constant";

export const EditNguoiDung = () => {
  const { id } = useParams();
  const parseId = parseInt(id);
  const [nguoiDung, setNguoiDung] = useState(null);
  const mutation = useEditNguoiDung();
  const navigate = useNavigate();

  useEffect(() => {
    quanLyUserServices.getNguoiDungTheoId(parseId)
      .then((res) => {
        setNguoiDung(res.data?.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parseId]);

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: nguoiDung?.id || 0,
      name: nguoiDung?.name || '',
      email: nguoiDung?.email || '',
      phone: nguoiDung?.phone || '',
      birthday: nguoiDung?.birthday || '',
      gender: nguoiDung?.gender || true,
      role: nguoiDung?.role || ''
    },
    onSubmit: values => {
      mutation.mutate({ id: nguoiDung?.id, payload: values }, {
        onSuccess: () => {
          navigate(PATH.quanlynguoidung);
        }
      });
    }
  });

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{ maxWidth: 600 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Id">
        <Input name="id" disabled value={formik.values.id} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Name">
        <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Birthday">
        <DatePicker 
          name="birthday" 
          value={moment(formik.values.birthday, 'DD-MM-YYYY')} 
          format='DD-MM-YYYY'
          onChange={(date) => formik.setFieldValue('birthday', date)} 
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Radio.Group name="gender" value={formik.values.gender} onChange={formik.handleChange}>
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Role">
        <Input name="role" value={formik.values.role} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Cập Nhật</Button>
      </Form.Item>
    </Form>
  );
};