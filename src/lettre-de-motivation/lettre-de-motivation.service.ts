import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LettreDeMotivation } from 'src/schemas/LettreDeMotivation.schema';
import { LettreDeMotivationDto } from './dto/create-dto';
import { KnnService } from 'src/knn/knn.service';



@Injectable()
export class LettreDeMotivationService {


  constructor(
    @InjectModel(LettreDeMotivation.name) private readonly lettreModel: Model<LettreDeMotivation>,private readonly knnService:KnnService
) {
    
}

async detecterSimilarite(vector: number[]): Promise<string> {
  const label = await this.knnService.predict(vector);
  return label;
}
    async insererLettre(lettreDto: LettreDeMotivationDto, userId: string): Promise<LettreDeMotivation> {
        const lettre = new this.lettreModel({
            description: lettreDto.description,
            cv: lettreDto.cv.buffer,
            user: userId
        });
        return lettre.save();
    }

    generateMotivationLetter(description: string, cv: File): string {
        return `Cher recruteur,
  
      Je me permets de vous adresser ma candidature pour le poste de ${description}. Vous trouverez ci-joint mon CV, qui détaille mon expérience et mes compétences dans le domaine. Je suis convaincu que mon profil correspond parfaitement aux attentes de votre entreprise. Je reste à votre disposition pour un entretien afin de discuter plus en détail de ma candidature. Dans l'attente d'une réponse de votre part, je vous prie d'agréer, cher recruteur, l'expression de mes salutations distinguées.
  
      Cordialement,
      ${cv}`;
    }

    async afficherToutesLettres(): Promise<LettreDeMotivation[]> {
        return await this.lettreModel.find().exec();
    }

    async supprimerLettre(id: string): Promise<LettreDeMotivation[]> {
        return await this.lettreModel.findByIdAndDelete(id);
    }

    async verifierLettre(id: string): Promise<LettreDeMotivation> {
        const lettre = await this.lettreModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
        if (!lettre) {
            throw new NotFoundException(`Lettre de motivation introuvable avec l'ID ${id}`);
        }
        return lettre;
    }

    async getLettreDeMotivationByUser(userId: string): Promise<LettreDeMotivation | null> {
        return this.lettreModel.findOne({ user: userId }).exec();
    }
}
