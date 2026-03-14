
class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor() {
        this.notes = [new Note("abc1", "test title", "test text")];
        
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm= document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");
        this.$note = document.querySelector(".note")

        this.$modal = document.querySelector(".modal");
        this.$modalForm = document.querySelector("#modal-form")
        
        
        
        this.addEventListeners();
        this.displayNotes();
    }

    addEventListeners(){

        document.body.addEventListener("click", (event) => {
            this.handleClick(event);
            this.openModal(event);
        })

        this.$form.addEventListener("submit", (event)=> {
          event.preventDefault();

          const title = this.$noteTitle.value;
          const text = this.$noteText.value;
          
          this.addNote({title, text});
          this.closeActiveForm();
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

      if(event.target.closest(".note")){
        this.$modal.classList.add("open-modal")
      }
    }

    closeModal(event){

      const isModalForm = this.$modalForm.contains(event.target);
        if(!isModalForm && this.$modal.classList.contains("open-modal")){
          this.$modal.classList.remove("open-modal")
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
    }

    deleteNote (id) {
        this.notes = this.notes.filter(note => note.id !== id)
    }

    displayNotes(){
        this.$notes.innerHTML = this.notes.map(note =>{
           return `
           <div class="note" onmouseover="app.handleMouseOverNote()" onmouseout="app.handleMouseOutNote()">
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
              <span class="material-symbols-outlined hover small-icon"
                >archive</span
              >
              <span class="tooltip-text">Archive</span>
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


