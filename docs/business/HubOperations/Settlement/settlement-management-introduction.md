# Introduction – Settlement Management Guide

When a payment is made in a real-time payments system like Mojaloop, the DFSP who is the custodian of the beneficiary's account (the creditor DFSP) agrees to credit the beneficiary with the funds immediately. But the creditor DFSP has not yet received the funds from the DFSP who is the custodian of the debtor's account: all that has happened so far is that the debtor DFSP has incurred an obligation to reimburse the creditor DFSP, and that obligation has been recorded in the Mojaloop Hub.

The process of settlement is the process by which a debtor DFSP reimburses a creditor DFSP for the obligations that the debtor DFSP has incurred as a consequence of transfers. 

This guide describes how settlements are managed by the Mojaloop Hub and the partner settlement bank(s), and introduces the main building blocks of settlement processing.