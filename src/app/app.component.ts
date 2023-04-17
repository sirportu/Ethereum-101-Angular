import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment.development';
import abi from "../contracts/VideoGamesStore.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ethereum-101-Angular';

  isWalletConnected = false;
  userAddress = null;
  isOwner = false;
  ownerAddress = null;
  contractABI = abi.abi;
  contractAddress = environment.contract_address;
  gameList: string[] = [];
  gameMyList: string[] = [];
  gameStruct: any = { name: null, stock: null, price: null };

  async ngOnInit(): Promise<void> {
    await this.checkIfWalletIsConnected();
    await this.getStoreOwner();
    await this.getGameList();
    await this.getMyGameList();
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

  async getStoreOwner(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        let owner = await VGSContract.storeOwner();
        this.ownerAddress = owner;

        const [account] = await windowEth.ethereum.request({ method: 'eth_requestAccounts' });

        if (owner.toLowerCase() === account.toLowerCase()) {
          this.isOwner = true;
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getGameList(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const games = await VGSContract.getGameList();
        console.log("Retrieved list...", games);
        this.gameList = games;
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMyGameList(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const games = await VGSContract.getCustomerGames();
        console.log("Retrieved my list...", games);
        this.gameMyList = games;
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getGamePrice(game: string): Promise<number> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const gamePrice = await VGSContract.getGamePrice(game);
        console.log("Retrieved price...", gamePrice);
        return gamePrice;
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
        return 0;
      }
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async deliverGame(game: string): Promise<void> {
    const gamePrice = await this.getGamePrice(game);
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        const txn = await VGSContract.deliverGame(game, { value: gamePrice });
        console.log("Deliver game...");
        await txn.wait();
        console.log("Deliver game...done", txn.hash);

        await this.getGameList();
        await this.getMyGameList();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async receiveGame(game: string): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        let myAddress = await signer.getAddress()
        console.log("provider signer...", myAddress);

        const txn = await VGSContract.receiveGame(myAddress, game);
        console.log("Receive game...");
        await txn.wait();
        console.log("Receive game...done", txn.hash);

        await this.getGameList();
        await this.getMyGameList();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addGame(): Promise<void> {
    try {
      const windowEth = window as any;
      if (windowEth.ethereum) {
        const provider = new ethers.providers.Web3Provider(windowEth.ethereum);
        const signer = await provider.getSigner();
        const VGSContract = new ethers.Contract(this.contractAddress, this.contractABI, signer) as any;

        console.log(this.gameStruct);

        const txn = await VGSContract.addGame(this.gameStruct.name, parseFloat(this.gameStruct.stock), parseFloat(this.gameStruct.price));
        console.log("Add game...");
        await txn.wait();
        console.log("Add game...done", txn.hash);

        await this.getGameList();
        await this.getMyGameList();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        alert("Please install a MetaMask wallet to use our store.");
      }
    } catch (error) {
      console.log(error)
    }
  }
}
