import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEventArgs, GridComponent, PageEventArgs, PageSettingsModel, SortEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, UrlAdaptor, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ApiBuilder, SearchEventArgs } from './core/api-builder';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // public data: DataManager = 
  // new DataManager({ url: 'api/UrlDataSource', adaptor: new WebApiAdaptor  });
  public pageSettings?: PageSettingsModel = <PageSettingsModel>{pageSize:10,pageSizes:true};
  public query:Query = new Query;
  public queryStr:string = '';
  public search:string = '';
  public parentSearch:string = '';
  // create if null
  private path:string = "categories";
  private _apiBuilder! : ApiBuilder;
  public get apiBuilder() : ApiBuilder {
    if(this._apiBuilder == undefined){
      this._apiBuilder = ApiBuilder.create(this.path);
    }
    return this._apiBuilder;
  }
  
  @ViewChild('grid')
  grid: GridComponent | undefined;
  ngOnInit(): void {
  }
  searching(search:string, columnName:string){
   this.action(<SearchEventArgs>{
    columnName: columnName,
    requestType: 'searching',
    value: search
   });
  }
  action($event: any){
    var q = '';
    var pageSettings = this.grid?.pageSettings;

    if($event.requestType == 'sorting'){
      var sorting = $event as SortEventArgs;
      if(sorting.columnName == null){
       q= this.apiBuilder.clearSort()
        .build();
      }else{
        q = this.apiBuilder
        .sort(sorting.columnName,sorting.direction)
        .build();
      }
    
     
    }

    if($event.requestType == 'paging'){
      var paging = $event as PageEventArgs;
      var currentPage = paging.currentPage;
      var pageSize = pageSettings?.pageSize;
      var pageIndex =(Number(currentPage) - 1);
      var skip = pageIndex * pageSize!;
       q = this.apiBuilder
      .take(pageSize!)
      .skip(skip)
      .build();
      

    }
    if($event.requestType == 'searching'){
      var search = $event as SearchEventArgs;
       q = this.apiBuilder
      .clear()
      .search(search.value,search.columnName)
      .take(pageSettings?.pageSize!)
      .skip(0)
      .build();
    }
    console.log(q);
  }

  public data: Object[] = [
    {
      Id: 10248, Name: 'VINET', ParentCategoryName: 'Reims'
    },
    {
      Id: 10249, Name: 'TOMSP', ParentCategoryName: 'Münster'
    },
    {
      Id: 10250, Name: 'HANAR', ParentCategoryName: 'Rio de Janeiro'
    },
    {
      Id: 10251, Name: 'VICTE', ParentCategoryName: 'Lyon'
    },
    {
      Id: 10252, Name: 'SUPRD', ParentCategoryName: 'Charleroi'
    },
    {
      Id: 10253, Name: 'HANAR', ParentCategoryName: 'Rio de Janeiro'
    },
    {
      Id: 10254, Name: 'CHOPS', ParentCategoryName: 'Bern'
    },
    {
      Id: 10255, Name: 'RICSU', ParentCategoryName: 'Genève'
    },
    {
      Id: 10256, Name: 'WELLI', ParentCategoryName: 'Brandenburg'
    },
    {
      Id: 10257, Name: 'HILAA', ParentCategoryName: 'Graz'
    },
    {
      Id: 10258, Name: 'ERNSH', ParentCategoryName: 'Cunewalde'
    },
    {
      Id: 10259, Name: 'CENTC', ParentCategoryName: 'Buenos Aires'
    },
    {
      Id: 10260, Name: 'OTTIK', ParentCategoryName: 'Lille'
    },
    {
      Id: 10261, Name: 'QUEDE', ParentCategoryName: 'Reims'
    },
    {
      Id: 10262, Name: 'RATTC', ParentCategoryName: 'Albuquerque'
    },
    {
      Id: 10263, Name: 'ERNSH', ParentCategoryName: 'Graz'
    },
    {
      Id: 10264, Name: 'FOLKO', ParentCategoryName: 'Bräcke'
    },
    {
      Id: 10265, Name: 'BLONP', ParentCategoryName: 'Madrid'
    },
    {
      Id: 10266, Name: 'WARTH', ParentCategoryName: 'Oulu'
    },
    {
      Id: 10267, Name: 'FRANK', ParentCategoryName: 'München'
    }
    
  ];
}
