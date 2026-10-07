import './App.css'
import Header from './header/header'
import Content from './content/content'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ShopProvider } from './context/ShopContext'
import AuthModal from './component/auth/AuthModal'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import { useRoute } from './lib/useRoute'

function Routes() {
  const path = useRoute()
  const product = path.match(/^\/product\/(\d+)$/)
  if (product) return <ProductDetail id={product[1]} />
  if (path === '/cart') return <Cart />
  if (path === '/checkout') return <Checkout />
  if (path === '/orders') return <Orders />
  return <Content />
}

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <ShopProvider>
          <Header />
          <div className='p-[0px_50px] pb-10'><Routes /></div>
          {/* <Footer /> */}
          <AuthModal />
        </ShopProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
