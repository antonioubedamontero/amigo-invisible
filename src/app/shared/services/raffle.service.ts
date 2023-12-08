import { Injectable } from '@angular/core';
import { Participant, RaffleResultItem } from '../models';

const MAX_INTENTS = 100; // Max raffle intents if one participant haven't anyone to give to

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  // service to generate raffle
  participants: Participant[] = [];
  raffleResult: RaffleResultItem[] = [];

  constructor() {}

  loadParticipants(participants: Participant[]): void {
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

  tryToGenerateRaffle(participants: Participant[]): void {
    // Try to generate raffle
    let pendingParticipants = [...participants];

    this.raffleResult = this.participants.map((participant: Participant) => {
      const from = participant;

      // Remove participant incompatibilities
      const availableParticipants: Participant[] = pendingParticipants.filter(
        (pendingParticipant: Participant) =>
          !participant.exclusions.includes(pendingParticipant.name)
      );

      if (availableParticipants.length === 0) {
        return { from: from.name, to: '' };
      }

      const assignedParticipant = this.getRandomParticipant(
        availableParticipants.map(
          (availableParticipant: Participant) => availableParticipant.name
        )
      );

      const to = assignedParticipant;
      pendingParticipants = pendingParticipants.filter(
        (pendingParticipant: Participant) => pendingParticipant.name !== to
      );

      return { from: from.name, to };
    });
  }

  getRaffleResults(): RaffleResultItem[] {
    // Return raffle results
    return this.raffleResult;
  }

  private getRandomParticipant(participantsNames: string[]): string {
    // Get random participant
    const participantsLength = participantsNames.length;
    return participantsLength === 1
      ? participantsNames[0]
      : participantsNames[Math.floor(Math.random() * participantsLength)];
  }

  private hasParticipantsWithoutMatch(): boolean {
    // Returns true if there is a participant without raffle match
    return !!this.raffleResult.find(
      (participant) => participant.to.length === 0
    );
  }
}
