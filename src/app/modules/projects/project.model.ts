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
    pDescriptionTitle: { type: String },
    pDescriptionPoints: { type: String },
  },
  { _id: false }
)

// Feature schema
const projectFeatureSchema = new Schema(
  {
    pFeatureTitle: { type: String },
    pFeatureDescriptions: {
      type: [String],
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
    name: { type: String },
    role: { type: String },
    profileLink: { type: String },
    portfolioLink: { type: String },
    gitHubLink: { type: String },
  },
  { _id: false }
)

// Review schema
const reviewSchema = new Schema(
  {
    reviewerName: { type: String },
    reating: { type: String },
    reviewText: { type: String },
    reviewDate: { type: String },
  },
  { _id: false }
)

/* ---------- Main Project Schema ---------- */

const projectSchema = new Schema<TProjects>(
  {
    pName: {
      type: String,
      required: true,
    },

    pTitle: {
      type: String,
      required: true,
    },

    pDescription: {
      type: String,
    },

    pLiveClientLink: {
      type: String,
    },

    pLiveServerLink: {
      type: String,
    },

    pClientRepoLink: {
      type: String,
    },

    pServerRepoLink: {
      type: String,
    },

    pOverviewVideoLink: {
      type: [String],
      default: [],
    },

    pImageLink: {
      type: [String],
      default: [],
    },

    pTechStack: {
      type: [String],
      default: [],
    },

    pCategory: {
      type: String,
      enum: Object.values(ProjectCategory),
    },

    pVisibility: {
      type: String,
      enum: Object.values(ProjectVisibility),
      default: ProjectVisibility.PUBLIC,
    },

    pPricingType: {
      type: String,
      enum: Object.values(ProjectPricingType),
      default: ProjectPricingType.FREE,
    },

    pType: {
      type: String,
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
