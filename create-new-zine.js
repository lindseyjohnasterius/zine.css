#! /usr/bin/env node

const fs = require('fs')

const zine_name = process.argv.slice(2)[0]

fs.mkdir(zine_name, (err) => {
  if(err) {
    console.log(err)
    return
  } else {
    fs.readdir('./', (err, files) => {
      files.forEach(file => {
        console.log(file)
        const ignored_files = ['.git', '.git-ignore', 'package-lock.json', 'node_modules',zine_name]
        if(ignored_files.indexOf(file) === -1){
          fs.copyFile(file,`${__dirname}/${zine_name}/${file}`, (err) => {
            if(err) console.log(err)
          })        
        }
      })
    })
  }
})


