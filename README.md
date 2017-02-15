# UngIT

**How to setup project**

1. Clone/Download project
2. Open terminal in project folder and type: `npm install`

***

**How to run server**

1. Navigate to project folder in terminal
2. (To be done when this functionallity is implemented in the package.json file) Run `node run build:production` to build the production React bundle. 
3. Be sure to activate your virtual environment at this point. If not, all dependencies will be installed at an OS-level, which is not recommended. With virtualenvwrapper this is achevied with `workon <ENV_NAME>`. If the virtual environment is not activated, the Python executable will be symlinked to the OS-level Python, and not the one isolated in the virtual environment. 
4. To start django-server type: `python manage.py runserver`
5. Navigate to "localhost:8080" in a browser

***

**Development**

*NB: All the below steps assumes the virtual environment to be activated. Why? See step 2 above*

1. Navigate to project folder in terminal
2. Run (only required the first time or in case of the addition of new requirements): `pip install -r py-requirements.txt`
3. Run: `node server.js`
4. Open a second terminal window and navigate to project folder
5. If any migrations need to be applied, do so now. This is done acheived with `python manage.py migrate`
6. Run: `python manage.py runserver`
7. Navigate to "localhost:8080" in a browser

***

**Development without Django**

1. Run: `npm run server`
2. Navigate to "http://localhost:8080/public/" in a browser