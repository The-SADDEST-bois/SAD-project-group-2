import Cookies from "js-cookie";

const headerAuthorisationWithParams = (key: any, value: any) => {
    const cookie = Cookies.get("accessToken");
  
    const config = {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      params: {
        key: value
      }
    };
    return config;
  }

  export default headerAuthorisationWithParams;