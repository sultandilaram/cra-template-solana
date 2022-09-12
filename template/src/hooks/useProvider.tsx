import React from 'react'
import * as anchor from '@project-serum/anchor'
import * as web3 from '@solana/web3.js'
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const defaultOpts: web3.ConfirmOptions = {
  preflightCommitment: 'confirmed',
}

export default function useProvider(opts?: web3.ConfirmOptions) {

  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = React.useMemo(() => {
    if (!connection) return;
    return new anchor.AnchorProvider(connection, wallet as any, opts || defaultOpts);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, wallet]);

  const sendAndConfirm = React.useCallback(async (tx: anchor.web3.Transaction) => {
    if (!provider) return;
    return provider.sendAndConfirm(tx)
  }, [provider]);

  const sendAll = React.useCallback(async (txs: {
    tx: anchor.web3.Transaction,
    signers: anchor.web3.Keypair[],
  }[]) => {
    if (!provider) return;
    return provider.sendAll(txs);
  }, [provider]);

  const sendInBatches = React.useCallback((
    data: any[],
    transactionCallback: (data: any, isFirst?: boolean) => { tx: anchor.web3.Transaction, signers: anchor.web3.Keypair[] } | undefined,
    successCallback = () => { },
    actionText = 'Work',
    batchSize = 5,
    opts?: web3.ConfirmOptions
  ) => {
    if (!provider) return;

    const batches = Math.ceil(data.length / batchSize);

    // SENDING TRANSACTIONS IN BATCHES
    const sendTrasactionBatch = async (
      currentBatch: number,
      isFirst: boolean,
      opts: any
    ) => {
      if (currentBatch > batches) return;

      const batch = data.slice(
        batchSize * (currentBatch - 1),
        batchSize * currentBatch
      );

      if (opts === undefined) {
        opts = defaultOpts;
      }

      const blockhash = await provider.connection.getLatestBlockhash(opts.preflightCommitment);

      const txs = [];
      for (let part of batch) {
        const transaction = await transactionCallback(part, isFirst);
        isFirst = false;
        if (transaction) {
          let signers = transaction.signers;
          if (signers === undefined) {
            signers = [];
          }

          const tx = transaction.tx;
          tx.feePayer = provider.wallet.publicKey;
          tx.recentBlockhash = blockhash.blockhash;

          signers
            .filter((s: any) => s !== undefined)
            .forEach((kp: any) => {
              tx.partialSign(kp);
            });

          txs.push(tx);
        }
      }

      const message = toast.loading(
        `${actionText}ing batch ${currentBatch} / ${batches}`
      );

      try {
        const signedTxs = await provider.wallet.signAllTransactions(txs);
        new Promise(async (resolve, reject) => {
          const sigs: any = [];
          for (let k = 0; k < txs.length; k += 1) {
            const tx = signedTxs[k];
            const rawTx = tx.serialize();
            anchor.web3
              .sendAndConfirmRawTransaction(provider.connection, rawTx, opts)
              .then((sig) => {
                sigs.push(sig);
                if (sigs.length === txs.length) {
                  resolve(sigs);
                }
              })
              .catch((e) => {
                reject(e);
              });
          }
          return sigs;
        })
          .then((sigs) => {
            console.log(
              `${actionText}ed ${currentBatch} / ${batches}!`,
              sigs
            );
            toast.update(message, {
              render: `${actionText}ed ${currentBatch} / ${batches}!`,
              type: 'success',
              isLoading: false,
              closeOnClick: true,
              closeButton: true,
              autoClose: 4000,
            });
          })
          .catch((e) => {
            console.error(e);
            toast.update(message, {
              render: `Batch ${currentBatch}/${batches} is failed`,
              type: 'error',
              isLoading: false,
              closeOnClick: true,
              closeButton: true,
              autoClose: 4000,
            });
          })
      } catch (e) {
        console.error(`Batch ${currentBatch}/${batches} failed`, e);
        toast.update(message, {
          render: `Batch ${currentBatch}/${batches} is failed, Please reload and try again`,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
          autoClose: 4000,
        });
      } finally {
        successCallback();
        sendTrasactionBatch(currentBatch + 1, false, opts);
      }
    };
    sendTrasactionBatch(1, true, opts);
  }, [provider]);

  return {
    connection,
    wallet,
    provider,
    sendAndConfirm,
    sendAll,
    sendInBatches
  }
}
