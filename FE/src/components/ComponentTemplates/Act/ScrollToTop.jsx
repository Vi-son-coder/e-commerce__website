import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(){
    const location = useLocation();
    // useEffect dùng để theo dõi 1 đối tượng "x" khi x thay đổi thì hàm callback đằng trc đc thực thi cú pháp useEffect(callback,[đối tượng cần theo dõi]), nếu để x trống thì mỗi lần render lại thì hàm cx sẽ callback, VD dưới: theo dõi location => location thay đổi => hàm đằng trước đc thực thi
    useEffect(() => {
        window.scrollTo(0,0);
    },[location])
    return null;
}