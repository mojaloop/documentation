# Deployment Troubleshooting

## Deployment issues

### 1.

**** TODO
**** Think about a template here:
What is the issue?
How was it produced (what were you doing, where were you doing it i.e. macos, linux, etc)?
And how do I fix it?

- central-ledger’s server IP address could not be found.

    `ERR_NAME_NOT_RESOLVED`
    
    Resolved by:
    
    * Verify that a helm chart(s) was installed by executing
    
    ```bash
    helm list
    ```

    If the helm charts are not listed, see the [Helm Chart Installation](README.md#221-helm-chart-installation) section to install a chart.
