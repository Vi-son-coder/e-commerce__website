import { useState } from "react";

export async function useGetData() {
    const [getData,setGetData] = useState[{}];
    return {getData, setGetData};
}