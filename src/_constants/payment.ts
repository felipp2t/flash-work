import { CreditCard, Newspaper } from "lucide-react";

interface MethodPayment {
  method: string;
  minIcon: string | React.ElementType;
  longIcon?: string;
  text: string;
  link: string;
  value: {
    min: number;
    max: number;
  };
}

export const METHODS_PAYMENT: MethodPayment[] = [
  {
    method: "Pix",
    minIcon: "/pix-icon.png",
    longIcon: "/long-pix-icon.png",
    text: "Imediato",
    link: "pix",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "CARTÃO DE CRÉDITO",
    minIcon: CreditCard,
    text: "Imediato",
    link: "credit-card",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "CARTÃO DE DÉBITO",
    minIcon: "/martercard-icon.png",
    text: "Imediato",
    link: "debit-card",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "BOLETO",
    minIcon: Newspaper,
    text: "Até 3 dias úteis",
    link: "bank-slip",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "PAYPAL",
    minIcon: "/paypal-icon.png",
    text: "Imediato",
    link: "paypal",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "MERCADO_PAGO",
    minIcon: "/mercado-pago-icon.png",
    text: "Imediato",
    link: "mercado-pago",
    value: {
      min: 20,
      max: 10000,
    },
  },
  {
    method: "PICPAY",
    minIcon: "/picpay-icon.png",
    text: "Imediato",
    link: "picay",
    value: {
      min: 20,
      max: 10000,
    },
  },
];

export const VALUES = [1, 5, 10, 20, 50, 100, 200, 500, 1000];
