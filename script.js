const talks = [
    {
        "title": "The Future of JavaScript",
        "speakers": ["Jane Doe"],
        "category": ["JavaScript", "Web Development"],
        "description": "A deep dive into the next features of JavaScript and what they mean for web developers."
    },
    {
        "title": "Building Scalable APIs with Node.js",
        "speakers": ["John Smith"],
        "category": ["Node.js", "APIs", "Backend"],
        "description": "Learn how to design and build APIs that can handle millions of requests."
    },
    {
        "title": "CSS Grid and Flexbox: The Ultimate Showdown",
        "speakers": ["Emily White", "Chris Green"],
        "category": ["CSS", "Frontend"],
        "description": "A practical comparison of CSS Grid and Flexbox, and when to use each."
    },
    {
        "title": "Introduction to Machine Learning with Python",
        "speakers": ["David Black"],
        "category": ["Machine Learning", "Python", "Data Science"],
        "description": "Get started with machine learning using Python's most popular libraries."
    },
    {
        "title": "The Rise of Serverless Architectures",
        "speakers": ["Sarah Blue"],
        "category": ["Serverless", "Cloud", "Architecture"],
        "description": "Explore the benefits and challenges of serverless and how to build your first serverless application."
    },
    {
        "title": "Cybersecurity in the Modern Web",
        "speakers": ["Michael Brown", "Olivia Grey"],
        "category": ["Cybersecurity", "Web Development"],
        "description": "An overview of the most common security threats on the web and how to protect your applications."
    }
];

const scheduleContainer = document.getElementById('schedule');
const searchInput = document.getElementById('search');

function generateSchedule(filter = '') {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const filteredTalks = talks.filter(talk =>
        talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
    );

    filteredTalks.forEach((talk, index) => {
        if (index === 3) {
            const lunchTimeStart = new Date(currentTime.getTime());
            const lunchTimeEnd = new Date(currentTime.getTime() + 60 * 60 * 1000);
            const lunchItem = document.createElement('li');
            lunchItem.className = 'schedule-item lunch';
            lunchItem.innerHTML = `
                <div class="time">${formatTime(lunchTimeStart)} - ${formatTime(lunchTimeEnd)}</div>
                <div class="details"><h3>Lunch Break</h3></div>
            `;
            scheduleContainer.appendChild(lunchItem);
            currentTime.setTime(lunchTimeEnd.getTime());
        }

        const startTime = new Date(currentTime.getTime());
        const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

        const listItem = document.createElement('li');
        listItem.className = 'schedule-item';
        listItem.innerHTML = `
            <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
            <div class="details">
                <h3>${talk.title}</h3>
                <div class="speakers">${talk.speakers.join(', ')}</div>
                <div class="description">${talk.description}</div>
                <div>${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}</div>
            </div>
        `;
        scheduleContainer.appendChild(listItem);
        currentTime.setTime(endTime.getTime() + 10 * 60 * 1000);
    });
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

searchInput.addEventListener('input', (e) => {
    generateSchedule(e.target.value);
});

generateSchedule();
