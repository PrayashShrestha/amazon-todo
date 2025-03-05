import React from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm />
      <CategoryList />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Categories;
