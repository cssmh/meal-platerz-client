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
  const [isCard, setIsCard] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [price, setPrice] = useState(2);
  const [milliSecond, setMilliSecond] = useState(60000);
  const { userData, refetch, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const isPremium = useIsPremium();
  const [isPaid, setIsPaid] = useState(isPremium);

  useEffect(() => {
    if (!isPremium) {
      setIsPaid(false);
    }
  }, [isPremium]);

  useEffect(() => {
    if (!user) {
      setIsPaid(false);
      setClientSecret("");
      setError("");
    }
  }, [user]);

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
    if (!user) return toast.error("Please login first");
    if (isPremium) {
      toast.info("You are already a Premium member!");
      return;
    }
    if (!isCard) {
      toast.info("Please enter card details before proceeding.");
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
          setIsPaid(true);
          toast.success("Congratulations! Enjoy your membership benefits!");
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
    setIsCard(!event.empty);
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
    <div className="flex items-center justify-center p-2 md:p-4 bg-gray-100">
      <PlaterHelmet title={"Premium Membership"} />
      <div className="max-w-2xl w-full bg-white p-4 md:px-8 md:py-5 rounded-xl shadow-xl space-y-5">
        <h1 className="text-2xl 2xl:text-3xl font-semibold text-center text-red-500">
          Upgrade to Premium
        </h1>
        <p className="text-center text-gray-600 md:w-[85%] mx-auto">
          Enjoy exclusive benefits with our Premium Membership. Select a plan
          and make your payment securely.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                className="w-full px-4 py-3 rounded-lg bg-red-50 text-gray-800 border border-red-300 focus:outline-none focus:border-red-500 transition-shadow shadow-md placeholder-gray-400"
                name="name"
                id="name"
                type="text"
                required
                defaultValue={user?.displayName}
                placeholder="Full Name"
              />
            </div>
            <div className="flex-1">
              <select
                className="w-full px-4 py-3 rounded-lg bg-red-50 text-gray-800 border border-red-300 focus:outline-none focus:border-red-500 transition-shadow shadow-md"
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
          </div>
          <div>
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
              className="w-full p-4 rounded-lg bg-red-50 text-gray-800 border border-red-300 focus:outline-none focus:border-red-500 transition-shadow shadow-md"
              onChange={handleCardChange}
              onFocus={handleCardFocus}
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Price: ${price}</p>
          <div className="min-h-[8px]">
            <p
              className={`text-rose-600 text-sm ${
                error && hasInteracted ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || " "}
            </p>
            {user && isPremium && (
              <div className="flex justify-center mb-2">
                <span className="mt-2 inline-block px-4 py-2 bg-green-100 rounded-lg shadow">
                  <Countdown />
                </span>
              </div>
            )}
            {user && isPremium && userData?.paymentIntent_Id && (
              <p className="text-green-500 text-sm flex text-center justify-center">
                Your transaction id is: {userData.paymentIntent_Id}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              disabled={
                !stripe || !clientSecret || isPremium || isPaid || !user
              }
              type="submit"
              className={`w-full py-3 2xl:text-lg rounded-lg font-semibold text-white transition duration-300 shadow-md ${
                !user
                  ? "bg-[#f01543] hover:bg-red-600"
                  : loading
                  ? "bg-green-300 cursor-not-allowed"
                  : isPremium || isPaid
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-[#f01543] hover:bg-red-600"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing...
                </div>
              ) : !user ? (
                "Login to Pay"
              ) : isPremium || isPaid ? (
                <div className="flex 2xl:text-lg items-center gap-2 justify-center">
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
          {!user
            ? "Please log in to make a payment."
            : isPremium || isPaid
            ? "Congratulations on joining our Premium membership!"
            : "Upgrade to Premium membership now!"}
        </p>
      </div>
    </div>
  );
};

export default PremiumForm;
