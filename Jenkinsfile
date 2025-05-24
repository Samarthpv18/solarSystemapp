pipeline {
    agent any

    stages {
        stage('Check Node & NPM in Frontend') {
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


            
