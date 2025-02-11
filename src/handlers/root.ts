

export const rootHandler = async () => {
  return {
    title: "Welcome to WebRTC SFU",
  };
};

export const healthCheckHandler = () => {
  return "OK";
};
