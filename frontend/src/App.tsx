import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Categories from "./pages/Categories";
import Navbar from "./components/NavigationMenu";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
