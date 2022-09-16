<h1>React - Solana Template</h1>
<p>Solana and Anchor template for Create React App. This template generates Scaffold to develop Solana/Anchor Dapp frontend in React. It has built in utils for developing an efficient web3 frontend on react.</p>

<strong>Note: We are currently testing this template, you might encounter some bugs. Please open an issue if you do so, We will get to you ASAP.</strong>

<h2>Dependencies / Included node packages (Other than included in CRA) </h2>
<table>
  <tr>
    <th>@project-serum/anchor</th>
    <td>^0.25.0</td>
  </tr>
  <tr>
    <th>@solana/web3.js</th>
    <td>^1.60.0</td>
  </tr>
  <tr>
    <th>@solana/spl-token</th>
    <td>^0.3.4</td>
  </tr>
  <tr>
    <th>@solana/wallet-adapter-base</th>
    <td>^0.9.16</td>
  </tr>
  <tr>
    <th>react-solana</th>
    <td>^0.7.0</td>
  </tr>
</table>

<h2>Built-In Hooks</h2>

<h3>Basic Hooks</h3>
<table>
  <tr>
    <th>useConfig</th>
    <td>Gives the programmed/global configurations object that you have set up in config.ts</td>
  </tr>
  <tr>
    <th>useApi</th>
    <td>Gives the four basic API methods (GET, POST, PUT, DEL) wrapped with axios and useAuth and all basic headers</td>
  </tr>
  <tr>
    <th>useAuth</th>
    <td>Gives the functions to login and logout while storing the auth token in localStorage</td>
  </tr>
  <tr>
    <th>useLocalStorage</th>
    <td>Works as useState while storing the state in localStorage</td>
  </tr>
</table>

<h3>Web3 Hooks</h3>
<table>
  <tr>
    <th>useRpc</th>
    <td>Select, Store and Retrieve rpc from localStorage and the list setup in config.ts</td>
  </tr>
  <tr>
    <th>useProvider</th>
    <td>Gives the AnchorProvider, Connection and Wallet object along with some necessory functions such as sendAllTransactionsInBatches</td>
  </tr>
  <tr>
    <th>useAnchorPagination</th>
    <td>Allows you to paginate through the accounts, loads the chain data faster</td>
  </tr>
</table>

<h2>Helper Functions</h2>
<table>
  <tr>
    <th>MerkleTree</th>
    <td>Sometimes it's hard to verify large amount of data on-chain, that's where MerkleTree helps</td>
  </tr>
</table>

<h2>Error Avoidance</h2>
<p>While developing a web3 app, there are a lot of errors that can be avoided by using the right tools. This template has built in tools to avoid some of the common errors.</p>

<h2>Built-In UI Kit</h2>
<p>This template contains a built-in UI Kit built on SCSS which makes you not want to write custom CSS at all, The documentation for the UI Kit is yet to be published.</p>

<h2>Usage</h2>
<p>Create your app with create-react-app command</p>

```bash
yarn create react-app my-app --template solana
yarn start
```



<h2>Contributing</h2>
<p>Contributions, issues and feature requests are welcome.</p>

<h2>Show your support</h2>
<p>Give a ⭐️ if this project helped you!</p>

