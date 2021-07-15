import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {

  result: any;
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  async getRequests(@Res() res) {
    this.result = await this.requestsService.getRequests();
    return res.status(this.result.statusCode).json(this.result);
  }

  @Get('/report')
  async reportRequest(@Res() res) {
    this.result = await this.requestsService.reportRequest();
    // set header to response with xls file
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    // send file to download (open endpoint in browser to get file)
    return res.status(this.result.statusCode).download(this.result.path);
  }

  @Post()
  async createRequest(@Res() res,@Body() createRequestDto: CreateRequestDto) {
    this.result = await this.requestsService.createRequest(createRequestDto);
    return res.status(this.result.statusCode).json(this.result);
  }

  @Patch(':requestId')
  async updateRequest(@Res() res,@Param('requestId') requestId: string, @Body() updateRequestDto: UpdateRequestDto) {
    this.result = await this.requestsService.updateRequest(requestId, updateRequestDto);
    return res.status(this.result.statusCode).json(this.result);
  }

  @Delete(':requestId')
  async deleteRequest(@Res() res,@Param('requestId') requestId: string) {
    this.result = await this.requestsService.deleteRequest(requestId);
    return res.status(this.result.statusCode).json(this.result);
  }

}
