import { useState } from "react";

const useDate = () => {
    const date = new Date("2022/10/16 16:00");
    return { date };
}
export default useDate;