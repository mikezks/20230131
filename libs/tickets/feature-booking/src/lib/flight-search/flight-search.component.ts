import { Component, inject, Injectable, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import {
  of,
  switchMap,
  timer,
  Subject,
  takeUntil,
  Subscription,
  Observable,
  PartialObserver,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Paris';
  flights: Array<Flight> = [];
  selectedFlight: Flight | undefined;

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  private flightService = inject(FlightService);
  subscriptions = new Subscription();

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    /* const destroy$ = new Subject<void>();

    this.subscriptions.add(
      of(true).pipe(
        switchMap(() => timer(1_000)),
        takeUntil(destroy$)
      ).subscribe()
    );

    destroy$.next(); */

    // Reset properties
    this.selectedFlight = undefined;

    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
    });
  }

  select(f: Flight): void {
    this.selectedFlight = { ...f };
  }
}

@Injectable()
export class RxConnector implements OnDestroy {
  private subscription = new Subscription();

  connect<T>(
    stream$: Observable<T>,
    observer?: PartialObserver<T>
  ): Subscription {
    const subscription = stream$.subscribe(observer);
    this.subscription.add(subscription);
    return subscription;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RxConnector],
})
export class AppComponent {
  constructor(private rx: RxConnector) {
    this.rx.connect(timer(0, 1000), {
      next: (value) => console.log(value),
    });
    this.rx.connect(timer(500, 1000).pipe(tap((value) => console.log(value))));
  }
}
