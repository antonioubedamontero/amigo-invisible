import { Injectable } from '@angular/core';
import { RaffleResultItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  // service to generate raffle
  participants: string[] = [];
  raffleResult: RaffleResultItem[] = [];

  constructor() {}

  generateRaffle(participants: string[]): void {
    // Generate raffle and return raffle results
    this.participants = participants;
    const pendingParticipants = [...this.participants];

    this.raffleResult = this.participants.map((participant: string) => {
      const from = participant;
      // Remove self
      const availableParticipants = pendingParticipants.filter(
        (currentParticipant: string) => currentParticipant !== participant
      );

      if (availableParticipants.length === 0) {
        return { from, to: '' };
      }

      const assignedParticipant = this.getRandomParticipant(
        availableParticipants
      );

      const to = assignedParticipant;
      pendingParticipants.splice(pendingParticipants.indexOf(to), 1);

      return { from, to };
    });
  }

  getRaffleResults(): RaffleResultItem[] {
    // Return raffle results
    return this.raffleResult;
  }

  private getRandomParticipant(participants: string[]): string {
    // Get random participant
    const participantsLength = participants.length;
    return participantsLength === 1
      ? participants[0]
      : participants[Math.floor(Math.random() * participantsLength)];
  }
}
