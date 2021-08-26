pipeline {
  agent any
  stages {
    stage('Git Pull') {
      steps {
        git(credentialsId: 'github', branch: 'main', url: "https://github.com.cnpmjs.org/Fendy5/${env.ItemName}.git")
      }
    }

    stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'NodeJS 14.4.0', configId: 'ed527ccd-5183-4936-8efe-80a60132ee3b') {
          sh 'npm uninstall yarn'
          sh '''npm install -g yarn --registry=https://registry.npm.taobao.org

yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g'''
          sh 'yarn install'
          sh 'yarn build'
        }

      }
    }

    stage('Deploy') {
      steps {
        sh "rm -rf /www/wwwroot/${ItemName}.fendy5.cn/dist"
        sh "mv ./dist /www/wwwroot/${ItemName}.fendy5.cn"
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