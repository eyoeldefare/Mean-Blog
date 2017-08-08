import { Component, OnInit } from '@angular/core';
import { AuthenticateService} from "../service/authenticate.service"; 
import { BlogService } from "../service/blog.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs:any;
  username;

  constructor(private auth: AuthenticateService, private bs: BlogService) { }

  ngOnInit() {
    this.getBlog()
  }

  getBlog(){
    this.bs.allBlogs().subscribe(data => {
      this.blogs = data.blogs;
    });
  }

 


}
