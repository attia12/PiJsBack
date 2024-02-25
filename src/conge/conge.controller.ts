import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AppService } from './conge.service';
import { Conge } from '../schemas/Conge.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('/conge')
  async createConge(@Body()congeDto: Conge) {
    return this.appService.createConge(congeDto)
  }

  @Put('/conge/:id')
async updateConge(@Param('id') id: string, @Body() congeDto: Conge) {
  return this.appService.updateConge(id, congeDto);
}

@Delete('/conge/:id')
async deleteConge(@Param('id') id: string) {
  await this.appService.deleteConge(id);
  return { message: 'Conge deleted successfully' }; // Return a success message
}

@Get('/conge')
async findAll() {
  return this.appService.findAll();
}

@Get('/conge/:id')
async findById(@Param('id') id: string) {
  const conge = await this.appService.findById(id);
  if (!conge) {
    throw new NotFoundException('Conge not found');
  }
  return conge;
}



}
