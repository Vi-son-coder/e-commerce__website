
import OrderHeader from '../components/OrderHeader';
import OrderStatusTracker from '../components/OrderStatusTracker';
import DeliveryTimeline from '../components/DeliveryTimeline';
import OrderItemsList from '../components/OrderItemsList';
import ShippingAddress from '../components/ShippingAddress';
import PaymentSummary from '../components/PaymentSummary';
import OrderActions from '../components/OrderActions';

export default function OrderTrackingPage() {
  return (
    
      <div className="flex flex-col mt-13">
        {/* Header & Status Bar */}
        <OrderHeader orderId="NM-84920491" />
        <OrderStatusTracker />

        {/* 2 Columns Layout */}
        <div className="flex gap-6">
          {/* Cột trái (Rộng): Lộ trình & Danh sách sản phẩm */}
          <div>
            <DeliveryTimeline />
            <OrderItemsList />
          </div>

          {/* Cột phải (Hẹp): Địa chỉ, Thanh toán & Hỗ trợ */}
          <div>
            <ShippingAddress />
            <PaymentSummary />
            <OrderActions />
          </div>
        </div>
      </div>
    
  );
}