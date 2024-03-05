window.onload = function() {
    // Hàm lấy thông tin từ URL parameters
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  
    // Dữ liệu câu hỏi
    var questions = [
      {
        question: "Câu hỏi 1: Đây là nội dung của câu hỏi 1?",
        choices: ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C"]
      },
      {
        question: "Câu hỏi 2: Đây là nội dung của câu hỏi 2?",
        choices: ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C"]
      }
      // Thêm câu hỏi khác tại đây
    ];
  
    // Lấy thông tin về tên bài thi từ URL parameters
    var examName = getParameterByName('examName');
  
    // Hiển thị thông tin về bài thi trên trang
    var examInfoDiv = document.getElementById('examInfo');
    examInfoDiv.innerHTML = '<h1>' + examName + '</h1>';
  
    // Hiển thị câu hỏi và lựa chọn từ danh sách câu hỏi
    var questionsDiv = document.getElementById('questions');
    questions.forEach(function(questionData, index) {
      var questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.innerHTML = '<h2>' + questionData.question + '</h2>';
      var optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');
      questionData.choices.forEach(function(choice) {
        var choiceLabel = document.createElement('label');
        var choiceInput = document.createElement('input');
        choiceInput.type = 'radio';
        choiceInput.name = 'question' + index;
        choiceInput.value = choice;
        choiceLabel.appendChild(choiceInput);
        choiceLabel.appendChild(document.createTextNode(choice));
        optionsDiv.appendChild(choiceLabel);
      });
      questionElement.appendChild(optionsDiv);
      questionsDiv.appendChild(questionElement);
    });
  
    // Bắt đầu đếm ngược thời gian
    var examTime = 300; // Thời gian mặc định cho mỗi bài thi (đơn vị: giây)
    var countdownSpan = document.getElementById('countdown');
    startTimer(examTime, countdownSpan);
  };
  
  // Hàm đếm ngược thời gian
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        timer = 0;
        // Hiển thị thông báo khi hết giờ
        alert("Hết giờ!");
        // Tự động gửi bài khi hết giờ
        submitExam();
      }
    }, 1000);
  }
  
  // Hàm gửi bài
  function submitExam() {
    // Thực hiện các thao tác cần thiết khi nộp bài
    alert("Bài của bạn đã được gửi!");
    // Điều hướng hoặc thực hiện các tác vụ khác
    window.location.href = "result.html";
  }

  function logout() {
    window.location.href = "../html/login.html";
    // Add your code to perform logout action
  }

  function goHome() {
    window.location.href = "../html/home.html";
    // Add your code to navigate to the home page
  }