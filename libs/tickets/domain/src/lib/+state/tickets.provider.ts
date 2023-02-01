import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FlightBookingState } from './tickets.state';

export function provideTicketsState(): EnvironmentProviders {
  return importProvidersFrom(NgxsModule.forFeature([FlightBookingState]));
}
