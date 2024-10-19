AI Course Creator

This AI-powered application generates educational courses based on user inputs, allowing users to create customized learning experiences. The app can generate course structures, lessons, quizzes, and even suggest multimedia resources to enhance the learning experience. Using Gemini’s API, this app can generate responses in equivalalance to Gemini’s current capabilities.


Table of Contents

	1.	Introduction
	2.	Features
	3.	Installation
	4.	Usage
	5.	Configuration
	6.	Examples
	7.	Technologies Used
	8.	Limitations
	9.	Contributing
	10.	Authors
	11.	License
	12.	Contact

Introduction

Course Forge allows users to generate educational content by taking in prompts providing topics, desired length, complexity level, and other parameters. This tool uses Gemini’s API to craft course outlines, detailed lesson plans, quizzes, and suggested resources, making it ideal for teachers, instructional designers, and learners.

Features
Custom Course Generation: Create courses based on specific topics, learning objectives, and target audience.
Adaptive Content: Generates courses with varying levels of complexity depending on prompt
Link Embeds: Generate links to external resources that follow with the course content, and are relevant to the prompt. 
Chat window: There will be a singular chat window where you type in prompts and get customized courses
Multiple Courses: From one chat window, every new course requested will generate a new tab with only that course for easy access.
Limitless Courses: In the courses tab it can be easy to find and access all previously requested courses, as well as the associated prompts
Export Options: Export generated content in different formats (PDF, Word, etc.).

Installation

	1.	Clone the repository:



	2.	Navigate to the project directory:

cd ai-course-creator


	3.	Install dependencies:

pip install -r requirements.txt


	4.	(Optional) Set up virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`



Usage

	1.	Start the application:

python app.py


	2.	Provide the course details (topic, length, complexity level, etc.) via the command line interface or web interface.
	3.	The AI will generate a course structure, and you can review or edit the content.
	4.	Export the course to your preferred format.

Configuration

The app’s configuration can be modified in the config.yaml file:

	•	API Keys: Set up API keys for AI models and other services.
	•	Course Settings: Adjust the default settings for course length, number of modules, and difficulty level.
	•	Export Settings: Define export format preferences.

Examples

Example 1: Generating a Course on Machine Learning

	1.	Topic: Machine Learning
	2.	Length: 4 weeks
	3.	Complexity Level: Intermediate

Output:

	•	Week 1: Introduction to Machine Learning
	•	Week 2: Supervised Learning Techniques
	•	Week 3: Unsupervised Learning and Clustering
	•	Week 4: Advanced Topics and Model Deployment
	•	Quizzes and resources for each week

Example 2: Short Course on Python Programming

	1.	Topic: Python Programming
	2.	Length: 3 days
	3.	Complexity Level: Beginner

Output:

	•	Day 1: Introduction to Python
	•	Day 2: Data Structures and Functions
	•	Day 3: Basic File Handling and Libraries

Technologies Used

	•	Programming Language: Python
	•	AI Frameworks: OpenAI GPT, TensorFlow, or PyTorch (depending on implementation)
	•	Web Framework (Optional): Flask or Django for web-based interface
	•	Frontend (Optional): React.js or HTML/CSS for frontend interface
	•	File Export Libraries: ReportLab for PDF generation, Python-docx for Word export

Limitations

	•	The quality of the course depends on the input provided; vague or overly broad inputs may lead to generic content.
	•	May require manual adjustments to ensure educational content meets specific standards.
	•	Quiz generation is limited to basic question types.

Contributing

We welcome contributions to the project! Please follow these steps:

	1.	Fork the repository.
	2.	Create a new branch for your feature or bug fix.
	3.	Submit a pull request, and include a detailed description of your changes.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Contact

For questions or support, please contact courseforgegen@ gmail.com.

This layout provides a comprehensive overview of the application while being easy to navigate for users and contributors. Adjust sections based on the specific needs and features of your project.
