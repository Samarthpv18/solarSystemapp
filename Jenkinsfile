pipeline {
    agent any

    stages {
        stage('Check Node & NPM in Frontend') {
            steps {
                dir('backend') {
                    echo "Checking Node and NPM versions in backend..."
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
    }
}


            
