import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment.development';
import abi from "../../contracts/LuisCoin.json";

@Component({
  selector: 'app-nft-connect',
  templateUrl: './nft-connect.component.html',
  styleUrls: ['./nft-connect.component.css']
})
export class NftConnectComponent implements OnInit {
  title = 'Ethereum-101-Angular';

  isWalletConnected = false;
  isOwner = false;
  contractABI = abi.abi;
  contractAddress = environment.contract_address_coin;
  user: any = { address: null, symbol: null, owner: null, supply: null, balance: null };
  transferAmount!: string;
  mintAmount!: string;
  burnAmount!: string;
  transferAddress!: string;

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
    this.user.address = null;
    this.user.balance = null;
  }
}
