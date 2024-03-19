document.addEventListener("DOMContentLoaded", function() {
    const studentsData = [
        { name: "Nguyễn Văn A", studentID: "SV001", examType: "practice", accessType: "free", date: "2024-02-01", participation: 10, averageScore: 9 },
        { name: "Trần Thị B", studentID: "SV002", examType: "midterm", accessType: "specificTime", date: "2024-02-15", participation: 8, averageScore: 7 },
        { name: "Phạm Văn C", studentID: "SV003", examType: "final", accessType: "free", date: "2024-03-05", participation: 12, averageScore: 9 },
        { name: "Lê Thị D", studentID: "SV004", examType: "practice", accessType: "free", date: "2024-02-10", participation: 15, averageScore: 8 },
        { name: "Hoàng Văn E", studentID: "SV005", examType: "final", accessType: "specificTime", date: "2024-03-20", participation: 9, averageScore: 7 },
        { name: "Mai Thị F", studentID: "SV006", examType: "practice", accessType: "free", date: "2024-02-01", participation: 11, averageScore: 8 },
        { name: "Đặng Văn G", studentID: "SV007", examType: "midterm", accessType: "specificTime", date: "2024-02-15", participation: 7, averageScore: 6 },
        { name: "Vũ Thị H", studentID: "SV008", examType: "final", accessType: "free", date: "2024-03-05", participation: 13, averageScore: 9 },
        { name: "Hồ Văn I", studentID: "SV009", examType: "practice", accessType: "specificTime", date: "2024-02-10", participation: 14, averageScore: 8 },
        { name: "Trần Văn K", studentID: "SV010", examType: "final", accessType: "specificTime", date: "2024-03-20", participation: 10, averageScore: 9 }
    ];

    const applyFiltersButton = document.getElementById("applyFilters");
    const exportExcelButton = document.getElementById("exportExcel");

    applyFiltersButton.addEventListener("click", function() {
        applyFilters();
    });

    exportExcelButton.addEventListener("click", function() {
        exportExcel();
    });

    // Hiển thị danh sách sinh viên khi trang được tải
    updateStatistics("all", "all", "");

    function applyFilters() {
        const examType = document.getElementById("examType").value;
        const accessType = document.getElementById("accessType").value;
        const date = document.getElementById("date").value;

        // Thực hiện logic áp dụng bộ lọc ở đây
        // Sau khi lọc dữ liệu, cập nhật bảng thống kê và biểu đồ
        updateStatistics(examType, accessType, date);
        drawHistogram();
    }

    function updateStatistics(examType, accessType, date) {
        const statsTableBody = document.getElementById("statsBody");
    
        // Xóa nội dung cũ trong bảng
        statsTableBody.innerHTML = "";
    
        // Lọc dữ liệu sinh viên dựa trên yêu cầu của bộ lọc
        let filteredStudents = studentsData;
    
        if (examType !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.examType === examType);
        }
    
        if (accessType !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.accessType === accessType);
        }
    
        if (date !== '') {
            filteredStudents = filteredStudents.filter(student => student.date === date);
        }
    
        // Nếu không có bộ lọc nào được áp dụng, hiển thị tất cả sinh viên
        if (examType === 'all' && accessType === 'all' && date === '') {
            filteredStudents = studentsData;
        }
    
        // Biến đếm cho số thứ tự sinh viên
        let studentCount = 1;
    
        // Thêm dữ liệu mới vào bảng
        filteredStudents.forEach(function(student) {
            const row = document.createElement("tr");
    
            row.innerHTML = `
                <td>${studentCount}</td>
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${translateExamType(student.examType)}</td> <!-- Thay đổi thành tiếng Việt -->
                <td>${translateAccessType(student.accessType)}</td> <!-- Thay đổi thành tiếng Việt -->
                <td>${student.date}</td>
                <td>${student.participation}</td>
                <td>${calculateCompletionRate(student.averageScore)}</td>
                <td>${student.averageScore}</td>
            `;
            statsTableBody.appendChild(row);
    
            // Tăng biến đếm
            studentCount++;
        });
    }
    
    // Hàm chuyển đổi loại kỳ thi sang tiếng Việt
    function translateExamType(examType) {
        switch (examType) {
            case "practice":
                return "Luyện tập";
            case "midterm":
                return "Giữa kỳ";
            case "final":
                return "Cuối kỳ";
            default:
                return "Không xác định";
        }
    }
    
    // Hàm chuyển đổi trạng thái truy cập sang tiếng Việt
    function translateAccessType(accessType) {
        switch (accessType) {
            case "free":
                return "Tự do";
            case "specificTime":
                return "Thời gian cụ thể";
            default:
                return "Không xác định";
        }
    }
        

    function calculateCompletionRate(averageScore) {
        const maxScore = 10.0;
        const completionRate = (averageScore / maxScore) * 100;
        return completionRate.toFixed(2) + "%";
    }

    function drawHistogram() {
        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');
    
        // Tạo mảng chứa tần suất của từng điểm số trung bình
        const scoreFrequency = Array.from({ length: 11 }, () => 0);
    
        // Lấy dữ liệu từ bảng thống kê đã được lọc
        const statsTableBody = document.getElementById("statsBody");
        const rows = statsTableBody.querySelectorAll("tr");
    
        rows.forEach(row => {
            // Lấy điểm trung bình từ cột cuối cùng của mỗi hàng
            const averageScore = parseFloat(row.cells[8].textContent);
            const score = Math.round(averageScore); // Làm tròn điểm trung bình thành số nguyên
            scoreFrequency[score]++;
        });
    
        // Kiểm tra xem biểu đồ đã tồn tại chưa
        if (window.myChart instanceof Chart) {
            // Nếu đã tồn tại, hủy biểu đồ cũ trước khi vẽ lại
            window.myChart.destroy();
        }
    
        // Vẽ biểu đồ histogram
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: 11 }, (_, i) => i), // Nhãn trục x từ 0 đến 10
                datasets: [{
                    label: 'Tần suất',
                    data: scoreFrequency,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Màu nền của cột
                    borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tần suất'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Điểm số trung bình'
                        }
                    }
                }
            }
        });
    }
                        
    // Xuất danh sách thành tệp Excel
    function exportExcel() {
        const table = document.getElementById("statistics");
        const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" });
        XLSX.writeFile(wb, "statistics.xlsx");
    }
});
