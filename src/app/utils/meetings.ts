import { Level, Levels } from '../models/profile';

export interface IDeclension {
  digits: number[];
  declension: string;
}

export const meetingsDeclensions: IDeclension[] = [
  {
    digits: [1],
    declension: 'собрание',
  },
  {
    digits: [2, 3, 4],
    declension: 'собрания',
  },
  {
    digits: [5, 6, 7, 8, 9, 0],
    declension: 'собраний',
  },
];

// TODO Test
export function getCountForNextLevel(_meetings: number): number {
  let totalCount = 0;
  for (let i = 0; i < Levels.length; i++) {
    totalCount = totalCount + Levels[i].meetings;
    // меньше текущего уровня 4 < 5 то до следующего (3 + 5) - 4
    if (_meetings < totalCount /*  && i + 1 < Levels.length */) {
      return totalCount - _meetings;
    }
  }

  return _meetings;
}

// TODO Test
export function getCurrentLevel(_meetings: number): Level | null {
  let totalCount = 0;
  for (let i = 0; i < Levels.length; i++) {
    totalCount = totalCount + Levels[i].meetings;
    if (_meetings < totalCount) {
      return Levels[i].name;
    }
  }
  return null;
}

// TODO Test
export function getMeetingsDeclension(_meetings: number): string {
  let declension = meetingsDeclensions[2].declension;
  meetingsDeclensions.forEach((_declension: IDeclension) => {
    if (_declension.digits.includes(_meetings)) {
      declension = _declension.declension;
    }
  });

  return declension;
}

export enum Step {
  Achived,
  Current,
  Disable,
}

export function getCurrentStep(meetings: number, levelMeetings: number, wasCurrent: boolean): Step {
  if (meetings > levelMeetings) {
    return Step.Achived;
  }
  if (meetings < levelMeetings && !wasCurrent) {
    return Step.Current;
  }
  return Step.Disable;
}

export interface IStep {
  discaunt: number;
  progress: number;
  step: Step;
  level: Level;
}

// TODO Test
export function generateSteps(meetings: number): IStep[] {
  const steps: IStep[] = [];
  const stepProgress = 100 / 3;

  let wasCurrent = false;
  let totalCount = 0;
  for (let i = 0; i < Levels.length; i++) {
    totalCount = totalCount + Levels[i].meetings;
    const newStep: IStep = {
      progress: stepProgress * i,
      discaunt: Levels[i].discount,
      step: getCurrentStep(meetings, Levels[i].meetings, wasCurrent),
      level: Levels[i].name,
    };

    if (newStep.step === Step.Current) {
      wasCurrent = true;
    }

    steps.push(newStep);
  }
  return steps;
}
