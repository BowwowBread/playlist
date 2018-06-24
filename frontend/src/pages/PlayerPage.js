import React from 'react';
import { MainLayout } from 'components/layout';
import PlayerContainer from 'containers/player/PlayerContainer';

const MyListPage = () => {
  return (
    <MainLayout>
      <PlayerContainer />
    </MainLayout>
  );
};

export default MyListPage;
