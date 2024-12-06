import HomeComponent from "@/components/home/HomeComponent";
import { fetchSocketNetworks } from "@/server-side-services/home";
import React from "react";

const Home = async () => {
  const data = await fetchSocketNetworks();
  return <HomeComponent data={data.result} />;
};

export default Home;
