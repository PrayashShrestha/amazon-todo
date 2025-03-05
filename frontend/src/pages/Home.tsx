import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <nav>
        <ul>
          <li><Link to="/todos">Manage Todos</Link></li>
          <li><Link to="/categories">Manage Categories</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
