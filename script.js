const modal = document.getElementById('modal');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postsContainer = document.getElementById('postsContainer');

let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  titleInput.value = '';
  contentInput.value = '';
}

window.onclick = (e) => {
  if (e.target === modal) closeModal();
}

function addPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return alert('Both fields are required!');
  const id = Date.now();
  const post = { id, title, content };
  posts.unshift(post);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  renderPosts();
  closeModal();
}

function deletePost(id) {
  if (confirm('Delete this post?')) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    renderPosts();
  }
}

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post';
    card.style.width = '260px';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.onmouseover = () => {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
    };
    card.onmouseout = () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    };

    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content.substring(0, 100)}...</p>
      <button class="deleteBtn" onclick="deletePost(${post.id})">Delete</button>
    `;
    card.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON')
        window.open(`post.html?id=${post.id}`, '_blank');
    };
    postsContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderPosts);
