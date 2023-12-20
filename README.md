# Kube Sentry

Kubernetes Monitoring Toolkit
clone this repository
npm install

install helm
how do we install our kube sentry

# Setting up your kubernetes cluster

- Install kubectl. Run `kubectl version` to check if it has been sucessfully downloaded.

- First you need to have your own kubernetes cluster. You can run your own local kubernetes cluster either with [docker-desktop](https://www.docker.com/products/docker-desktop/) or [minikube](https://minikube.sigs.k8s.io/docs/start/)
* commands will follow managing your K8 cluster on docker-desktop 
   - To start kubernetes on docker-desktop navigate to the settings page > kubernetes and **Enable Kubernetes**
   - run `kubectl cluster-config` to make sure your kubernetes cluster is operating
  
# Set up metrics server
- [Kubernetes Metrics Server](https://github.com/kubernetes-sigs/metrics-server) is required to get additional information from your k8 cluster
- Follow instructions on the github repo to install the metrics-server.
- ** Note the `--kubelet-insecure-tls` flag to bypass the CA authenication for kubelets **
- If your metrics server is installed correctly you should be able to run `kubectl top pods` or `kubectl top nodes` to get pods and node metrics of your cluster
  
# set up prometheus-server
If you have not already, install [Helm](https://helm.sh/). Helm is a repository of published yaml files that are used to configure deployments used in kubernetes 

add the prometheus helm chart to your helm repo
`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
- you can check if the helm chart has been sucessfully added by running `helm list` in you CLI

install prometheus to your kubernetes cluster 
`helm install prometheus prometheus-community/prometheus`
- if you run `kubectl get all` you should see the deployments, configmaps, services prometheus has installed
- if you are running kubernetes on docker-desktop, you will not be able to current access the prometheus-server api that is hosted on port 9090. This is because we are running kubernetes in a containerized environment. To work around this, we will open up a **nodeport** service that will act as a middle man to set up a connection with the prometheus server with the outside world
-  `kubectl apply -f https://github.com/oslabs-beta/KubeSentry/Yamlfiles/prometheus-nodeport.yaml`
-  now you should be able to connect to the prometheus server api via `localhost:31302`

# instrument your application

# create an image of your application

# deploy your application on kubernetes

# set up the alermanager

-then you need to install the metrics server for the kubernetes cluster
-make sure that you set tls-insecure

you need to instrument your application with prometheus 
some preconfigured yaml configuration files are provided in the YamlFiles folder to test for your convienience

-the prometheus server is generally configured to port 9090; however if you are running this in a dockerized kubernetes cluster, you may need to expose your prometheus server to your host machine either by running this command in your CLI or by creating a node port

the backend server can be access on localhost:8888
the front end server can be accessed on localhost:3000

if installed the test image, that can be accessed on localhost:30011
the prometheus server can be accessed on localhost:31202

alert manager is provided
-what do we need to install before anything else

# LEARN MORE
you can check out the kubernetes api client for more
the prometheus client for more