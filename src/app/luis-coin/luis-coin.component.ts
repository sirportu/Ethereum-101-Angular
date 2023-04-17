import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment.development';
import abi from "../../contracts/LuisCoin.json";

@Component({
  selector: 'app-luis-coin',
  templateUrl: './luis-coin.component.html',
  styleUrls: ['./luis-coin.component.css']
})
export class LuisCoinComponent implements OnInit {
  title = 'Ethereum-101-Angular';

  isWalletConnected = false;
  isOwner = false;
  contractABI = abi.abi;
  contractAddress = environment.contract_address_coin;
  coin: any = { name: null, symbol: null, owner: null, supply: null, balance: null };
  userAddress!: string;
  transferAmount!: string;
  mintAmount!: string;
  burnAmount!: string;
  transferAddress!: string;

  async ngOnInit(): Promise<void> {
    await this.checkIfWalletIsConnected();
    await this.getCoinInfo();
  }

  async checkIfWalletIsConnected(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const accounts = await windowEth.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        this.isWalletConnected = true;
        this.userAddress = account;
        console.log("Account Connected: ", account);
      } else {
        alert("Please install a MetaMask wallet to use our store.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCoinInfo(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const LUCContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        this.coin.name = await LUCContract.name();
        this.coin.symbol = await LUCContract.symbol();
        this.coin.owner = await LUCContract.owner();
        this.coin.supply = ethers.utils.formatEther(await LUCContract.totalSupply());
        this.coin.balance = ethers.utils.formatEther(await LUCContract.balanceOf(this.userAddress));

        if (this.coin.owner.toLowerCase() === this.userAddress.toLowerCase()) {
          this.isOwner = true;
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async transferCoin(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const LUCContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const txn = await LUCContract.transfer(this.transferAddress, ethers.utils.parseEther(this.transferAmount.toString()));
        console.log("Transfering coins...");
        await txn.wait();
        console.log("Coins Transfered", txn.hash);
        await this.getCoinInfo();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async mintCoin(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const LUCContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const txn = await LUCContract.mint(this.coin.owner, ethers.utils.parseEther(this.mintAmount.toString()));
        console.log("Minting coins...");
        await txn.wait();
        console.log("Coins Minted", txn.hash);
        await this.getCoinInfo();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async burnCoin(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const LUCContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const txn = await LUCContract.burn(ethers.utils.parseEther(this.burnAmount.toString()));
        console.log("Burning coins...");
        await txn.wait();
        console.log("Coins Burned", txn.hash);
        await this.getCoinInfo();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our market.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
