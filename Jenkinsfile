pipeline {
    agent any
    tools {
        nodejs 'NodeJS-22.15.1'
    }
    stages {
        stage('Checking Node  & NPM in Backend') {
            steps {
                dir('backend') {
                    echo "Checking Node and NPM versions in backend..."
                    sh 'node -v'
                    sh 'npm -v'
        stage('checking node and npm version in Frontend') {
            steps {
                dir('frontend') {
                    echo "Checking Node and NPM versions in frontend..."
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
    }
}


            
