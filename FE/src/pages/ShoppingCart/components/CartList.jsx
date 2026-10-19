import ProductInCart from "../../../components/CustomComponent/ProductCardInCart/ProductCardInCart";

export default function CartList({productsInCart,handleRemove,handleSelectOne,updatePay,isAllChecked,handleSelectAll}) {
  return (
    <>
      
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
              getQuantity={updatePay}
            />
          ))}
        </div>
      </div>
    </>
  );
}
