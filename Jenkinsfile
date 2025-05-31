pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22.15.1'
    }

    environment {
        MONGO_URI = credentials('MONGO_URI')
    }

    stages {
        stage('Check Node & NPM in Backend') {
            steps {
                dir('backend') {
                    echo "Checking Node and NPM versions in backend..."
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm install'
                }
            }
        }

        stage('Check Node & NPM in Frontend') {
            steps {
                dir('frontend') {
                    echo "Checking Node and NPM versions in frontend..."
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker image for Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t samarthpv18/backend:$GIT_COMMIT .'
                    sh 'docker images'
                }
            }
        }

        stage('Push Backend Docker image to DockerHub') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub-creds', url: 'https://index.docker.io/v1/') {
                    sh 'docker push samarthpv18/backend:$GIT_COMMIT'
                }
            }
        }

        stage('Build Docker image for Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t samarthpv18/frontend:$GIT_COMMIT .'
                    sh 'docker images'
                }
            }
        }

        stage('Push Frontend Docker image to DockerHub') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub-creds', url: 'https://index.docker.io/v1/') {
                    sh 'docker push samarthpv18/frontend:$GIT_COMMIT'
                }
            }
        }

        stage('Deploy to AWS EC2') {
            when {
                branch 'feature/*'
            }
            steps {
                script {
                    sshagent(['AWS-ec2-ssh']) {

                        // Deploy Backend
                        sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@ec2-52-87-162-94.compute-1.amazonaws.com << 'EOF'
                        if sudo docker ps -a | grep -q solar-system-backend; then
                            echo "Container solar-system-backend found. Removing..."
                            sudo docker rm -f solar-system-backend
                        fi
                        sudo docker run -d --name solar-system-backend --network solar-system -e MONGO_URI='$MONGO_URI' -p 3000:3000 samarthpv18/backend:$GIT_COMMIT
EOF
                        '''

                        // Deploy Frontend
                        sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@ec2-52-87-162-94.compute-1.amazonaws.com << 'EOF'
                        if sudo docker ps -a | grep -q solar-system-frontend; then
                            echo "Container solar-system-frontend found. Removing..."
                            sudo docker rm -f solar-system-frontend
                        fi
                        sudo docker run -d --name solar-system-frontend --network solar-system -p 5000:5000 samarthpv18/frontend:$GIT_COMMIT
EOF
                        '''
                    }
                }
            }
        }
    }
}
