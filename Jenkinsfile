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
                    sh 'node server.js &'
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
        stage('building docker image for backend ') {
            steps {
                dir('backend') {
                    sh 'docker build -t samarthpv18/backend:$GIT_COMMIT .'
                    sh 'docker images'
                }   
            }
        }
        stage('pushing backend docker image to dockerhub.com') {
            steps {
               withDockerRegistry(credentialsId: 'dockerhub-creds', url: 'https://index.docker.io/v1/') {
                  sh 'docker push  samarthpv18/frontend:$GIT_COMMIT'
               }
            }
        }
        stage('building docker image for frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t samarthpv18/frontend:$GIT_COMMIT .'
                    sh 'docker images'
                }
            }
        }
        stage('pushing the frontend docker image to dockerhub.com') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub-creds', url: 'https://index.docker.io/v1/') {
                   sh 'docker push  samarthpv18/frontend:$GIT_COMMIT '
                }
            }
        }
        

    }

}

    




            
