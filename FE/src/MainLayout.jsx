import { Outlet } from "react-router-dom";
import Header from "./home/header/header";
import Footer from "./home/footer/footer";

function MainLayout(){
    return(
        <>
        <Header/>
        {/* Outlet nằm ở giữa Header và Footer để chứa các trang con va nằm ngoài Route cha để các Route con đặt vào vị trí này khi Route con thay đổi*/}
        <div className="px-[50px]">
            <Outlet/>
        </div>
        <Footer/>
        </>
    )
}
export default MainLayout;