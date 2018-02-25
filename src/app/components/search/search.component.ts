import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../../SearchService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  @ViewChild('searchForm') searchForm: NgForm;
  basket: any[] = [];
  userName: String ="username";
  constructor(private searchService : SearchService) { }
  ngOnInit() {

  }
  processSearch():void{
    this.basket = [];

    this.userName = this.searchForm.value.username;
    this.searchService.getSearchGiphyResult(this.searchForm.value.query,this.searchForm.value.result)
      .then((resultJson) => {
        console.log(">>> Result : ", resultJson);
        for(let i of resultJson.data)
        {
          var Slug:string = i.slug;
          var strArr:string[] = Slug.split("-");
          var imageTitle = "";
          for(let s of strArr)
          {
            
            imageTitle += s+" ";
          }
          //putting search result into result list
          this.basket.push({
            // image: "https://media0.giphy.com/media/"+i.id+"/giphy-downsized.gif",
            // image: `https://media0.giphy.com/media/${i.id}/giphy-downsized.gif`,
            username : this.userName,
            image : i.images["downsized"].url,
            id : i.id,
            title: imageTitle,
            disable : false
          });
          console.log( ">>> image url ", i.images["downsized"].url);

        }
      })
      .catch(error => {
        console.error(">>> error: ", error);

      });
    this.searchForm.reset();
  }

}
