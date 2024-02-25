import { IsString, IsEnum } from 'class-validator';
import { StatutCon } from 'src/conge/statut-con.enum';
import { TypeCon } from 'src/conge/type-con.enum';

export class CreateCongeDto {
  @IsString()
  nom: string;

  @IsEnum(StatutCon) // Use the @IsEnum decorator with your enum class
  statutCon: StatutCon;

  @IsEnum(TypeCon) // Use the @IsEnum decorator with your enum class
  typeCon: TypeCon;

  // ... other properties
}
