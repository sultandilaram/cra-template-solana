import React from "react";
import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";


export default function useAnchorPagination<T extends anchor.Idl = any, R = any>(program: anchor.Program<T>, accountName: string, filters: web3.GetProgramAccountsFilter[] = [], dataPerPage: number = 10) {

  const accountNameIDL = React.useMemo(() => {
    if (!program.idl.accounts?.length) throw new Error("No accounts found in IDL");
    return program.idl.accounts
      .map((a) => a.name)
      .find((a) => a === (accountName as any));
  }, [program, accountName])

  const [accounts, setAccounts] = React.useState<web3.PublicKey[]>([]);
  const [data, setData] = React.useState<R[][]>(() => {
    return new Array(Math.ceil(accounts.length / dataPerPage)).fill([]);
  });

  React.useEffect(() => {
    if (!accountNameIDL) throw new Error("Account not found in IDL");

    (async () => {
      const accounts = (await program.provider.connection.getProgramAccounts(program.programId, {
        dataSlice: { offset: 0, length: 0 },
        filters: [
          { dataSize: 8 + (program.account as any)[accountNameIDL].size },
          ...filters
        ],
      })
      ).map((a) => a.pubkey);

      setAccounts(accounts);
    })()
  }, [accountNameIDL, filters, program]);

  const fetchPage = React.useCallback(async (page: number) => {
    if (!accountNameIDL) throw new Error("Account not found in IDL");

    const start = page * dataPerPage;
    const end = start + dataPerPage;
    const pageAccounts = accounts.slice(start, end);
    const pageData = (await (program.account as any)[accountNameIDL].fetchMultiple(pageAccounts,)).filter(
      (a: any) => a !== null
    ) as R[];
    setData((d) => {
      const newData = [...d];
      newData[page] = pageData;
      return newData;
    });
    return pageData;
  }, [accounts, accountNameIDL, dataPerPage, program]);

  const getPage = React.useCallback(async (page: number) => {
    if (page < 0 || page >= data.length) return [];

    if (data[page].length === 0) {
      return await fetchPage(page);
    }

    return data[page];
  }, [data, fetchPage]);

  return {
    accounts,
    data,
    getPage
  }
}
