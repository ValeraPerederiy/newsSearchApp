import { Article } from "./article";

export interface ArticlePage {

    count: number,
    next: string,
    previous: string,
    results: Article[]

}
