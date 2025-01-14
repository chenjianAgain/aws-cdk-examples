#!/usr/bin/env node
import autoscaling = require('@aws-cdk/aws-autoscaling');
import ec2 = require('@aws-cdk/aws-ec2');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
import cdk = require('@aws-cdk/core');

class LoadBalancerStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const vpc = new ec2.Vpc(this, 'VPC');
    
    const cfnLC = new autoscaling.CfnLaunchConfiguration(this, "Devops", {
            //imageId: 'ami-0cca8c385ef630f54',
            machineImage: new ec2.AmazonLinuxImage(),
            instanceType: 't2.micro',
            //iamInstanceProfile: 'arn:aws:iam::476985428237:instance-profile/EC2AccessCfn',
            //keyName: 'damo_api',
            //securityGroups: ['sg-03d294231c1b99316'],
            //launchConfigurationName: "HistoryRetrieverInstance"	
        });

    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      launchConfigurationName: cfnLC.ref,
      //instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      //machineImage: new ec2.AmazonLinuxImage(),
    });

//     const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
//       vpc,
//       internetFacing: true
//     });

//     const listener = lb.addListener('Listener', {
//       port: 80,
//     });

//     listener.addTargets('Target', {
//       port: 80,
//       targets: [asg]
//     });

//     listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');

//     asg.scaleOnRequestCount('AModestLoad', {
//       targetRequestsPerSecond: 1
//     });
  }
}

const app = new cdk.App();
new LoadBalancerStack(app, 'LoadBalancerStack');
app.synth();
