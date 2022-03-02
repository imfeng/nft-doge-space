export type HexNftType = {
  id: number;
  type: 'genesis' | 'normal' | 'energy' | 'normal_l2' | 'normal_l3';
  image: string; // (?) id => image
  //
  status: 'liveness' | 'duplicating' | 'broken' | 'dupicate_done';
  //
  DuplicateDuration: number;
  DuplicateSuccessRate: number;
  DuplicateEnergyEarn: number;
  DuplicateDoneDate: Date | null,
  // if now > DuplicateDoneDate then `do claim` -> 'liveness' | 'broken'

  FixingEnergyCost: number;
  // `do fixing` -> 'liveness'

  CombineDuration: number;
  CombineSuccessRate: number;
  CombineEnergyEarn: number;
  CombineDate: Date | null,
  //

};

export function numberToDate(dateNumber: number): Date {
  const date = new Date(dateNumber * 1000);
  return date;
}
