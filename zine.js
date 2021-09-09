function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}




document.addEventListener('GO TO PAGE', (e) => {
  const width = window.innerWidth  
  const height = window.innerHeight

  const zine_wrapper =document.querySelector('zine-wrapper')
  zine_wrapper.requestFullscreen()

  
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
  
  zine_wrapper.scrollTo({left, top, behavior:'smooth'})

})


