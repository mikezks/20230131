import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Flight } from '../entities/flight';
// import { FlightService } from '../infrastructure/flight.service';
import { FlightsLoaded } from './tickets.actions';

export interface FlightBookingStateModel {
  flights: Flight[];
}

@State<FlightBookingStateModel>({
  name: 'flightBooking',
  defaults: {
    flights: [],
  },
})
@Injectable()
export class FlightBookingState {
  // constructor(private flightService: FlightService) { }

  @Selector()
  public static getState(state: FlightBookingStateModel) {
    return state;
  }

  @Selector()
  public static getFlights(state: FlightBookingStateModel) {
    return state.flights;
  }

  @Action(FlightsLoaded)
  public addFlights(
    ctx: StateContext<FlightBookingStateModel>,
    { flights }: FlightsLoaded
  ) {
    ctx.patchState({ flights });
  }
}
