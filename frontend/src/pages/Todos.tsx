import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoThunks";
import { fetchCategories } from "../features/categories/categoryThunks";
import { AppDispatch, RootState } from "../store/store";
import TodoList from "../components/TodoList";
import { Spin } from "antd";

const Todos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.categories.loading || state.todos.loading);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTodos());
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default Todos;