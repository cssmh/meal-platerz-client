import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PremiumForm from "./PremiumForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PremiumForm />
    </Elements>
  );
};

export default Payment;
