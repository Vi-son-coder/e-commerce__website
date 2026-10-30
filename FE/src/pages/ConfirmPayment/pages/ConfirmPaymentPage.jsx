

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SuccessHeader from '../components/SuccessHeader';
import ShippingInfoCard from '../components/ShippingInfoCard';
import PaymentInfoCard from '../components/PaymentInfoCard';
import OrderSummaryCard from '../components/OrderSummaryCard';
import OrderActionBar from '../components/OrderActionBar';
import ProductSuggestions from '../components/ProductSuggestions';
import { removeFromCart } from '../../../services/cart.service';

export default function ConfirmPaymentPage() {
  const location = useLocation();
  const purchasedProductIds = location.state?.purchasedProductIds;
  const [cartCleanupError, setCartCleanupError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!purchasedProductIds?.length) return undefined;

    let isCurrent = true;
    async function removePurchasedProducts() {
      setCartCleanupError('');
      try {
        for (const productId of purchasedProductIds) {
          await removeFromCart(productId);
        }
      } catch (error) {
        if (isCurrent) {
          setCartCleanupError(
            error.message || 'Không thể cập nhật giỏ hàng sau khi thanh toán.',
          );
        }
      }
    }

    removePurchasedProducts();
    return () => {
      isCurrent = false;
    };
  }, [purchasedProductIds, retryCount]);

  return (
    <div className="order-complete-page">
      <SuccessHeader />

      {cartCleanupError && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <p>{cartCleanupError}</p>
          <button
            type="button"
            className="mt-2 font-semibold underline"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Thử cập nhật giỏ hàng lại
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ShippingInfoCard />
        <PaymentInfoCard />
        <OrderSummaryCard />
      </div>

      <OrderActionBar />
      <ProductSuggestions />
    </div>
  );
}