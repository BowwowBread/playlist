import React from 'react';
import { MainLayout } from 'components/layout';
import MyPlayListContainer from 'containers/list/MyPlayListContainer';

const MyListPage = () => {
  return (
    <MainLayout>
      <MyPlayListContainer />
    </MainLayout>
  );
};

export default MyListPage;
