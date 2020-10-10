const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed('Error: Note was not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgGreen('Your notes'))
    notes.forEach(note => console.log(`Title: ${note.title}, Body: ${note.body}`))
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Error: Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}