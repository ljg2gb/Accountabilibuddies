const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id');

fetch(`http://localhost:3000/groups/${id}`)
    .then(resp => resp.json())
    .then(group => handleGroup(group))

function handleGroup(group){
    const groupName = document.querySelector('h1')
    groupName.innerText = group.name 
    handleUsers(group.users)
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