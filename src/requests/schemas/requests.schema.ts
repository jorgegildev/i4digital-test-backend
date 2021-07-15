import { Schema } from 'mongoose'

export const RequestsSchema = new Schema({
  method:String,
  path:String,
  response:Object
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
  versionKey: false // You should be aware of the outcome after set to false
});
