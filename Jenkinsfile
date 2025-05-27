pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22.15.1'
    }
    environment {
       MONGO_URI = credentials('MONGO_URI') 
    }

    stages {
        stage('Checking Node & NPM in Backend and starting node') {
            steps {
                dir('backend') {
                    echo "Checking Node and NPM versions in backend..."
                    sh 'node -v'
                    sh 'npm -v'
                    sh ' node server.js &'
                }
            }
        }

        stage('Checking Node & NPM in Frontend and starting npm') {
            steps {
                dir('frontend') {
                    echo "Checking Node and NPM versions in frontend..."
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm start &'
                }
            }
        }
    }
}




            
