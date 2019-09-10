@Library("sharedLibraries")

def parent = "red"
def project = "swerve-ui"

node("jenkins-agent-images") {

	stage("clone repository") {
		deleteDir()
		checkout(scm)
	}

	def BRANCH_NAME = getBranchName()

	parent = "${parent}${BRANCH_NAME != "master" ? '-branches' : ''}"

	def dockerBuildOnly = BRANCH_NAME == ""

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

            // deployKubernetes(
            //     parent: "${parent}",
            //     project: "${project}",
            //     imageTag: "${imageTag}",
            //     namespace: "red-prd",
            //     env: "prd"
            // )

			// sendReleaseMail(
			// 		project: "${project}",
			// 		imageTag: "${imageTag}",
			// 		mailto: "jenkins-red@spring-media.de",
			// 		env: "PRODUCTION"
			// )

		}
	}
}