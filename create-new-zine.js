#! /usr/bin/env node

const fs = require('fs')

const zine_name = process.argv.slice(2)[0]

fs.mkdir(zine_name, (err) => {
  if(err) {
    console.log(err)
    return
  } else {
    const files = [
      'index.html', 
      'zine.css', 
      'zine.js', 
      'front-page.html', 
      'back-page.html', 
      'spread.html', 
      'inside-front-cover.html', 
      'inside-back-cover.html',
      'page-1.html',
      'page-2.html',
      'page-3.html',
      'page-6.html',
      'page-7.html',
      'page-8.html',
      'styles.css'
    ]

    files.forEach(file => {
      fs.copyFile(file,`${__dirname}/${zine_name}/${file}`, (err) => {
        if(err) console.log(err)
      })
    })
  }
})


