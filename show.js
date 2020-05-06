const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('user')
const userInput = document.querySelector('#user-input')
userInput.value = search

fetch(`http://localhost:3000/users/${search}`)
    .then(response => response.json())
    .then(user => handleUser(user))

function handleUser(user){
    const userName = document.querySelector('h1')
    userName.innerText = `Welcome, ${user.name}! Here are your groups:`
    handleGroups(user.groups)
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