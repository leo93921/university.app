import { SupportDevice } from './support-device';

export interface Classroom {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    supportDevices: SupportDevice[];
}
