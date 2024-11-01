import swal from "sweetalert";
import toast from "react-hot-toast";
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
      toast.error("You are already a Premium member!");
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
          swal({
            title: "Congratulations",
            text: "Enjoy your premium membership benefits!",
            icon: "success",
            timer: 2000,
          });
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
    <div>
      <PlaterHelmet title={"Be Premium"} />
      <div className="mx-auto w-full space-y-3 card shrink-0 max-w-md shadow-xl bg-base-100 text-center px-4 pt-5 pb-7 mt-6">
        <h3 className="text-lg font-semibold">Process Your Payments</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1 text-sm">
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-300 rounded-lg"
              name="name"
              id="name"
              type="text"
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
              <option value="3">3 Day</option>
              <option value="7">7 Day</option>
              <option value="15">15 Day</option>
              <option value="30">30 Day</option>
            </select>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-sm text-green-500">Price: ${price}</p>
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
              className={`text-red-600 text-sm ${
                error && hasInteracted ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || " "}
            </p>
            {isPremium && <Countdown />}
            {isPremium && userData?.paymentIntent_Id && (
              <p className="text-green-500 ">
                Your transaction id is: {userData.paymentIntent_Id}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              disabled={!stripe || !clientSecret || isPremium}
              type="submit"
              className={`btn btn-sm flex items-center justify-center ${
                loading && "pointer-events-none"
              } ${
                !isPremium
                  ? "hover:bg-orange-200"
                  : "bg-gray-300 cursor-not-allowed"
              } hover:border-none bg-orange-200`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing...
                </div>
              ) : (
                "Pay for Premium Membership"
              )}
            </button>
          </div>
        </form>
        <p className="text-sm text-green-500">
          {isPremium
            ? "Congratulations on being a Premium member!"
            : "Your premium membership has expired."}
        </p>
      </div>
      <p className="text-center my-5 max-w-xl mx-auto text-base bg-rose-100 text-rose-600 border border-rose-300 rounded-lg py-1 px-4 shadow-sm">
        🍽️ Enjoy free food delivery with your Premium membership!
      </p>
    </div>
  );
};

export default PremiumForm;
