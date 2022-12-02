'use strict'

const openModal = () => {document.getElementById('modal')
    .classList.add('active')
}
const closeModal = () =>{
 clearFields()
 document.getElementById('modal').classList.remove('active')

}

    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_livro')) ?? []
    const setLocalStorage = (dbLivro) => localStorage.setItem("db_livro", JSON.stringify(dbLivro))
    
    //CRUD - create, read,update, delet
    //Delete
    const deleteLivro = (index) => {
        const dbLivro = readLivro()
        dbLivro.splice(index,1)
        setLocalStorage(dbLivro)
    } 

    //Update 
    const updateLivro = (index, livro) =>{
        const dbLivro = readLivro()
        dbLivro[index] = livro
        setLocalStorage(dbLivro)

    }
    //Read
    const readLivro = () => getLocalStorage()
    //Create
    const createLivro = (livro) => {
        const dbLivro = getLocalStorage()
        dbLivro.push(livro)
        setLocalStorage(dbLivro)
    }

    const isValidFields = () => {
       return document.getElementById('form').reportValidity()
    }

    const clearFields = () => {
        const fields = document.querySelectorAll('.modal-field')
        fields.forEach(field => field.value = "")
    }

    //interação
    const saveLivro = () => {
        if(isValidFields()){
        const livro = {
            nome: document.getElementById('nome').value,
            autor: document.getElementById('autor').value,
            editora: document.getElementById('editora').value,
            codigo: document.getElementById('codigo').value,
            genero: document.getElementById('genero').value
        }  
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){
        createLivro(livro)  
        updateTable()
        closeModal()  
        }else{
          updateLivro(index,livro) 
          updateTable() 
          closeModal()
        }
         
        }
    }
    const createRow = (livro, index) => {
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
        <td>${livro.nome}</td>
        <td>${livro.autor}</td>
        <td>${livro.editora}</td>
        <td>${livro.codigo}</td>
        <td>${livro.genero}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red"   id="delete-${index}">deletar</button>
        </td>`
        document.querySelector('#tableLivro>tbody').appendChild(newRow)

    }
const clearTable = () => {
    const rows = document.querySelectorAll('#tableLivro>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
} 
    const updateTable = () => {
     const dbLivro = readLivro()
     clearTable()
     dbLivro.forEach(createRow)
    }

    const fillFields = (livro) => {
        document.getElementById('nome').value = livro.nome
        document.getElementById('autor').value = livro.autor
        document.getElementById('editora').value = livro.editora
        document.getElementById('codigo').value = livro.codigo
        document.getElementById('genero').value = livro.genero

        document.getElementById('nome').dataset.index = livro.index
        document.getElementById('autor').dataset.index = livro.index
        document.getElementById('editora').dataset.index = livro.index
        document.getElementById('codigo').dataset.index = livro.index
        document.getElementById('genero').dataset.index = livro.index
    }

    const editLivro = (index) =>{
        const livro = readLivro()[index]
        livro.index = index
        fillFields(livro)
        openModal()
    }
    const editDelete = (event) => {
        if(event.target.type == 'button'){

            const [action, index] = event.target.id.split('-')
            
            if(action == 'edit'){
               editLivro(index)
            }else{
               deleteLivro(index)
               updateTable() 
            }
        }
    }

    updateTable()

document.getElementById('cadastrarLivro')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveLivro)    

document.querySelector('#tableLivro>tbody')
    .addEventListener('click', editDelete)