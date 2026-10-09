import { Outlet } from "react-router-dom";
import Header from "./home/header/header";
import Footer from "./home/footer/footer";

function MainLayout(){
    return(
        <div className="flex flex-col">
        <Header/>
        {/* Outlet nằm ở giữa Header và Footer để chứa các trang con va nằm ngoài Route cha để các Route con đặt vào vị trí này khi Route con thay đổi*/}
        <div className="px-[50px]">
            <Outlet/>
        </div>
        <Footer/>
        </div>
    )
}
export default MainLayout;