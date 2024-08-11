import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { paymentIntent } from "../api/Payment";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(" ");
  const [error, setError] = useState(" ");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [price, setPrice] = useState(200);
  let [transactionId, setTransactionId] = useState("");
  let [milliSecond, setMilliSecond] = useState(60000);

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      return;
    }
    const fetchPaymentIntent = async () => {
      try {
        const response = await paymentIntent(price);
        setClientSecret(response?.clientSecret);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };
    fetchPaymentIntent();
  }, [price]);

  const handlePeriod = (e) => {
    setPrice(parseInt(e) * 50);
    if (parseInt(e) === 1) {
      setMilliSecond(60000);
    } else {
      setMilliSecond(parseInt(e) * 86400000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    // const updatedUserData = {
    //   isPremium: true,
    //   expiryDate: Date.now() + milliSecond,
    // };

    if (confirmError) {
      toast.error(confirmError?.message);
    } else {
      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment success");
        setTransactionId(paymentIntent?.id);
      }
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleCardFocus = () => {
    setHasInteracted(true);
  };

  return (
    <div className="mx-auto w-full space-y-3 card shrink-0 max-w-md shadow-xl bg-base-100 text-center px-4 pt-5 pb-7 mt-5">
      <h3 className="text-lg font-semibold">Process Your Payments</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1 text-sm">
          <input
            className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-300 rounded-lg"
            name="name"
            id="name"
            type="text"
            readOnly
            defaultValue={user?.displayName}
            placeholder="Name"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <select
            required
            className="w-full border px-4 py-3 border-rose-300 focus:outline-rose-300 rounded-lg"
            onChange={(e) => handlePeriod(e.target.value)}
          >
            <option value="1">1 Min</option>
            <option value="5">5 Day</option>
            <option value="10">10 Day</option>
            <option value="30">30 Day</option>
          </select>
        </div>
        <div className="space-y-1 text-sm">
          <p>Price : $</p>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
          onChange={handleCardChange}
          onFocus={handleCardFocus}
        />
        <div className="min-h-[8px]">
          <p
            className={`text-red-600 my-1 text-sm ${
              error && hasInteracted ? "opacity-100" : "opacity-0"
            }`}
          >
            {error || " "}
          </p>
          {transactionId && (
            <p className="text-green-500">
              Your transaction id is: {transactionId}
            </p>
          )}
        </div>
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="btn btn-sm hover:bg-orange-200 hover:border-none bg-orange-200"
        >
          Pay for Premium membership
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
