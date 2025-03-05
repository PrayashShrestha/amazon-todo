import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoryThunks";
import { addTodo, updateTodo } from "../features/todos/todoThunks";
import { AppDispatch, RootState } from "../store/store";
import { Form, Input, Button, Select, DatePicker, Modal, Spin } from "antd";
import dayjs from "dayjs";
import { Todo } from "../features/todos/todoTypes";

interface TodoFormProps {
  visible: boolean;
  onClose: () => void;
  editingTodo?: Todo | null;
  refetchTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ visible, onClose, editingTodo, refetchTodos }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (editingTodo) {
      console.log("Editing Todo Due Date:", editingTodo.due_date); // Debug the dueDate
      let parsedDueDate = null;
      try {
        // Parse the ISO date and ensure it’s a valid dayjs object
        parsedDueDate = editingTodo.due_date ? dayjs(editingTodo.due_date).startOf("day") : dayjs();
        console.log("Parsed Due Date (UTC):", parsedDueDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ")); // Log in ISO format
        console.log("Parsed Due Date (Local):", parsedDueDate.format("YYYY-MM-DD")); // Log local date
      } catch (error) {
        console.error("Error parsing dueDate:", error);
        parsedDueDate = dayjs(); // Fallback to today if parsing fails
      }

      form.setFieldsValue({
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: parsedDueDate, // Use the parsed dayjs object
        category: editingTodo.category?.id || null, // Handle potential null category
      });
    } else {
      form.resetFields();
    }
  }, [editingTodo, form]);

  const handleSubmit = (values: any) => {
    if (!values.category) return;


    const newTodo = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toISOString(), // Use ISO format to preserve timezone
      categoryId: values.category,
    };

    console.log("Submitting Todo:", {
      isEditing: !!editingTodo,
      id: editingTodo?.id, // Log the ID to verify it’s not undefined
      todo: newTodo,
    }); // Debug the submission

    if (editingTodo) {
      if (!editingTodo.id) {
        console.error("Error: editingTodo.id is undefined or null");
        return; // Prevent submission if ID is missing
      }
      dispatch(updateTodo({ id: editingTodo.id, todo: newTodo })).then((action) => {
        console.log("Update Todo Result:", action); // Log the result of the dispatch
        refetchTodos(); // Refetch after update
      }).catch((error) => {
        console.error("Update Todo Error:", error); // Log any errors
      });
    } else {
      console.log("creating todo")
      dispatch(addTodo(newTodo)).then(() => {
        refetchTodos(); // Refetch after add
      });
    }

    onClose();
    form.resetFields();
  };

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  return (
    <Modal title={editingTodo ? "Edit Todo" : "Add Todo"} open={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker disabledDate={(current) => current && current < dayjs().endOf("day")} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {editingTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TodoForm;