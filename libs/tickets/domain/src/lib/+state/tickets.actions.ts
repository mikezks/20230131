import { Flight } from '../entities/flight';

export class FlightsLoad {
  public static readonly type = '[FlightBooking] Flights load';
  constructor(public from: string, public to: string) {}
}

export class FlightsLoaded {
  public static readonly type = '[FlightBooking] Flights loaded';
  constructor(public flights: Flight[]) {}
}

export class FlightUpdate {
  public static readonly type = '[FlightBooking] Flight update';
  constructor(public flight: Flight) {}
}
