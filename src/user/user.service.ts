/* eslint-disable prettier/prettier */


import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from 'src/dto/auth.dto';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService){}
    hashData(data: string)
    {
        return bcrypt.hash(data,10);


    }
    async getTokens(userId: number,email:string)
    {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const roles = user.roles; 
    const permissions = user.permissions;
        const [at,rt]=await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                email,
                roles,
                permissions
            },{
                secret:'at-secret',
                expiresIn: 60 * 15,
    
            
            }),
            this.jwtService.signAsync({
                sub:userId,
                email,
            },{
                secret:'rt-secret',
                expiresIn: 60 * 60 * 24* 7,
    
            
            })


        ])
        return {
            access_token:at,
            refresh_token: rt
        }
      

    }
    async updateRtHash(userId:string,rt:string)
    {
       const hash=await this.hashData(rt); 
       await this.userModel.updateOne({_id:userId},{hashedRt:hash})
    }

    
   async signUp(dto: AuthDto):Promise<Tokens>
    {
        const hash=await this.hashData(dto.password);
    
        const newUser = await this.userModel.create({...dto,password:hash, hash: hash});
        const tokens =await this.getTokens(newUser.id,newUser.email)
        await this.updateRtHash(newUser.id,tokens.refresh_token);
        return tokens;

    }
   
    async login(dto: AuthDto):Promise<Tokens>
    {
        const user=await this.userModel.findOne({email:dto.email})
        console.log("this is the user " ,user);
        if(!user) throw new ForbiddenException("Access Denied")
        const passwordMatches=await bcrypt.compare(dto.password,user.hash);
        if(!passwordMatches) throw new ForbiddenException("Access Denied");
        const tokens =await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token);
        return tokens;
        
    }
    
    async logout(userId:string)
    {
        const user=await this.userModel.updateOne(
            { _id: userId, hashedRt: { $ne: null } },
            { $set: { hashedRt: null } } 
        );
        return user;
        
    }
    
    async refreshTokens(userId:any,rt: string)
    {
        const user=await this.userModel.findOne({_id:userId});
        
        if(!user ||!user.hashedRt)throw new ForbiddenException("Access Denied");
        const rtMatches=await bcrypt.compare(rt,user.hashedRt);
        if(!rtMatches ) throw new ForbiddenException("Access Denied");
        const tokens =await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token);
        return tokens;

        
    }
    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async updateImage(userId: string, newImage: string): Promise<User> {
       
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

       
        user.image = newImage;

       
        return await user.save();
    }
}
