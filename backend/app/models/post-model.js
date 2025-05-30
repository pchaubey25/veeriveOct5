import {Schema, model} from 'mongoose'

const postSchema = new Schema ({
    postTitle: { type: String, required: true },
    imageUrl: { type: String, required: false },
    date: { type: Date, required: true },       
    postType: { type: String, enum: ['News', 'Expert Opinion', 'Research Report', 'Infographic', 'Interview'], required: true },
    //postTypeId: { type: Schema.Types.ObjectId, ref: 'PostType', required: true},
    isTrending: {type: Boolean, default: false},
    includeInContainer: {type: Boolean, default: false},
    homePageShow: {type: Boolean, default: false},
    contexts: [{ type: Schema.Types.ObjectId, ref: 'Context', required: true}],
    countries: [{ type: Schema.Types.ObjectId, ref: 'Country', required: true}],
    summary: { type: String, required: true },
    completeContent: { type: String, required: false },   
    sentiment: { type: String, enum: ['Positive', 'Negative', 'Neutral'], default: 'Neutral', required: false},
    primaryCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company', required: false}],
    secondaryCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company', required: false}],
    // source: { type: String, ref: 'Source', required: true},
    // sourceUrl: {type: String, required: true},
    source: [{ type: Schema.Types.ObjectId, ref: 'Source', required: true }], // ✅ Now an array
    sourceUrls: [{ type: String, required: true }], // ✅ Now an array

    generalComment: { type: String, required: false },

    seoData: {
      seoURL: { type: String, required: false }, 
      metaTitle: { type: String, required: false },
      metaKeyword: { type: String, required: false },
      metaDescription: { type: Boolean, default: false },
      header: {},
      footer: {},
    },
  
}, {timestamps: true})


const Post = model('Post', postSchema)

export default Post