import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestsInterface } from './interfaces/requests.interface';
import * as xlsx from 'xlsx';
import * as fs from 'fs-extra';
import * as b64 from 'nodejs-base64';

@Injectable()
export class RequestsService {

  constructor (@InjectModel('Requests') private requestsInterfaceModel: Model<RequestsInterface>){}

  async createRequest (createRequestDto: CreateRequestDto): Promise<any> {

    // generate interface of request and save row
    const request = new this.requestsInterfaceModel(createRequestDto).save();

    // validate request creation
    if (!request) {
      return new BadRequestException('error to create request').getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: request, error: false};
  }

  async reportRequest (): Promise<any> {

    // init json data
    const content = await this.getRequests(true);

    // create workbook
    const newBook = xlsx.utils.book_new();

    // create worksheet from json
    const newWs = xlsx.utils.json_to_sheet(content.data);

    // append worksheet
    xlsx.utils.book_append_sheet(newBook, newWs, 'new data');

    const fileName = 'lastReport-base64.xlsx';
    // write data to excel
    xlsx.writeFile(newBook, fileName);

    // return result with path of new encoded file
    return {statusCode: HttpStatus.OK, path: fileName, error: false};
  }

  async getRequests(encoded?):Promise<any> {

    // get all requests
    let requests : any = await this.requestsInterfaceModel.find();

    // remove field _id
    requests = await requests.map((item) => {
      item = item.toObject();

      if(encoded) {
        item.id = b64.base64decode(item.id.toString());
        item.method = b64.base64decode(item.method.toString());
        item.path = b64.base64decode(item.path.toString());
        item.response = b64.base64decode(JSON.stringify(item.response).toString());
        item.createdAt = b64.base64decode(item.createdAt.toString());
        item.updatedAt = b64.base64decode(item.updatedAt.toString());
      }

      delete item._id;
      return item;
    });

    // validate requests list
    if (!requests) {
      return new BadRequestException('error to get all requests').getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: requests, error: false};

  }

  async updateRequest(requestId: string, updateRequestDto: UpdateRequestDto): Promise<any> {

    let request: any = {};
    try {
      // update request row
      await this.requestsInterfaceModel.findByIdAndUpdate(requestId, updateRequestDto);

      // get row updated
      request = await this.requestsInterfaceModel.findById(requestId);

      // remove _id field to response
      request = request.toObject();
      delete request._id;

    } catch (e) {
      return new BadRequestException('error to update request: ' + requestId).getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: request, error: false};
  }

  async deleteRequest(requestId: string): Promise<any> {

    // delete request row
    const request = await this.requestsInterfaceModel.findByIdAndDelete(requestId);

    // validate delete request
    if (!request) {
      return new BadRequestException('error to delete request: ' + requestId).getResponse();
    }

    // return response
    return {statusCode: HttpStatus.OK, data: request, error: false};
  }
}
