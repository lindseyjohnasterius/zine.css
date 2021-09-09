function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}


document.addEventListener('GO TO PAGE', (e) => {
  const width = window.innerWidth  
  const height = window.innerHeight

  const zine_wrapper =document.querySelector('zine-wrapper')
  zine_wrapper.requestFullscreen()

  if(height > width){
    
    switch(e.detail){
      case "1":
        zine_wrapper.scrollTo({left:0,top:height,behavior:'smooth'})
        break;
      case "2":
        zine_wrapper.scrollTo({left:width, top:height,behavior:'smooth'})
        break;
      case "3":
        zine_wrapper.scrollTo({left:0, top:height * 2,behavior:'smooth'})
        break;
      case "4":
        zine_wrapper.scrollTo({left:width,top: height * 2,behavior:'smooth'})
        break;
      case "5":
        zine_wrapper.scrollTo({left:0,top: height * 3,behavior:'smooth'})
        break;
      case "6":
        zine_wrapper.scrollTo({left:width, top:height * 3,behavior:'smooth'})
        break;
      case "7":
        zine_wrapper.scrollTo({left:0,top: height * 4,behavior:'smooth'})
        break;
      case "BACK COVER":
        zine_wrapper.scrollTo({left:width, top:0,behavior:'smooth'});
        break;
      case "COVER": 
      default:
        zine_wrapper.scrollTo({left:0,top:0,behavior:'smooth'})
    }

  } else {
    switch(e.detail){
      case "1":
        zine_wrapper.scrollTo({left:0,top:height,behavior:'smooth'})
        break;
      case "2":
        zine_wrapper.scrollTo({left:0, top:height,behavior:'smooth'})
        break;
      case "3":
        zine_wrapper.scrollTo({left:0, top:height * 2,behavior:'smooth'})
        break;
      case "4":
        zine_wrapper.scrollTo({left:0,top: height * 2,behavior:'smooth'})
        break;
      case "5":
        zine_wrapper.scrollTo({left:0,top: height * 3,behavior:'smooth'})
        break;
      case "6":
        zine_wrapper.scrollTo({left:0, top:height * 3,behavior:'smooth'})
        break;
      case "7":
        zine_wrapper.scrollTo({left:0,top: height * 4,behavior:'smooth'})
        break;
      case "BACK COVER":
        zine_wrapper.scrollTo({left:0, top:0,behavior:'smooth'});
        break;
      case "COVER": 
      default:
        zine_wrapper.scrollTo({left:0,top:0,behavior:'smooth'})
    }
  }
  
  
})

document.addEventListener('NEXT PAGE', (e) => {
  const zine_wrapper = document.querySelector('zine-wrapper')
  zine_wrapper.requestFullscreen()

  const width = window.innerWidth  
  const height = window.innerHeight

  const current_left = zine_wrapper.scrollLeft
  const current_top = zine_wrapper.scrollTop
  
  let left = 0
  let top = 0
  
  if(current_left === 0){
    left = width
    top = current_top
  } else {
    left = 0
    top = current_top + height
    if(top > height * 3) top = 0
  }

  if(width > height){
    left = 0
    top = current_top + height
    if(top > height * 3) top = 0

  }
  
  zine_wrapper.scrollTo({left, top, behavior:'smooth'})
  
})

document.addEventListener('PREV PAGE', (e) => {
  const zine_wrapper = document.querySelector('zine-wrapper')
  zine_wrapper.requestFullscreen()

  const width = window.innerWidth  
  const height = window.innerHeight

  const current_left = zine_wrapper.scrollLeft
  const current_top = zine_wrapper.scrollTop
  
  let left = 0
  let top = 0
  
  if(current_left === width){
    left = 0
    top = current_top
  } else {
    left = width
    top = current_top - height
    if(top < 0) top = 0
  }

if(width > height){
  left = 0
  top = current_top - height
  if(top < 0) top = 0
}
  
  zine_wrapper.scrollTo({left, top, behavior:'smooth'})

})



class ZineWrapper extends HTMLElement {
  connectedCallback(){
    const zine_controls = document.createElement('zine-controls')
    this.prepend(zine_controls)

  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('zine-wrapper', ZineWrapper)






class ZineControls extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `<button onclick="dispatch('PREV PAGE')" style="position: fixed; left:1em; bottom:1em; z-index:9000;">Prev</button>
    <button onclick="dispatch('NEXT PAGE')" style="position: fixed; right:1em; bottom:1em; z-index:9000;">Next</button>
  
    <details style="position:fixed;left:1em;top:1em;z-index:9000;">
      <summary> </summary>
      <button onclick="dispatch('GO TO PAGE','COVER')">Cover</button><br>
      <button onclick="dispatch('GO TO PAGE','1')">1</button><br>
      <button onclick="dispatch('GO TO PAGE','2')">2</button><br>
      <button onclick="dispatch('GO TO PAGE','3')">3</button><br>
      <button onclick="dispatch('GO TO PAGE','4')">4</button><br>
      <button onclick="dispatch('GO TO PAGE','5')">5</button><br>
      <button onclick="dispatch('GO TO PAGE','6')">6</button><br>
      <button onclick="dispatch('GO TO PAGE','BACK COVER')">Back Cover</button>

    </details>
`
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('zine-controls', ZineControls)




class ZineSpread extends HTMLElement {
  connectedCallback(){
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('zine-spread', ZineSpread)




class ZineCover extends ZineSpread {

}

customElements.define('zine-cover', ZineCover)





class ZineLeftPage extends HTMLElement {
  connectedCallback(){
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('zine-left-page', ZineLeftPage)






class ZineRightPage extends ZineLeftPage {

}

customElements.define('zine-right-page', ZineRightPage)






class ZinePageContent extends HTMLElement {
  connectedCallback(){
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('zine-page-content', ZinePageContent)


