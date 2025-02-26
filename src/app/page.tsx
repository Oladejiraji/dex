import HomeComponentV2 from '@/components/home/HomeComponentV2';
import { fetchSocketNetworks } from '@/server-side-services/home';
import React, { Suspense } from 'react';

const Home = async () => {
  const data = await fetchSocketNetworks();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomeComponentV2 data={data.result} />
    </Suspense>
  );
};

export default Home;
