
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
        this.$noteText = document.querySelector(".note-text");
        
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
            this.closeActiveForm();

            this.addNote({title, text});
            this.displayNotes();
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
    }

    addNote ({title, text}) {
        const id = Date.now().toString();
        const note = new Note(id, title, text);
        this.notes = [...this.notes, note];
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
        this.notes.map(note => {
            console.log(`id: ${note.id}
                title: ${note.title}
                text: ${note.text}`);
        })
    }
}

const app = new App();
