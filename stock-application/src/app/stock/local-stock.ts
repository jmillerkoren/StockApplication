import { GlobalQuote } from "./stock";

export interface LocalStocks {
    stocks: GlobalQuote[];
    dateRetrieved: Date;
}