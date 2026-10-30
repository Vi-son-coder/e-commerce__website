import ProductInCart from "../../../components/CustomComponent/ProductCardInCart/ProductCardInCart";

export default function CartList({
  productsInCart,
  handleRemove,
  handleSelectOne,
  updatePay,
  isAllChecked,
  handleSelectAll,
}) {
  return (
    <section
      aria-label="Danh sách sản phẩm trong giỏ hàng"
      className="cart-list-panel lg:col-span-8"
    >
      <div className="cart-table-scroll">
        <table className="cart-product-table">
          <thead>
            <tr>
              <th scope="col">
                <input
                  aria-label={
                    isAllChecked
                      ? "Bỏ chọn tất cả sản phẩm"
                      : "Chọn tất cả sản phẩm"
                  }
                  checked={isAllChecked}
                  className="cart-product-select"
                  onChange={() => handleSelectAll(isAllChecked)}
                  type="checkbox"
                />
              </th>
              <th scope="col">SẢN PHẨM</th>
              <th scope="col">ĐƠN GIÁ</th>
              <th scope="col">SỐ LƯỢNG</th>
              <th scope="col">THÀNH TIỀN</th>
              <th scope="col">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.length ? (
              productsInCart.map((product) => (
                <ProductInCart
                  key={product._id}
                  product={product}
                  onRemove={handleRemove}
                  setSelectOne={handleSelectOne}
                  getQuantity={updatePay}
                />
              ))
            ) : (
              <tr>
                <td className="cart-table-message" colSpan="6">
                  Giỏ hàng chưa có sản phẩm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
