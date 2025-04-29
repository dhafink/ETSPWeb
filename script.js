document.addEventListener('DOMContentLoaded', function() {
    // Set up countdown for landing page
    if (document.getElementById('countdown')) {
        setupCountdown();
    }
    
    // Set up form validation for registration page
    if (document.getElementById('registrationForm')) {
        setupFormValidation();
    }
    
    // Set up members display for members page
    if (document.getElementById('membersGrid')) {
        displayMembers();
        setupMembersPage();
    }
});

// Countdown timer function
function setupCountdown() {
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('April 29, 2025 08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "EVENT IS LIVE!";
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Form validation function
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const birthdateInput = document.getElementById('birthdate');
    const addressInput = document.getElementById('address');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const genderError = document.getElementById('genderError');
    const birthdateError = document.getElementById('birthdateError');
    const addressError = document.getElementById('addressError');
    
    // Real-time validation
    fullNameInput.addEventListener('input', function() {
        if (fullNameInput.value.trim() === '') {
            fullNameError.textContent = 'Name is required';
            fullNameInput.style.borderColor = 'var(--error-color)';
        } else if (fullNameInput.value.trim().length < 3) {
            fullNameError.textContent = 'Name must be at least 3 characters';
            fullNameInput.style.borderColor = 'var(--error-color)';
        } else {
            fullNameError.textContent = '';
            fullNameInput.style.borderColor = 'var(--neon-green)';
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = 'var(--error-color)';
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--error-color)';
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = 'var(--neon-green)';
        }
    });
    
    phoneInput.addEventListener('input', function() {
        const phonePattern = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            phoneInput.style.borderColor = 'var(--error-color)';
        } else if (!phonePattern.test(phoneInput.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneInput.style.borderColor = 'var(--error-color)';
        } else {
            phoneError.textContent = '';
            phoneInput.style.borderColor = 'var(--neon-green)';
        }
    });
    
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            genderError.textContent = '';
        });
    });
    
    birthdateInput.addEventListener('input', function() {
        if (birthdateInput.value === '') {
            birthdateError.textContent = 'Date of birth is required';
            birthdateInput.style.borderColor = 'var(--error-color)';
        } else {
            const birthDate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 8) {
                birthdateError.textContent = 'You must be at least 8 years old to participate';
                birthdateInput.style.borderColor = 'var(--error-color)';
            } else if (age > 100) {
                birthdateError.textContent = 'Please enter a valid birth date';
                birthdateInput.style.borderColor = 'var(--error-color)';
            } else {
                birthdateError.textContent = '';
                birthdateInput.style.borderColor = 'var(--neon-green)';
            }
        }
    });
    
    addressInput.addEventListener('input', function() {
        if (addressInput.value.trim() === '') {
            addressError.textContent = 'Address is required';
            addressInput.style.borderColor = 'var(--error-color)';
        } else if (addressInput.value.trim().length < 10) {
            addressError.textContent = 'Please enter your complete address';
            addressInput.style.borderColor = 'var(--error-color)';
        } else {
            addressError.textContent = '';
            addressInput.style.borderColor = 'var(--neon-green)';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        // Validate full name
        if (fullNameInput.value.trim() === '') {
            fullNameError.textContent = 'Name is required';
            fullNameInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Validate phone
        const phonePattern = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            phoneInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (!phonePattern.test(phoneInput.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Validate gender
        let genderSelected = false;
        let selectedGender = '';
        genderInputs.forEach(input => {
            if (input.checked) {
                genderSelected = true;
                selectedGender = input.value;
            }
        });
        
        if (!genderSelected) {
            genderError.textContent = 'Please select your gender';
            isValid = false;
        }
        
        // Validate birthdate
        if (birthdateInput.value === '') {
            birthdateError.textContent = 'Date of birth is required';
            birthdateInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            const birthDate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 8) {
                birthdateError.textContent = 'You must be at least 8 years old to participate';
                birthdateInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else if (age > 100) {
                birthdateError.textContent = 'Please enter a valid birth date';
                birthdateInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
        }
        
        // Validate address
        if (addressInput.value.trim() === '') {
            addressError.textContent = 'Address is required';
            addressInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (addressInput.value.trim().length < 10) {
            addressError.textContent = 'Please enter your complete address';
            addressInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        if (isValid) {
            // Format the data for storage
            const memberData = {
                id: Date.now().toString(),
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                gender: selectedGender,
                birthdate: birthdateInput.value,
                address: addressInput.value.trim(),
                registrationDate: new Date().toISOString()
            };
            
            // Store the member data in localStorage
            saveMemberData(memberData);
            
            // Show confirmation modal
            const modal = document.getElementById('confirmationModal');
            const confirmationDetails = document.getElementById('confirmationDetails');
            
            confirmationDetails.innerHTML = `
                <p><strong>Name:</strong> ${memberData.fullName}</p>
                <p><strong>Email:</strong> ${memberData.email}</p>
                <p><strong>Phone:</strong> ${memberData.phone}</p>
                <p><strong>Gender:</strong> ${memberData.gender}</p>
                <p><strong>Date of Birth:</strong> ${formatDate(memberData.birthdate)}</p>
                <p><strong>Registration Date:</strong> ${formatDate(memberData.registrationDate)}</p>
            `;
            
            modal.style.display = 'block';
            
            // Reset the form
            form.reset();
            
            // Reset border color
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = 'var(--metallic-silver)';
            });
        }
    });
    
    // Modal close functionality
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close-button');
    const closeModalBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Save member data to localStorage
function saveMemberData(memberData) {
    let members = JSON.parse(localStorage.getItem('neonRushMembers')) || [];
    members.push(memberData);
    localStorage.setItem('neonRushMembers', JSON.stringify(members));
}

// Display members on the members page
function displayMembers() {
    const membersGrid = document.getElementById('membersGrid');
    const members = JSON.parse(localStorage.getItem('neonRushMembers')) || [];
    
    // Clear existing content
    membersGrid.innerHTML = '';
    
    if (members.length === 0) {
        membersGrid.innerHTML = '<div class="no-members-message">No runners registered yet. Be the first!</div>';
        return;
    }
    
    // Sort members by registration date (newest first)
    members.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
    
    // Create member cards
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.dataset.id = member.id;
        
        memberCard.innerHTML = `
            <h3>${member.fullName}</h3>
            <div class="member-info"><span>Email:</span> ${member.email}</div>
            <div class="member-info"><span>Phone:</span> ${member.phone}</div>
            <div class="member-info"><span>Gender:</span> ${member.gender}</div>
            <div class="member-info"><span>Date of Birth:</span> ${formatDate(member.birthdate)}</div>
            <div class="member-info"><span>Registered:</span> ${formatDate(member.registrationDate)}</div>
            <button class="delete-member" data-id="${member.id}">×</button>
        `;
        
        membersGrid.appendChild(memberCard);
    });
    
    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-member');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-id');
            showDeleteConfirmation(memberId);
        });
    });
}

// Setup actions for members page
function setupMembersPage() {
    const refreshButton = document.getElementById('refreshMembers');
    const clearAllButton = document.getElementById('clearAllMembers');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    
    let currentMemberId = null;
    
    // Refresh members list
    refreshButton.addEventListener('click', function() {
        displayMembers();
    });
    
    // Clear all members
    clearAllButton.addEventListener('click', function() {
        const members = JSON.parse(localStorage.getItem('neonRushMembers')) || [];
        if (members.length === 0) {
            return;
        }
        
        showDeleteConfirmation('all');
    });
    
    // Show delete confirmation modal
    function showDeleteConfirmation(memberId) {
        currentMemberId = memberId;
        deleteModal.style.display = 'block';
    }
    
    // Confirm delete action
    confirmDeleteBtn.addEventListener('click', function() {
        if (currentMemberId === 'all') {
            localStorage.removeItem('neonRushMembers');
        } else {
            let members = JSON.parse(localStorage.getItem('neonRushMembers')) || [];
            members = members.filter(member => member.id !== currentMemberId);
            localStorage.setItem('neonRushMembers', JSON.stringify(members));
        }
        
        displayMembers();
        deleteModal.style.display = 'none';
    });
    
    // Cancel delete action
    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });
    
    // Close modal if clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    });
}

// Helper function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}