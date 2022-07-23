import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import BeatLoader from "react-spinners/BeatLoader";

import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      setLoading(!loading);

      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      return err;
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {loading ? (
        <BeatLoader loading={loading} size={10} color="#000000" />
      ) : (
        "Subscribe now"
      )}
    </button>
  );
}
