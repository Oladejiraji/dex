import api from "@/services/api";

export const fetchSocketNetworks = async () => {
  return await api.get({
    url: "https://api.socket.tech/v2/supported/chains",
    auth: true,
  });
};
