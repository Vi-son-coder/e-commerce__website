import { CustomerCareColumn } from "../../../components/CustomComponent/CustomerCareColumn/CustomerCareColumn";
import { AboutColumn } from "../../../components/CustomComponent/AboutColumn/AboutColumn";
import { NewsletterColumn } from "../../../components/CustomComponent/NewsletterColumn/NewsletterColumn";
import { PaymentShippingColumn } from "../../../components/CustomComponent/PaymentShippingColumn/PaymentShippingColumn";

function Footer() {
  return (
    <footer className="w-full bg-white py-10 text-gray-800 mt-20">
      <div className="mx-auto max-w-7xl ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <CustomerCareColumn />
          <AboutColumn />
          <PaymentShippingColumn />
          <NewsletterColumn />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
