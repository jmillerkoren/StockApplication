import { GlobalQuote } from "./stock";

export interface LocalStock {
    stock: GlobalQuote;
    dateRetrieved: Date;
}