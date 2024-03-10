let users = [
    { id: 1, username: "Thi giữa kỳ", email: "50 phút, ngày bắt đầu: 20/2/2024" },
    { id: 2, username: "Thi cuối kỳ", email: "30 phút, ngày bắt đầu: 20/3/2024" },
    { id: 3, username: "Thi thử", email: "Tự do" }
  ];

  function displayUsers() {
    let tbody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    users.forEach(function(user) {
      let row = `
        <tr>
          <th scope="row">${user.id}</th>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Chỉnh sửa</button>
            <button type="button" class="btn btn-warning btn-sm" onclick="changeQ()">Thêm câu hỏi</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Xóa</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  }
function changeQ() {
    window.location.href="/PtitQuizz/admin/html/TrangTaoChinhSuaKyThi.html"
}
  function editUser(userId) {
    let user = users.find(u => u.id === userId);
    if (user) {
      document.getElementById("userId").value = user.id;
      document.getElementById("username").value = user.username;
      document.getElementById("email").value = user.email;
      document.getElementById("submitButton").innerHTML = "Cập nhật";
      document.getElementById("cancelButton").style.display = "inline-block";
    }
  }

  function cancelEdit() {
    document.getElementById("userId").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("submitButton").innerHTML = "Thêm mới";
    document.getElementById("cancelButton").style.display = "none";
  }

  document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let userId = document.getElementById("userId").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    if (userId) {
      // Edit user
      let index = users.findIndex(u => u.id === parseInt(userId));
      if (index !== -1) {
        users[index].username = username;
        users[index].email = email;
      }
    } else {
      // Add new user
      let newId = users.length + 1;
      users.push({ id: newId, username: username, email: email });
    }

    // Clear form fields and cancel edit mode
    cancelEdit();

    displayUsers();
  });

  function deleteUser(userId) {
    users = users.filter(function(user) {
      return user.id !== userId;
    });

    displayUsers();
  }

  displayUsers();