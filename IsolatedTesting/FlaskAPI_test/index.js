document.getElementById("myButton").addEventListener("click", function() {

    // Send fetch request to Flask application
    fetch('/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Boksene nr... er mottatt' })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

})
