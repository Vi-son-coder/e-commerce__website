

import SuccessHeader from '../components/SuccessHeader';
import ShippingInfoCard from '../components/ShippingInfoCard';
import PaymentInfoCard from '../components/PaymentInfoCard';
import OrderSummaryCard from '../components/OrderSummaryCard';
import OrderActionBar from '../components/OrderActionBar';
import ProductSuggestions from '../components/ProductSuggestions';

export default function ConfirmPaymentPage() {
  return (
    

      <div className="mt-13">
        {/* Banner Đặt hàng thành công */}
        <SuccessHeader />

        {/* 3 Thẻ Thông Tin Ngang */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ShippingInfoCard />
          <PaymentInfoCard />
          <OrderSummaryCard />
        </div>

        {/* Thanh tác vụ đơn hàng (Món ăn/Sản phẩm + Nút điều hướng) */}
        <OrderActionBar />

        {/* Gợi ý sản phẩm liên quan */}
        <ProductSuggestions />
      </div>
  );
}