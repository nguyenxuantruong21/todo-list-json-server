
var renderContents = function () {
  var contents = fetch('http://localhost:3000/contents')
  contents
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      var todos = document.querySelector('.todos')
      let content = '<ul>'
      response.forEach((task) => {
        content += `        
        <li>
            <input type="checkbox">
            <p>${task.content}</p>
            <a class="edit"><i class="fa-sharp fa-regular fa-pen-to-square"></i></a>
            <a class="delete"><i class="fa-solid fa-trash-can"></i></a>
        </li>
        `
      })
      content += '</ul>'
      todos.innerHTML = content
    })
}

renderContents()


// form add content
var addContents = function () {
  var form = document.querySelector('.form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    var contentObj = this.querySelector('[name="content"]')
    var body = {
      content: contentObj.value,
      completed: false
    }
    fetch('http://localhost:3000/contents', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(function (response) {
        if (response.oke) {
          renderContents()
          contentObj = ''
        }
      })
  })
}

addContents()


// delete content
var deleteContents = function () {
  var contents = fetch('http://localhost:3000/contents')
  contents.then(function (response) {
    return response.json()
  }).then(function (response) {
    var lis = document.querySelectorAll('li')
    lis.forEach(function (li, index) {
      var dele = li.querySelector('.delete')
      dele.addEventListener('click', function (e) {
        e.preventDefault()
        var id = response[index].id
        fetch(`http://localhost:3000/contents/${id}`, {
          method: 'DELETE'
        }).then(function (response) {
          if (response.ok) {
            renderContents()
          }
        })
      })
    })
  })
}

deleteContents()



var completed = function () {
  var contents = fetch('http://localhost:3000/contents')
  contents
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      var inputs = document.querySelectorAll('li > input')
      inputs.forEach(function (input, index) {
        var id = response[index].id
        input.addEventListener('change', function (e) {
          e.preventDefault()
          if (input.checked === true) {

            body = {
              completed: true
            }
            fetch(`http://localhost:3000/contents/${id}`, {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
          } else if (input.checked === false) {
            body = {
              completed: false
            }
            fetch(`http://localhost:3000/contents/${id}`, {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
          }
        })
      })
    })
}

completed()



// patch contents
var patchContents = function () {
  var contents = fetch('http://localhost:3000/contents')
  contents
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      var lis = document.querySelectorAll('li')
      lis.forEach(function (li, index) {
        var id = response[index].id
        if (response[index].completed === true) {
          lis[index].classList.add('completed')
          var input = li.querySelector('input')
          input.checked = true
        } else {
          lis[index].classList.remove('completed')
          var input = li.querySelector('input')
          input.checked = false
        }
      })
    })
}

patchContents()



// counter
var counter = 0
var counter = function () {
  var contents = fetch('http://localhost:3000/contents')
  contents
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      counter = response.length
      var p = document.querySelector('.counter')
      p.innerHTML = 'You have ' + counter + ' todos'
    })
}

counter()

