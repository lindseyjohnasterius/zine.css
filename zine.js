function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}


let counter = 1 
let page_count = 12


document.addEventListener('GO TO PAGE', (e) => {
  const target = document.querySelector(`#${e.detail}`)
  const top = target.offsetTop
  const left = 0
  document.querySelector('zine-wrapper').scrollTo({top, left})
})


document.addEventListener('NEXT PAGE', (e) => {
  counter++

  if(counter > page_count - 1) counter = 0
  const zine_controls = document.querySelector('#zine-controls')
  const zine_controls_buttons = [...zine_controls.querySelectorAll('button')]
  
 try { zine_controls_buttons[counter].click() } catch(e){console.warn(e)}

})

document.addEventListener('PREV PAGE', (e) => {
  counter--
  if(counter < 0) counter = page_count - 1
  const zine_controls = document.querySelector('#zine-controls')
  const zine_controls_buttons = [...zine_controls.querySelectorAll('button')]  
  zine_controls_buttons[counter].click()
})

class ZineWrapper extends HTMLElement {

}
customElements.define('zine-wrapper', ZineWrapper)

class ZineControls extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `<button onclick="dispatch('PREV PAGE')" style="position: fixed; left:1em; bottom:1em; z-index:9000;">Prev</button>
    <button onclick="dispatch('NEXT PAGE')" style="position: fixed; right:1em; bottom:1em; z-index:9000;">Next</button>
  
    <details id="zine-controls" style="position:fixed;left:1em;top:1em;z-index:9000;">
      <summary> </summary>
      <div id="index-buttons"></div>
    </details>`

   ;[...document.querySelectorAll('zine-page')].forEach(page => {

    const page_controller = {
      page_id: page.getAttribute('id'),
      page_name: page.getAttribute('name')
    }
    this.generateZineControl(page_controller)
   })
  }

  generateZineControl(new_controller){
    document.querySelector('#index-buttons').innerHTML += `<button onclick="dispatch('GO TO PAGE','${new_controller.page_id}')">
    ${new_controller.page_name}</button><br>`
  }

}

customElements.define('zine-controls', ZineControls)





class ZinePageContent extends HTMLElement {

}

customElements.define('zine-page-content', ZinePageContent)


class ZinePage extends HTMLElement {
  connectedCallback(){
    this.id = this.getAttribute('id')
    this.name = this.getAttribute('name')
    fetch(this.id + '.html')
    .then(res => res.text())
    .then(res => {
      const zine_content = document.createElement('zine-page-content')
      zine_content.innerHTML += res
      this.appendChild(zine_content)
      dispatch('ZINE PAGE LOADED', {page_id: this.id, page_name: this.name })
    })
  }
}

customElements.define('zine-page', ZinePage)


class ZineSpreadPage extends HTMLElement {
  connectedCallback(){
    this.id = this.getAttribute('id')
    fetch(this.id + '.html')
    .then(res => res.text())
    .then(res => {
      const zine_content = document.createElement('zine-page-content')
      zine_content.classList.add('spread')
      zine_content.innerHTML += res
      this.appendChild(zine_content)
    })

  }
}

customElements.define('zine-spread-page', ZineSpreadPage)







