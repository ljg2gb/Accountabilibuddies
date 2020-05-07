//Search params
const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('user')

//Create group form
const userInput = document.querySelector('#user-input')
userInput.value = search

//Nav bar functionality
const homeButton = document.getElementById('home-button')
homeButton.innerHTML = `<a href="http://localhost:3001/show.html?user=${search}">Home</a>`

fetch(`http://localhost:3000/users/${search}`)
    .then(response => response.json())
    .then(user => handleUser(user))

const groupSection = document.getElementById('groups-section')
const userName = document.getElementById('welcome')

function handleUser(user){
    checkForUser(user)
}

function checkForUser(user){
    if(user.groups.length == 0){
        userName.innerText = `Welcome, ${user.name}! Create a group to get started!`
    } else {
        userName.innerText = `Welcome, ${user.name}!`
        handleGroups(user.groups)
    }
}

function handleGroups(groups){
    groups.forEach(group => {
        displayGroup(group) 
    })
}

function displayGroup(group){
    const groupElement = document.createElement('div')
        groupElement.innerHTML = `
        <h2><a href="group.html?id=${group.id}&user=${search}">${group.name}</a></h2>
        <p>${group.description}</p>
        `
        groupSection.append(groupElement)
}