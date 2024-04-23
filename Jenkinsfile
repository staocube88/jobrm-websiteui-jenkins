#!/usr/bin/groovy

timestamps { 
  podTemplate(
    label: 'jenkins-pipeline', 
    inheritFrom: 'default',
    containers: [
      containerTemplate(name: 'docker', image: 'docker:18.06', command: 'cat', ttyEnabled: true),
      containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:v2.10.0', command: 'cat', ttyEnabled: true),
      containerTemplate(name: 'chrome', image: 'garunski/alpine-chrome:latest', command: 'cat', ttyEnabled: true),
      containerTemplate(name: 'selenium', image: 'selenium/standalone-chrome:3.14', command: '', ttyEnabled: false, ports: [portMapping(containerPort: 4444)]),
    ]
  ) {
    node ('jenkins-pipeline') {
      stage('Get latest version of code') {
        checkout scm
      }

      container ('chrome') {
        stage('Install Packages') {
          sh 'npm install --quiet'
        }

        stage('Code Formatting checks') {
          sh 'npm run lint'
        }

        stage('Build') {
          sh 'npm run build'
        }

        stage('Run Unit Tests') {
          sh 'npm run test-ci'
          junit 'test-results/**/*.xml'
        }
      } //end container chrome

      stage('Run Code Coverage') {
        cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: '**/cobertura.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
      }

      stage('Deploy Local') {
        println 'Building docker image'
        container('docker') { 
          sh "echo \$'FROM nginx:stable-alpine \nCOPY ./dist /usr/share/nginx/html \n' > Dockerfile"
          sh 'docker build -t jobrm:latest .' 
        }

        println 'Deploying The website to the local cluster'
        container('helm') {
          sh 'helm upgrade --install --force jobrm-static ./charts/jobrm-static --set image.repository=jobrm --set image.tag=latest --set service.type=NodePort --set service.nodePort=31001' 
        }
      } //end deploy local

      stage('Run Integration Tests') {
        container ('chrome') {
          sh 'npm run e2e-ci'
        }
        junit 'e2e/test-results/**/*.xml'
      }

      stage('Deploy Production') {
      }

      stage('Run Post Deployment Tests') {
      }
    } // end node
  } // end podTemplate
} // end timestamps
