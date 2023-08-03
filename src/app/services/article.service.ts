import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePage } from '../interfaces/article-page';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  articleApiUrl = 'https://api.spaceflightnewsapi.net/v4/articles'

  constructor(private http:HttpClient) { }

  getFirstArticless():Observable<ArticlePage>{
    return this.http.get<ArticlePage>(this.articleApiUrl)
  }

  getSearchedArticless(searchReq:string):Observable<ArticlePage>{
    return this.http.get<ArticlePage>(`${this.articleApiUrl}/?search=${searchReq}`)
  }

  geArticleById(id:number):Observable<Article>{
    return this.http.get<Article>(`${this.articleApiUrl}/${id}`)
  }
}
