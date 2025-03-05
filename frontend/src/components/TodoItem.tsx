import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { markTodoComplete, markTodoIncomplete, deleteTodo } from "../features/todos/todoThunks";
import { Todo } from "../features/todos/todoTypes";
import { AppDispatch } from "../store/store";
import { List, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  refetchTodos: () => void; // Add this prop
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, refetchTodos }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const toggleComplete = () => {
    if (todo.complete) {
      dispatch(markTodoIncomplete(todo.id)).then(() => {
        refetchTodos(); // Refetch after marking incomplete
      });
    } else {
      dispatch(markTodoComplete(todo.id)).then(() => {
        refetchTodos(); // Refetch after marking complete
      });
    }
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id)).then(() => {
      refetchTodos(); // Refetch after delete
    });
  };

  return (
    <>
      <List.Item
        actions={[
          <Button type="link" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
            Edit
          </Button>,
          <Button type="link" danger icon={<DeleteOutlined />} onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <Checkbox checked={todo.complete} onChange={toggleComplete}>
          {todo.title} ({todo.category?.name || "No Category"})
        </Checkbox>
      </List.Item>

      <TodoForm
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        editingTodo={todo}
        refetchTodos={refetchTodos}
      />
    </>
  );
};

export default TodoItem;
