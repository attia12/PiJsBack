/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/dto/auth.dto';
import { Tokens } from 'src/types/tokens.type';

import { RtGuard } from 'src/common/guards/rt.guard';

import { GetCurrentUser } from 'src/common/decorators/get-current-user.decoraot';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permisssions.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import mongoose from 'mongoose';
export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}


@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}
    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() authDto: AuthDto): Promise<Tokens>
    {
        return this.userService.signUp(authDto);


    }

    @Public()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: AuthDto): Promise<Tokens>
    {
        //console.log(dto.email)
        return this.userService.login(dto);
        
    }
  
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') userId:string)
    {
       
       
       return this.userService.logout(userId);
        
    }
    @Public()

    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUser('refreshToken')refreshToken :string,@GetCurrentUser('sub') userId:string)
    {
       console.log({
        userId,
        refreshToken
       })
        
       
        return this.userService.refreshTokens(userId,refreshToken);
        
    }
    @Get()
   
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Roles('admin')
    @Permissions('read:user')
    
    getUsers()
    {
        return 'You have access to getUsers API because you have the required role.';

    }
    @Get('/getUserById/:id')
    @HttpCode(HttpStatus.OK)
    
    async getUserDetailById(@Param('id') id:string)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id);
           if(!isValid) throw new HttpException('User not found',404);
           const findUser= await this.userService.getUserById(id);
           if(!findUser)throw new HttpException('User not found',404);
           return findUser;

    }

 @Get('/getUserNameById/:id')
    @HttpCode(HttpStatus.OK)
    
    async getUserNameById(@Param('id') id:string)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id);
           if(!isValid) throw new HttpException('User not found',404);
           let findUser= await this.userService.getUserNameById(id);
           if(!findUser)throw new HttpException('User not found',404);
           let response = {
                    username:  findUser,
           }
           return { username: response.username };
  };





    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',storage))
    async uploadFile(@UploadedFile()file,@GetCurrentUser('sub')userId:string) :Promise<any>
    {
      
        try {
           const user= await this.userService.updateImage(userId,file.filename)
           return user;
     

        
       
       
    } catch (error) {
        console.error(error);
        
        return { error: 'An error occurred' };

    }
}
@Get('profile-image/:imagename')
findProfileImage(@Param('imagename') imagename, @Res() res): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
}


@Get('/getUserIdByUsername/:username')
@HttpCode(HttpStatus.OK)
async getUserIdByUsername(@Param('username') username: string) {
  try {
    const user = await this.userService.getUserIdByUsername(username); // Assuming getUserByUsername exists in your userService

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error; // Re-throw HttpException for consistent error handling
    } else {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
}


