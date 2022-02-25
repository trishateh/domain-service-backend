const main = async () => {

    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // pass in tld to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("ape");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("queen", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain queen.ape");

    txn = await domainContract.setRecord("queen", "I am the queen of apes");
    await txn.wait();
    console.log("Set record for queen.ape");

    const address = await domainContract.getAddress("queen");
    console.log("Owner of domain queen:", address)

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();