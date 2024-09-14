document.addEventListener("DOMContentLoaded", function() {
    // Fetch the data from the API
    fetch('https://lnenem9b6b.execute-api.ap-southeast-2.amazonaws.com/prod/api/v1/lessons/')
    .then(response => response.json())
    .then(data => {
        // Select the container where courses will be inserted
        const coursesContainer = document.getElementById('courses-container');
        let coursesHtml = '';

        // Loop through each course and create HTML
        data.forEach(course => {
            coursesHtml += `
                <div class="properties pb-20">
                    <div class="properties__card">
                        <div class="properties__img overlay1">
                            <a href="#"><img src="${course.ImageURL}" alt=""></a>
                        </div>
                        <div class="properties__caption">
                            <p>${course.Category}</p>
                            <h3><a href="#">${course.Lesson}</a></h3>
                            <p>${course.Description}</p>
                            <div class="properties__footer d-flex justify-content-between align-items-center">
                                <div class="restaurant-name">
                                    <div class="difficulty">
                                        <p>Difficulty</p>
                                        ${renderStars(course.Difficulty)}<span>(${course.Difficulty})</span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="border-btn border-btn2">Find out more</a>
                        </div>
                    </div>
                </div>
            `;
        });

        // Insert the courses into the container
        coursesContainer.innerHTML = coursesHtml;
    })
    .catch(error => {
        console.error('Error fetching courses:', error);
    });

    // Function to render stars based on rating
    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0 ? `<i class="fas fa-star-half"></i>` : '';
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<i class="fas fa-star"></i>`;
        }

        starsHtml += halfStar;
        return starsHtml;
    }
});
