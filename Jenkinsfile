// @Library("sharedLibraries")

// def parent = "red"
// def project = "swerve-ui"

// node("jenkins-agent-npm") {

// 	stage("clone repository") {
// 		deleteDir()
// 		checkout(scm)
// 	}

// 	buildSwerveUI()

// 	def releaseVersion

// 	stage("get release version") {
// 		releaseVersion = sh(
// 			script: """grep -e "version" package.json | awk '{print \$2}' | sed 's/[",]//g'""",
// 			returnStdout: true
// 		).trim()
// 	}

// 	// staging
// 	uploadToAkamai(
// 		privateKeyFilename: "swerveui_stg_rsa",
// 		domainNamePrefix: "cmsassetsstg",
// 		buildOutputDir: "build",
// 		targetPath: "/swerveui/${releaseVersion}/"
// 	)

// 	// production
// 	uploadToAkamai(
// 		privateKeyFilename: "swerveui_prd_rsa",
// 		domainNamePrefix: "cmsassetsprd",
// 		buildOutputDir: "build",
// 		targetPath: "/swerveui/${releaseVersion}/"
// 	)

// }