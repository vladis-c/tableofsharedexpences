let f = function (id) {return document.getElementById(id)}
let q = function (id) {return document.querySelector(id)}

const headerDiv = f("header-div")
const nameDiv = f("name-div")
const namesP = f("names-p")
const nameInput1 = f("name-input1")
const nameInput2 = f("name-input2")


const dataDiv = f("data-div")
const spentP = f("spent-p")
const eurosInput = f("euros-input")
const eurosP = f("euros-p")

const paidP = f("paid-p")
const selectInput = f("select-input")

const optionInput1 = f("option-input1")
const optionInput2 = f("option-input2")

const usedP = f("used-p")
const checkboxInput1 = f("checkbox-input1")
const checkboxName1 = f("checkbox-name1")
const checkboxName2 = f("checkbox-name2")

const sendBtn = f("send-btn")
const clearBtn = f("clear-btn")
const resultP = f("result-p")

const tableDiv = f("table-div")
const name1 = f("name-1")
const name2 = f("name-2")
const table = q("table")
const tbody = q("tbody")
const tableInputName1 = f("table-input-name1")
const tableInputName2 = f("table-input-name2")
const tableResult = f("table-result")
const deleteRowBtn = f("delete-row-btn")

tableDiv.style.display = "none"
dataDiv.style.display = "none"
clearBtn.style.display = "none"
deleteRowBtn.style.display = "none"

let object1 = {
    name: "",
    expences: []
    }
let object2 = {
    name: "",
    expences: []
    }
let array1 = object1.expences
let array2 = object2.expences 

let selected = ""
let sumOfArray1 = 0
let sumOfArray2 = 0
let sum = 0
let usedByBoth = false

function startApp() {
const fromLocalStorage1 = JSON.parse( localStorage.getItem("object1") )
const fromLocalStorage2 = JSON.parse( localStorage.getItem("object2") )
if (fromLocalStorage1 && fromLocalStorage2) {
    object1 = fromLocalStorage1
    object2 = fromLocalStorage2
    array1 = object1.expences
    array2 = object2.expences    
    setNameData1()
    setNameData2()
    retrieve()
    sumOfArrays()     
    textInTheEnd ()
    disableButtonDelete()
    }
}
startApp()

nameInput1.addEventListener("change", function () {
    Object.assign(object1, {name: `${nameInput1.value}`})
    setNameData1()
    console.log(object1.name)  
})
nameInput2.addEventListener("change", function () {
    Object.assign(object2, {name: `${nameInput2.value}`})
    setNameData2()
    console.log(object2.name)       
}) 

function setNameData1() {
    optionInput1.textContent = object1.name
    tableInputName1.textContent = object1.name
}
function setNameData2() {
    optionInput2.textContent = object2.name
    tableInputName2.textContent = object2.name
    tableDiv.style.display = "unset"
    dataDiv.style.display = "unset"
    nameDiv.style.display = "none" 
} 
    
selectInput.addEventListener("change", function (event) {
    selected = event.target.options[event.target.selectedIndex].text              
})
           
sendBtn.addEventListener("click", sendF)

function sendF() { 
    checkedOrNot ()   
    if (selected === object1.name) {
        if (usedByBoth === false) {
            array1.push(eurosInput.valueAsNumber)
            array2.push(0)
        } else {
            array1.push(eurosInput.valueAsNumber / 2)
            array2.push(0)
        }
    } else if (selected === object2.name) {
        if (usedByBoth === false) {
            array1.push(0)
            array2.push(eurosInput.valueAsNumber)
        } else {
            array1.push(0)
            array2.push(eurosInput.valueAsNumber / 2)
        }
    } else {}
    sumOfArrays()     
    insert ()
    textInTheEnd ()
    sendToLocalStorage()   
}

clearBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    for (let i = 0; i < object1.expences.length; i++) {
        tbody.remove(i-1)
        }
    tableInputName1.remove()
    tableInputName2.remove()
    tableResult.remove()
    object1 = {}
    object2 = {}
})

deleteRowBtn.addEventListener("click", function () {
    if (array1.length !== 0) {    
        tbody.deleteRow(array1.length-1)
        array1.pop()
        array2.pop()
        sumOfArrays()     
        textInTheEnd ()
        sendToLocalStorage()
    }
    disableButtonDelete ()
})

function disableButtonDelete () {
    if (array1.length === 0) {
        deleteRowBtn.style.display = "none"
    }
}

function sendToLocalStorage () {
    localStorage.setItem("object1", JSON.stringify(object1) )
    localStorage.setItem("object2", JSON.stringify(object2) )
}
    
function checkedOrNot () {
    if (checkboxInput1.checked === true) {
        usedByBoth = true
    } else {
        usedByBoth = false
    } 
}   
   
function sumOfArrays () {    
    sumOfArray1 = array1.reduce(add, 0)
    sumOfArray2 = array2.reduce(add, 0)
    
    function add (a, b) {
        return a + b
    }        
    sum = (sumOfArray1 - sumOfArray2)
}

function insert () {
    
    let row = tbody.insertRow(-1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    
    if (array1[array1.length-1] === 0){
        cell2.textContent = array2[array2.length-1]
    } else if (array2[array2.length-1] === 0){
        cell1.textContent = array1[array1.length-1] 
    } else {}   
    clearBtn.style.display = "unset"
    deleteRowBtn.style.display = "unset"          
}

function textInTheEnd () {
    if (sum < 0) {        
        tableResult.textContent = `${object1.name} owes ${object2.name} ${Math.abs(sum)}` 
    } else if (sum > 0) {
        tableResult.textContent = `${object2.name} owes ${object1.name} ${Math.abs(sum)}`  
    } else {
        tableResult.textContent = ""     
    }   
} 

function retrieve () {
    
    tableInputName1.textContent = object1.name
    tableInputName2.textContent = object2.name  
    
    for (let i = 0; i < array1.length; i++) {
    
        
        let row = tbody.insertRow(-1)
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        
        if (array1[i] === 0){
            cell2.textContent = array2[i]
        } else if (array2[i] === 0){
            cell1.textContent = array1[i] 
        } else {}       
    }
    nameDiv.style.display = "none" 
    clearBtn.style.display = "unset"
    deleteRowBtn.style.display = "unset"               
}
