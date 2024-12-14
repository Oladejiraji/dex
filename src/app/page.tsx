import HomeComponent from "@/components/home/HomeComponent";
import { fetchSocketNetworks } from "@/server-side-services/home";
import React, { Suspense } from "react";

const Home = async () => {
  const data = await fetchSocketNetworks();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomeComponent data={data.result} />
    </Suspense>
  );
};

export default Home;
