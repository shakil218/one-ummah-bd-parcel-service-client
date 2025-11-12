import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate()

  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = [] } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  const amountInCents = parseFloat(parcelInfo.cost) * 100;
  console.log(parcelInfo, amountInCents);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      console.log("res from intent", res);
      const clientSecret = res.data.clientSecret;

      // confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setError("");
        console.log("Payment successful!");
        if (result.paymentIntent.status === "succeeded") {
          const paymentInfo = {
            email: user?.email,
            price:parseFloat(parcelInfo.cost),
            transactionId: result.paymentIntent.id,
            parcelId, // The parcel being paid for
            paid_at: new Date(),
            paid_at_string: new Date().toISOString(),
          };

          await axiosSecure.post("/payments", paymentInfo);

          Swal.fire({
            icon: "success",
            title: "Payment successful!",
            text: `Transaction ID: ${result.paymentIntent.id}`,
            confirmButtonText:'Go to my parcels'
          });
          navigate('/dashboard/my-parcels')
        }
      }
    }
  };

  return (
    <div className="my-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          disabled={!stripe}
          className="btn btn-primary text-black w-full"
        >
          Make Payment ${parcelInfo.cost}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
