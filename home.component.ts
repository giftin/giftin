import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RequestManager } from '../services/request.manager';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
banner:any;
category:any;
food: any;
trendings: any;
col1 : any
col2:any;
col3:any;
col4:any;
  subcategory: any;
  category_id: any;
  filteredList = [];
  objsubcategory:any={};
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private requestmanager: RequestManager) { 

      
    }

  ngOnInit(): void {
    
this.getCategories()
this.getbanners()
this.gettrending()
this.getfood()
this.category_id
  }



getCategories() {
  this.requestmanager.getExecuteAPI('get_categories').subscribe((data)=>{
    this.category=data.data
    console.log("data",this.category)
this.category.forEach((element:any) => {
  this.requestmanager.getExecuteAPI('sub_categories/'+element.id).subscribe((data)=>{
    this.objsubcategory[element.id]=data.data
    console.log("subcat",this.objsubcategory)
  });
  
  });
  });
 
}



  getbanners()
  {
  this.requestmanager.getExecuteAPI('banners?taluk_id').subscribe((data)=>{
this.banner=data.data
this.col1 = this.banner[0].web_image
this.col2 = this.banner[1].web_image
this.col3 = this.banner[2].web_image
this.col4 = this.banner[3].web_image

console.log("col1",this.col1);

    console.log("data",this.banner)}
    );
  }

  gettrending()
  {
  this.requestmanager.getExecuteAPI('trending-food').subscribe((data)=>{
this.trendings=data.data
    console.log("data",this.trendings)}
    );
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      200: {
        items: 1
      
      },
      400: {
        items: 1
      
      }
    },
    nav: true
  }
  getsubcategories(id:any){
    
    this.requestmanager.getExecuteAPI('sub_categories/'+id).subscribe((data)=>{
    this.subcategory=data.data
      console.log("this.subcategory",this.subcategory)
      this.filteredList = this.category.filter((item: any) => item.id == this.category.id)
      console.log("category",this.filteredList)

    });
  }
  getfood()
  {
  this.requestmanager.getExecuteAPI('foods').subscribe((data)=>{
this.food=data.data
    console.log("data",this.food)}
    );
  }
}
