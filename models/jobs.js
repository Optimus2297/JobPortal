const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const geoCoder = require("../utils/geocoder");

const jobShcema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter Job title."],
    trim: true,
    maxlength: [100, "Job title cannot exceed 100 characters."],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please enter Job Decription."],
    maxlength: [1000, "JOb decription cannot exceed 1000 characters."],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valid Email address."],
  },
  address: {
    type: String,
    required: [true, "Please add an address."],
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ["point"],
  //   },
  //   coordinates: {
  //     type: [Number],
  //     index: "2dsphere",
  //   },
  //   formatedAddress: String,
  //   city: String,
  //   state: String,
  //   zipcode: String,
  //   country: String,
  // },
  company: {
    type: String,
    required: [true, "please add Company name."],
  },
  industry: {
    type: [String],
    required: true,
    enum: {
      values: [
        "Bussiness",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Others",
      ],
      message: "Please select correct options for industry.",
    },
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct options for job type.",
    },
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: ["Bachelors", "Masters", "Phd"],
      message: "Please select correct options for Education.",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        "No Experience",
        "1 year - 2 years",
        "2 years - 5 years",
        "5 years+",
      ],
      message: "Please select correct options for Experience.",
    },
  },
  salary: {
    type: Number,
    required: [true, "Please enter expected salary for the job."],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

//creating slug brefore saving top db
jobShcema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

//setting up location
// jobShcema.pre("save", async function (next) {
//   const loc = await geoCoder.geocode(this.address);

//   this.location = {
//     type: "Point",
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formatedAddress: loc[0].formatedAddress,
//     city: loc[0].city,
//     state: loc[0].stateCode,
//     zipcode: loc[0].zipcode,
//     country: loc[0].countryCode,
//   };
// });

module.exports = mongoose.model("job", jobShcema);
