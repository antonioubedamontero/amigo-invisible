import { Injectable } from '@angular/core';
import { RaffleResultItem } from '../models';

const MAX_INTENTS = 10;

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  // service to generate raffle
  participants: string[] = [];
  raffleResult: RaffleResultItem[] = [];

  constructor() {}

  loadParticipants(participants: string[]): void {
    // Load raffle participants
    this.participants = participants;
  }

  generateRaffle(): void {
    /* Repeate try to generate raffle for ten intents if one participant can only give herself */
    let intents = 0;
    while (true) {
      intents++;
      this.tryToGenerateRaffle(this.participants);
      if (!this.hasParticipantsWithoutMatch() || intents === MAX_INTENTS) {
        break;
      }
    }
  }

  tryToGenerateRaffle(participants: string[]): void {
    // Try to generate raffle
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

  private hasParticipantsWithoutMatch(): boolean {
    // Returns true if there is a participant without raffle match
    return !!this.raffleResult.find(
      (participant) => participant.to.length === 0
    );
  }
}
