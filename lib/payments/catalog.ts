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

const productDefinitions: Array<Omit<PaymentProduct, "priceIdr"> & { envKey: string }> = [
  {
    code: "digital-invitation",
    name: "Digital Invitation",
    description: "A complete, shareable invitation experience made around your celebration.",
    envKey: "AKSA_PRICE_DIGITAL_INVITATION_IDR",
  },
  {
    code: "original-love-song",
    name: "Original Love Song",
    description: "A signature original song created from the couple’s own story.",
    envKey: "AKSA_PRICE_ORIGINAL_LOVE_SONG_IDR",
  },
  {
    code: "ai-love-film",
    name: "AI Love Film",
    description: "A cinematic AI love film developed around the couple’s personality and memories.",
    envKey: "AKSA_PRICE_AI_LOVE_FILM_IDR",
  },
];

function configuredAmount(value: string | undefined) {
  const amount = Number(value);
  return Number.isSafeInteger(amount) && amount > 0 ? amount : null;
}

export function getPaymentProducts(): PaymentProduct[] {
  return productDefinitions.map(({ envKey, ...product }) => ({
    ...product,
    priceIdr: configuredAmount(process.env[envKey]),
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
