ssh -i "voice-to-voice-instance.pem" ec2-user@ec2-35-178-77-44.eu-west-2.compute.amazonaws.com

# Install node.js on aws
# https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
node -e "console.log('Running Node.js ' + process.version)"

# Install git
sudo yum update -y
sudo yum install git -y
git —v