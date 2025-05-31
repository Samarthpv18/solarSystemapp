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
        stage('building docker image for backend and list') {
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
                  sh 'docker push  samarthpv18/backend:$GIT_COMMIT'
               }
            }
        }
        stage('building docker image for frontend and list') {
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
        stage('deploy to aws') {
            when {
                branch 'feature/*'
            }
            steps {
                script {
                    sshagent(['AWS-ec2-ssh']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@ec2-52-87-162-94.compute-1.amazonaws.com
                                " if sudo docker ps -a | grep -q "solar-system-backend" ; then
                                     echo " Container found "
                                        sudo docker rm -f "solar-system-backend"
                                     echo " Container stopped and removed "
                                  fi
                                    sudo docker run -d --name solar-system-backend --network solar-system -e MONGO_URI=$MONGO_URI -p 3000:3000 samarthpv18/backend:$GIT_COMMIT   
                        
                                "
                     
                        '''
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@ec2-52-87-162-94.compute-1.amazonaws.com
                                " if sudo docker ps -a | grep -q "solar-system-frontend" ; then
                                     echo " Container found "
                                        sudo docker rm -f "solar-system-frontend"
                                     echo " Container stopped and removed "
                                  fi
                                    sudo docker run -d --name solar-system-frontend --network solar-system  -p 5000:5000 samarthpv18/frontend:$GIT_COMMIT    
                            "  
                        ''' 
                    }
                }
            }
        }
        

    }

}

    




            
