const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('user')
const userInput = document.querySelector('#user-input')
userInput.value = search
const homeButton = document.getElementById('home-button')
homeButton.innerHTML = `<a href="http://localhost:3001/show.html?user=${search}">Home</a>`
fetch(`http://localhost:3000/users/${search}`)
    .then(response => response.json())
    .then(user => handleUser(user))

function handleUser(user){
    const userName = document.querySelector('#welcome')
    if(user.groups.length == 0){
        userName.innerText = `Welcome, ${user.name}! Create a group to get started!`
    } else {
        userName.innerText = `Welcome, ${user.name}! Here are your groups:`
        handleGroups(user.groups)
    }
}

const groupSection = document.querySelector('#groups-section')

function handleGroups(groups){
    groups.forEach(group => {
        const groupElement = document.createElement('div')
        groupElement.innerHTML = `
        <h2><a href="group.html?id=${group.id}&user=${search}">${group.name}</a></h2>
        <p>${group.description}</p>
        `
        groupSection.append(groupElement)
    })
}