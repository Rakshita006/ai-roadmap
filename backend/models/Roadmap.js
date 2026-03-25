import mongoose from 'mongoose'

const roadmapSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  roadmap:Array,
  createdAt:{
    type: Date,
    default:Date.now
  }
})

export default mongoose.model('Roadmap',roadmapSchema)