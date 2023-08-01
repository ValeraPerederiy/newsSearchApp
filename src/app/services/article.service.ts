import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePage } from '../interfaces/article-page';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  articleApiUrl = 'https://api.spaceflightnewsapi.net/v4/articles'

  constructor(private http:HttpClient) { }

  getFirstArticless():Observable<ArticlePage>{
    return this.http.get<ArticlePage>('https://api.spaceflightnewsapi.net/v4/articles')
  }

  getSearchedArticless():Observable<ArticlePage>{
    return this.http.get<ArticlePage>('https://api.spaceflightnewsapi.net/v4/articles')
  }
}
//https://api.spaceflightnewsapi.net/v4/articles/?search=