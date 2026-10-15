import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProfileDto } from './dto/create-profile.dto.js';

import { UpdateProfileDto } from './dto/update-profile.dto.js';

import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // @Get method
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  //with Query
  findAll1(@Query('age', ParseIntPipe) age: number) {
    return [{ age }];
    //http://localhost:3000/profile?age=45
  }

  /*

app.get('/profile/', (req, res)=>{})

*/

  /* Getting with ID Param */

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne(id);
  }

  // GET /profiles
  // GET /profiles/:id
  // POST /profiles

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  // PUT /profiles/:id

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, updateProfileDto);
  }

  // DELETE /profiles/:id
  /*
  
    Delete,
  HttpCode,
  HttpStatus,
  
  */

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.remove(id);
  }
}
