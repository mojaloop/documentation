# Deployment Troubleshooting

## 1. Deployment issues

### 1.1. `ERR_NAME_NOT_RESOLVED` Error

#### Description
The following error is displayed when attempting to access an end-point (e.g. central-ledger.local) via the Kubernetes Service directly in a browser: `ERR_NAME_NOT_RESOLVED`
    
#### Fixes
    
  * Verify that that Mojaloop was deployed by checking that the helm chart(s) was installed by executing:
   
      ```bash
      helm list
      ```

    If the helm charts are not listed, see the [Helm Chart Installation](README.md#4-helm) section to install a chart.
    
  * Ensure that all the Mojaloop Pods/Containers have started up correctly and are available through the Kubernetes dashboard.
  
  * Note that the Mojaloop deployment via Helm can take a few minutes to initially startup depending on the system's available resources and specification. It is recommended that you wait at least 10m for all Pods/Containers to self heal before troubleshooting.
