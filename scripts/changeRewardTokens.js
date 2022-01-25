// npx hardhat run scripts/changeRewardTokens.js --network mainnetBSC
const { ethers, network } = require(`hardhat`);


const toBN = (numb, power) =>  ethers.BigNumber.from(10).pow(power).mul(numb);

// const deployGameAddresses = require('./deployGameAddresses.json')

// const gameAddress =deployGameAddresses.proxy_mainSquidGame
const gameAddress = `0xB08052D1EcD6Eb2Cafd2e829997d39a984B71eC0`;

// Change BSW / WBNB payments (95% / 5%) with add BFG
const tokenRewards = {
    0:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(704,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(37,16), 0],
        [`0xbb46693ebbea1ac2070e59b4d043b47e2e095f86`, 0, toBN(10, 18)]
    ],
    1:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(1468,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(77,16), 0]
    ],
    2:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(2243,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(118,16), 0]
    ],
    3:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(3027,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(159,16), 0],
        [`0xbb46693ebbea1ac2070e59b4d043b47e2e095f86`, 0, toBN(25, 18)]
    ],
    4:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(3834,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(202,16), 0]
    ],
    5:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(4673,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(246,16), 0]
    ],
    6:[
        [`0x965f527d9159dce6288a2219db51fc6eef120dd1`, toBN(5574,16), 0], //rewardTokens: [address, rewardInUSD, rewardInToken]
        [`0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c`, toBN(293,16), 0],
        [`0xbb46693ebbea1ac2070e59b4d043b47e2e095f86`, 0, toBN(50, 18)]
    ],

}

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deployer address: ${ deployer.address}`);
    let nonce = await network.provider.send(`eth_getTransactionCount`, [deployer.address, "latest"]) - 1;
    console.log(`nonce: ${+nonce}`);
    const Game = await ethers.getContractFactory(`MainSquidGame`);

    const game = await Game.attach(gameAddress);


    console.log(`Change token reward in games`);
    for(let i in tokenRewards){
        await game.setRewardTokensToGame(i,tokenRewards[i], {nonce: ++nonce, gasLimit: 3e6});
        console.log(`token rewards in Game #${+i+1} updated`);
    }

    console.log(`Done`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });