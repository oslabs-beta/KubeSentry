# Kube Sentry

Kubernetes Monitoring Toolkit

clone this repository `git clone`

`npm install`

`npm run`

access [`localhost:3000\dashboard`](localhost:300\dashboard)

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
  ```yaml
  spec:
    containers:
      - args:
          - --cert-dir=/etc/metrics-server-auth
          - --secure-port=4443
          - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
          - --kubelet-use-node-status-port
          - --metric-resolution=15s
          - --kubelet-insecure-tls
    image: registry.k8s.io/metrics-server/metrics-server:v0.6.4
  ```
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
- `kubectl apply -f https://github.com/oslabs-beta/KubeSentry/Yamlfiles/prometheus-nodeport.yaml`
- now you should be able to access the prometheus server api via `localhost:31302`

# instrument your application

To instrument your appplication for Prometheus to scrape, you need to require [Prom-client](https://github.com/siimon/prom-client) onto your application. Prometheus' default scraping endpoint is `/metrics`

```js
const client = require('prom-client');

//create a custom counter
const customCounter = new client.Counter({
  name: 'my_custom_counter',
  help: 'Description of my custom counter',
});

//increment counter
customCounter.inc();

//endpoint to provide metrics for prometheus to scrape
app.get('/metrics', async (req, res) => {
  const data = await client.register.metrics();
  res.header('Content-Type', 'text/plain').status(200).send(data);
});
```

as an alternative, you can install [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle) which grants you the **metricsMiddleware** to expose all your metrics to the /metrics endoint with one line

```js
const promBundle = require('express-prom-bundle');
const client = require('prom-client');
const metricsMiddleware = promBundle({ includePath: true });

app.use(metricsMiddleware);
```

# create an image of your application

Build an image of your application to be deployed on kubernetes

# deploy your application on kubernetes

Create a deployment yaml file to deploy your application. This will handle any horizontal scaling required for your app

> Example of a deployment configuration yaml file

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mitch-tests
  namespace: mitch-tests #optional. Will create in current namespace if left out
spec:
  selector:
    matchLabels:
      app: mitch
  replicas: 4
  template:
    metadata:
      labels:
        app: mitch
    spec:
      containers:
        - name: mitch-test
          image: mitchtest4:1.0 #application image
          ports:
            - containerPort: 3000
```

run `kubectl apply -f path/to/deployment.yaml` to deploy your application

create a service yaml configuration to handle the loadbalancing of your applications

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mitchtest-nodeport
spec:
  selector:
    app: mitch #must match the label of the pod
  ports:
    - name: web
      port: 3000 #port to access the service node
      targetPort: 3000 #must match the container port of the application
      nodePort: 30011 #optional nodePort for open access if running in a docker conatiner
  type: NodePort
```

run `kubectl apply -f path/to/service.yaml` to deploy your application

now you should be able to access your application at `localhost:30011`

# Configure prometheus to scrape metrics

Add scrape jobs for your application and the metrics server. Learn more at [Prometheus](https://prometheus.io/docs/prometheus/latest/getting_started/)

```yaml
global:
  evaluation_interval: 15s
  scrape_interval: 10s
  scrape_timeout: 10s
rule_files:
  - /etc/config/recording_rules.yml
  - /etc/config/alerting_rules.yml
  - /etc/config/rules
  - /etc/config/alerts
  - /etc/prometheus/rules/*.yaml #will be used later for
scrape_configs:
  - job_name: 'kubernetes-metrics'
    static_configs:
      - targets: ['metrics-server.kube-system.svc.cluster.local:443']
  - job_name: 'mitch-test'
    static_configs:
      - targets: ['mitchtest-nodeport.default.svc.cluster.local:3000']
  - job_name: prometheus
    static_configs:
      - targets: [localhost:9090]
```

# The Kube Sentry

git clone
npm install
npm run
localhost:3000 should display you kubernetes cluster

# Set up the alermanager

coming soon......

# LEARN MORE

head over the kubesentry.net
