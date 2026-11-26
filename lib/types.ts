
// Information submitted by someone requesting equipment.
export interface LoanRequestInput {
    requesterName: string;
    department: string;
    equipmentId: number;
    quantity: number;
    purpose: string;
    neededFrom: string;
    neededUntil: string;
  }
  