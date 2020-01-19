import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Members = new Mongo.Collection('Members');

/** Define a schema to specify the structure of each document in the collection. */
const MembersSchema = new SimpleSchema({
  SS: {
    type: String,
    optional: false,
  },
  FirstName: {
    type: String,
    optional: true,
  },
  MiddleName: {
    type: String,
    optional: true,
  },
  LastName: {
    type: String,
    optional: true,
  },
  DOB: {
    type: Date,
    optional: true,
  },
  Class: {
    type: String,
    optional: true,
  },
  Addr: {
    type: String,
    optional: true,
  },
  Addr1: {
    type: String,
    optional: true,
  },
  City: {
    type: String,
    optional: true,
  },
  St: {
    type: String,
    optional: true,
  },
  Zip: {
    type: String,
    optional: true,
  },
  Ph1: {
    type: String,
    optional: true,
  },
  Ph2: {
    type: String,
    optional: true,
  },
  ADAcc: {
    type: String,
    optional: true,
  },
  RegisterVo: {
    type: Boolean,
    optional: true,
  },
  LastVoted: {
    type: Date,
    optional: true,
  },
  STATUSHASH: {
    type: Number,
    optional: true,
  },
  Localx: {
    type: Number,
    optional: true,
  },
  Card: {
    type: Number,
    optional: true,
  },
  DateJoined: {
    type: Date,
    optional: true,
  },
  Rate: {
    type: Number,
    optional: true,
  },
  WorkAt: {
    type: String,
    optional: true,
  },
  BS: {
    type: Number,
    optional: true,
  },
  BLDCONST: {
    type: String,
    optional: true,
  },
  SERVICEINS: {
    type: String,
    optional: true,
  },
  RESIDENTIA: {
    type: String,
    optional: true,
  },
  OPERATOR: {
    type: String,
    optional: true,
  },
  WELDING: {
    type: String,
    optional: true,
  },
  AC: {
    type: String,
    optional: true,
  },
  BURNERS: {
    type: String,
    optional: true,
  },
  JOBBING: {
    type: String,
    optional: true,
  },
  HELIARC: {
    type: String,
    optional: true,
  },
  REFRIGERAT: {
    type: String,
    optional: true,
  },
  TEMPCONT: {
    type: String,
    optional: true,
  },
  SPRVISION: {
    type: String,
    optional: true,
  },
  ORBWELD: {
    type: String,
    optional: true,
  },
  HP: {
    type: String,
    optional: true,
  },
  LP: {
    type: String,
    optional: true,
  },
  GAS: {
    type: String,
    optional: true,
  },
  OIL: {
    type: String,
    optional: true,
  },
  AC1: {
    type: String,
    optional: true,
  },
  CFC: {
    type: String,
    optional: true,
  },
  TANK: {
    type: String,
    optional: true,
  },
  WELD: {
    type: String,
    optional: true,
  },
  OPERATOR1: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: false,
  },
  jobs: {
    type: Array,
    optional: true,
  },
  'jobs.$': Object,
  'jobs.$.SS': {
    type: String,
    optional: false,
  },
  'jobs.$.Referral': {
    type: Number,
    optional: true,
  },
  'jobs.$.Contractor': {
    type: String,
    optional: true,
  },
  'jobs.$.JobSite': {
    type: String,
    optional: true,
  },
  'jobs.$.JobSite1': {
    type: String,
    optional: true,
  },
  'jobs.$.County': {
    type: String,
    optional: true,
  },
  'jobs.$.StartDate': {
    type: Date,
    optional: true,
  },
  'jobs.$.StartTime': {
    type: String,
    optional: true,
  },
  'jobs.$.EndDate': {
    type: Date,
    optional: true,
  },
  'jobs.$.EndTime': {
    type: String,
    optional: true,
  },
  'jobs.$.GoToJob': {
    type: Boolean,
    optional: true,
  },
  'jobs.$.GoToShop': {
    type: Boolean,
    optional: true,
  },
  'jobs.$.ReportTo': {
    type: String,
    optional: true,
  },
  'jobs.$.Agent': {
    type: String,
    optional: true,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Members.attachSchema(MembersSchema);

/** Make the collection and schema available to other code. */
export { Members, MembersSchema };
