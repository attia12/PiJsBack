import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PaginationOptionsInterface } from 'src/schemas/PaginationOptionsInterface';
import { Room } from 'src/schemas/Room.schema';
import { RoomI } from 'src/schemas/room.interface';
import { UserI } from 'src/schemas/user.interface';
import util from 'util';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>){

    }
    async createRoom(room : RoomI,creator:UserI):Promise<any>
    {
        const Room=await this.addCreatorToRoom(room,creator);
        const newRoom=new this.roomModel(room);
        return await newRoom.save();

    }
    async addCreatorToRoom(room : RoomI,creator:UserI):Promise<RoomI>
    {
        room.users.push(creator);
        return room;

    }
    async getRoomsForUser(userId: string, options: PaginationOptionsInterface):Promise<RoomI[]>
    {  console.log("the userId",userId)
        const { page, limit } = options;

        const skip = (page - 1) * limit;

        const query = { 'users': userId };

        const rooms = await this.roomModel
            .find(query)
            .populate('users')
            .skip(skip)
            .limit(limit)
            .exec();
           
         
            console.log("this is from the query",rooms)

            return rooms.map(room => room.toObject());

    }
}
