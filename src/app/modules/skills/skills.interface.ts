

export type TSkillCategory = 'Technical' | 'Soft' ;

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
} as const;


export const SkillCategorys: TSkillCategory[] = ['Technical', 'Soft'];