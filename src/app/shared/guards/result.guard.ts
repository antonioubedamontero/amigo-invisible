import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RaffleService } from '../services/raffle.service';

export const resultGuard = () => {
  const router = inject(Router);
  const raffleService = inject(RaffleService);

  return raffleService.raffleResult.length === 0
    ? router.navigate(['/'])
    : true;
};
