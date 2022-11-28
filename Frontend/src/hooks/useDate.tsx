import { useState } from "react";

const useDate = () => {
    const date = new Date("2022/10/16");
    return { date };
}
export default useDate;