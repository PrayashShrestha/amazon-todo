import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, fetchTodosByCategory, filterTodosByStatus } from "../features/todos/todoThunks";
import { AppDispatch, RootState } from "../store/store";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { List, Select, Button, Empty, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const categories = useSelector((state: RootState) => state.categories.categories);

  const [filter, setFilter] = useState<"all" | "complete" | "incomplete">("all");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "createdAt" | "none">("none"); // Add sorting state
  const [showForm, setShowForm] = useState(false);

  const handleCategoryChange = (value: number | "all") => {
    setSelectedCategory(value);
    if (value === "all") {
      dispatch(fetchTodos());
    } else {
      dispatch(fetchTodosByCategory(value));
    }
  };

  const handleFilterChange = (value: "all" | "complete" | "incomplete") => {
    setFilter(value);
    if (value === "all") {
      if (selectedCategory === "all") {
        dispatch(fetchTodos());
      } else {
        dispatch(fetchTodosByCategory(selectedCategory as number));
      }
    } else {
      dispatch(filterTodosByStatus(value));
    }
  };

  const handleSortChange = (value: "dueDate" | "createdAt" | "none") => {
    setSortBy(value);
  };

  // Function to refetch todos based on current filters
  const refetchTodos = () => {
    if (filter === "all") {
      if (selectedCategory === "all") {
        dispatch(fetchTodos());
      } else {
        dispatch(fetchTodosByCategory(selectedCategory as number));
      }
    } else {
      dispatch(filterTodosByStatus(filter));
    }
  };

  // Apply filtering and sorting locally
  const filteredAndSortedTodos = todos
    .filter((todo) => {
      const matchesCategory =
        selectedCategory === "all" || todo.category?.id === selectedCategory;
      const matchesStatus =
        filter === "all" ||
        (filter === "complete" && todo.complete) ||
        (filter === "incomplete" && !todo.complete);
      return matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return dayjs(a.due_date).isBefore(dayjs(b.due_date)) ? -1 : 1;
      } else if (sortBy === "createdAt") {
        return dayjs(a.created_at).isBefore(dayjs(b.created_at)) ? -1 : 1;
      }
      return 0; // "none" means no sorting (original order)
    });

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Select value={filter} onChange={handleFilterChange} style={{ width: 150 }}>
            <Option value="all">All</Option>
            <Option value="complete">Completed</Option>
            <Option value="incomplete">Active</Option>
          </Select>

          <Select value={selectedCategory} onChange={handleCategoryChange} style={{ width: 200 }}>
            <Option value="all">All Categories</Option>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>

          {/* New Sort By Dropdown */}
          <Select value={sortBy} onChange={handleSortChange} style={{ width: 150 }}>
            <Option value="none">No Sorting</Option>
            <Option value="dueDate">Due Date</Option>
            <Option value="createdAt">Created At</Option>
          </Select>
        </div>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowForm(true)}>
          Add Todo
        </Button>
      </div>

      {filteredAndSortedTodos.length === 0 ? (
        <Empty description="No Todos Available">
          <Button type="primary" onClick={() => setShowForm(true)}>
            Add First Todo
          </Button>
        </Empty>
      ) : (
        <List
          bordered
          dataSource={filteredAndSortedTodos}
          renderItem={(todo) => <TodoItem key={todo.id} todo={todo} refetchTodos={refetchTodos} />}
        />
      )}

      {showForm && (
        <TodoForm
          visible={showForm}
          onClose={() => setShowForm(false)}
          refetchTodos={refetchTodos}
        />
      )}
    </>
  );
};

export default TodoList;