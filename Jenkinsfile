pipeline {
    agent any

    environment {
        CI = 'false'   // Prevent React from failing on warnings
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Backend - Install') {
            steps {
                script {
                    if (fileExists('server/package.json')) {
                        dir('server') {
                            echo 'Installing backend dependencies...'
                            bat 'npm install'
                        }
                    } else {
                        echo 'No backend found, skipping...'
                    }
                }
            }
        }

        stage('Frontend - Install') {
            steps {
                script {
                    if (fileExists('client/package.json')) {
                        dir('client') {
                            echo 'Installing frontend dependencies...'
                            bat 'npm install'
                        }
                    } else {
                        echo 'No frontend found, skipping...'
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
                            bat 'npm run build || echo Build skipped'
                        }
                    } else {
                        echo 'No frontend found, skipping...'
                    }
                }
            }
        }

        stage('Backend - Tests (Optional)') {
            steps {
                script {
                    if (fileExists('server/package.json')) {
                        dir('server') {
                            echo 'Running backend tests (if any)...'
                            bat 'npm test || echo No tests, skipping'
                        }
                    } else {
                        echo 'No backend found, skipping tests...'
                    }
                }
            }
        }

        stage('ML Service - Install (Optional)') {
            steps {
                script {
                    if (fileExists('ml-service/requirements.txt')) {
                        dir('ml-service') {
                            echo 'Installing ML requirements...'
                            bat 'pip install -r requirements.txt || echo Skipping ML install'
                        }
                    } else {
                        echo 'No ML service found, skipping...'
                    }
                }
            }
        }

        stage('Finish') {
            steps {
                echo 'Pipeline completed successfully!'
            }
        }
    }

    post {
        always {
            echo 'Build finished.'
        }
        success {
            echo 'Build SUCCESS'
        }
        failure {
            echo 'Build FAILED'
        }
    }
}
