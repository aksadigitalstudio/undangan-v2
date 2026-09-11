export type PaymentProductCode =
  | "digital-invitation"
  | "original-love-song"
  | "ai-love-film";

export type PaymentProduct = {
  code: PaymentProductCode;
  name: string;
  description: string;
  priceIdr: number | null;
};

const productDefinitions: Array<Omit<PaymentProduct, "priceIdr"> & { envKey: string; defaultPrice?: number }> = [
  {
    code: "digital-invitation",
    name: "Digital Invitation",
    description: "A complete, shareable invitation experience made around your celebration.",
    envKey: "AKSA_PRICE_DIGITAL_INVITATION_IDR",
    defaultPrice: 199000,
  },
  {
    code: "original-love-song",
    name: "Original Love Song",
    description: "A signature original song created from the couple’s own story.",
    envKey: "AKSA_PRICE_ORIGINAL_LOVE_SONG_IDR",
    defaultPrice: 499000,
  },
  {
    code: "ai-love-film",
    name: "AI Love Film",
    description: "A cinematic AI love film developed around the couple’s personality and memories.",
    envKey: "AKSA_PRICE_AI_LOVE_FILM_IDR",
  },
];

function configuredAmount(value: string | undefined, fallback?: number) {
  const amount = Number(value);
  if (Number.isSafeInteger(amount) && amount > 0) return amount;
  return fallback ?? null;
}

export function getPaymentProducts(): PaymentProduct[] {
  return productDefinitions.map(({ envKey, defaultPrice, ...product }) => ({
    ...product,
    priceIdr: configuredAmount(process.env[envKey], defaultPrice),
  }));
}

export function getPaymentProduct(code: string | undefined) {
  return getPaymentProducts().find((product) => product.code === code) ?? null;
}

export function formatIdr(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
