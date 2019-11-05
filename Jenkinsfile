@Library("sharedLibraries")

def parent = "red"
def project = "swerve"

node("jenkins-agent-images") {

	stage("clone repository") {
		deleteDir()
		checkout(scm)
	}

	def BRANCH_NAME = getBranchName()

	parent = "${parent}${BRANCH_NAME != "master" ? '-branches' : ''}"

	def dockerBuildOnly = BRANCH_NAME == ""
	def imageTagStg
	def imageTagPrd

	if (BRANCH_NAME == "master") {
		imageTagPrd = buildContainer(
				parent: "${parent}",
				project: "${project}",
				branch: "${BRANCH_NAME}",
				nodeEnv: "production",
				dockerBuildOnly: dockerBuildOnly
		)
	}

	imageTagStg = buildContainer(
			parent: "${parent}",
			project: "${project}",
			branch: "${BRANCH_NAME}",
			nodeEnv: "staging"
			dockerBuildOnly: dockerBuildOnly
	)

	if (!dockerBuildOnly) {
		if (BRANCH_NAME == "master") {
			deployKubernetesEKS(
				parent: "${parent}",
				project: "${project}",
				imageTag: "${imageTagPrd}",
				k8sCluster: "preview-red-springtools-de",
				namespace: "preview-prd",
				releaseName: "preview",
				env: "prd"
			)

			sendReleaseMail(
				project: "${project}",
				imageTag: "${imageTagPrd}",
				mailto: "jenkins-red@spring-media.de",
				env: "PRODUCTION"
			)
		}

		deployKubernetesEKS(
			parent: "${parent}",
			project: "${project}",
			imageTag: "${imageTagStg}",
			k8sCluster: "preview-red-springtools-de",
			namespace: "preview-stg",
			releaseName: "preview",
			env: "stg"
		)
	}
}

def buildContainer(Map pipelineParams) {
	def registry = "spring-docker.jfrog.io"
	def credentialIdArtifactory = "artifactory-user"

	def project = "${pipelineParams.project}"
	def parent = "${pipelineParams.parent}"
	def nodeEnv = "${pipelineParams.nodeEnv}"

	def dockerBuildOnly = pipelineParams.dockerBuildOnly ?: false
	def dockerTag

	try {
		container("docker") {

			stage("build docker image") {
				withCredentials([
					usernamePassword(
						credentialsId: "${credentialIdArtifactory}",
						usernameVariable: "ARTIFACTORY_USERNAME",
						passwordVariable: "ARTIFACTORY_PASSWORD"
					)
				]) {
					sh "docker login -u $ARTIFACTORY_USERNAME -p '$ARTIFACTORY_PASSWORD' https://${registry}"

					if (dockerBuildOnly) {
						sh "make build PROJECT=${project} PARENT=${parent} NODE_ENV=${nodeEnv}"
					} else {
						sh "make release PROJECT=${project} PARENT=${parent} NODE_ENV=${nodeEnv}"
					}

					dockerTag = sh(
						returnStdout: true,
						script: "make gettag"
					).trim()

                    sh "docker rmi spring-docker.jfrog.io/${parent}/${project}:${dockerTag} spring-docker.jfrog.io/${parent}/${project}:latest"
				}
			}
		}
	} catch (e) {
		emailext (
			mimeType: "text/html",
			subject: "Docker container build has failed",
			body: """
			<p> &#9760; Something went wrong</p>
			<p><b>Here you find the result of the Jenkins build:</b> "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>
			""",
			recipientProviders: [[$class: "DevelopersRecipientProvider"]]
		)
		throw e
	}

}