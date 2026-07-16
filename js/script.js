// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
});

// ========== SIDEBAR TOGGLE (Mobile) ==========
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const overlay = document.getElementById('overlay');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', openSidebar);
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
const chevronIcon = document.getElementById('chevronIcon');

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
const tableRows = document.querySelectorAll('tbody tr');

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase().trim();

    tableRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
});

// ========== CHART.JS ==========
const ctx = document.getElementById('studentChart').getContext('2d');

const isDark = document.body.classList.contains('dark');
const textColor = isDark ? '#f1f5f9' : '#0f172a';
const gridColor = isDark ? '#334155' : '#e2e8f0';

new Chart(ctx, {
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
                    color: gridColor,
                },
                ticks: {
                    color: textColor,
                    font: { size: 12 }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: textColor,
                    font: { size: 11 },
                    maxRotation: 45,
                    minRotation: 0,
                }
            }
        }
    }
});

// Update chart colors when theme changes (optional)
const observer = new MutationObserver(() => {
    const isDarkNow = document.body.classList.contains('dark');
    const newTextColor = isDarkNow ? '#f1f5f9' : '#0f172a';
    const newGridColor = isDarkNow ? '#334155' : '#e2e8f0';
    
    // You'd need to update chart instance here if you want dynamic theme switching
    // For simplicity, refresh page or re-run chart init on theme change
});

observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });