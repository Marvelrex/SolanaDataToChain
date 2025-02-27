use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("2QeyrXhVXq7ScR5QVgp9SArUTwnu7VjT1d5keCfbipUf");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        let new_account = &mut ctx.accounts.new_account;
        new_account.data = data.clone();
        msg!("Stored JSON data: {}!", data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // Space: 8 bytes discriminator + 4 bytes string length prefix + 1024 bytes for JSON string
    // You can adjust the 1024 based on your expected JSON size
    #[account(init, payer = signer, space = 8 + 4 + 1024)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    data: String
}