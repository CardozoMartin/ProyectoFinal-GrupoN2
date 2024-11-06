window.addEventListener("scroll",()=>{
    const scrollY = window.scrollY
    const icon = document.getElementById("icon")
    if(scrollY > 150){
        icon.classList.add("iconNav2")
        icon.classList.remove("iconNav")
    }else{
        icon.classList.add("iconNav")
        icon.classList.remove("iconNav2")

    }

    
   
})
