

export type TSkillCategory = 'Technical' | 'Soft' | 'Front-end' | 'Backend' | 'UI-Tools' ;

export type TSkills = {
    _id?: string,
    title: string;
    description?: string;
    image?: string;
    skillCategory: TSkillCategory;
};


export const SkillCategory = {
    Technical: 'Technical',
    Soft: 'Soft',
    Frontend: 'Front-end',
    Backend: "Backend",
    UiTools: "UI-Tools"
} as const;


export const SkillCategorys: TSkillCategory[] = ['Technical', 'Soft', 'Front-end' , 'Backend' , 'UI-Tools'];