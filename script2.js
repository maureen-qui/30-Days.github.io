document.addEventListener("DOMContentLoaded", function() {
    // Navigation menu functionality
    const navigationLinks = document.querySelectorAll('.navigation ul li a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Function to toggle meal details
    function toggleDetails(id) {
        var details = document.getElementById(id);
        if (details.style.display === "block") {
            details.style.display = "none";
        } else {
            details.style.display = "block";
        }
    }

    // Event listeners for day circles
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const dayDetailsId = this.getAttribute('data-day');
            toggleDetails(dayDetailsId);
        });
    });

    // Function to add spacing between form groups
    function addSpacing() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.style.marginBottom = '30px';
        });
    }

    // Call the addSpacing function to add spacing between form groups
    addSpacing();

    // Random background color change functionality
    const blockHeader = document.querySelector('.block-header');
    blockHeader.addEventListener('click', function() {
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
    });

    // Sample data for demonstration
    const targetWeight = 60; // kg
    const initialWeight = 70; // kg
    const weightLossRate = 0.5; // kg per week

    // Calculate weight progress over time
    const timeToReachTarget = (initialWeight - targetWeight) / weightLossRate;
    const weeks = [];
    const weights = [];

    for (let i = 0; i <= timeToReachTarget; i++) {
        weeks.push(i);
        weights.push(initialWeight - (weightLossRate * i));
    }

    // Update Chart function
    function updateChart(projectedWeight) {
        // Get chart canvas element
        var ctx = document.getElementById('weightChart').getContext('2d');

        // Define chart data
        var data = {
            labels: weeks,
            datasets: [{
                label: 'Weight Progress',
                data: weights,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Projected Weight',
                data: [initialWeight, projectedWeight],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        };

        // Define chart options
        var options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Weeks'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Weight (kg)'
                    }
                }
            }
        };

        // Create the chart
        var weightChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    // Call the function to update the chart with the projected weight
    calculateProjectedWeight();

    // Calculate Projected Weight function
    function calculateProjectedWeight() {
        // Get initial weight and duration
        var initialWeight = document.getElementById("weight").value;
        var duration = document.getElementById("duration").value;

        // Calculate projected weight change (for example, assuming 1 kg loss per week)
        var projectedWeightChange = 1 * (duration / 4); // Assuming 4 weeks in a month

        // Calculate projected weight
        var projectedWeight = initialWeight - projectedWeightChange;

        // Display projected weight in the input field
        document.getElementById("projected-weight").value = projectedWeight;

        // Update chart with projected weight data
        updateChart(projectedWeight);
    }

    // Validate weight and height fields to accept decimal points
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiInput = document.getElementById("bmi");

    weightInput.addEventListener("input", calculateBMI);
    heightInput.addEventListener("input", calculateBMI);

    function calculateBMI() {
        // Get the values of weight and height
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Check if weight and height are valid numbers
        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            // Calculate BMI
            const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
            // Update the BMI input field with the calculated value
            bmiInput.value = bmi;
        } else {
            // If weight or height is not a valid number or height is 0, clear the BMI field
            bmiInput.value = "";
        }
    }
    
    // Feedback form functionality
    const feedbackForm = document.querySelector('.feedback-form');
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const feedback = document.getElementById('feedback').value;
        console.log('Feedback submitted:', feedback);
        // Here you can implement the functionality to send the feedback to the server
    });

    // Utility function to generate random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $(document).ready(function() {
        // Show payment modal when a recipe link is clicked
        $('h4 a').click(function(event) {
            event.preventDefault();
            $('#paymentModal').css('display', 'block');
        });

        // Close the payment modal when the user clicks on the close button
        $('.close').click(function() {
            $('#paymentModal').css('display', 'none');
        });

        // Handle payment button click
        $('#payButton').click(function() {
            // Replace this with your actual payment processing logic
            alert('Redirecting to payment gateway...');
            // Redirect the user to the payment gateway for payment processing
        });
    });
});
