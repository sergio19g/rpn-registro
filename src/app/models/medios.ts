import { TipoMediosModel } from './tipo-medios';

export class MediosModel{
    
    id?                  : number;
    name                 : string;
    description          : string;
    advertisingMediumType: TipoMediosModel;

}