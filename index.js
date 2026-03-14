
class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor() {
        this.notes = [new Note(cuid(), "test title", "test text")];
        this.selectedId = "";
        this.miniSidebar = true;
        
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm= document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");
        this.$note = document.querySelector(".note")

        this.$modal = document.querySelector(".modal");
        this.$modalForm = document.querySelector("#modal-form");
        this.$modalTitle = document.querySelector("#modal-title");
        this.$modalText = document.querySelector("#modal-text");
        this.$closeButton = document.querySelector("#close")

        this.$sideBar = document.querySelector(".sidebar")
        
        this.addEventListeners();
        this.displayNotes();
    }

    addEventListeners(){

        document.body.addEventListener("click", (event) => {
            this.handleClick(event);
            this.openModal(event);
            this.handleArchive(event);

        })

        this.$form.addEventListener("submit", (event)=> {
          event.preventDefault();

          const title = this.$noteTitle.value;
          const text = this.$noteText.value;
          
          this.addNote({title, text});
          this.closeActiveForm();
        })

        this.$closeButton.addEventListener("click", (event)=> {
          event.preventDefault();
        
        })

        this.$sideBar.addEventListener("mouseover", (event)=>{
          this.miniSidebar = true;
          this.handleSideBar(event);
        })

        this.$sideBar.addEventListener("mouseout", (event)=>{
          this.miniSidebar = false;
          this.handleSideBar(event);
        })
         

    }

    //Handle an Event
    handleClick(event){

        const isActiveForm = this.$activeForm.contains(event.target);
        const isInactiveForm = this.$inactiveForm.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

        if(isInactiveForm){
            this.openActiveForm();
        }
        else if(!isInactiveForm && !isActiveForm){
            this.addNote({title, text});
            this.closeActiveForm();  
        }
        this.closeModal(event)
    }
    //Open and Close Forms
    openActiveForm(){

        this.$activeForm.style.display = "block";
        this.$inactiveForm.style.display = "none";
        this.$noteTitle.focus();
    }
    closeActiveForm(){

        this.$activeForm.style.display = "none";
        this.$inactiveForm.style.display = "block";
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    handleMouseOverNote() {
      const $note = document.querySelector(".note");
      const $checkNote = $note.querySelector("#check-circle");
      const $noteFooter = $note.querySelector(".note-footer");
      $checkNote.style.visibility = "visible";
      $noteFooter.style.visibility = "visible";
    }

    handleMouseOutNote() {
        const $note = document.querySelector(".note");
        const $checkNote = $note.querySelector("#check-circle");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "hidden";
        $noteFooter.style.visibility = "hidden";
      }
    
    //Open And Close Modal
    openModal(event){
      const selector = event.target.closest(".note");
      
      if(selector && !event.target.closest(".archive")){
        this.selectedId = selector.id;
        this.$modal.classList.add("open-modal")
        this.$modalTitle.value = selector.children[1].innerHTML;
        this.$modalText.value = selector.children[2].innerHTML;
      }
    }

    closeModal(event){
      const isModalForm = this.$modalForm.contains(event.target);
      const closeButton = this.$closeButton.contains(event.target); 
        if((!isModalForm || closeButton) && this.$modal.classList.contains("open-modal")){
          this.$modal.classList.remove("open-modal")
          this.editNote(this.selectedId, {title: this.$modalTitle.value, text: this.$modalText.value});
        }
    }

    //Handle the Achieve
    handleArchive(event){

      const selector = event.target.closest(".note");
      if(selector && event.target.closest(".archive")){
        this.selectedId = selector.id;
        this.deleteNote(this.selectedId);
      }
    }

    //Handle Sidebar Event
    handleSideBar(event){
      if(this.miniSidebar){
        this.$sideBar.style.width = "250px";
        this.$sideBar.classList.add("sidebar-shadow");
      } else {
        this.$sideBar.style.width = "60px";
        this.$sideBar.classList.remove("sidebar-shadow");
      }
    }

    addNote ({title, text}) {

        if(text != ""){
            const note = new Note(cuid(), title, text);
            this.notes = [...this.notes, note];
            this.displayNotes();
        }        
    }

    editNote (id, {title, text}) {
        this.notes = this.notes.map(note => {
            if(note.id === id) {
                note.title = title;
                note.text = text;
            }
            
            return note;
        })
        this.displayNotes();
    }

    deleteNote (id) {
        this.notes = this.notes.filter(note => note.id !== id)
        this.displayNotes()
    }

    displayNotes(){
        this.$notes.innerHTML = this.notes.map(note =>{
           return `
           <div class="note" id="${note.id}" onmouseover="app.handleMouseOverNote()" onmouseout="app.handleMouseOutNote()">
          <span class="material-symbols-outlined check-circle" id="check-circle"
            >check_circle</span
          >
          <div class="title">${note.title}</div>
          <div class="text">${note.text}</div>
          <div class="note-footer">
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >add_alert</span
              >
              <span class="tooltip-text">Remind me</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >person_add</span
              >
              <span class="tooltip-text">Collaborator</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >palette</span
              >
              <span class="tooltip-text">Change Color</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >image</span
              >
              <span class="tooltip-text">Add Image</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon archive"
                >archive</span
              >
              <span class="tooltip-text archive">Archive</span>
            </div>
            <div class="tooltip">
              <span class="material-symbols-outlined hover small-icon"
                >more_vert</span
              >
              <span class="tooltip-text">More</span>
            </div>
          </div>
        </div>
        <span class="tooltip-text">Add Image</span>
            </div>
            
          </div>
        </div>
           `
        }).join("")
    }
}

const app = new App();


