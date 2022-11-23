import Cookies from "js-cookie";

const headerAuthorisation = () => {
  const cookie = Cookies.get("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  };
  return config;
};

export default headerAuthorisation;
