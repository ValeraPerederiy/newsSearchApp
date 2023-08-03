import { Component, OnInit } from '@angular/core';
import { ArticlePage } from '../interfaces/article-page';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { FormControl, FormGroup } from '@angular/forms';

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
          this.latestArticless = [];
          for(let i = 0; i < searchedArticles.results.length; i++){
            if(searchedArticles.results[i].title.includes(this.searchForm.value.serachFormControl!)){
              this.latestArticless.push(searchedArticles.results[i])
            }
          }
          for(let i = 0; i < searchedArticles.results.length; i++){
            if(searchedArticles.results[i].summary.includes(this.searchForm.value.serachFormControl!)){
              this.latestArticless.push(searchedArticles.results[i])
            }
          }

          let yellowTimeOut = setTimeout(()=>{
            this.addYelowRange(this.searchForm.value.serachFormControl!)
          })
          // this.latestArticless = searchedArticles.results;
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

  addYelowRange(searcText:string){
    let titles = document.querySelectorAll('.card-title');
    let descriptions = document.querySelectorAll('.card-description');
    console.log(titles);
    
    
    titles.forEach(title=>{
      
      let titleContent = title.firstChild?.nodeValue?.toLowerCase();
      console.log(title.firstChild);
      
      
      
      if(titleContent?.includes(searcText.toLowerCase())) {
        let range = document.createRange();
        
        range.setStart(title.firstChild!, titleContent?.indexOf(searcText.toLowerCase()));
        range.setEnd(title.firstChild!, titleContent?.indexOf(searcText.toLowerCase()) + searcText.length);
        
        let highlightSpan = document.createElement('span');
        highlightSpan.style.backgroundColor = 'yellow';
        range.surroundContents(highlightSpan);
      }else console.log('no search in title');
      
    })    

    descriptions.forEach(description=>{
      let descriptionContent = description.firstChild?.nodeValue;

      if(descriptionContent?.includes(searcText.toLowerCase())) {
        let range = document.createRange();

        range.setStart(description.firstChild!, descriptionContent?.indexOf(searcText));
        range.setEnd(description.firstChild!, descriptionContent?.indexOf(searcText) + searcText.length);

        let highlightSpan = document.createElement('span');
        highlightSpan.style.backgroundColor = 'yellow';
        range.surroundContents(highlightSpan);
      }
    })    
  }


}