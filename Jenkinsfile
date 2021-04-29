pipeline {
  agent { label 'cc-ci-agent' }
  environment {
    GIT_TAG_NAME = gitTagName()
    S3_KEY_ID = credentials('CELLAR_CC_TOOLS_ACCESS_KEY_ID')
    S3_SECRET_KEY = credentials('CELLAR_CC_TOOLS_SECRET_ACCESS_KEY')
    BINTRAY_API_KEY = credentials('BINTRAY_CC_TOOLS_API_KEY')
    NPM_TOKEN = credentials('NPM_TOKEN')
    NEXUS_PASSWORD = credentials('NEXUS_PASSWORD')
    NUGET_API_KEY = credentials('NUGET_API_KEY')
  }
  options {
    buildDiscarder(logRotator(daysToKeepStr: '5', numToKeepStr: '10', artifactDaysToKeepStr: '5', artifactNumToKeepStr: '10'))
  }
  stages {
    stage('build') {
      steps {
        sh 'npm ci'
        sh 'node scripts/job-build.js'
      }
    }
    stage('package') {
      steps {
        sh 'node scripts/job-package.js'
      }
    }
    stage('publish') {
      when {
        not {
          environment name: 'GIT_TAG_NAME', value: ''
        }
        beforeAgent true
      }
      parallel {
        // stage('cellar') {
        //   steps {
        //     sh 'node scripts/job-publish-cellar.js'
        //   }
        // }
        stage('nexus') {
          steps {
            // sh 'node scripts/job-publish-nexus.js'
            sh 'curl -u "ci:$NEXUS_PASSWORD" --upload-file ./releases/$GIT_TAG_NAME/clever-tools-$GIT_TAG_NAME.rpm https://nexus.clever-cloud.com/repository/rpm/'
            sh 'curl -u "ci:$NEXUS_PASSWORD"  -H "Content-Type: multipart/form-data" --data-binary "@./releases/$GIT_TAG_NAME/clever-tools-$GIT_TAG_NAME.deb" "http://nexus.clever-cloud.com/repository/deb/"'
            sh 'curl -u "ci:$NEXUS_PASSWORD"  -X PUT -H "X-NuGet-ApiKey: $NUGET_API_KEY" -F "data=@./releases/$GIT_TAG_NAME/clever-tools.$GIT_TAG_NAME.nupkg" https://nexus.clever-cloud.com/repository/nuget/'

          }
        }
        // stage('bintray') {
        //   steps {
        //     sh 'node scripts/job-publish-bintray.js'
        //   }
        // }
        // stage('arch') {
        //   steps {
        //     script {
        //       sshagent (credentials: ['CI_CLEVER_CLOUD_SSH_KEY']) {
        //         sh 'node ./scripts/job-publish-arch.js'
        //       }
        //     }
        //   }
        // }
        // stage('brew') {
        //   steps {
        //     script {
        //       sshagent (credentials: ['CI_CLEVER_CLOUD_SSH_KEY']) {
        //         sh 'node ./scripts/job-publish-brew.js'
        //       }
        //     }
        //   }
        // }
        // stage('exherbo') {
        //   steps {
        //     script {
        //       sshagent (credentials: ['CI_CLEVER_CLOUD_SSH_KEY']) {
        //         sh 'node ./scripts/job-publish-exherbo.js'
        //       }
        //     }
        //   }
        // }
        // stage('npm') {
        //   steps {
        //     sh 'node ./scripts/job-publish-npm.js'
        //   }
        // }
        // stage('dockerhub') {
        //   steps {
        //     script {
        //       sshagent (credentials: ['CI_CLEVER_CLOUD_SSH_KEY']) {
        //         sh 'node ./scripts/job-publish-dockerhub.js'
        //       }
        //     }
        //   }
        // }
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'releases/**/*', fingerprint: true, onlyIfSuccessful: true
    }
  }
}

@NonCPS
String gitTagName() {
    return sh(script: 'git describe --tags --exact-match $(git rev-parse HEAD) || true', returnStdout: true)?.trim()
}
