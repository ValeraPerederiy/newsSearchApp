import { Component, OnInit } from '@angular/core';
import { ArticlePage } from '../interfaces/article-page';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  latestArticless: Article[] = []
  searchTimer:any

  searchForm = new FormGroup({

    serachFormControl : new FormControl ('')

  })

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getFirstArticless().subscribe((articles: ArticlePage) => {
      this.latestArticless = articles.results;
      console.log(this.latestArticless);
    })
  }

  search() {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(()=>{
      if(this.searchForm.value.serachFormControl !== '' && this.searchForm.value.serachFormControl !== undefined && this.searchForm.value.serachFormControl !== null) {
        this.articleService.getSearchedArticless(this.searchForm.value.serachFormControl).subscribe((searchedArticles: ArticlePage) => {
          this.latestArticless = searchedArticles.results;
          console.log(this.latestArticless);
        })
      }
      if(this.searchForm.value.serachFormControl === ''){
        this.articleService.getFirstArticless().subscribe((articles: ArticlePage) => {
          this.latestArticless = articles.results;
          
        })
      }
    },500)
    
    
  }
}
