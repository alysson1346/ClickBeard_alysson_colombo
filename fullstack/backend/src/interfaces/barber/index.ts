export interface IBarberCreate {
  name: string;
  age: number;
  hiring_date: Date;
}

export interface IReferenceSpecialty {
  id_barber: string;
  id_specialty: string;
}
