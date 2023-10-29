    // implemented builder pattern by introducing methods i.e skip, take, sort, search
    // and  this will build method which will return the url
    // also will check if parameters are not null, undefined, empty and duplicate before adding to url
export class ApiBuilder{
    public static apiUrl: string = "http://192.168.100.10:4200/api/";
    private url: string = "";
    private path: string = "";
    private pageSize: number;
    constructor(path: string,pageSize: number){
        this.path = path;
        this.pageSize = pageSize;
        this.url = path + `?$take=${pageSize}`;
    }
    public static create(path: string,pageSize: number = 10): ApiBuilder{
        if(path != null && path != undefined && path != ""){
            return new ApiBuilder(this.apiUrl + path,pageSize);
        }
        throw new Error("Path cannot be null, undefined or empty");
    }
    public skip(skip: number): ApiBuilder{
        if(skip != null && skip != undefined){
            if(this.url.indexOf('skip=') == -1){
                this.url += `&skip=${skip}`;
            } else {
                this.url = this.url.replace(/skip=\d+/, `skip=${skip}`);
            }
        }
        return this;
    }
    public take(take: number): ApiBuilder{
        if(take != null && take != undefined && take > 0){
            if(this.url.indexOf('take=') == -1){
                this.url += `&take=${take}`;
            } else {
                this.url = this.url.replace(/take=\d+/, `take=${take}`);
            }
           
        }
        return this;
    }
    public sort(column:string|undefined,sort: string = 'Ascending'): ApiBuilder{
        if(sort != null && sort != undefined && sort != ""){
            if(this.url.indexOf('sort=') == -1){
                
                this.url += `&sort=${sort}`;
            } else {
                
                this.url = this.url.replace(/sort=\w+/, `sort=${sort}`);
            }
           
        }
        if(column != null && column != undefined && column != ""){
            if(this.url.indexOf('column=') == -1){
                this.url += `&column=${column}`;
            } else {
                this.url = this.url.replace(/column=\w+/, `column=${column}`);
            }
            
        }
        return this;
    }
    // clear sort and column i.e &sort and &column
    public clearSort(): ApiBuilder{
        this.url = this.url.replace(/&sort=\w+/, '');
        this.url = this.url.replace(/&column=\w+/, '');
        return this;
    }
    public search(value: string,columnName:string): ApiBuilder{
        if(value != null && value != undefined && value != ""){
            if(this.url.indexOf(`${columnName}=`) == -1){
                this.url += `&${columnName}=${value}`;
            } else {
                this.url = this.url.replace(`/${columnName}=\d+/`, `${columnName}=${value}`);
            }
           
        }
        return this;
    }
    // clear sort, skip, take
    public clear(): ApiBuilder{
        this.url = this.path;
        this.url += `?take=${this.pageSize}`;
        
        return this;
    }
        
    public build(): string{
        return this.url;
    }
    

}
export class SearchEventArgs{
    public value: string = "";
    public columnName: string = "";
    public requestType: string = "searching";
}