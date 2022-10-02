pipeline {
  agent any
  stages {
    stage('Git Pull') {
      steps {
        git(credentialsId: 'e39944bd-4ff3-4755-a758-2b23ac136fc6', branch: 'main', url: "git@github.com:Fendy5/${env.ItemName}.git")
      }
    }

    stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'NodeJS 14.17.5', configId: '15077958-c5fc-4bdc-b6ed-803c700399b2') {
          sh 'cnpm install'
          sh 'cnpm run build'
        }

      }
    }

    stage('Deploy') {
      steps {
        sh 'rm -rf /www/wwwroot/${ItemName}.fendy5.cn/dist'
        sh 'mv ./dist /www/wwwroot/${ItemName}.fendy5.cn'
      }
    }

  }
  environment {
    ItemName = 'todo'
  }
  options {
    skipDefaultCheckout(true)
  }
}
