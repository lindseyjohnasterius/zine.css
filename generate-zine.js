#! /usr/bin/env node

const fs = require('fs')

let args = process.argv.slice(2)
let _zine_name = args[0]
if(!_zine_name){
  console.log('usage: ./generate-zine {name} {template (optional)} {pages (optional)}')
  return
}

function createFile(file_name, file_data, zine_name){
  fs.writeFile(`${__dirname}/${zine_name}/${file_name}`, file_data, (err) => {
    if(err) console.log(err)
  })
}

function copyTemplate(template_name, zine_name){
  fs.copyFile(`${__dirname}/templates/${template_name}.css`, `${__dirname}/${zine_name}/${template_name}.css`, (err) => {
    if (err) {
      console.log("An Error Occured:", err);
    }
  })
}


function generateZine(name, template = 'a4', page_count = 12){

  if(page_count % 2 === 1 && 
    (template !== 'story-board' && template !== 'report')){
    console.log('PAGE COUNT MUST BE AN EVEN NUMBER'); return
  }
  let index_pages = []
  let pages = []
  let i = 0
  while(i < page_count){
    index_pages.push(`
      <zine-page 
        src="page-${i+1}.html" 
        id="page-${i+1}" 
        name="Page ${i+1}">
      </zine-page>`
    )
    pages.push(`page-${i+1}.html`)
    i++
  }

  const middle_page = page_count / 2

  if(template !== 'story-board' && template !== 'report'){


    pages[0] = 'back-cover.html'
    index_pages[0] =  `
      <zine-page 
        src="back-cover.html" 
        id="back-cover" 
        name="Back Cover">
      </zine-page>`
    
    pages[1] = 'front-cover.html'
    index_pages[1] =  `
      <zine-page 
        src="front-cover.html" 
        id="front-cover" 
        name="Front Cover">
      </zine-page>`

    pages[2] = 'inside-front-cover.html'
    index_pages[2] =  `
      <zine-page 
        src="inside-front-cover.html" 
        id="inside-front-cover" 
        name="Inside Front Cover">
      </zine-page>`

    pages[pages.length - 1] = 'inside-back-cover.html'
    index_pages[index_pages.length - 1] =  `
      <zine-page 
        src="inside-back-cover.html" 
        id="inside-back-cover" 
        name="Inside Back Cover">
      </zine-page>`

    pages.splice(middle_page,2, `spread.html`)
    index_pages.splice(middle_page, 2, `
      <zine-page class="spread" src="spread.html" name="Spread" id="spread">
      </zine-page>`)


  }


  const index_template = `

<!DOCTYPE html>
<!-- 

  ZINE.CSS


  Hello Would be hackers. You might not want to edit this file. Most things you want to edit are in the specific HTML files:
    page-1...

    etc. 


-->
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <script src="zine.js"></script>
    <link href="zine.css" rel="stylesheet" type="text/css" media="all">
    <link href="${template}.css" rel="stylesheet" type="text/css" media="all">
    <link href="styles.css" rel="stylesheet" type="text/css" media="all">

  </head>
  <body>
    <zine-wrapper class="${template}">
      ${index_pages.join('\n')}
      <zine-controls></zine-controls>
    </zine-wrapper>
    <script>dispatch('GO TO PAGE', '${pages[1]}')</script>
  </body>
</html>`



  fs.mkdir(name, (err) => {
    if(err) {
      console.log(err)
      return
    }
    createFile('index.html', index_template, name)

    pages.forEach((file_name,i) => {

      let file_content =  `
<!-- ${file_name} -->
<zine-margin>
<zine-header>${name}</zine-header>
<zine-footer><div class="page-number">${i - 1}</div></zine-footer>
</zine-margin>`

      if(i === 0){
        file_content = `
<zine-margin>
  <h2>Back  Cover</h2>
</zine-margin>`
      }

      if(i === 1){
        file_content = `
<zine-margin>
  <h1>Front Cover</h1>
</zine-margin>`
      }

      if(i === 2){
        file_content = `
<zine-margin>
  <h1>Inside Front Cover</h1>
</zine-margin>`
      }

      if(i === pages.length - 1){
        file_content = `
<zine-margin>
  <h1>Back Cover</h1>
</zine-margin>`
      } 

      if(i === pages.length - 2){
        file_content = `
<zine-margin>
  <h1>Inside Back Cover</h1>
</zine-margin>`
      }

      if(file_name === 'spread.html'){
        file_content = `
<zine-margin>
  <h1>SPREAD</h1>

</zine-margin>
        `
      }

      createFile(file_name,file_content, name)
    })


    copyTemplate(template, name)
    fs.copyFile(`${__dirname}/templates/zine.js`, `${__dirname}/${name}/zine.js`, (err) => {
      if (err) {
        console.log("An Error Occured:", err);
      }
    })

    fs.copyFile(`${__dirname}/templates/zine.css`, `${__dirname}/${name}/zine.css`, (err) => {
      if (err) {
        console.log("An Error Occured:", err);
      }
    })

    fs.copyFile(`${__dirname}/templates/styles.css`, `${__dirname}/${name}/styles.css`, (err) => {
      if (err) {
        console.log("An Error Occured:", err);
      }
    })

  })
}



generateZine(args[0],args[1],args[2])