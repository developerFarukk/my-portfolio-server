// import { model, Schema } from "mongoose";
// import { TProject } from "./project.interface";

// const projectSchema = new Schema<TProject>(
//     {
//         // _id: { type: Types.ObjectId, required: false },
//         title: {
//             type: String,
//             required: [true, "Title is required "]
//         },
//         descriptions: {
//             type: String,
//             required: [true, "Description is required"]
//         },
//         liveLink: {
//             type: String,
//             required: [true, "LiveLink is required"]
//         },
//         image: { type: String, required: false, default: '' },
//         githubClient: { type: String, required: false },
//         githubServer: { type: String, required: false },
//         techStack: {
//             type: [String],
//             default: []
//         },
//         features: {
//             type: [String],
//             default: []
//         },
//         category: {
//             type: String,
//             default: ""
//         },
//         videoDemo: {
//             type: String,
//             default: ""
//         },
//         isTeamProject: {
//             type: Boolean,
//             default: false
//         },
//         contributors: {
//             type: [String],
//             default: []
//         }
//     },
//     {
//         timestamps: true,
//         versionKey: false
//     },
// );

// export const Project = model<TProject>('Project', projectSchema);

import { Schema, model } from 'mongoose'
import {
  ProjectCategory,
  ProjectPricingType,
  ProjectVisibility,
  TProjects,
} from './project.interface'

/* ---------- Sub Schemas ---------- */

// Feature description with title
const projectDescriptionTitleSchema = new Schema(
  {
    pDescriptionTitle: { type: String, trim: true },
    pDescriptionPoints: { type: String, trim: true },
  },
  { _id: false }
)

// Feature schema
const projectFeatureSchema = new Schema(
  {
    pFeatureTitle: { type: String, trim: true },
    pFeatureDescriptions: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    pFeaturesDescriptionWithTitle: {
      type: [projectDescriptionTitleSchema],
      default: [],
    },
  },
  { _id: false }
)

// Contributor schema
const contributorSchema = new Schema(
  {
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    profileLink: { type: String, trim: true },
    portfolioLink: { type: String, trim: true },
    gitHubLink: { type: String, trim: true },
  },
  { _id: false }
)

// Review schema
const reviewSchema = new Schema(
  {
    reviewerName: { type: String, trim: true },
    reating: { type: String, trim: true },
    reviewText: { type: String, trim: true },
    reviewDate: { type: String, trim: true },
  },
  { _id: false }
)

/* ---------- Main Project Schema ---------- */

const projectSchema = new Schema<TProjects>(
  {
    pName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    pTitle: {
      type: String,
      required: true,
      trim: true,
    },

    pDescription: {
      type: String,
      trim: true,
    },

    pLiveClientLink: {
      type: String,
      trim: true,
    },

    pLiveServerLink: {
      type: String,
      trim: true,
    },

    pClientRepoLink: {
      type: String,
      trim: true,
    },

    pServerRepoLink: {
      type: String,
      trim: true,
    },

    pOverviewVideoLink: {
      type: [{ type: String, trim: true }],
      default: [],
    },

    pImageLink: {
      type: [{ type: String, trim: true }],
      default: [],
    },

    pTechStack: {
      type: [{ type: String, trim: true }],
      default: [],
    },

    pCategory: {
      type: String,
      enum: Object.values(ProjectCategory),
      trim: true,
    },

    pVisibility: {
      type: String,
      enum: Object.values(ProjectVisibility),
      default: ProjectVisibility.PUBLIC,
      trim: true,
    },

    pPricingType: {
      type: String,
      enum: Object.values(ProjectPricingType),
      default: ProjectPricingType.FREE,
      trim: true,
    },

    pType: {
      type: String,
      trim: true,
    },

    pFeatures: {
      type: [projectFeatureSchema],
      default: [],
    },

    pContributors: {
      type: [contributorSchema],
      default: [],
    },

    pReviewAvgRating: {
      type: String,
      trim: true,
    },

    pReviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const Project = model<TProjects>('Project', projectSchema)
