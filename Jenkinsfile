pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes'
            namespace 'default'
            containerTemplate {
                        name 'docker'
                        image 'docker:18.06'
                        command 'sleep infinity'
                        ttyEnabled true
                    }
                    containerTemplate {
                        name 'helm'
                        image 'lachlanevenson/k8s-helm:v2.10.0'
                        command 'sleep infinity'
                        ttyEnabled true
                    }
                    containerTemplate {
                        name 'chrome'
                        image 'garunski/alpine-chrome:latest'
                        command 'sleep infinity'
                        ttyEnabled true
                    }
                    containerTemplate {
                        name 'selenium'
                        image 'selenium/standalone-chrome:3.14'
                        command 'chromedriver --port=4444'
                        ttyEnabled false
                        ports '4444:4444'
                    }
                }
            }
    stages {
        stage('Get latest version of code') {
            steps {
                git '(https://github.com/staocube88/jobrm-websiteui-jenkins.git)' // replace with your Git repo URL
            }
        }
        stage('Install Packages') {
            steps {
                container('chrome') {
                    sh 'npm install --quiet'
                }
            }
        }
        stage('Code Formatting checks') {
            steps {
                container('chrome') {
                    sh 'npm run lint'
                }
            }
        }
        stage('Build') {
            steps {
                container('chrome') {
                    sh 'npm run build'
                }
            }
        }
        stage('Run Unit Tests') {
            steps {
                container('chrome') {
                    sh 'npm run test-ci'
                }
                junit 'test-results/**/*.xml'
            }
        }
        stage('Run Code Coverage') {
            steps {
                cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: '**/cobertura.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
            }
        }
        stage('Deploy Local') {
            steps {
                container('docker') {
                    sh "echo 'FROM nginx:stable-alpine \nCOPY ./dist /usr/share/nginx/html \n' > Dockerfile"
                    sh 'docker build -t jobrm:latest .'
                }
                container('helm') {
                    sh 'helm upgrade --install --force jobrm-static ./charts/jobrm-static --set image.repository=jobrm --set image.tag=latest --set service.type=NodePort --set service.nodePort=31001'
                }
            }
        }
        stage('Run Integration Tests') {
            steps {
                container('chrome') {
                    sh 'npm run e2e-ci'
                }
                junit 'e2e/test-results/**/*.xml'
            }
        }
    }
}