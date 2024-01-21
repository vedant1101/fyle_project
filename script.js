const APIURL = "https://api.github.com/users/";

let currentUsername = ""; // Global variable to store the current username
let currentPage = 1; // Initialize currentPage

const formSubmit = () => {
  const searchbox = document.querySelector("#search");
  if (searchbox.value != "") {
    currentUsername = searchbox.value;
    getUser(searchbox.value);
    getRepos(searchbox.value, 1); // Start with page 1
  }
  return false; // Prevents default form submission behavior
};

const getUser = async (username) => {
  try {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    const main = document.querySelector("#main");
    const userCard = `
    <div class="header">
      <div>
        <img class="rounded-circle  size" alt="avatar2" src="${data.avatar_url}" />
      </div>
      <div class="col">
        <h1 class="com">${data.name}</h1>
        <h5 class="com">Public Repositories: ${data.public_repos}</h5>
        <h5 class="com">📌 ${data.location}</h5>
        <a href="${data.blog}" style="text-decoration:none">Blog : ${data.blog}</a>
        <h5 class="com">Followers : ${data.followers}</h5>
        <h5 class="com">Following: ${data.following}</h5>
      </div>
      </div>
      <div class="sp">
        <a href="${data.html_url}" style="text-decoration:none"> 🔗 ${data.html_url}</a>
      <div>  
    `;
    main.innerHTML = userCard;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

// const getRepos = async (username, pageNumber) => {
//   try {
//     const url = `${APIURL}${username}/repos?page=${pageNumber}&per_page=9`;
//     const response = await fetch(url);
//     const data = await response.json();

//     const cardsContent = data
//       .map(
//         (repo) => `
//           <div class="card" style="width: 25rem;">
//             <div class="card-body">
//               <h5 class="card-title col" style="color:#0d6efd;">${repo.name.toUpperCase()}</h5>
//               <p class="card-text">${
//                 repo.description || "No description available"
//               }</p>
//               <button type="button" class="btn btn-primary">${
//                 repo.language || "N/A"
//               }</button>
//             </div>
//           </div>
//         `
//       )
//       .join("");

//     const second = document.querySelector("#second");
//     second.innerHTML = `<div class="card-container">${cardsContent}</div>`;
//   } catch (error) {
//     console.error("Failed to fetch repositories:", error);
//   }
// };

// Define goToPage function
const getRepos = async (username, pageNumber) => {

  try {
  
  const url = `${APIURL}${username}/repos?page=${pageNumber}&per_page=9`;
  
  const response = await fetch(url);
  
  const data = await response.json();
  
  console.log(data);
  
  const cardsContent = data
  
  .map(repo => {
  
  let topicButtons;
  
  if (repo.topics && repo.topics.length > 0) {
  
  // Map the first 3 topics to buttons
  
  topicButtons = repo.topics.slice(0,repo.topics.length).map(topic =>
  
  `<button type="button" class="btn btn-primary mt-2 ms-2">${topic}</button>`
  
  ).join(' ');
  
  } else {
  
  // If no topics, display a single 'N/A' button
  
  topicButtons = '<button type="button" class="btn btn-primary">N/A</button>';
  
  }
  
  return `
  
  <div class="card" style="width: 25rem;">
  
  <div class="card-body">
  
  <h5 class="card-title col" style="color:#0d6efd;">${repo.name.toUpperCase()}</h5>
  
  <p class="card-text">${repo.description || "No description available"}</p>
  
  ${topicButtons} <!-- Add the topic buttons here -->
  
  </div>
  
  </div>
  
  `;
  
  })
  
  .join("");
  
  const second = document.querySelector("#second");
  
  second.innerHTML = `<div class="cardbox"><div class="card-container">${cardsContent}</div></div>`;
  
  } catch (error) {
  
  console.error("Failed to fetch repositories:", error);
  
  }
  
  };
window.goToPage = function (pageNumber) {
  currentPage = pageNumber; // Update currentPage
  if (currentUsername) {
    getRepos(currentUsername, pageNumber);
  }
};
