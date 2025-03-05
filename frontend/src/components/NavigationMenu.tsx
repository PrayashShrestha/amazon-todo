import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center", background: "#1890ff" }}>
      <Menu theme="dark" mode="horizontal" style={{ flex: 1 }}>
        <Menu.Item key="todos">
          <Link to="/todos">Todos</Link>
        </Menu.Item>
        <Menu.Item key="categories">
          <Link to="/categories">Categories</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
