import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment.development';
import abi from "../../contracts/DinoToken.json";

@Component({
  selector: 'app-nft-connect',
  templateUrl: './nft-connect.component.html',
  styleUrls: ['./nft-connect.component.css']
})
export class NftConnectComponent implements OnInit {
  title = 'Ethereum-101-Angular';

  isWalletConnected = false;
  contractABI = abi.abi;
  contractAddress = environment.contract_address_token;
  user: any = { };
  mintUri!: string;
  mintAddress!: string;

  async ngOnInit(): Promise<void> {}

  async onConnect(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const accounts = await windowEth.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        this.isWalletConnected = true;
        this.user.address = account;
        this.user.balance = ethers.utils.formatEther(await windowEth.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']}));
        console.log("Account Connected: ", account);
        await this.getNftInfo();
      } else {
        alert("Please install a MetaMask wallet to use our store.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onDisConnect(): Promise<void> {
    window.localStorage.clear();
    this.isWalletConnected = false;
    this.user = { };
  }

  async getNftInfo(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const DTKContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        this.user.name = await DTKContract.name();
        this.user.symbol = await DTKContract.symbol();
        this.user.owner = await DTKContract.owner();
        this.user.balanceNft = await DTKContract.balanceOf(this.user.address);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async MintNft(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const DTKContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const txn = await DTKContract.safeMint(this.mintAddress, this.mintUri);
        console.log("Minting nft...");
        await txn.wait();
        console.log("Nft Minted", txn.hash);
        await this.getNftInfo();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
