// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
    it("initialize", async () => {
        // Generate keypair for the new account
        const newAccountKp = new web3.Keypair();

        // Sample JSON data
        const jsonData = JSON.stringify({
            name: "Example",
            value: 42,
            active: true
        });

        // Send transaction
        const txHash = await pg.program.methods
            .initialize(jsonData)
            .accounts({
                newAccount: newAccountKp.publicKey,
                signer: pg.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            })
            .signers([newAccountKp])
            .rpc();
        console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

        // Confirm transaction
        await pg.connection.confirmTransaction(txHash);

        // Fetch the created account
        const newAccount = await pg.program.account.newAccount.fetch(
            newAccountKp.publicKey
        );

        console.log("On-chain JSON data is:", newAccount.data);

        // Check if the data matches
        assert(jsonData === newAccount.data);
    });
});