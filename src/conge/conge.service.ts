import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Conge,CongeDocument, StatutCon, TypeCon } from './conge.model';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService{
  
  constructor(
    @InjectModel('conge') private readonly congeModel: Model<CongeDocument>
  ){}
  
// création d'un congé
async createConge(conge: Conge): Promise<Conge> {

  const newConge = new this.congeModel(conge);
  return newConge.save();
}

  //Mise à jours d'un congé
  async updateConge(id: string, conge: Conge): Promise<Conge | null> {
    const existingConge = await this.congeModel.findByIdAndUpdate(id, conge, { new: true }); 
    if (!existingConge) {
      throw new NotFoundException('Conge not found');
    }
    return existingConge;
  }

 // Effacer un congé
async deleteConge(id: string): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid congé ID');
  }

  const deletedConge = await this.congeModel.findByIdAndDelete(id);
  if (!deletedConge) {
    throw new NotFoundException('Conge not found');
  }
}

  
  //Trouver tous les= congés
  async findAll(): Promise<Conge[]> {
    return await this.congeModel.find();
  }
  
  //Trouver un congé avec :id:
  async findById(id: string): Promise<Conge | null> {
    return await this.congeModel.findById(id);
  }
  
  

}