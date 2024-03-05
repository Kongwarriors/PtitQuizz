function viewResultDetails() {
    var answerDetailsDiv = document.getElementById('result-details');
    // Xử lý logic để lấy và điền dữ liệu chi tiết vào đây
    // Ví dụ:
    var detailHTML = '<h2>Chi tiết câu trả lời:</h2>';

    // Giả sử bạn có một mảng lưu trữ câu trả lời của người dùng và đáp án đúng
    var userAnswers = ['A', 'C', 'B', 'D', 'A'];
    var correctAnswers = ['B', 'C', 'B', 'D', 'A'];

    // Duyệt qua từng câu và hiển thị chi tiết
    for (var i = 0; i < userAnswers.length; i++) {
        var questionNumber = i + 1;
        var userAnswer = userAnswers[i];
        var correctAnswer = correctAnswers[i];
        detailHTML += '<div class="result-detail-item">';
        detailHTML += '<p>Câu ' + questionNumber + ': Lựa chọn ' + userAnswer + ' - Đáp án đúng: ' + correctAnswer + '</p>';
        detailHTML += '</div>';
    }

    // Hiển thị kết quả chi tiết trong div
    answerDetailsDiv.innerHTML = detailHTML;
  }

  function logout() {
    window.location.href = "../html/login.html";
    // Add your code to perform logout action
  }

  function goHome() {
    window.location.href = "../html/login.html";
    // Add your code to navigate to the home page
  }