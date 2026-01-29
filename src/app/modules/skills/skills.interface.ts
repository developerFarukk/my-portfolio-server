// export type TSkillCategory =
//   | 'Technical'
//   | 'Soft'
//   | 'Front-end'
//   | 'Backend'
//   | 'UI-Tools'

export enum SkillCategory {
  Technical = 'Technical',
  Soft = 'Soft',
  Frontend = 'Front-end',
  Backend = 'Backend',
  UiTools = 'UI-Tools',
}

export type TSkillCategory = `${SkillCategory}`


// Main type interface
export type TSkills = {
  _id?: string
  name: string
  title?: string
  description?: string
  image?: string
  skillCategory?: TSkillCategory
}

// export const SkillCategory = {
//     Technical: 'Technical',
//     Soft: 'Soft',
//     Frontend: 'Front-end',
//     Backend: "Backend",
//     UiTools: "UI-Tools"
// } as const;

// export const SkillCategorys: TSkillCategory[] = [
//   'Technical',
//   'Soft',
//   'Front-end',
//   'Backend',
//   'UI-Tools',
// ]
