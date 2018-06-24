import React from 'react';
import { MainLayout } from 'components/layout';
import CategoryContainer from 'containers/list/CategoryContainer';

const CategoryPage = () => {
  return (
    <MainLayout>
      <CategoryContainer />
    </MainLayout>
  );
};

export default CategoryPage;
