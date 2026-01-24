// import { z } from "zod";

// // Create Project validation
// const createProjectValidation = z.object({
//     body: z.object({
//         title: z.string({
//             required_error: 'Title is required',
//         }),
//         descriptions: z.string({
//             required_error: 'Description is required',
//         }),
//         liveLink: z.string({
//             required_error: 'LiveLink is required',
//         }),
//         image: z.string().optional(),
//         githubClient: z.string().optional(),
//         githubServer: z.string().optional(),
//     }),
// });

// // Create Project validation
// const updateProjectValidation = z.object({
//     body: z.object({
//         title: z.string().optional(),
//         descriptions: z.string().optional(),
//         liveLink: z.string().optional(),
//         image: z.string().optional(),
//         githubClient: z.string().optional(),
//         githubServer: z.string().optional(),
//     }),
// });

// export const ProjectValidation = {
//     createProjectValidation,
//     updateProjectValidation
// };

import { z } from 'zod'
import {
  ProjectCategory,
  ProjectPricingType,
  ProjectVisibility,
} from './project.interface'

/* ---------- Sub Validations ---------- */

// Feature description with title
const projectDescriptionTitleSchema = z.object({
  pDescriptionTitle: z.string().optional(),
  pDescriptionPoints: z.string().optional(),
})

// Feature validation
const projectFeatureSchema = z.object({
  pFeatureTitle: z.string().optional(),
  pFeatureDescriptions: z.array(z.string()).optional(),
  pFeaturesDescriptionWithTitle: z
    .array(projectDescriptionTitleSchema)
    .optional(),
})

// Contributor validation
const contributorSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  profileLink: z.string().url().optional(),
  portfolioLink: z.string().url().optional(),
  gitHubLink: z.string().url().optional(),
})

// Review validation
const reviewSchema = z.object({
  reviewerName: z.string().optional(),
  reating: z.string().optional(),
  reviewText: z.string().optional(),
  reviewDate: z.string().optional(),
})

/* ---------- Create Project Validation ---------- */

const createProjectValidation = z.object({
  body: z.object({
    pName: z.string({
      required_error: 'Project name is required',
    }),

    pTitle: z.string({
      required_error: 'Project title is required',
    }),

    pDescription: z.string().optional(),

    pLiveClientLink: z.string().url().optional(),
    pLiveServerLink: z.string().url().optional(),

    pClientRepoLink: z.string().url().optional(),
    pServerRepoLink: z.string().url().optional(),

    pOverviewVideoLink: z.array(z.string().url()).optional(),
    pImageLink: z.array(z.string()).optional(),

    pTechStack: z.array(z.string()).optional(),

    pCategory: z.nativeEnum(ProjectCategory).optional(),

    pVisibility: z.nativeEnum(ProjectVisibility).optional(),

    pPricingType: z.nativeEnum(ProjectPricingType).optional(),

    pType: z.string().optional(),

    pFeatures: z.array(projectFeatureSchema).optional(),

    pContributors: z.array(contributorSchema).optional(),

    pReviewAvgRating: z.string().optional(),

    pReviews: z.array(reviewSchema).optional(),
  }),
})

/* ---------- Update Project Validation ---------- */

const updateProjectValidation = z.object({
  body: z.object({
    pName: z.string().optional(),
    pTitle: z.string().optional(),
    pDescription: z.string().optional(),

    pLiveClientLink: z.string().url().optional(),
    pLiveServerLink: z.string().url().optional(),

    pClientRepoLink: z.string().url().optional(),
    pServerRepoLink: z.string().url().optional(),

    pOverviewVideoLink: z.array(z.string().url()).optional(),
    pImageLink: z.array(z.string()).optional(),

    pTechStack: z.array(z.string()).optional(),

    pCategory: z.nativeEnum(ProjectCategory).optional(),
    pVisibility: z.nativeEnum(ProjectVisibility).optional(),
    pPricingType: z.nativeEnum(ProjectPricingType).optional(),

    pType: z.string().optional(),

    pFeatures: z.array(projectFeatureSchema).optional(),
    pContributors: z.array(contributorSchema).optional(),

    pReviewAvgRating: z.string().optional(),
    pReviews: z.array(reviewSchema).optional(),
  }),
})

export const ProjectValidation = {
  createProjectValidation,
  updateProjectValidation,
}
