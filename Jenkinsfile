pipeline {
    agent any
    tools {
        nodejs 'NodeJS-22.15.1'
    }
    stages {
        stage('Check is not successful Node  & NPM in Frontend') {
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


            
