# Deployment Troubleshooting

##Suggested format to follow.
- What is the issue.
- How was it produced (what were you doing, where were you doing it i.e. macos, linux, etc).
- And how do I fix it.

## Deployment issues

### 1.

- What is the issue.
central-ledger’s server IP address could not be found.

- How was it produced.
  `ERR_NAME_NOT_RESOLVED`
    
- How do I fix it.    
  * Verify that a helm chart(s) was installed by executing. 
      ```bash
      helm list
      ```

    If the helm charts are not listed, see the [Helm Chart Installation](README.md#4-helm) section to install a chart.
