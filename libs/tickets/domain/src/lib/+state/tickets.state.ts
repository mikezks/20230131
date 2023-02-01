import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, switchMap, catchError, EMPTY } from 'rxjs';
import { Flight } from '../entities/flight';
import { FlightService } from '../infrastructure/flight.service';
// import { FlightService } from '../infrastructure/flight.service';
import { FlightsLoad, FlightsLoaded } from './tickets.actions';

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
  #flightService = inject(FlightService);

  @Selector()
  public static getState(state: FlightBookingStateModel) {
    return state;
  }

  @Selector()
  public static getFlights(state: FlightBookingStateModel) {
    return state.flights;
  }

  // Redux: Reducer Funtion
  @Action(FlightsLoaded)
  public addFlights(
    ctx: StateContext<FlightBookingStateModel>,
    { flights }: FlightsLoaded
  ) {
    ctx.patchState({ flights });
  }

  // Redux: Async Side-Effect
  @Action(FlightsLoad)
  public loadFlights(
    ctx: StateContext<FlightBookingStateModel>,
    { from, to }: FlightsLoad
  ): Observable<void> {
    return this.#flightService.find(from, to).pipe(
      switchMap((flights) => ctx.dispatch(new FlightsLoaded(flights))),
      catchError(() => EMPTY)
    );
  }
}
