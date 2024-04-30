pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "192.168.33.10:8083"
    }
    stages {
        stage('Building and pushing Docker image') {
            steps {
                script {
                    docker.build("appPi:6.0")
                    docker.withRegistry("http://${registry}", registryCredentials) {
                        docker.image("appPi:6.0").push()
                    }
                }
            }
        }
        stage('Run application') {
            steps {
                script {
                    docker.withRegistry("http://${registry}", registryCredentials) {
                        sh("docker pull ${registry}/appPi:6.0")
                        sh("docker-compose up -d")
                    }
                }
            }
        }
    }
}
