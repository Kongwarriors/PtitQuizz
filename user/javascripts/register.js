document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = registerForm.username.value.trim();
        const password = registerForm.password.value.trim();
        const rePassword = registerForm['re-password'].value.trim();
        const email = registerForm.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Kiểm tra thông tin tài khoản hợp lệ
        if(username === "user"){
            errorMessage.textContent = "Account already exists";
            return;
        }
        // Kiểm tra xem mật khẩu và mật khẩu nhập lại có khớp nhau không
        else if (password !== rePassword) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }

        // Kiểm tra độ dài của mật khẩu (ít nhất 6 ký tự)
        else if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            return;
        }

        // Kiểm tra định dạng email sử dụng regex
        else if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            return;
        }
        // Sau khi đăng ký thành công, bạn có thể chuyển hướng người dùng đến trang dashboard hoặc trang khác
        else{
            window.location.href = 'login.html';
        }
    });
});
