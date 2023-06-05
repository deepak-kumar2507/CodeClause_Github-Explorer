document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById("username-input");
    var searchBtn = document.getElementById("search-btn");
    var repositoriesList = document.getElementById("repositories-list");
    
    searchBtn.addEventListener("click", function() {
      var username = usernameInput.value;
      if (username !== "") {
        fetchRepositories(username);
      }
    });
    
    function fetchRepositories(username) {
      var url = "https://api.github.com/users/" + username + "/repos";
      
      fetch(url)
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(function(data) {
          displayRepositories(data);
        })
        .catch(function(error) {
          console.log("Error: " + error);
        });
    }
    
    function displayRepositories(repositories) {
      repositoriesList.innerHTML = "";
      
      repositories.forEach(function(repository) {
        var repoElement = document.createElement("div");
        repoElement.classList.add("repository");
        
        var nameElement = document.createElement("h3");
        nameElement.textContent = repository.name;
        
        var descriptionElement = document.createElement("p");
        descriptionElement.textContent = repository.description || "No description provided.";
        
        repoElement.appendChild(nameElement);
        repoElement.appendChild(descriptionElement);
        
        repositoriesList.appendChild(repoElement);
      });
    }
  });
  