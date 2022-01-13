![Markdown Logo](https://edwintrakselis.com/images/logo.png)

# Project summary


*Set up a bare-metal, fully on-prem, microservice hosting platform with the fail-over redundancies and a CI/CD pipeline*

## Hardware used:

* Raspberry Pi 4b(3x)
* RAM: 8GB
* Storage: 512 GB SSD NFS(1x)
* Kernel version: 5.10.63-v8+
* CPU architecture: arm64
* OS: Debian 64bit (bullseye)

## Deployment summary:

* Deploy type: bare-metal on-prem
* Kubernetes: (k3s v1.23.1)
* Cluster backup: velero + minio
* Data backup: rsync
* Load balancer: traefik v2.5
* PV provisioning: dynamic
* Container runtime: containerd
* TLS solution: cert-manager
* Monitoring: prometheus, grafana, & traefik dashboard
* CI/CD Pipeline: github-runner
* Docker registry: private


---
> [Click here to see the live result](https://edwintrakselis.com/)
---
## Prep the server (all nodes unless specified below)



```bash
sudo apt-get update && sudo apt-get dist-upgrade -y  
```
```bash
sudo swapoff -a
sudo dphys-swapfile swapoff
sudo dphys-swapfile uninstall
sudo update-rc.d dphys-swapfile remove
sudo systemctl disable dphys-swapfile 
```
#### *Append with a space to the end of an existing line at /boot/cmdline.txt*
```bash
cgroup_memory=1 cgroup_enable=memory
```
```bash
sudo apt-get install iptables
sudo iptables -F
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
sudo reboot
```
#### *Execute on the control-plane node only*
```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=stable sh -s - --write-kubeconfig-mode 644 --disable local-storage
```
#### *Look up the agent join token*
```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```
#### *Execute on each agent node*
```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest K3S_URL=https://masternodeipaddress:6443 K3S_TOKEN=agentjointoken sh -
```
#### *Confirm the cluster is running as expected*
```bash
kubectl get pods --all-namespaces
```



