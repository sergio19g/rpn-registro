import { MarcaModel } from './marca';
import { MediosModel } from './medios';

export class NotificacionModel{

    id?                 : number;
    name                : string;
    brandId             : MarcaModel;
    advertisingMediumId : MediosModel;
    statusAdvertising   : string;
}