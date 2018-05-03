pipeline {
  agent {
    dockerfile {
      filename 'jseTicker'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
}