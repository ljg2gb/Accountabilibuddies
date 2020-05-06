const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id');
const userID = searchParams.get('user')
const userInput = document.querySelector('#user-input')
userInput.value = userID
const homeButton = document.getElementById('home-button')
homeButton.innerHTML = `<a href="http://localhost:3001/show.html?user=${userID}">Home</a>`
const hiddenInput = document.querySelector('#hidden-input')
hiddenInput.value = id
const currentUser = document.querySelector('#current_user')
currentUser.value = userID
const hiddenGroupInput = document.querySelector('#hidden-group-input')
hiddenGroupInput.value = id
const hiddenUserInput = document.querySelector('#hidden-user-input')
hiddenUserInput.value = userID


// const groupInput = document.querySelector('#group-input')
// groupInput.value = id

fetch('http://localhost:3000/users')
    .then(resp =>resp.json())
    .then(addUsers)

function addUsers(users) {
    users.forEach(user=> {
        addUser(user)})
}

const addUserForm = document.querySelector('#add-user')
function addUser(user){
    const $li = document.createElement('li')
    $li.innerHTML = `
    <input type="checkbox" id=${user.name} name="user_id" value=${user.id}>
    <label for=${user.name}>${user.name}</label>
    <input type="hidden" name="group_id" value=${id}>`
    addUserForm.append($li)
}

fetch(`http://localhost:3000/groups/${id}`)
    .then(resp => resp.json())
    .then(group => handleGroup(group))

function handleGroup(group){
    const groupName = document.querySelector('#welcome')
    groupName.innerText = group.name 
    handleUsers(group.users)
    displayContent(group)
    generateOptions(group.id, group.users)
    // getJoiner(group.joiners)
}

function generateOptions(id, users){}

function handleUsers(users){
    const list = document.querySelector("#member-list")

    users.forEach(user => {
        console.log(user.name)
        const member = document.createElement('li')
        member.innerText = user.name
        list.append(member)
    })
}
const $mainSection = document.querySelector('#main-section')
function displayContent(group){
    const contents = group.contents
    const users = group.users
    contents.forEach(content => {
        const $div = document.createElement('div')
        
        if (content.message) {
            $div.innerHTML = `<h3>${content.message}</h3>`
        } else {
            $div.innerHTML = `<div>${content.image}</div>`
        }
        let creator = ''
        users.forEach(user => {
            if (content.user_id == user.id) { creator = user.name}
        })
        const creatorElement = document.createElement('p')
        creatorElement.innerText = `created by ${creator}`
        $div.append(creatorElement)
        $mainSection.append($div)
    })
}

// const deleteButton = document.getElementById('delete-button')

// deleteButton.addEventListener('click', event => deleteJoiner(event))

// function deleteJoiner(){
//     console.log(getJoiner())
// }

// function getJoiner(joiners){
//     console.log(joiners)
//     let currentJoiner
//     joiners.forEach(joiner => {
//         if (joiner.user_id == userID){
//             currentJoiner = joiner
//         }
//     })
// //     const joiners = currentUser.joiners 
//     console.log(joiners)
//     return joiners
// }
