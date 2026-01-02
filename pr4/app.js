let students = [];
let editIndex = null;

function loadStudents() {
    const saved = localStorage.getItem('students');
    if (saved) {
        students = JSON.parse(saved);
    } else {
        students = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' }
        ];
        saveToStorage();
    }
    renderStudents();
}

function saveToStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function renderStudents() {
    const grid = document.getElementById('studentsGrid');
    grid.innerHTML = '';
    if (students.length === 0) {
        grid.innerHTML = `<p style="text-align:center;color:#475569;">No students found.</p>`;
        return;
    }
    students.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
      <h3>${s.name}</h3>
      <p>Email: ${s.email}</p>
      <div class="card-buttons">
        <button class="edit-btn" onclick="openModal(${i})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
      </div>
    `;
        grid.appendChild(card);
    });
}


function addStudent() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) return alert("Name & Email required");

    students.unshift({ name, email });
    saveToStorage();
    renderStudents();


    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}


function openModal(i) {
    editIndex = i;
    const s = students[i];
    document.getElementById('editName').value = s.name;
    document.getElementById('editEmail').value = s.email;
    document.getElementById('editModal').style.display = 'flex';
}


function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}


function updateStudent() {
    const s = students[editIndex];
    s.name = document.getElementById('editName').value.trim();
    s.email = document.getElementById('editEmail').value.trim();
    saveToStorage();
    renderStudents();
    closeModal();
}


function deleteStudent(i) {
    if (!confirm("Delete this student?")) return;
    students.splice(i, 1);
    saveToStorage();
    renderStudents();
}


loadStudents();
