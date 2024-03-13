import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { User } from 'src/schemas/User.schema';
import { UserService } from 'src/user/user.service';
import { RoomService } from '../service/room-service/room/room.service';
import { RoomI } from 'src/schemas/room.interface';
import { PaginationOptionsInterface } from 'src/schemas/PaginationOptionsInterface';

@WebSocketGateway({cors:{origin:['https://hoppscotch.io','http://localhost:4200','http://localhost:3000']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server:Server;
  
 
  constructor(private authService :UserService,private roomService :RoomService)
  {

  }
 
  
  async handleConnection(socket:Socket) {
    console.log('on connectt')
    try {
      const decodedToken=await this.authService.verifyJwt(socket.handshake.headers.authorization);
      console.log(decodedToken);
      const user:any=await this.authService.getUserById(decodedToken.sub);
      console.log("this is the user socket",user)
      if(!user)
      {
        //disconnect
        return this.disconnect(socket);

      }else {
        socket.data.user=user;
        // this.title.push('Value '+ Math.random().toString());
        // this.server.emit('message',this.title);
      
        //only emmit rooms to the specefic connected clinet


        //const rooms=await this.roomService.getRoomsForUser(user._id,{page:1,limit:10});
       // console.log("this is the rooms ",rooms)
       // return this.server.to(socket.id).emit('rooms',rooms);
       const rooms: RoomI[] = await this.roomService.getRoomsForUser(user._id, { page: 1, limit: 10 });
       const roomPaginate: any = { items: rooms, meta: { totalItems: rooms.length, itemCount: rooms.length, itemsPerPage: 10, totalPages: 1, currentPage: 1 } };
       return this.server.to(socket.id).emit('rooms',roomPaginate);
        
        

      }

    }catch
    {
      return this.disconnect(socket);

    }
   
  }
  handleDisconnect(socket: Socket) {
    console.log('disconenct')
    
    socket.disconnect();
 
   }
  private disconnect(socket:Socket)
  {
    socket.emit('Error',new UnauthorizedException());
    socket.disconnect();
  }
  @SubscribeMessage('createRoom')
  async onCreateRoom(socket:Socket,room:RoomI):Promise<RoomI>
  {
    return this.roomService.createRoom(room,socket.data.user)

  }
  @SubscribeMessage('paginateRoom')
  async onPaginateRoom(socket: Socket,page:PaginationOptionsInterface)
  {
    page.limit=page.limit > 100 ? 100 :page.limit;
    const rooms: RoomI[] = await this.roomService.getRoomsForUser(socket.data.user._id,page);
    return this.server.to(socket.id).emit('rooms',rooms);
    

  }
 
}
