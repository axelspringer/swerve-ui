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
					yarn global add @vue/cli
					yarn install
				"""

				if (BRANCH_NAME == "master") {
					sh "yarn build --mode production"
				}  else {
					sh "yarn build --mode staging"
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
				deployKubernetesEKS(
								parent: "${parent}",
								project: "${project}",
								imageTag: "${imageTag}",
								k8sCluster: "preview-red-springtools-de",
								namespace: "preview-prd",
								releaseName: "preview",
								env: "prd"
							)
			}

			deployKubernetesEKS(
							parent: "${parent}",
							project: "${project}",
							imageTag: "${imageTag}",
							k8sCluster: "preview-red-springtools-de",
							namespace: "preview-stg",
							releaseName: "preview",
							env: "stg"
						)
		}
	}
}
