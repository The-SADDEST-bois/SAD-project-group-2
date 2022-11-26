import Cookies from "js-cookie";

const headerAuthorisationWithBody = (value: any) => {
  const cookie = Cookies.get("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    body: {
        ...value,
    }
  };
  return config;
};

export default headerAuthorisationWithBody;
