import { BadRequestException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class PostsService {

  baseUrl: string;

  constructor(private http: HttpService, private readonly requestsService : RequestsService,){
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  async getPosts(): Promise<any> {

    // get all posts
    const posts = await this.http.get(`${this.baseUrl}/posts`,{}).toPromise().then( async result => {

      // create the request for this method
      await this.requestsService.createRequest({method: 'GET', path: 'posts', response: result.data});
      return result.data;
    });

    // validate posts response
    if (!posts) {
      return new BadRequestException('error to get all posts').getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: posts, error: false};

  }

}
