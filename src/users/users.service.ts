import { BadRequestException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class UsersService {

  baseUrl: string;

  constructor(private http: HttpService, private requestsService: RequestsService) {
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  async getUsers(): Promise<any> {

    // get all users
    const users = await this.http.get(`${this.baseUrl}/users`,{}).toPromise().then( async result => {

      // create the request for this method
      await this.requestsService.createRequest({ method: 'GET', path: 'users', response: result.data });

      return result.data;
    });

    // validate list of users exists
    if (!users) {
      return new BadRequestException('error to get all users').getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: users, error: false};
  }

  async getUserPhotos(userId: number): Promise<any> {

    // get all albums with user photos by :userId
    const userPhotos = await this.http.get(`${this.baseUrl}/users/${userId}/albums`,{}).toPromise().then(async result => {

      // create the request for this method
      await this.requestsService.createRequest({ method: 'GET', path: `users/${userId}/albums`, response: result.data });
      const resAlbums : any = result.data;
      let response: any;

      for (const [i, album] of resAlbums.entries()) {

        delete resAlbums[i].userId;
        Object.assign(resAlbums[i], {photos:[] });

        response = await this.http.get(`${this.baseUrl}/albums/${album.id}/photos`,{}).toPromise().then(async result => {

          // create the request for this method
          await this.requestsService.createRequest({
            method: 'GET',
            path: `albums/${album.id}/photos`,
            response: result.data
          });

          resAlbums[i].photos = result.data.map((item) => {
            delete item.albumId;
            return item
          });
          return resAlbums;
        });
      }

      return response;

    });

    // validate user photos result
    if(!userPhotos) {
      return new BadRequestException('error to get photos to this user').getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: userPhotos, error: false};

  }

}
