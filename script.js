"use strict";

const API_URL = 'http://localhost:5000'; // Backend API URL

// DOM Elements
const text = document.getElementById('text');
const bird1 = document.getElementById('bird1');
const bird2 = document.getElementById('bird2');
const rocks = document.getElementById('rocks');
const forest = document.getElementById('forest');
const water = document.getElementById('water');
const header = document.getElementById('header');
const contentSection = document.getElementById('contentSection');

// Buttons
const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');
const destinationBtn = document.getElementById('destinationBtn');
const contactBtn = document.getElementById('contactBtn');
const journeyBtn = document.getElementById('journeyBtn');
const loginBtn = document.getElementById('loginBtn');

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Login Modal
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');

// Upload Button and Section
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const uploadSection = document.getElementById('uploadSection');
const closeUpload = document.querySelector('.close-upload');
const uploadForm = document.getElementById('uploadForm');

// Journey Section
const journeySection = document.getElementById('journeySection');

// Public Photos Section
const publicPhotos = document.getElementById('publicPhotos');

// Token for authentication
let token = null;

// Toggle Menu on Click
menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
});

// Open Login Modal
loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginModal.style.display = 'block';
});

// Close Login Modal
closeModal.addEventListener('click', function () {
    loginModal.style.display = 'none';
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            token = data.token; // Save the JWT token
            alert('Login successful!');
            loginModal.style.display = 'none';
            uploadPhotoBtn.style.display = 'block'; // Show upload button
        } else {
            alert(data.error || 'Invalid credentials');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

// Open Upload Section
uploadPhotoBtn.addEventListener('click', function () {
    uploadSection.style.display = 'block';
});

// Close Upload Section
closeUpload.addEventListener('click', function () {
    uploadSection.style.display = 'none';
});

// Upload Form Submission
uploadForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const file = document.getElementById('photoUpload').files[0];
    const description = document.getElementById('photoDescription').value;

    if (file && description) {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('description', description);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert('Photo uploaded successfully!');
                uploadForm.reset();
                uploadSection.style.display = 'none';
                fetchPhotos(); // Refresh the photos
            } else {
                alert(data.error || 'Error uploading photo');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    } else {
        alert('Please upload a photo and add a description.');
    }
});

// Function to fetch and display photos
async function fetchPhotos() {
    try {
        const response = await fetch(`${API_URL}/photos`);
        const photos = await response.json();
        publicPhotos.innerHTML = ''; // Clear existing photos
        photos.forEach(photo => {
            publicPhotos.innerHTML += `
                <div class="box" style="background-image: url('${photo.imageUrl}')">
                    <div class="content">
                        <p>${photo.description}</p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

// Function to delete a photo (if needed)
function deletePhoto(index) {
    // Implement deletion logic if required
    alert('Delete functionality not implemented yet.');
}

// Scroll effect
window.addEventListener('scroll', function () {
    const value = window.scrollY;
    text.style.top = 50 + value * -0.1 + '%';
    bird2.style.top = value * -1.5 + 'px';
    bird2.style.left = value * 2 + 'px';
    bird1.style.top = value * -1.5 + 'px';
    bird1.style.left = value * -5 + 'px';
    rocks.style.top = value * -0.12 + 'px';
    forest.style.top = value * 0.25 + 'px';
    header.style.top = value * 0.5 + 'px';
});

// Function to scroll to the content section
function scrollToContent() {
    contentSection.scrollIntoView({ behavior: 'smooth' });
}

// Home button functionality
homeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    contentSection.innerHTML = `
        <h2>Welcome to My Website</h2>
        <p>This is the home section. Feel free to explore!</p>
    `;
    journeySection.style.display = 'none'; // Hide Journey section
    scrollToContent();
});

// About button functionality
aboutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    contentSection.innerHTML = `
        <h2>About Me</h2>
        <div class="circular"></div>
        <p>Hi, I'm <span class="highlight">Soundarrajan</span>!</p>
        <p>I’m currently pursuing a BSc in Computer Science at ES Arts and Science College.</p>
        <p> I completed my schooling in 2023, marking an important milestone in my academic journey. In my free time, I enjoy playing games and listening to music, which help me relax and unwind. I’m passionate about exploring new interests in the field of technology and always eager to learn and grow.</p>
    `;
    journeySection.style.display = 'none'; // Hide Journey section
    scrollToContent();
});

// Destination button functionality
destinationBtn.addEventListener('click', function (e) {
    e.preventDefault();
    contentSection.innerHTML = `
        <h2>My Goals</h2>
        <p><strong>Short-term Goal:</strong> To join an IT company and gain hands-on experience in the industry.</p>
        <p><strong>Long-term Goal:</strong> To start my own business and create a positive impact.</p>
    `;
    journeySection.style.display = 'none'; // Hide Journey section
    scrollToContent();
});

// Contact button functionality
contactBtn.addEventListener('click', function (e) {
    e.preventDefault();
    contentSection.innerHTML = `
        <h2>Contact Me</h2>
        <p>If you'd like to get in touch, feel free to reach out to me at:</p>
        <div class="social-links">
            <a href="https://www.facebook.com/share/1HENdXtkZx" target="_blank" class="social-icon">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="mailto:soundarrajan2725@gmail.com" target="_blank" class="social-icon">
                <i class="fas fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/aakash_sr_25" target="_blank" class="social-icon">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/soundarrajan25" target="_blank" class="social-icon">
                <i class="fab fa-github"></i>
            </a>
        </div>
    `;
    journeySection.style.display = 'none'; // Hide Journey section
    scrollToContent();
});

// Journey button functionality
journeyBtn.addEventListener('click', function (e) {
    e.preventDefault();
    contentSection.innerHTML = ''; // Clear content section
    journeySection.style.display = 'block'; // Show Journey section
    fetchPhotos(); // Fetch and display photos
    scrollToContent();
});

// Fetch photos on page load
fetchPhotos();
