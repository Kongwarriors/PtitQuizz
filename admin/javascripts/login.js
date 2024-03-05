const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Kiểm tra thông tin đăng nhập
    if (username === 'admin' && password === 'password') {
        // Đăng nhập thành công
        window.location.href = "TrangDashBoard.html"; // Chuyển hướng đến trang dashboard
    } else {
        // Hiển thị thông báo lỗi
        errorMessage.textContent = 'Invalid username or password. Please try again.';
    }
});
