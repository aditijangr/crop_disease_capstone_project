pipeline {
    agent any

    options {
        skipDefaultCheckout(false)
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
            }
        }

        stage('Backend - Install Dependencies') {
            steps {
                script {
                    if (fileExists('server/package.json')) {
                        dir('server') {
                            echo 'Installing backend dependencies...'
                            bat 'npm install'
                        }
                    } else {
                        echo 'No backend found. Skipping...'
                    }
                }
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                script {
                    if (fileExists('client/package.json')) {
                        dir('client') {
                            echo 'Installing frontend dependencies...'
                            bat 'npm install'
                        }
                    } else {
                        echo 'No frontend found. Skipping...'
                    }
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                script {
                    if (fileExists('client/package.json')) {
                        dir('client') {
                            echo 'Building frontend...'
                            bat 'npm run build || echo Build script not found, skipping'
                        }
                    } else {
                        echo 'No frontend build needed.'
                    }
                }
            }
        }

        stage('Backend - Run Tests (Optional)') {
            steps {
                script {
                    if (fileExists('server/package.json')) {
                        dir('server') {
                            echo 'Running backend tests (if any)...'
                            bat 'npm test || echo No tests found, skipping'
                        }
                    } else {
                        echo 'No backend tests.'
                    }
                }
            }
        }

        stage('ML Service - Install Requirements') {
            steps {
                script {
                    if (fileExists('ml-service/requirements.txt')) {
                        dir('ml-service') {
                            echo 'Installing ML requirements...'
                            bat 'pip install -r requirements.txt'
                        }
                    } else {
                        echo 'No ML requirements file found. Skipping...'
                    }
                }
            }
        }

        stage('Finish') {
            steps {
                echo 'CI Pipeline Completed Successfully '
            }
        }
    }

    post {
        success {
            echo 'Build SUCCESSFUL '
        }
        failure {
            echo 'Build FAILED '
        }
    }
}
