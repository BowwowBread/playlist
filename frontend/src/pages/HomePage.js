import React from 'react';
import { MainLayout } from 'components/layout';
import HomeContainer from 'containers/home/HomeContainer';

const MainPage = () => {
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  );
};

export default MainPage;
