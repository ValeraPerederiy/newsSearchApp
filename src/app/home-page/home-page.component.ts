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
  searchTimer: any

  searchForm = new FormGroup({

    serachFormControl: new FormControl('')

  })

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getFirstArticless().subscribe((articles: ArticlePage) => {
      this.latestArticless = articles.results;

    })
  }

  search() {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      if (this.searchForm.value.serachFormControl !== '' && this.searchForm.value.serachFormControl !== undefined && this.searchForm.value.serachFormControl !== null) {
        this.articleService.getSearchedArticless(this.searchForm.value.serachFormControl).subscribe((searchedArticles: ArticlePage) => {
          this.latestArticless = searchedArticles.results;

          // let filteredArticlesByTytle = searchedArticles.results.filter((result)=> {
          //   result.title.includes(this.searchForm.value.serachFormControl!)
          // })
          
          this.latestArticless.forEach((element, i) => {
            if(element.title.includes(this.searchForm.value.serachFormControl!)){
              this.latestArticless.splice(i, 1);
              this.latestArticless.splice(0, 0, element);
            }
          });
          // for (let i = 0; i < searchedArticles.results.length; i++) {
          //   if (searchedArticles.results[i].title.includes(this.searchForm.value.serachFormControl!)) {
          //     this.latestArticless.push(searchedArticles.results[i])
          //   }
          // }
          // for (let i = 0; i < searchedArticles.results.length; i++) {
          //   if (searchedArticles.results[i].summary.includes(this.searchForm.value.serachFormControl!)) {
          //     this.latestArticless.push(searchedArticles.results[i])
          //   }
          // }
          console.log(this.latestArticless);
          
          let yellowTimeOut = setTimeout(() => {
            this.addYelowRange(this.searchForm.value.serachFormControl!)
          })

        })
      }
      if (this.searchForm.value.serachFormControl === '') {
        this.articleService.getFirstArticless().subscribe((articles: ArticlePage) => {
          this.latestArticless = articles.results;
        })
      }
    }, 500)

  }

  addYelowRange(searcText: string) {
    let titles = document.querySelectorAll('.card-title');
    let descriptions = document.querySelectorAll('.card-description');

    titles.forEach(title => {
      let titleContent = title.firstChild?.nodeValue?.toLowerCase();

      if (titleContent?.includes(searcText.toLowerCase())) {
        let range = document.createRange();

        range.setStart(title.firstChild!, titleContent?.indexOf(searcText.toLowerCase()));
        range.setEnd(title.firstChild!, titleContent?.indexOf(searcText.toLowerCase()) + searcText.length);

        let highlightSpan = document.createElement('span');
        highlightSpan.style.backgroundColor = 'yellow';
        range.surroundContents(highlightSpan);
      }

    })

    descriptions.forEach(description => {
      let descriptionContent = description.firstChild?.nodeValue?.toLowerCase();

      if (descriptionContent?.includes(searcText.toLowerCase())) {
        let range = document.createRange();

        range.setStart(description.firstChild!, descriptionContent?.indexOf(searcText.toLowerCase()));
        range.setEnd(description.firstChild!, descriptionContent?.indexOf(searcText.toLowerCase()) + searcText.length);

        let highlightSpan = document.createElement('span');
        highlightSpan.style.backgroundColor = 'yellow';
        range.surroundContents(highlightSpan);
      }
    })
  }

}