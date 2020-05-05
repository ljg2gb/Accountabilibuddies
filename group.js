const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id');
const userID = searchParams.get('user')
const userInput = document.querySelector('#user-input')
userInput.value = userID

const groupInput = document.querySelector('#group-input')
groupInput.value = id


fetch(`http://localhost:3000/groups/${id}`)
    .then(resp => resp.json())
    .then(group => handleGroup(group))

function handleGroup(group){
    const groupName = document.querySelector('h1')
    groupName.innerText = group.name 
    handleUsers(group.users)
    displayContent(group)
    generateOptions(group.id, group.users)
}

function generateOptions(id, users){

}

function handleUsers(users){
    const list = document.querySelector("#member-list")

    users.forEach(user => {
        console.log(user.name)
        const member = document.createElement('li')
        member.innerText = user.name
        list.append(member)
    })
}
function displayContent(group){
    const contents = group.contents
    const users = group.users
    contents.forEach(content => {
        // console.log('users', users)
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
        document.body.append($div)
        // displayStatus(content)
        
    })
}

// function displayStatus(content){
//     const states = content.states 
//     states.forEach(state => {

//     })
// }