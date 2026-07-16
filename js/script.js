// ========== CHART - GLOBAL REFERENCE (MOVED TO TOP) ==========
let chartInstance = null;

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference
function getSavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', theme);
    // Only update chart if it exists
    if (chartInstance) {
        updateChartColors();
    }
}

// Initialize theme
setTheme(getSavedTheme());

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
});

function getChartColors() {
    const isDark = document.body.classList.contains('dark');
    return {
        textColor: isDark ? '#f1f5f9' : '#0f172a',
        gridColor: isDark ? '#334155' : '#e2e8f0',
        borderColor: isDark ? '#475569' : '#cbd5e1',
    };
}

function updateChartColors() {
    if (!chartInstance) return;
    const colors = getChartColors();
    
    chartInstance.options.scales.y.grid.color = colors.gridColor;
    chartInstance.options.scales.y.ticks.color = colors.textColor;
    chartInstance.options.scales.x.ticks.color = colors.textColor;
    chartInstance.update();
}

function initChart() {
    const ctx = document.getElementById('studentChart').getContext('2d');
    const colors = getChartColors();

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Computer Science', 'Cyber Security', 'Software Engineering', 'IT', 'Data Science'],
            datasets: [{
                label: 'Students Enrolled',
                data: [120, 95, 80, 65, 55],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    '#2563eb',
                    '#22c55e',
                    '#f97316',
                    '#ec4899',
                    '#8b5cf6'
                ],
                borderWidth: 2,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor,
                    },
                    ticks: {
                        color: colors.textColor,
                        font: { size: 12 }
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: colors.textColor,
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 0,
                    }
                }
            }
        }
    });
}

// Initialize chart on load
document.addEventListener('DOMContentLoaded', initChart);

// ========== CHART FILTER ==========
document.getElementById('chartFilter')?.addEventListener('change', function() {
    if (!chartInstance) return;
    
    const data = {
        year: [120, 95, 80, 65, 55],
        month: [40, 35, 28, 20, 15],
        week: [12, 10, 8, 6, 4]
    };
    
    chartInstance.data.datasets[0].data = data[this.value] || data.year;
    chartInstance.update();
});

// ========== SIDEBAR TOGGLE (Mobile) ==========
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const overlay = document.getElementById('overlay');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-xmark');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerIcon.classList.remove('fa-xmark');
    hamburgerIcon.classList.add('fa-bars');
}

hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// Close sidebar on window resize (if becoming desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// ========== PROFILE DROPDOWN ==========
const profileToggle = document.getElementById('profileToggle');
const dropdown = document.getElementById('dropdown');

profileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
    profileToggle.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileToggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
        profileToggle.classList.remove('active');
    }
});

// ========== LIVE SEARCH ==========
const searchInput = document.getElementById('search');
const searchClear = document.getElementById('searchClear');
const tableRows = document.querySelectorAll('#studentTableBody tr');

function filterTable() {
    const query = searchInput.value.toLowerCase().trim();

    tableRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
    
    // Show/hide clear button
    if (searchInput.value.length > 0) {
        searchClear.classList.add('visible');
    } else {
        searchClear.classList.remove('visible');
    }
}

searchInput.addEventListener('input', filterTable);

// Clear search on Escape key
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        filterTable();
        searchInput.blur();
    }
});

// Clear search with button
searchClear.addEventListener('click', () => {
    searchInput.value = '';
    filterTable();
    searchInput.focus();
});

// ========== SIDEBAR NAVIGATION ==========
document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all
        document.querySelectorAll('.sidebar nav ul li').forEach(li => {
            li.classList.remove('active');
        });
        // Add active to parent
        this.closest('li').classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// ========== SIDEBAR FOOTER BUTTONS ==========
document.getElementById('helpBtn')?.addEventListener('click', () => {
    alert('Help section coming soon!');
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
    }
});

document.getElementById('dropdownLogout')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
    }
});

// ========== ADD STUDENT BUTTON ==========
document.getElementById('addStudentBtn')?.addEventListener('click', () => {
    alert('Add Student form would open here!');
});

// ========== DYNAMIC FOOTER YEAR ==========
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ========== KEYBOARD NAVIGATION FOR TABLE ROWS ==========
document.querySelectorAll('#studentTableBody tr').forEach(row => {
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            alert(`Viewing student: ${row.querySelector('.user-cell')?.textContent?.trim() || 'Student'}`);
        }
    });
});

// ========== CONSOLE WELCOME ==========
console.log('%c📚 EduTrack Dashboard', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cDashboard loaded successfully!', 'font-size: 14px; color: #22c55e;');