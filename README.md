# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

#========================= DOCKER ==================================#
3-Tier Application with Docker (React + Django + PostgreSQL/MySQL)
This project is a scalable 3-tier web application setup using React.js (frontend), Django REST Framework (backend), and PostgreSQL or MySQL (database), managed entirely with Docker and Docker Compose.

📂 Project Structure

my_project/
├── backend/ # Django project
│ ├── Dockerfile
│ ├── requirements.txt
├── frontend/ # React app
│ ├── Dockerfile
│ ├── package.json
├── nginx/ # (Optional) NGINX for production
├── .env # Environment variables
└── docker-compose.yml # Orchestration
🔧 Requirements
Docker

Docker Compose

🛠️ Getting Started

1. Clone the Repository

git clone https://github.com/your-repo/your-project.git
cd your-project 2. Add Environment Variables
Create a .env file:

DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=mypass 3. Build and Start the Containers

        docker-compose up --build
        This command will:

        Start the PostgreSQL or MySQL database

Launch the Django backend on http://localhost:8000

Launch the React frontend on http://localhost:3000

⚙️ Database Migrations
Once the backend is running, run the following to apply migrations:
docker exec -it django_backend python manage.py migrate
(Optional) Create a superuser:
docker exec -it django_backend python manage.py createsuperuser
🔁 Useful Commands

        Task	      Command
        Start app	docker-compose up
        Stop app	docker-compose down
        Rebuild images	docker-compose up --build
        Run Django shell	docker exec -it django_backend python manage.py shell
        View logs	docker-compose logs -f
        Enter backend container shell	docker exec -it django_backend bash

🌍 Access the App
Service URL
Frontend http://localhost:3000
Backend http://localhost:8000
Admin http://localhost:8000/admin

🧪 API Testing
To call backend APIs from React, use:
axios.get("http://localhost:8000/api/...")

🔐 Enable CORS (in Django)
In settings.py:
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOW_ALL_ORIGINS = True
🗄️ Switching to MySQL (Optional)
To use MySQL:

Replace postgres service in docker-compose.yml with:

image: mysql:8
environment:
MYSQL_DATABASE: mydb
MYSQL_USER: myuser
MYSQL_PASSWORD: mypass
MYSQL_ROOT_PASSWORD: rootpass
Update DATABASES in backend/settings.py:
'ENGINE': 'django.db.backends.mysql',
Install MySQL client:
pip install mysqlclient

📦 Build for Production (Optional)
Gunicorn + NGINX for production

HTTPS support via Let's Encrypt

React production build with npm run build
