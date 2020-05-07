//Search params
const searchParams = new URLSearchParams(window.location.search)
const groupID = searchParams.get('id') 
const userID = searchParams.get('user') 

//Post content form

const postFormUserID = document.getElementById('post-content-user-id')
postFormUserID.value = userID 
const postFormGroupID = document.getElementById('post-content-group-id')
postFormGroupID.value = groupID 

//Nav bar

const homeButton = document.getElementById('home-button')
homeButton.innerHTML = `<a href="http://localhost:3001/show.html?user=${userID}">Home</a>`

//Add user form

const addUserGroupId = document.getElementById('add-user-group-id')
addUserGroupId.value = groupID 
const addUserCurrentUser = document.getElementById('current-user')
addUserCurrentUser.value = userID 

//Remove self from group form

const removeSelfGroupID = document.getElementById('remove-self-group-id')
removeSelfGroupID.value = groupID
const removeSelfUserID = document.getElementById('remove-self-user-id')
removeSelfUserID.value = userID

//fetch for add users to group form

fetch('http://localhost:3000/users')
    .then(resp =>resp.json())
    .then(addUsers)

const addUserForm = document.getElementById('add-user')

function addUsers(users) {
    users.forEach(user=> {
        addUser(user)})
}

function addUser(user){
    const $li = document.createElement('li')
    $li.innerHTML = `
    <input type="checkbox" id=${user.name} name="user_id" value=${user.id}>
    <label for=${user.name}>${user.name}</label>
    <input type="hidden" name="group_id" value=${groupID}>`
    addUserForm.append($li)
}

//fetch for group show page content

fetch(`http://localhost:3000/groups/${groupID}`)
    .then(resp => resp.json())
    .then(group => handleGroup(group))

const $mainSection = document.getElementById('main-section')
const memberList = document.getElementById('member-list')

function handleGroup(group){
    displayGroupName(group)
    handleUsers(group.users)
    displayContent(group)
}

function displayGroupName(group){
    const groupName = document.querySelector('#welcome')
    groupName.innerText = group.name 
}

function handleUsers(users){
    users.forEach(user => {
    displayUser(user)       
    })
}

function displayUser(user){
    const member = document.createElement('li')
    member.innerText = user.name
    memberList.append(member)
}

function displayContent(group){
    group.contents.forEach(content => {
       makeContent(content, group.users) 
    })
}

function makeContent(content, users){
    const $div = document.createElement('div')
        if (content.message) {
            $div.innerHTML = `<h3>${content.message}</h3>`
        } else {
            $div.innerHTML = `<div>${content.image}</div>`
        }
        const foundUser = users.find(user => user.id == content.user_id)
        const creatorElement = document.createElement('p')
        creatorElement.innerText = `created by ${foundUser.name}`
        $div.append(creatorElement)
        $mainSection.append($div)
}