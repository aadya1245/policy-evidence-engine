# Policy Evidence Engine

Policy Evidence Engine is an evidence-first public-policy research system. The demo follows one fixed, synthetic document collection so every result is reproducible and no live search key is required.

[View the live project](https://aadya1245.github.io/policy-evidence-engine/)

## Run locally

```bash
npm test
npm run serve
```

## Implemented

- Explainable, categorical source-quality scoring
- Atomic claim-to-evidence links with precise locators
- Temporal status labels from proposed through implemented/repealed
- Coverage matrix across requested jurisdictions and dimensions
- Deterministic contradiction detection that preserves disagreement
- Human approval step for qualified synthesis
- Interactive claim inspector and evidence provenance

## How it works

The system starts by defining the question, locations, time range, and evidence requirements. It scores the available sources, extracts individual claims, links each claim to a precise source location, checks for missing coverage, and flags disagreements for review. Only supported claims are eligible for the final report.

Retrieved content is treated as untrusted data. A production version would restrict URLs, limit document sizes, save source snapshots, enforce research budgets, and checkpoint each run. Every material report sentence must reference a stored evidence record.

## Evaluation contract

Citation correctness and completeness, primary-source ratio, temporal-status accuracy, requested-dimension coverage, contradiction recall, unsupported-claim rate, cost, and latency. All figures in the demo are synthetic fixtures—not claims about real city policy.
