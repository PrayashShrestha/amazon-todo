import React from 'react';
import { useCategories } from '../hooks/useCategories';
import { List, Card } from 'antd';

const CategoryList: React.FC = () => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={categories}
      renderItem={(category) => (
        <List.Item>
          <Card title={category.name}>{category.id}</Card>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
