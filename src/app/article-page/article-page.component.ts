import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit{
  articleId:number = 0; 
  article:Article | null = null;
  constructor(private activateRoute: ActivatedRoute, private articleService:ArticleService){
    this.articleId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(){ 
    this.articleService.geArticleById(this.articleId).subscribe(article=>{
      this.article = article;
      console.log(article.summary);
      console.log(article);
      
    })
  }
}
