import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AjouterMeetingDto } from './dto/ajouterMeetingdto';
import { Meeting } from 'src/schemas/Meeting.schema';
import { User } from 'src/schemas/User.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MeetingService {
    constructor(@InjectModel(Meeting.name) private readonly meetingModel:Model<Meeting> ){}
    async addMeeting(ajouterDto:AjouterMeetingDto,id:string) : Promise<Meeting> {
       const meeting = new this.meetingModel({
        lienMeet:ajouterDto.lienMeet,
        dateDebut:ajouterDto.dateDebut,
        time:ajouterDto.time,
        user:id
       });
       return meeting.save();
    }
 
    async getMeetingByUserId(userId: string): Promise<Meeting> {
      return this.meetingModel.findOne({ user: userId }).exec();
    }
    async afficherMeets(): Promise<Meeting[]> {
      return await this.meetingModel.find().exec();
    }
    
    
}