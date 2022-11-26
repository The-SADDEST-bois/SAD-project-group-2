import Cookies from "js-cookie";

const headerAuthorisationWithParams = (value: any) => {
    const cookie = Cookies.get("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      params: {
        ...value
      }
    };
    return config;
  }
  
  export default headerAuthorisationWithParams;