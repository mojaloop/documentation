# Authoring TTK Tests for a GitHub Issue

This guide describes the end-to-end workflow for authoring a [Mojaloop Testing Toolkit (TTK)](https://github.com/mojaloop/ml-testing-toolkit) test collection that covers a specific GitHub issue — either a **new feature** or a **bug fix**. It captures the conventions used across the existing `hub/golden_path/bug fixes/`, `hub/golden_path/feature_tests/`, and `dfsp/golden_path/negative_scenarios/` collections so new collections stay consistent with the rest of the suite.

The audience is a Mojaloop contributor who has already picked up a ticket, has (or is reviewing) the implementation PR in one of the service repositories, and now needs to add end-to-end coverage in [`mojaloop/testing-toolkit-test-cases`](https://github.com/mojaloop/testing-toolkit-test-cases).

## Table of Contents

- [When to add a TTK test](#when-to-add-a-ttk-test)
- [Prerequisites](#prerequisites)
- [Step 1. Understand the issue and the fix](#step-1-understand-the-issue-and-the-fix)
- [Step 2. Decide where the collection belongs](#step-2-decide-where-the-collection-belongs)
- [Step 3. Design the test scenarios](#step-3-design-the-test-scenarios)
- [Step 4. Write the collection JSON](#step-4-write-the-collection-json)
- [Step 5. Register the file in master.json](#step-5-register-the-file-in-masterjson)
- [Step 6. Verify locally with ml-core-test-harness](#step-6-verify-locally-with-ml-core-test-harness)
- [Step 7. Submit the pull request](#step-7-submit-the-pull-request)
- [Common patterns and pitfalls](#common-patterns-and-pitfalls)
- [Reference collections](#reference-collections)

## When to add a TTK test

Add a TTK collection whenever the issue describes externally observable behaviour — i.e. an HTTP request/response or a FSPIOP callback that a DFSP or a hub operator would see. TTK tests complement, they do not replace, Jest/tape unit tests; in practice we keep:

| Kind of coverage | Where it lives |
|---|---|
| Function-level edge cases, internal state transitions, pure-logic regressions | Unit tests in the service repo (`test/unit/**`) |
| End-to-end request flow through the hub including FSPIOP async callbacks | TTK collection in `testing-toolkit-test-cases` |
| Integration flows that exercise Kafka topics or DB state | Service-repo integration tests (`test/integration/**`) |

If the fix only changes internal logic with no observable external behaviour, a TTK test adds no value — stick to unit tests.

## Prerequisites

Clone all four repositories side-by-side:

```bash
git clone git@github.com:mojaloop/testing-toolkit-test-cases.git
git clone git@github.com:mojaloop/ml-core-test-harness.git
git clone git@github.com:mojaloop/<service-under-test>.git   # e.g. account-lookup-service
git clone git@github.com:mojaloop/ml-testing-toolkit.git     # for reference only
```

Tools:

- **Docker Desktop** (or equivalent) with `docker compose`
- **Node.js** matching the service's `.nvmrc`
- **gh** CLI authenticated to GitHub (for opening the final PR)
- **jq** (optional but useful)

Make sure you can run the test harness before you start writing tests — see [Step 6](#step-6-verify-locally-with-ml-core-test-harness).

## Step 1. Understand the issue and the fix

Start from the GitHub issue and walk the code path:

1. **Read the issue** end to end. Note the reporter's expected behaviour and the actual behaviour.
2. **Open the implementation PR** (linked from the issue or in the service's merge history). Capture:
   - Which files changed.
   - The **error code, HTTP status, and description** the fix emits on the failure path.
   - Whether rejection is **synchronous** (HTTP 4xx returned immediately) or **asynchronous** (HTTP 202 followed by a FSPIOP `PUT .../error` callback).
   - Whether there are **multiple validation layers** (e.g. OpenAPI schema *and* a handler-level check) that could each catch the same bad input.
3. **Locate the fix's own unit tests.** They tell you the exact invariants the author intended. Your TTK tests should be a superset of the externally visible invariants, not a rehash of function-level checks.

For a bug fix, spend a minute verifying the behaviour against an *old* build of the service: reproduce the bug, then confirm your intended assertions actually fail on the old build. This protects the regression guarantee.

## Step 2. Decide where the collection belongs

The `testing-toolkit-test-cases` repo is organised by audience:

| Folder | Use when... |
|---|---|
| `collections/hub/golden_path/feature_tests/<area>/` | Adding coverage for a **new feature** exercised through the hub. Create a subfolder named after the feature. |
| `collections/hub/golden_path/bug fixes/` | Adding coverage for a **bug fix** on a hub-side service. One JSON file per issue, named `Test for Bugfix #<N> - <short-description>.json`. |
| `collections/hub/golden_path/negative_scenarios/` | Negative-path scenarios that don't map to a specific issue — e.g. malformed headers across an API surface. |
| `collections/hub/sequence/<service>/` | Sequence diagrams' worth of coverage for a specific service API. |
| `collections/dfsp/golden_path/` and `collections/dfsp/golden_path/negative_scenarios/` | Tests written from a DFSP's perspective (e.g. `parties_negative.json`). |
| `collections/pm4ml/` | PM4ML / SDK scheme-adapter flows. |
| `collections/inter-scheme-release/` | Cross-scheme / proxy test scenarios. |

File naming conventions (follow exactly — the sidebar and filter UIs parse them):

- Bug fixes: `Test for Bugfix #<issue-number> - <short description>.json`. Examples: `Test for Bugfix #742 - Error code check.json`, `Tests for Bugfix #990 and #1016 - Quotes.json`.
- Feature tests: `<feature_name>.json` inside a descriptive subfolder.

## Step 3. Design the test scenarios

Sketch the scenarios on paper before writing JSON. A good TTK collection for a single issue has:

1. **One positive control.** Exercises the feature or the reverse of the bug — confirms the happy path still works.
2. **One assertion per rejection layer.** If the fix introduces a new layer (e.g. handler-level validation) *and* a pre-existing layer already catches a subset of the inputs (e.g. OpenAPI schema), author at least one scenario per layer.
3. **Tolerant assertions where multiple layers can catch the same input.** When the specific error code depends on *which* layer caught it, use an inclusion check:

   ```javascript
   expect(['3100', '3101']).to.include(response.body.errorInformation.errorCode)
   ```

   This keeps the test green if the validation layer is later tightened or loosened — the test guarantees the outcome (rejection), not the mechanism.
4. **Async cases only where they're observable.** If the service returns HTTP 202 and then drops bad requests silently (no `PUT /error` callback), the TTK test cannot observe the rejection. File the observability gap as a separate ticket rather than writing a flaky test.
5. **URL-safe fixtures.** Avoid inputs that trigger unrelated URL-encoding quirks (angle brackets, backticks, backslashes) in outbound callback URLs if your assertion depends on the callback being routed back to TTK. Prefer inputs like `not-a-phone`, `not-an-email`, `notaniban` for type-specific violations.

Write the scenario list as a table in a scratch doc. This is the shape you want:

| Req # | Method + path | Purpose | Expected |
|---|---|---|---|
| 1 | `GET /parties/{Type}/{ID}` with literal `{ID}` | schema rejection | 400, errorCode 3100 or 3101, description includes "Invalid ID" or "pattern" |
| 2 | `GET /parties/MSISDN/not-a-phone` | handler-layer rejection via MSISDN format | 202 then `callback.body.errorInformation.errorCode in [3100, 3101]` |
| 3 | `GET /parties/MSISDN/27713803912` (valid) | positive control | 202 |

## Step 4. Write the collection JSON

The TTK collection file is a single JSON object with two top-level fields: `name` and `test_cases`. Each `test_case` has `requests` and each request has `tests.assertions`.

### Skeleton

```json
{
  "name": "multi",
  "test_cases": [
    {
      "id": "bugfix-<issue>",
      "name": "Tests for Bugfix #<issue> - <short description>",
      "meta": {
        "info": "One-paragraph explanation: what the fix does, which layers reject the bad input, and any dependencies (e.g. 'Depends on <service>#<PR>')."
      },
      "requests": [
        {
          "id": "req-id-1",
          "meta": { "info": "Per-request explanation" },
          "description": "Human description",
          "apiVersion": {
            "minorVersion": 1,
            "majorVersion": 1,
            "type": "fspiop",
            "asynchronous": true
          },
          "operationPath": "/parties/{Type}/{ID}",
          "path": "/parties/MSISDN/%7BID%7D",
          "method": "get",
          "url": "{$inputs.HOST_ACCOUNT_LOOKUP_SERVICE}",
          "ignoreCallbacks": true,
          "headers": {
            "Accept": "{$inputs.accept}",
            "Content-Type": "{$inputs.contentType}",
            "Date": "{$function.generic.curDate}",
            "FSPIOP-Source": "{$inputs.fromFspId}"
          },
          "params": {
            "Type": "MSISDN",
            "ID": "{ID}"
          },
          "tests": {
            "assertions": [
              {
                "id": "rsp-status-400",
                "description": "Response status should be 400",
                "exec": [
                  "expect(response.status).to.equal(400)"
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### Key fields

- **`operationPath`** is the OpenAPI template; TTK uses it to look up the spec.
- **`path`** is the concrete URL path. Use percent-encoding for reserved characters — `{` is `%7B`, `}` is `%7D`, `<` is `%3C`, and so on.
- **`params`** are the decoded path parameter values; TTK substitutes these into `operationPath` if you omit `path`.
- **`url`** is the target host. Prefer environment-file inputs (`{$inputs.HOST_ACCOUNT_LOOKUP_SERVICE}`) over hardcoded URLs.
- **`ignoreCallbacks: true`** tells TTK not to wait for a FSPIOP async callback. Set this for synchronous-only assertions. Omit it (or set `false`) when your assertions reference the `callback.body`.
- **`apiVersion.asynchronous`** reflects the FSPIOP contract, not the assertion style. Most `GET /parties/**` endpoints are asynchronous even if you only assert on the sync response.

### Assertions

TTK evaluates each string in `tests.assertions[].exec[]` as JavaScript with `expect` (chai) in scope. The inputs available to every assertion are:

- `response` — the immediate HTTP response (status, body, headers).
- `callback` — the async callback payload TTK captured (only when `ignoreCallbacks` is falsy and the service actually emitted a callback).
- `request` — the request you sent (useful for echoing source/dest headers).
- `environment` — the loaded env file.

Useful patterns:

| Goal | Pattern |
|---|---|
| Strict equality | `expect(response.status).to.equal(400)` |
| Multi-value tolerance | `expect(['3100','3101']).to.include(response.body.errorInformation.errorCode)` |
| Substring match | `expect(response.body.errorInformation.errorDescription).to.include('Invalid')` |
| Regex match | `expect(response.body.errorInformation.errorDescription).to.match(/Invalid ID\|pattern/i)` |
| Property existence | `expect(response.body).to.have.property('errorInformation')` |
| Header echoing | `expect(callback.headers['fspiop-destination']).to.equal('{$request.headers["FSPIOP-Source"]}')` |

Chai does not ship a `.oneOf(...)` matcher — use `expect([...]).to.include(actual)` instead.

### Asserting on async callbacks

When the service returns 202 and then fires a `PUT .../error` callback, TTK captures the callback via its embedded receiver and exposes it as `callback.body`. Remove `ignoreCallbacks: true`, and add assertions like:

```javascript
expect(callback.body).to.have.property('errorInformation')
expect(['3100','3101']).to.include(callback.body.errorInformation.errorCode)
expect(callback.body.errorInformation.errorDescription).to.match(/Invalid MSISDN/i)
```

For the callback to reach TTK, the source FSP in your request (`FSPIOP-Source`) must have its `FSPIOP_CALLBACK_URL_*` endpoints registered to point at the TTK callback receiver. The ml-core-test-harness environment provisions `testingtoolkitdfsp` for this; always use `"FSPIOP-Source": "{$inputs.fromFspId}"` unless you are specifically testing a different source.

### Using environment variables

The env files live under `environments/`. The two you will use most are `hub.json` (maps to a full hub deployment) and `ml-core-test-harness/docker/ml-testing-toolkit/test-cases/environments/default-env.json` (maps to the harness). Reference them from your JSON as `{$inputs.<name>}`.

Never hardcode an FSP id, content type, or host URL — always go through `inputs`. If you need an input that does not exist yet, add it to both `environments/hub.json` (the canonical file) and the harness's `default-env.json` and explain why in your PR.

## Step 5. Register the file in master.json

Every collection folder has a `master.json` that defines the execution order and tags. Add your file there too — otherwise TTK will still find it but the UI filters and CI labels will not pick it up.

Example — `collections/hub/golden_path/bug fixes/master.json`:

```json
{
  "order": [
    { "name": "other-bug-fixes.json", "type": "file" },
    { "name": "Test for Bugfix #742 - Error code check.json", "type": "file" },
    ...existing entries...
    {
      "name": "Test for Bugfix #<issue> - <description>.json",
      "type": "file",
      "labels": ["<service-name>"]
    }
  ]
}
```

The `labels` array is used by the TTK UI and by CI filters such as `--labels std`. Typical labels: `account-lookup-service`, `quoting-service`, `central-ledger`, `sdk-scheme-adapter`, `quotes`, `transfers`, etc. If you are adding coverage that touches an existing labelled area, reuse the same label.

## Step 6. Verify locally with ml-core-test-harness

The fastest feedback loop is to run the collection against [`ml-core-test-harness`](https://github.com/mojaloop/ml-core-test-harness) with the service image built from your fix branch.

### 6.1 Build the service image (if the fix has not been released)

From the service repo on the branch containing the fix:

```bash
cd /path/to/<service-under-test>
docker build -t mojaloop/<service-under-test>:local .
```

### 6.2 Point the harness at your image

In `ml-core-test-harness/.env`, set the version variable for your service to `local` (or whatever tag you used):

```bash
ACCOUNT_LOOKUP_SERVICE_VERSION=local
```

### 6.3 Copy your collection into the harness mount

The harness mounts its *own* copy of the test-cases folder. Either symlink or copy your new collection file and its `master.json` edits into:

```
ml-core-test-harness/docker/ml-testing-toolkit/test-cases/collections/tests/golden_path/bug fixes/
```

(The corresponding path for feature tests is `.../tests/golden_path/feature_tests/<subfolder>/`.)

### 6.4 Start the services

```bash
cd /path/to/ml-core-test-harness
docker compose up -d <service-under-test> mojaloop-testing-toolkit mojaloop-testing-toolkit-ui
```

Wait until the services report `healthy`:

```bash
docker ps --format '{{.Names}}\t{{.Status}}' | grep -E '<service>|testing-toolkit'
```

### 6.5 Run your collection

The harness ships with the TTK client-lib CLI container. Run your collection as a one-off against it:

```bash
docker run --rm --network mojaloop-net \
  -v "$(pwd)/docker/ml-testing-toolkit/test-cases/collections:/opt/app/collections" \
  -v "$(pwd)/docker/ml-testing-toolkit/test-cases/environments:/opt/app/environments" \
  mojaloop/ml-testing-toolkit-client-lib:v1.9.1 \
  npm run cli -- -u http://mojaloop-testing-toolkit:5050 \
    -i "collections/tests/golden_path/bug fixes/<your-file>.json" \
    -e environments/default-env.json
```

Exit code 0 means all assertions passed. The tabular summary at the end of the output shows `Passed / Failed / Total`.

Alternatively, open <http://localhost:6060> (TTK UI) → **Outbound** → load your collection JSON + `default-env.json` → Run. The UI shows request/response/callback detail for each assertion and is useful for debugging.

### 6.6 Inspect service logs when an assertion fails

```bash
docker logs <service-under-test> --since 2m | grep -iE 'error|<your-fixture>'
```

Watch for:

- Whether the request even reached the handler (schema rejection happens before).
- Whether `handleError` was invoked (for async-callback cases).
- Whether `sendErrorCallback is done` appears — if yes, the callback was dispatched and the issue is on the TTK side.

### 6.7 Regression sanity check (bug fixes only)

For a bug-fix collection, also run against a service image that *predates* the fix (e.g. the last published tag). The assertions the fix was meant to satisfy should fail; the positive control should still pass. This proves the test catches the regression.

## Step 7. Submit the pull request

1. Fork `mojaloop/testing-toolkit-test-cases` if you have not already.
2. Branch from `master` (the repo uses `master`, not `main`):

   ```bash
   git checkout master
   git pull origin master
   git checkout -b feat/<issue>-ttk-tests-<short-description>
   ```

3. Commit only the two paths you care about — the new collection JSON and the master.json registry edit. If your working tree has unrelated changes, use `/tmp/` as a staging area instead of `git stash` to avoid path-continuation issues.

4. Commit message convention:

   ```
   feat: add TTK tests for bug fix #<issue> (<short description>)

   Summary of what the collection covers, any rejection-layer tolerance
   built into the assertions, and any dependencies on service PRs.

   Depends on: <org>/<service>#<PR>
   ```

5. **If the fix is not yet merged**, open the PR as a **draft**:

   ```bash
   gh pr create \
     --repo mojaloop/testing-toolkit-test-cases \
     --base master \
     --draft \
     --title "feat: add TTK tests for bug fix #<issue>" \
     --body-file /tmp/<your-pr-body>.md
   ```

   Flip to ready-for-review once the service fix merges:

   ```bash
   gh pr ready <PR-NUMBER> --repo mojaloop/testing-toolkit-test-cases
   ```

6. In the PR body, always include:
   - A table or list of test cases and what each one covers.
   - The exact verification command(s) a reviewer can run locally (Step 6.5 above).
   - The `Depends on:` line pointing at the service PR.
   - Any non-obvious fixture choices (e.g. "backticks/angle-brackets covered by Jest unit tests because ALS HTML-escapes them in outbound URLs — separate issue filed as #<N>").

## Common patterns and pitfalls

- **URL encoding.** TTK does not double-encode `params`. If your `path` contains `%7B` and you also set `params.ID = "{ID}"`, both are valid — use whichever reads more clearly. Mixing URL encodings in one path is a common source of "why did TTK send a different URL than I expected" bugs.
- **Callback matching.** TTK matches an inbound callback to an outbound request by path. If the service emits a callback to a *different* path than TTK is listening on (HTML-entity-encoded URL segments, trailing-slash mismatch, SubId vs no-SubId route confusion), the callback-assertion block will time out. Check the service's egress-URL logs first, then the TTK UI's "Callback" tab.
- **Environment drift.** `hub.json` (used in the main e2e CI) and `default-env.json` (used in ml-core-test-harness) are maintained separately. When you add an input variable, update **both**.
- **`master` vs `main`.** `testing-toolkit-test-cases` uses `master` as its default branch. Most other Mojaloop repos use `main`. Always confirm with `git remote show origin | grep "HEAD branch"` before branching.
- **Labels.** New tests without labels do not show up in filtered UI views and may be missed by a CI job that runs only `--labels std` or `--labels <service>`. Add at least one relevant label.
- **Version-1 vs ISO 20022 envs.** The hub.json env uses FSPIOP `version=1.0` Accept / Content-Type headers; the ml-core-test-harness `default-env.json` uses ISO 20022 `version=2.0`. Your assertions should be content-type-agnostic; reference env inputs rather than hardcoding.

## Reference collections

Study these as templates — each demonstrates a different pattern:

| Collection | Pattern |
|---|---|
| [`collections/hub/golden_path/bug fixes/Tests for Bugfix #981 - Fix 500 http code instead of 400.json`](https://github.com/mojaloop/testing-toolkit-test-cases/blob/master/collections/hub/golden_path/bug%20fixes/Tests%20for%20Bugfix%20%23981%20-%20Fix%20500%20http%20code%20instead%20of%20400.json) | Synchronous 4xx assertions, `ignoreCallbacks: true`, direct admin-API calls. |
| [`collections/dfsp/golden_path/negative_scenarios/parties_negative.json`](https://github.com/mojaloop/testing-toolkit-test-cases/blob/master/collections/dfsp/golden_path/negative_scenarios/parties_negative.json) | Async-callback assertions (`callback.body.errorInformation.*`) for FSPIOP party lookups. |
| [`collections/hub/golden_path/feature_tests/jws_validation/`](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/golden_path/feature_tests/jws_validation) | Feature-test folder layout with multiple scenarios per feature. |
| [`collections/hub/sequence/account-lookup-service/Get Party Details - [seq-acct-lookup-get-parties-7.2.0].json`](https://github.com/mojaloop/testing-toolkit-test-cases/blob/master/collections/hub/sequence/account-lookup-service/Get%20Party%20Details%20-%20%5Bseq-acct-lookup-get-parties-7.2.0%5D.json) | Sequence-style coverage with pre-request scripting (`scripts.preRequest.exec`). |

See also: [Mojaloop Testing Toolkit documentation](../../documentation/mojaloop-technical-overview/ml-testing-toolkit/README.md) for general TTK concepts, and the [deployment guide's Testing section](./README.md#_5-4-testing-mojaloop) for how the Golden Path suite is invoked from Helm.
