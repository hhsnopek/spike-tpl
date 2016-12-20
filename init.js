let process = require('process')
let execSync = require('child_process').execSync
let projectName

exports.before = util => {
  // default project name
  targetPath = path = util.target.path.split('/')
  projectName = targetPath[targetPath.length - 1]
}

exports.configure = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of your project?',
    default: () => { return projectName }
  }, {
    type: 'input',
    name: 'description',
    message: 'Describe your project'
  }, {
    type: 'input',
    name: 'contactName',
    message: 'What is your name?',
    default: () => {
      return execSync('git config --get user.name').toString().trim()
    }
  }, {
    type: 'input',
    name: 'contactEmail',
    message: 'What is your email?',
    default: () => {
      return execSync('git config --get user.email').toString().trim()
    }
  }, {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your github username?',
    default: () => { return execSync('npm whoami').toString().trim() }
  }, {
    type: 'list',
    name: 'org',
    message: 'Where does this project live on Github?',
    choices: [
      'Your username',
      'An organization'
   ]
  }, {
    type: 'input',
    name: 'orgName',
    message: 'What is the organization\'s name on Github',
    when: (config) => { return config.org.includes('organization') }
  }, {
    type: 'list',
    name: 'lConfig',
    message: 'Choose a label config for Github',
    choices: () => {
      let choices = (execSync('ash github:labels list')).toString().split('\n')
      return choices.filter(String)
    }
  }
]

exports.after = (util, config) => {
  var org
  var signed
  if (config.org === 'Your username') {
    org = config.githubUsername
    config.orgName = config.githubUsername
  } else {
    org = config.orgName
  }

  // create repo on Github
  console.log('Creating Github repository')
  if (!config.org) {
    execSync(`ash github:repo new --name ${config.name} --disable-wiki`)
  } else {
    execSync(`ash github:repo new ${org}/${config.name} --private --disable-wiki`)
  }

  execSync('git init', { cwd: util.target.path })
  execSync(`git remote add origin git@github.com:${org}/${config.name}.git`, {
    cwd: util.target.path
  })

  // install npm deps
  console.log('Installing Node Modules')
  execSync(`npm install`, { cwd: util.target.path })

  // check for signed in .gitconfig
  if (Boolean(execSync('git config --get commit.gpgsign').toString())) {
    signed = '-S '
  }
  execSync(`git add -A && git commit -a --no-verify ${signed}-m 'initial commit'`, {
    cwd: util.target.path
  })

  console.log('Setting up Github repository')
  // push to Github
  execSync('git push origin master && git checkout -b develop && git push -u origin develop', {
    cwd: util.target.path
  })

  // update labels on Github
  execSync(`ash github:labels ${org}/${config.name} ${config.lConfig}`)
}
