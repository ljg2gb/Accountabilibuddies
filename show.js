const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('user')

fetch(`http://localhost:3000/users/${search}`)
    .then(response => response.json())
    .then(user => handleUser(user))

function handleUser(user){
    const userName = document.querySelector('h1')
    userName.innerText = user.name 
    handleGroups(user.groups)
}

function handleGroups(groups){
    groups.forEach(group => {
        const groupElement = document.createElement('div')
        groupElement.innerHTML = `<h2><a href="group.html?id=${group.id}">${group.name}</a></h2>
        <p>${group.description}</p>
        `
        document.body.append(groupElement)
    })
}