import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from 'src/schemas/Contract.schema';
import { ContractDto } from './dto/contract-dto';

@Controller('contract')
export class ContractController {
    constructor(private readonly contractService: ContractService) {}

    @Get(':id')
    async getContractById(@Param('id') id: string): Promise<Contract> {
        return this.contractService.getContractById(id);
    }
    
    @Post(':id/sign')
    async signContract(@Param('id') id: string, @Body('signature') signature: string): Promise<void> {
        await this.contractService.signContract(id, signature);
    }
    @Post()
    async create(@Body() contractDto: ContractDto) {
        await this.contractService.create(contractDto);
        return { message: 'Contrat signé avec succès' };
    }
}
