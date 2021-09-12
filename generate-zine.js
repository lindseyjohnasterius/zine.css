#! /usr/bin/env node

const fs = require('fs')

let args = process.argv.slice(2)
let _zine_name = args[0]
let _zine_template = args[1]
let _zine_pages = args[2]
if(!_zine_name){
  console.log('usage: ./generate-zine {name} {template (optional)} {pages (optional, only for storyboard template)}')
  return
}



function createFile(file_name, file_data, zine_name){
  fs.writeFile(`${__dirname}/${zine_name}/${file_name}`, file_data, (err) => {
    if(err) console.log(err)
  })
}





function generateZine(name, template = 'a4', page_count = 12){

  if(page_count % 2 === 1){console.log('PAGE COUNT MUST BE AN EVEN NUMBER'); return}
  let index_pages = []
  let pages = []
  let i = 0
  while(i < page_count){
    index_pages.push(`
      <zine-page src="page-${i+1}.html">
        <zine-header>${name}</zine-header>
        <zine-footer><div class="page-number">${i+1}</div></zine-footer>
      </zine-page>`
    )


    pages.push(`page-${i+1}.html`)
    i++
  }

  const middle_page = page_count / 2


  index_pages.splice(middle_page, 2, `
    <zine-spread-page src="spread.html">
    </zine-spread-page>`)

  pages.splice(middle_page,2, `spread.html`)

  const index_template = `

<!DOCTYPE html>
<!-- 

  ZINE.CSS


  Hello Would be hackers. You might not want to edit this file. Most things you want to edit are in the specific HTML files:
    front-page.html
    back-page.html
    page-1...

    etc. 


-->
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZINE-CSS</title>
    <script src="zine.js"></script>
    <link href="zine.css" rel="stylesheet" type="text/css" media="all">
    <link href="${template}.css" rel="stylesheet" type="text/css" media="all">

  </head>
  <body>
    <zine-wrapper class="${template}">
      ${index_pages}
    </zine-wrapper>

  </body>
</html>`



  fs.mkdir(name, (err) => {
    if(err) {
      console.log(err)
      return
    }
    createFile('index.html', index_template, name)

    pages.forEach(file_name => {
      createFile(file_name, `
<!-- ${file_name} -->
<zine-wrapper></zine-wrapper>

      `, name)
    })
  })
}



generateZine(args[0],args[1],args[2])