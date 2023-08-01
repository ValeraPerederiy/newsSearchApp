import { Component, OnInit } from '@angular/core';
import { ArticlePage } from '../interfaces/article-page';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  latestArticless: Article[] = []

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getFirstArticless().subscribe((articles: ArticlePage) => {
      this.latestArticless = articles.results;
      console.log(this.latestArticless);
    })
  }
}
