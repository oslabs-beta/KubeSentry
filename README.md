<img alt="Alt text" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/><img alt="Alt text" src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black"/>
<img alt="Alt text" src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Kubernetes-326CE5.svg?style=for-the-badge&logo=Kubernetes&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Prometheus-E6522C.svg?style=for-the-badge&logo=Prometheus&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Helm-0F1689.svg?style=for-the-badge&logo=Helm&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white"/>
<img alt="Alt text" src="https://img.shields.io/badge/Babel-F9DC3E.svg?style=for-the-badge&logo=Babel&logoColor=black"/>
<img alt="Alt text" src="https://img.shields.io/badge/Cytoscape.js-F7DF1E.svg?style=for-the-badge&logo=cytoscapedotjs&logoColor=black"/> 
<img alt="Alt text" src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white"/> 







# Kube Sentry

Kube Sentry an innovative open-source tool reshaping Kubernetes cluster management. Designed for developers, it offers advanced features for early detection of potential issues, aiming to notably reduce bug occurrences. Seamlessly integrated with Prometheus, it enhances tracking and alerting capabilities, providing a holistic, user-friendly approach to Kubernetes management.


## Quickstart
Clone this repository, install dependencies and run:

```
git clone https://github.com/oslabs-beta/KubeSentry.git
cd KubeSentry
npm install
npm run
```


The Sentry Dashboard will be available at [localhost:3000](http://localhost:3000/dashboard).

# Setting up your Kubernetes cluster

- Install kubectl. Run `kubectl version` to check if it has been sucessfully downloaded.

- KubeSentry will connect to the Kubernetes cluster configured by `kubectl config current-context`. For testing purposes, you can run a local Kubernetes cluster either with [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [minikube](https://minikube.sigs.k8s.io/docs/start/).

* The following commands will follow managing your K8s cluster on Docker Desktop.
  - To start Kubernetes on docker-desktop, navigate to Settings > Kubernetes and **Enable Kubernetes**.
  - run `kubectl cluster-config` to ensure your Kubernetes cluster is operating.

# Set up metrics server

- [Kubernetes Metrics Server](https://github.com/kubernetes-sigs/metrics-server) is required to get additional information from your K8s cluster.
- Follow instructions on the Github repo to install the Kubernetes metrics-server.
- ** Note the `--kubelet-insecure-tls` flag to bypass the CA authenication for kubelets. **
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
- If your metrics server is installed correctly, you will be able to run `kubectl top pods` and `kubectl top nodes` to get pod and node metrics of your cluster.

# Configure Prometheus to collect cluster metrics

If you have not already, install [Helm](https://helm.sh/). Helm is a repository of published yaml files that are used to configure deployments used in Kubernetes.

Add the Prometheus Helm chart to your Helm repo
`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

- you can check if the Helm chart has been sucessfully added by running `helm list` in you CLI

Install Prometheus to your Kubernetes cluster.
`helm install prometheus prometheus-community/prometheus`

- If you run `kubectl get all` you should see the deployments, configmaps, services Prometheus has installed.
- If you are running Kubernetes on docker-desktop, you will not be able to current access the Prometheus server API that is hosted on port 9090. This is because we are running Kubernetes in a containerized environment. To work around this, we will open up a **nodeport** service that will act as a middle man to set up a connection with the prometheus server with the outside world
- `kubectl apply -f https://github.com/oslabs-beta/KubeSentry/Yamlfiles/prometheus-nodeport.yaml`
- Now you should be able to access the Prometheus server API via `localhost:31302`

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

As an alternative, you can install [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle) which grants you the **metricsMiddleware** to expose all your metrics to the /metrics endoint with one line.

```js
const promBundle = require('express-prom-bundle');
const client = require('prom-client');
const metricsMiddleware = promBundle({ includePath: true });

app.use(metricsMiddleware);
```

# Create an image of your application

Build an image of your application to be deployed on Kubernetes.

# Deploy your application on Kubernetes

Create a deployment yaml file to deploy your application. This will handle any horizontal scaling required for your app.

> Example of a deployment configuration yaml file

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sentry-tests
  namespace: sentry-tests #optional. Will create in current namespace if left out
spec:
  selector:
    matchLabels:
      app: sentry
  replicas: 4
  template:
    metadata:
      labels:
        app: sentry
    spec:
      containers:
        - name: sentry-test
          image: sentrytest4:1.0 #application image
          ports:
            - containerPort: 3000
```

Run `kubectl apply -f path/to/deployment.yaml` to deploy your application.

Create a service yaml configuration to handle load balancing for your applications:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentrytest-nodeport
spec:
  selector:
    app: sentry #must match the label of the pod
  ports:
    - name: web
      port: 3000 #port to access the service node
      targetPort: 3000 #must match the container port of the application
      nodePort: 30011 #optional nodePort for open access if running in a docker conatiner
  type: NodePort
```

Run `kubectl apply -f path/to/service.yaml` to deploy your application.

Now you should be able to access your application at `localhost:30011`

# Configure Prometheus to scrape metrics

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
  - job_name: 'sentry-test'
    static_configs:
      - targets: ['sentrytest-nodeport.default.svc.cluster.local:3000']
  - job_name: prometheus
    static_configs:
      - targets: [localhost:9090]
```

# The Kube Sentry

```
git clone
npm install
npm run
```
http://localhost:3000/dashboard should display your Kubernetes cluster.

# Set up the Alert Manager

Coming soon!

# Learn More

Head over to kubesentry.net!

