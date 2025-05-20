

export type TProject = {
    _id?: string;
    title: string;
    descriptions: string;
    liveLink: string;
    image?: string;
    githubClient?: string
    githubServer?: string
    techStack?: string[];
    features?: string[];
    createdAt?: string;
    updatedAt?: string;
    category?: string;
    isTeamProject?: boolean;
    contributors?: string[];
    videoDemo?: string;
};