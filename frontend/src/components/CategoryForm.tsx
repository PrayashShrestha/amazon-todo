import React from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/categories/categoryThunks';
import { CreateCategoryDTO } from '../features/categories/categoryTypes';
import { AppDispatch } from '../store/store';
import { Form, Input, Button } from 'antd';

const CategoryForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: CreateCategoryDTO) => {
    dispatch(addCategory(values));
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add Category
      </Button>
    </Form>
  );
};

export default CategoryForm;
