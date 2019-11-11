@Library("sharedLibraries")

def parent = "red"
def project = "swerve-ui"

podTemplate(name: 'jenkins-agent-swerve-ui',
		podRetention: never(),
		yamlMergeStrategy: merge(),
		inheritFrom: 'jenkins-agent-nodejs-10 jenkins-agent-docker jenkins-agent-kubetools') {

	node(POD_LABEL) {

		stage("clone repository") {
			deleteDir()
			checkout(scm)
		}

		def BRANCH_NAME = getBranchName()

		parent = "${parent}${BRANCH_NAME != "master" ? '-branches' : ''}"

		def dockerBuildOnly = BRANCH_NAME == "" ? true : false

		container("nodejs") {
			stage("build") {

				initNodeJS()

				sh """
					yarn add @vue/cli
					yarn install
				"""

				if (BRANCH_NAME == "master") {
					sh "vue-cli-service build --mode production"
				}  else {
					sh "vue-cli-service build --mode staging"
				}
			}
		}

		// build docker image
		def imageTag = buildDockerContainer2(
				parent: "${parent}",
				project: "${project}",
				branch: "${BRANCH_NAME}",
				dockerBuildOnly: dockerBuildOnly
		)

		if (!dockerBuildOnly) {
			if (BRANCH_NAME == "master") {

				deployKubernetes(
						parent: "${parent}",
						project: "${project}",
						imageTag: "${imageTag}",
						namespace: "red-stg",
						env: "stg"
				)

			}
		}
	}
}
