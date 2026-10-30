import { Outlet } from "react-router-dom";
import Header from "./pages/home/header/header";
import Footer from "./pages/home/footer/footer";

function MainLayout(){
    return(
        <div className="min-h-screen flex flex-col">
        <Header/>
        {/* Outlet nằm ở giữa Header và Footer để chứa các trang con va nằm ngoài Route cha để các Route con đặt vào vị trí này khi Route con thay đổi*/}
        <main className="market-page-content flex-1">
            <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}
export default MainLayout;