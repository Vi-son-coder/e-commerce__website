import BreadcrumbAndStepper from "../components/BreadcrumbAndStepper";
import VoucherSection from "../components/VoucherSection";
import OrderSummary from "../components/OrderSummary";
import ProductInCart from "../../../components/CustomComponent/ProductCardInCart/ProductCardInCart";
import { getProductsInCart } from "../../../services/cart.service";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [productsInCart, setProductsInCart] = useState([]);

  const [isAllChecked, setIsAllChecked] = useState(false);
  

  useEffect(() => {
    async function getProducts() {
      const productsInCart = await getProductsInCart();
      setProductsInCart(productsInCart);
    }
    getProducts();
  }, []);

  function handleRemove(productId) {
    let filterProductsInCart = productsInCart.filter(
      (item) => item._id != productId,
    );
    setProductsInCart(filterProductsInCart);
  }

  function handleSelectAll(isAllChecked) {
    const newChecked = !isAllChecked;
    setIsAllChecked(newChecked);
    const updateProducts = productsInCart.map((p) => ({
      ...p,
      checked: newChecked,
    }));
    setProductsInCart(updateProducts);
    console.log(newChecked);
  }
  
  function handleSelectOne(productId) {
    let updateProducts = productsInCart.map((p) =>
      p._id == productId ? { ...p, checked: p.checked ? !p.checked : true } : p,
    );
    console.log(updateProducts);
    setProductsInCart(updateProducts);
    setIsAllChecked(!isAllChecked);
  }
  return (
    <div className=" mt-13">
      {/* Breadcrumb & Stepper Component */}
      <BreadcrumbAndStepper itemCount={productsInCart.length} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CỘT TRÁI */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Chọn Tất Cả */}
          <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between text-sm font-semibold border border-gray-100">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                checked={isAllChecked}
                onClick={() => handleSelectAll(isAllChecked)}
              />

              <span>Chọn tất cả ({productsInCart.length})</span>
              <button className="text-red-500 hover:underline text-xs ml-2 font-medium">
                Xóa đã chọn
              </button>
            </div>
          </div>
          {/* Danh sách sản phẩm */}
          <div className="flex flex-col gap-3">
            {productsInCart?.map((p) => (
              <ProductInCart
                key={p._id}
                product={p}
                onRemove={handleRemove}
                setSelectOne={handleSelectOne}
                
              />
            ))}
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="lg:col-span-4 space-y-4">
          <VoucherSection />
          <OrderSummary products={productsInCart} />
        </div>
      </div>
    </div>
  );
}
