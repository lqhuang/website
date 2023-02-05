import * as fs from 'fs'
import * as path from 'path'

const contentsDir = process.env.CONTENTS_DIR
  ? process.env.CONTENTS_DIR
  : 'examples'

const siteMetadata = {
  title: 'lqhuang.io',
  author: 'Lanqing Huang',
  nickname: 'lqhuang',
  email: 'lqhuang@outlook.com',
  description: 'A blog to record coding life',
  url: 'https://lqhuang.io/',
  social: {
    twitter: '_lqhuang',
    github: 'lqhuang',
    linkedin: 'lqhuang',
    instgram: 'lanqing.huang',
  },
}
