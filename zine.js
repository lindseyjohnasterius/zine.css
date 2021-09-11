function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}


let counter = 0 


document.addEventListener('GO TO PAGE', (e) => {
  const target = document.querySelector(`#${e.detail}`)
  const top = target.offsetTop
  const left = 0
  document.querySelector('zine-wrapper').scrollTo({top, left})
})


document.addEventListener('NEXT PAGE', (e) => {
  counter++

  if(counter > 6) counter = 0
  const zine_controls = document.querySelector('#zine-controls')
  const zine_controls_buttons = [...zine_controls.querySelectorAll('button')]
  
  zine_controls_buttons[counter].click()

})

document.addEventListener('PREV PAGE', (e) => {
  counter--
  if(counter < 0) counter = 6
  const zine_controls = document.querySelector('#zine-controls')
  const zine_controls_buttons = [...zine_controls.querySelectorAll('button')]  
  zine_controls_buttons[counter].click()
})

class ZineWrapper extends HTMLElement {
  connectedCallback(){
    const zine_controls = document.createElement('zine-controls')
    this.prepend(zine_controls)
  }
}

class ZineControls extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `<button onclick="dispatch('PREV PAGE')" style="position: fixed; left:1em; bottom:1em; z-index:9000;">Prev</button>
    <button onclick="dispatch('NEXT PAGE')" style="position: fixed; right:1em; bottom:1em; z-index:9000;">Next</button>
  
    <details id="zine-controls" style="position:fixed;left:1em;top:1em;z-index:9000;">
      <summary> </summary>
      <div id="index-buttons"></div>
    </details>`

    document.addEventListener('ZINE PAGE LOADED', (e) => {
      this.generateZineControl(e.detail)
    })
  }

  generateZineControl(new_controller){
    document.querySelector('#index-buttons').innerHTML += `<button onclick="dispatch('GO TO PAGE','${new_controller.page_id}')">
    ${new_controller.page_name}</button><br>`
  }

}

customElements.define('zine-controls', ZineControls)



customElements.define('zine-wrapper', ZineWrapper)


class ZinePageContent extends HTMLElement {
  connectedCallback(){
    const scale = 1
    // this.style.transformOrigin = `${window.innerWidth / 2}px ${window.innerHeight / 2}px`

    this.style.transform = `scale(${scale})`

    document.addEventListener('resize', () => {
      this.setTransform()
      })
  }

  setTransform(){
    const scale = window.innerHeight / (8.5 * 96)
    const translate_percent = (scale * 100) / 2
    this.style.transform = `scale(${scale}) translate(${translate_percent}%, ${translate_percent}%)`

  }
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
      zine_content.innerHTML = res
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
      zine_content.innerHTML = res
      this.appendChild(zine_content)
    })

  }
}

customElements.define('zine-spread-page', ZineSpreadPage)







