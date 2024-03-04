// Sample data of exams
const exams = [
    { name: "Luyện tập-Kỳ 1-2023", status: "open" },
    { name: "Giữa kỳ-Kỳ 1-2023", status: "open" },
    { name: "Cuối kỳ-Kỳ 1-2023", status: "open" },
    { name: "Luyện tập-Kỳ 2-2023", status: "open" },
    { name: "Giữa kỳ-Kỳ 2-2023", status: "open" },
    { name: "Cuối kỳ-Kỳ 2-2023", status: "open" },
    { name: "Luyện tập-Kỳ 1-2024", status: "open" },
    { name: "Giữa kỳ-Kỳ 1-2024", status: "closed" },
    { name: "Cuối kỳ-Kỳ 1-2024", status: "closed" },
    { name: "Luyện tập-Kỳ hè-2023", status: "open" },
    { name: "Giữa kỳ-Kỳ hè-2023", status: "closed" },
    { name: "Cuối kỳ-Kỳ hè-2023", status: "open" },
    // Add more exam objects as needed
  ];
  
  // Function to display exams based on search input
  function searchExams() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredExams = exams.filter(exam => exam.name.toLowerCase().includes(searchValue));
    displayExams(filteredExams);
  }
  
  // Function to display exams based on status filter
  function filterExams() {
    const status = document.getElementById("statusFilter").value;
    let filteredExams = exams;
    if (status !== "all") {
      filteredExams = exams.filter(exam => exam.status === status);
    }
    displayExams(filteredExams);
  }
  
  // Function to display exams on the web page
  function displayExams(examsToShow) {
    const examListElement = document.getElementById("examList");
    examListElement.innerHTML = "";
    examsToShow.forEach(exam => {
      const card = document.createElement("div");
      card.classList.add("card");

      const examName = document.createElement("div");
      examName.classList.add("exam-name");
      examName.textContent = exam.name;
      card.appendChild(examName);

      const examStatus = document.createElement("div");
      examStatus.textContent = `Trạng thái: ${exam.status}`;
      card.appendChild(examStatus);

      const startButton = document.createElement("button");
      startButton.textContent = "Bắt đầu làm";
      startButton.onclick = function() {
        startExam(exam.name);
      };
      
      // Thêm thông báo nếu kỳ thi đang đóng
      if (exam.status === "closed") {
        const notAvailableMessage = document.createElement("div");
        //notAvailableMessage.textContent = "Không thể bắt đầu làm vào thời điểm này";
        //card.appendChild(notAvailableMessage);
        // Vô hiệu hóa nút "Bắt đầu làm"
        startButton.disabled = true;
      }

      card.appendChild(startButton);
      examListElement.appendChild(card);
    });
  }

  // Hàm xử lý chuyển trang khi click vào nút start
  //Thông tin về tên bài kiểm tra sẽ được lưu vào trong URL parameter từ đó trang sau có thể lấy tên bài kiểm tra để hiển thị
  function startExam(examName) {
    window.location.href = "question.html?examName=" + encodeURIComponent(examName);
    
  }

  // Function to simulate logout
  function logout() {
    window.location.href = "../html/login.html";
    // Add your code to perform logout action
  }

  // Function to navigate to home
  function goHome() {
    alert("Go to home page!");
    // Add your code to navigate to the home page
  }

  function goManageInfo() {
    alert("Go to manage info page!");
    // Add your code to navigate to the home page
  }

  // Initial display of exams when the page loads
  displayExams(exams);