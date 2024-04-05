import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contract } from 'src/schemas/Contract.schema';
import { ContractDto } from './dto/contract-dto';

@Injectable()
export class ContractService {
    constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

    async getContractById(id: string): Promise<Contract> {
        return this.contractModel.findById(id).exec();
    }
    async signContract(id: string, signature: string): Promise<Contract> {
        const contract = await this.contractModel.findById(id).exec();
        if (!contract) {
            throw new Error('Contrat non trouvé');
        }
        contract.signature = signature;
        return contract.save();
    }
    async create(contractDto: ContractDto): Promise<void> {
        const newContract = new this.contractModel({
            dateDebut: contractDto.dateDebut,
            dateFin: contractDto.dateFin,
            salaire: contractDto.salaire,
            type: contractDto.type,
            signature: contractDto.signature
        });
        await newContract.save();
    }
}
