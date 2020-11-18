const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  banner: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficultGrade: { type: Number },
    skillGrade: { type: Number },
    attackGrade: { type: Number },
    survivalGrade: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
    cooldown: { type: String },
    consume: { type: String }
  }],
  itemsWell: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//顺风出装
  itemsBad: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//逆风出装
  usageTips: { type: String },
  againstTips: { type: String },
  teamfightTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
  counters: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
  advantagers: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')