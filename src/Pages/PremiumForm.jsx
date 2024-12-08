import { toast } from "sonner";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { addPremiumDate, paymentIntent } from "../api/Payment";
import useUser from "../hooks/useUser";
import SmallLoader from "../Component/SmallLoader";
import Countdown from "../Component/Countdown";
import useIsPremium from "../hooks/useIsPremium";
import PlaterHelmet from "../Component/PlaterHelmet";

const PremiumForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [price, setPrice] = useState(2);
  const [milliSecond, setMilliSecond] = useState(60000);
  const { userData, refetch, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const isPremium = useIsPremium();

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

  const priceMap = {
    1: 2,
    3: 5,
    7: 10,
    15: 16,
  };

  const handlePeriod = (e) => {
    const days = parseInt(e);
    const price = priceMap[days] || 20;
    setPrice(price);
    setMilliSecond(days === 1 ? 60000 : days * 86400000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPremium) {
      toast.info("You are already a Premium member!");
      return;
    }

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) {
      setError("Please enter card details");
      return;
    }

    setLoading(true);

    try {
      setError("");
      const { error: cardError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (cardError) {
        setError(cardError.message);
        return;
      }

      // Confirm payment
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

      if (confirmError) {
        toast.error(confirmError.message);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const newPremiumDate = Date.now() + milliSecond;
        const res = await addPremiumDate(user?.email, {
          premium_date: newPremiumDate,
          paymentIntent_Id: paymentIntent.id,
        });

        if (res?.modifiedCount > 0) {
          refetch();
          toast.success(
            "Congratulations! Enjoy your premium membership benefits!"
          );
        }
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
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

  if (isLoading) return <SmallLoader />;

  return (
    <div className="2xl:min-h-[87vh] flex items-center justify-center md:py-5 md:px-4 flex-col relative">
      <PlaterHelmet title={"Be Premium"} />
      <div className="hidden lg:block 2xl:hidden absolute top-1/2 left-14 transform -translate-y-1/2 px-4 py-2 bg-teal-50 border-l-4 border-teal-300 text-teal-600 rounded-r-lg shadow-md">
        🍽️ Enjoy free <br /> food delivery <br /> with your Premium membership!
      </div>
      <div className="max-w-[540px] 2xl:max-w-xl w-full bg-white shadow-2xl md:rounded-xl px-2 md:px-8 py-5 space-y-2 border border-teal-200">
        <h2 className="text-lg md:text-xl font-medium text-center text-teal-600">
          Become a Premium Member
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Unlock exclusive benefits by upgrading your account!
        </p>
        <p className="text-sm text-center text-gray-800">
          Use test card{" "}
          <span className="text-teal-600 font-semibold">
            4242 4242 4242 4242{" "}
          </span>
          expiry <span className="text-teal-600 font-semibold">12/25</span> cvc{" "}
          <span className="text-teal-600 font-semibold">222</span> zip{" "}
          <span className="text-teal-600 font-semibold">32321</span>
        </p>
        <form onSubmit={handleSubmit} className="mx-2 md:mx-0 space-y-3 md:space-y-4">
          <div className="space-y-2">
            <input
              className="w-full px-4 py-3 rounded-lg bg-teal-50 text-gray-800 border border-teal-300 focus:outline-none focus:border-teal-500 transition-all shadow-md placeholder-gray-400"
              name="name"
              id="name"
              type="text"
              required
              defaultValue={user?.displayName}
              placeholder="Full Name"
            />
          </div>
          <div className="space-y-2">
            <select
              className="w-full px-4 py-3 rounded-lg bg-teal-50 text-gray-800 border border-teal-300 focus:outline-none focus:border-teal-500 transition-all shadow-md"
              onChange={(e) => handlePeriod(e.target.value)}
              required
            >
              <option value="1">1 Minute</option>
              <option value="3">3 Days</option>
              <option value="7">7 Days</option>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>
          <p className="text-lg font-semibold text-gray-800">Price: ${price}</p>
          <div className="space-y-2">
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
              className="w-full p-4 rounded-lg bg-teal-50 text-gray-800 border border-teal-300 focus:outline-none focus:border-teal-500 transition-all shadow-md"
              onChange={handleCardChange}
              onFocus={handleCardFocus}
            />
          </div>
          <div className="min-h-[14px]">
            <p
              className={`text-rose-600 text-sm ${
                error && hasInteracted ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || " "}
            </p>
            {isPremium && (
              <span className="flex justify-center">
                <Countdown />
              </span>
            )}
            {isPremium && userData?.paymentIntent_Id && (
              <p className="text-green-500 text-sm flex justify-center">
                Your transaction id is: {userData.paymentIntent_Id}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              disabled={!stripe || !clientSecret || isPremium}
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : isPremium
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-500"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing...
                </div>
              ) : isPremium ? (
                <div className="flex items-center gap-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm-2 2a1 1 0 110 2 1 1 0 010-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Paid
                </div>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          {isPremium
            ? "Congratulations on being a Premium member!"
            : "Be our Premium member today!"}
        </p>
      </div>
      <div className="mx-2 lg:hidden 2xl:block my-5 text-center bg-teal-50 border border-teal-300 text-teal-600 rounded-lg py-3">
        🍽️ Enjoy free food delivery with your Premium membership!
      </div>
    </div>
  );
};

export default PremiumForm;
