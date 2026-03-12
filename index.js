
class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor() {
        this.notes = [];

        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm= document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        
        this.addEventListeners();
    }

    addEventListeners(){

        document.body.addEventListener("click", (event) => {
            this.handleClick(event);
        })
    }
    //Handle an Evente
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
           <div class="note">
          <span class="material-symbols-outlined check-circle"
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
           `
        }).join("")
    }
}

const app = new App();


