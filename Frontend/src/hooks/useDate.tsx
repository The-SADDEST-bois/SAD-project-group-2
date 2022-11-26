import { useState } from "react";

const useDate = () => {
    const date = new Date("2022/10/02 23:59");
    return { date };
}
export default useDate;